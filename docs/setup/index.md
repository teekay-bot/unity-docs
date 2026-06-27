# Setup — Quick Start

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Mục này giúp cấu hình project đúng ngay từ đầu, tránh phải sửa lại sau.

## Trước khi tạo project

### Editor

Cài **Unity 6.3 LTS (6000.3.x)** qua Unity Hub. Đây là LTS, support tới 12/2027.

### System requirements (verified 6.3)

| OS | Yêu cầu tối thiểu |
|---|---|
| **Windows** | Windows 10 21H1 (build 19043)+ (x64); Windows 11 21H2 (build 22000)+ (Arm64) |
| **macOS** | macOS **Ventura 13** trở lên (Intel SSE2 / Apple M1+) |
| **Linux** | Ubuntu **22.04** hoặc **24.04** |
| **GPU** | Win: DX10/11/12 hoặc Vulkan · mac: Metal · Linux: OpenGL 3.2+ hoặc Vulkan |
| **RAM** | Khuyến nghị tối thiểu **8 GB** |

> Nguồn: [System requirements — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/system-requirements.html).

## Tạo project (Unity Hub → template URP)

Trong Unity Hub → **New project** (Editor version `6000.3.x`) → chọn template URP (verified trong Hub 6.3):

- **Universal 2D** — *"empty project configured for 2D apps, dùng URP pre-configured với 2D Renderer"* → [checklist 2D](new-2d-project.md)
- **Universal 3D** — *"URP blank template, kèm settings & assets để bắt đầu với URP"* → [checklist 3D](new-3d-project.md)

!!! warning "Tránh nhầm template"
    Trong Hub 6.3 còn có **High Definition 3D** (HDRP), **3D (Built-In Render Pipeline)**, **2D (Built-In Render Pipeline)** — **đừng chọn** mấy cái này. Project chỉ dùng URP → chọn đúng **Universal 2D / Universal 3D**.

!!! note "Vì sao dùng template URP"
    Template URP đã **tạo & gán sẵn URP Asset + Renderer** (kèm sẵn **2 quality level Mobile/PC** + URP Asset riêng cho từng level) và set **Linear color space** — đỡ cấu hình tay. Lỡ tạo project Built-in thì phải [migrate sang URP](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/upgrading-from-birp.html).

## Sau khi tạo — chạy checklist

Mở checklist tương ứng và làm theo thứ tự:

- 📋 **[New 2D Project — Checklist](new-2d-project.md)**
- 📋 **[New 3D Project — Checklist](new-3d-project.md)**

## Nguồn (official)

- [System requirements — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/system-requirements.html)
- [Creating a URP project — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/creating-a-urp-project.html)
