use super::Pngquant;
use crate::error::Error;
use crate::thread::ThreadPool;
use crate::PROGRESS_CONSTANT;
use png::Compression;
use std::path::PathBuf;
use std::sync::mpsc;
use std::thread::available_parallelism;
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug)]
pub struct Optimization<'a> {
    /// 工作路径
    // path: &'a Path,
    /// `1-10`.
    ///更快的速度生成的图像质量更低，用于实时生成图像。
    ///默认值为 `4`。
    speed: Option<u8>,
    /// `0-100`，优化的最低质量，默认最低`0`，不能高于最大值
    quality_minimum: Option<u8>,
    /// `0-100`，优化的最大质量，默认最高`100`，不能低于最小值
    quality_target: Option<u8>,
    /// 设置为1.0可获得漂亮的平滑图像，默认 1.0
    dithering_level: Option<f32>,
    /// 文件扩展名，用于检测png文件
    extension: Vec<&'a str>,
    /// 工作列表
    worklist: &'a mut Vec<Work>,
    /// 线程池
    thread_pool: ThreadPool,
    /// 记录完成的工作任务
    end_num: usize,
    /// png编码压缩等级
    compression: Compression,
    /// 工作开始时间
    start_time: u128,
    /// 处理的文件数量
    process_file_num: usize,
}

impl<'a> Optimization<'a> {
    pub fn new(
        // path: &'a Path,
        speed: Option<u8>,
        quality_minimum: Option<u8>,
        quality_target: Option<u8>,
        dithering_level: Option<f32>,
        compression: Option<Compression>,
        worklist: &'a mut Vec<Work>,
    ) -> Optimization<'a> {
        // 系统并行资源
        let available_parallelism = available_parallelism().unwrap().get();
        // 根据并行资源数量创建线程池
        let thread_pool = ThreadPool::new(available_parallelism);

        let start_time = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_millis();

        let extension = vec!["png"];

        let compression = if let Some(compression) = compression {
            compression
        } else {
            Compression::Default
        };

        Optimization {
            // path,
            speed,
            quality_minimum,
            quality_target,
            extension,
            worklist,
            thread_pool,
            end_num: 0,
            dithering_level: Some(dithering_level.unwrap_or(1.0)),
            compression,
            start_time,
            process_file_num: 0,
        }
    }

    /// 执行数组中的工作任务
    pub fn run_worklist<F1, F2>(&mut self, progress_change: F1, status_change: F2)
    where
        F1: Fn(&Work) -> (),
        F2: Fn(&Work) -> (),
    {
        let (progress_sender, progress_receiver) = mpsc::sync_channel(self.worklist.len());
        let (status_sender, status_receiver) = mpsc::channel::<Status>();

        // let progress_total = (self.worklist.len() * 110) as f64;
        // let pbstr = "\u{25A0}".repeat(20).to_string();
        // let pbwid = "-".repeat(20).to_string();

        // 主线程循环不断检查工作任务状态
        loop {
            for work in self.worklist.iter_mut() {
                // 只执行初始化的工作任务
                if let WorkStatus::INIT = work.status {
                    // 开始执行，工作任务状态改为等待
                    work.status = WorkStatus::WAIT;
                    let path = work.path.clone();
                    let speed = self.speed;
                    let quality_target = self.quality_target;
                    let quality_minimum = self.quality_minimum;
                    let dithering_level = self.dithering_level;
                    let compression = self.compression;
                    let progress_sender = progress_sender.clone();
                    let status_sender = status_sender.clone();
                    let id = work.id;
                    // 多线程执行工作任务
                    self.thread_pool.execute(move || {
                        // let pngquant = Pngquant::new(
                        //     id,
                        //     &path,
                        //     speed,
                        //     quality_minimum,
                        //     quality_target,
                        //     dithering_level,
                        //     progress_sender,
                        // )
                        // .as_mut();

                        match Pngquant::new(
                            id,
                            &path,
                            speed,
                            quality_minimum,
                            quality_target,
                            dithering_level,
                            progress_sender,
                        )
                        .as_mut()
                        {
                            Ok(pngquant) => {
                                // 执行编码覆盖原文件
                                let res = pngquant.encoder(
                                    pngquant.path,
                                    speed,
                                    quality_minimum,
                                    quality_target,
                                    compression,
                                );
                                match res {
                                    Ok(()) => {
                                        let original_size = pngquant.original_size.unwrap();
                                        let size = pngquant.size.unwrap();
                                        // 向主线程发送当前工作结束消息
                                        status_sender
                                            .send(Status {
                                                id,
                                                status: WorkStatus::END,
                                                progress: PROGRESS_CONSTANT,
                                                original_size,
                                                size,
                                                err: None,
                                            })
                                            .unwrap();
                                    }
                                    Err(err) => {
                                        status_sender
                                            .send(Status {
                                                id,
                                                status: WorkStatus::ERROR,
                                                progress: PROGRESS_CONSTANT,
                                                original_size: 0,
                                                size: 0,
                                                err: Some(err),
                                            })
                                            .unwrap();
                                    }
                                }
                            }
                            Err(err) => {
                                status_sender
                                    .send(Status {
                                        id,
                                        status: WorkStatus::ERROR,
                                        progress: 0.0,
                                        original_size: 0,
                                        size: 0,
                                        err: Some(*err),
                                    })
                                    .unwrap();
                            }
                        }
                    })
                }
            }

            // 检查通道消息，执行工作的线程任务结束后将发消息到此通道
            if let Ok(message) = status_receiver.try_recv() {
                // 确定是哪个工作任务发出的消息
                let work = self.worklist.iter_mut().find(|work| work.id == message.id);
                if let Some(work) = work {
                    match message.status {
                        WorkStatus::END => {
                            // 将工作任务状态改为已结束
                            work.status = WorkStatus::END;
                            work.original_size = message.original_size;
                            work.size = message.size;
                            self.process_file_num += 1;
                        }
                        WorkStatus::ERROR => {
                            work.status = WorkStatus::ERROR;
                            if let Some(err) = message.err {
                                work.err = Some(err)
                            }
                        }
                        _ => {}
                    }
                    self.end_num += 1;
                    status_change(&work)
                }
            };

            if let Ok(progress) = progress_receiver.try_recv() {
                let work = self.worklist.iter_mut().find(|work| work.id == progress.id);
                if let Some(work) = work {
                    // 改变工作进度
                    work.progress = progress.value.round() as usize;
                    progress_change(&work)
                }
            }

            // 判断是否所有任务已完成
            if self.worklist.len() == self.end_num {
                // 退出循环
                break;
            }
        }
    }
}

#[derive(Debug)]
pub struct Work {
    // 工作id
    pub id: usize,
    // 工作路径
    pub path: PathBuf,
    // 工作状态
    pub status: WorkStatus,
    // 工作进度
    pub progress: usize,
    /// 源文件大小
    pub original_size: u64,
    /// 压缩文件大小
    pub size: u64,
    pub err: Option<Error>,
}

/// 工作任务状态
#[derive(Debug)]
pub enum WorkStatus {
    /// 初始化
    INIT,
    /// 错误
    ERROR,
    /// 结束
    END,
    /// 正在执行
    WAIT,
}

#[derive(Debug)]
pub struct Status {
    /// 工作id
    pub id: usize,
    /// 工作任务状态
    pub status: WorkStatus,
    /// 源文件大小
    pub original_size: u64,
    /// 工作进度
    pub progress: f32,
    /// 压缩文件大小
    pub size: u64,
    /// 错误类型
    pub err: Option<Error>,
}
