# New 3D Project — Checklist

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Checklist settings ngay sau khi tạo project bằng template **Universal 3D**. Làm theo thứ tự; mỗi mục link tới trang chi tiết.

!!! note "Giả định"
    Bạn đã tạo project bằng template **Universal 3D** (URP + Linear color space đã set sẵn). Nếu chưa, xem [Setup overview](index.md).

## 1. Chọn platform target

Đặt platform **sớm** để import setting đúng từ đầu.

`File > Build Profiles` (Ctrl+Shift+B) → chọn platform → **Switch Platform**. *(Unity 6.3 đổi "Build Settings" cũ thành **Build Profiles**.)*

=== "PC"
    Target **Windows / Mac / Linux** (Standalone). Xem [PC Build](../build/pc-build.md).
=== "Mobile"
    Target **Android** hoặc **iOS**. Xem [Mobile Build](../build/mobile-build.md).

## 2. Render pipeline (URP 3D)

- Template đã gán **URP Asset + Universal Renderer**. Kiểm tra `Edit > Project Settings > Graphics` trỏ đúng URP Asset.
- Chọn **Rendering Path** (Forward / Forward+ / Deferred) phù hợp → [Render Pipeline (URP)](../rendering/render-pipeline-urp.md).

## 3. Quality

- `Edit > Project Settings > Quality` — per-level URP Asset, VSync, Mipmap Streaming.
- Recommendation PC vs Mobile: [Quality](../project-settings/quality.md).

## 4. Player settings

- `Edit > Project Settings > Player` — Company/Product name, icon, **color space = Linear** (URP default), API/compression.
- Chi tiết: [Player](../project-settings/player.md).

## 5. Lighting

- GPU lightmapper / Adaptive Probe Volumes — xem [Lighting](../rendering/lighting.md).

!!! note "Mới ở 6.3"
    Project mới dùng **OpenCL GPU Lightmapper** làm back-end bake mặc định (xem trang Lighting để biết chi tiết & cách verify).

## 6. Physics 3D

- `Edit > Project Settings > Physics` — gravity, layer collision matrix, fixed timestep ([Time](../project-settings/time.md)).
- Chi tiết: [Physics](../project-settings/physics.md).

## 7. Assets 3D

- **Meshes & Models:** import scale, mesh compression, Read/Write → [Meshes & Models](../assets/meshes-models.md).
- **Textures:** nén theo platform (PC: BC7 · Mobile: ASTC) → [Textures](../assets/textures.md).

## 8. Scripting & version control

- Input System (package) nếu cần.
- Tạo `.gitignore` cho Unity (bỏ `Library/`, `Temp/`, `Build/`…).
- Khai báo dependency vào [Packages & Assets](../packages/index.md).

---

!!! tip "Sau checklist"
    Vào từng section theo nhu cầu. Trang nào có `Cần verify` nghĩa là cần đối chiếu Editor 6.3 trước khi tin tuyệt đối.
