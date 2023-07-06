# png-palettes
> **png-palettes PNG图形压缩软件**

将 `PNG` 图像的 RGBA 模式转为调色板模式，从而减小图像大小。目前压缩只压缩 RGBA 模式的图像，调色板模式将跳过。这是一个多线程有损`PNG`图像压缩工具。
工具使用跨平台框架[Tauri](https://tauri.app)开发，核心功能是[png-palettes-optimization](https://github.com/cct124/png-palettes-optimization)命令行工具修改而来的。

> 使用[libimagequant](https://github.com/ImageOptim/libimagequant)生成调色板
> [image-png](https://github.com/image-rs/image-png)编解码`PNG`图像数据

## 使用

选择或拖拽需要压缩的文件或目录，选择或拖拽目录时将扫描压缩此目录下所有的`PNG`文件。
> <span style="color: red">注意！被压缩的图片将会覆盖原文件</span>

<img width="600" style="box-shadow: 0px 0px 3px #ccc;" src="https://github.com/cct124/png-palettes/assets/47600522/0497bf92-8394-4676-871d-0e72aa9b78b2" />

选择图片后的效果
> 减小压缩的文件大小，最直接的方法就是降低目标值

<img width="600" style="box-shadow: 0px 0px 3px #ccc;" src="https://github.com/cct124/png-palettes/assets/47600522/11be0dcf-259e-453c-94bd-f8619606bc40" />

效果

| 压缩前 | 压缩后 |
| --- | --- |
| <img width="300" src="https://github.com/cct124/png-palettes/assets/47600522/3f21e9ca-09be-4125-ae5d-d12e6861a794" /> | <img width="300" src="https://github.com/cct124/png-palettes/assets/47600522/f05f227d-6567-4c43-9042-bb34df0eaebe" /> |
| 73.8 KB (75,628 字节) | 24.1 KB (24,708 字节) |
