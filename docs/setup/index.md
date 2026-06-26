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

Trong Unity Hub → **New project** → chọn template URP:

- **2D:** template **Universal 2D** → [checklist 2D](new-2d-project.md)
- **3D:** template **Universal 3D** → [checklist 3D](new-3d-project.md)

!!! warning "Cần verify"
    Tên template chính xác trong Unity Hub 6.3 (**Universal 2D** / **Universal 3D**) cần xác nhận trực tiếp trong Hub — Unity có đổi nhãn template giữa các version. Quan trọng: chọn template **dùng URP**, tránh template "Built-In Render Pipeline".

!!! note "Vì sao dùng template URP"
    Template URP đã **tạo & gán sẵn URP Asset + Renderer** và set **Linear color space** — đỡ phải cấu hình tay. Nếu lỡ tạo project Built-in thì phải [migrate sang URP](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/upgrading-from-birp.html) (mất công hơn).

## Sau khi tạo — chạy checklist

Mở checklist tương ứng và làm theo thứ tự:

- 📋 **[New 2D Project — Checklist](new-2d-project.md)**
- 📋 **[New 3D Project — Checklist](new-3d-project.md)**

## Nguồn (official)

- [System requirements — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/system-requirements.html)
- [Creating a URP project — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/creating-a-urp-project.html)
