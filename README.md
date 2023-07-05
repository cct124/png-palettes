# png-palettes
> **png-palettes PNG图形压缩软件**

将 `PNG` 图像的 RGBA 模式转为调色板模式，从而减小图像大小。目前压缩只压缩 RGBA 模式的图像，调色板模式将跳过。这是一个多线程有损`PNG`图像压缩工具。
工具使用跨平台框架[Tauri](https://tauri.app)开发，核心功能是[png-palettes-optimization](https://github.com/cct124/png-palettes-optimization)命令行工具修改而来的。

> 使用[libimagequant](https://github.com/ImageOptim/libimagequant)生成调色板
> [image-png](https://github.com/image-rs/image-png)编解码`PNG`图像数据

## 使用

选择或拖拽需要压缩的文件或目录，选择或拖拽目录时将扫描压缩此目录下所有的`PNG`文件。
> <span style="color: red">注意！被压缩的图片将会覆盖原文件</span>

<img width="600" src="https://github.com/cct124/png-palettes/assets/47600522/e444d797-8d60-483a-a710-5918915366c1" />

选择图片后的效果

<img width="600" src="https://github.com/cct124/png-palettes/assets/47600522/46aadb7f-943e-4e76-ba55-519977a5c508" />
