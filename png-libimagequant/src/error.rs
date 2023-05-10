use std::fmt;
pub use Error::*;

#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[allow(non_camel_case_types)]
pub enum Error {
    /// 不能达到的最低质量
    QualityTooLow = 99,
    /// 用无效参数调用的函数
    ValueOutOfRange = 100,
    /// 要么是系统/进程真的达到了极限，要么是一些数据(如图像大小)错误得离谱。也可能是一个bug
    OutOfMemory,
    /// 进度回调指示停止
    Aborted,
    /// 发生了一些可怕的不一致性
    InternalError,
    /// 切片需要更大，或者宽度/高度需要更小
    BufferTooSmall,
    /// C API 中的空指针或使用已释放内存
    InvalidPointer,
    /// 恭喜你，你发现了一个边缘情况
    Unsupported,
    /// 不支持的png颜色模式
    UnsupportedColorMode,
}

impl std::error::Error for Error {}

impl fmt::Display for Error {
    #[cold]
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(match *self {
            Self::QualityTooLow => "QualityTooLow",
            Self::ValueOutOfRange => "ValueOutOfRange",
            Self::OutOfMemory => "OutOfMemory",
            Self::Aborted => "Aborted",
            Self::InternalError => "InternalError",
            Self::BufferTooSmall => "BufferTooSmall",
            Self::InvalidPointer => "InvalidPointer",
            Self::Unsupported => "UNSUPPORTED",
            Self::UnsupportedColorMode => "Unsupported_Color_Mode",
        })
    }
}

impl From<imagequant::Error> for Error {
    fn from(error: imagequant::Error) -> Self {
        match error {
            imagequant::Error::QualityTooLow => Error::QualityTooLow,
            imagequant::Error::ValueOutOfRange => Error::ValueOutOfRange,
            imagequant::Error::OutOfMemory => Error::OutOfMemory,
            imagequant::Error::Aborted => Error::Aborted,
            imagequant::Error::InternalError => Error::InternalError,
            imagequant::Error::BufferTooSmall => Error::BufferTooSmall,
            imagequant::Error::InvalidPointer => Error::InvalidPointer,
            imagequant::Error::Unsupported => Error::Unsupported,
            _ => Error::Unsupported,
        }
    }
}
