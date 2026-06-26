# New 2D Project — Checklist

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Checklist settings ngay sau khi tạo project bằng template **Universal 2D**. Làm theo thứ tự; mỗi mục link tới trang chi tiết.

!!! note "Giả định"
    Bạn đã tạo project bằng template **Universal 2D** (URP + Linear color space đã set sẵn). Nếu chưa, xem [Setup overview](index.md).

## 1. Chọn platform target

Đặt platform **sớm** để mọi import setting (texture, audio) đúng ngay từ đầu.

`File > Build Profiles` (Unity 6) → chọn platform → **Switch Platform**.

=== "PC"
    Target **Windows / Mac / Linux** (Standalone).
=== "Mobile"
    Target **Android** hoặc **iOS**. Xem [Mobile Build](../build/mobile-build.md).

!!! warning "Cần verify"
    Tên cửa sổ trong 6.3 là **Build Profiles** (thay cho "Build Settings" cũ) — xác nhận đường dẫn menu `File > Build Profiles` trong Editor.

## 2. Render pipeline (URP 2D)

- Template đã gán **URP Asset + 2D Renderer**. Kiểm tra `Edit > Project Settings > Graphics` đã trỏ URP Asset.
- Chi tiết: [Render Pipeline (URP)](../rendering/render-pipeline-urp.md).

## 3. Quality

- `Edit > Project Settings > Quality` — set per-level URP Asset, VSync, Mipmap Streaming.
- Recommendation PC vs Mobile: xem [Quality](../project-settings/quality.md).

## 4. Player settings

- `Edit > Project Settings > Player` — Company/Product name, icon, **color space = Linear** (URP default), API/compression.
- Chi tiết: [Player](../project-settings/player.md).

## 5. Physics 2D

- `Edit > Project Settings > Physics 2D`. Lưu ý Unity 6.3 có thay đổi về 2D physics — xem [Physics](../project-settings/physics.md).

## 6. Assets 2D

- **Sprites & Atlases:** gom sprite vào atlas để giảm draw call → [Sprites & Atlases](../assets/sprites-atlases.md).
- **Textures:** nén theo platform (PC: BC7 · Mobile: ASTC) → [Textures](../assets/textures.md).

## 7. Scripting & version control

- Input System (package) nếu cần input hiện đại.
- Tạo `.gitignore` cho Unity (bỏ `Library/`, `Temp/`, `Build/`…).
- Khai báo dependency vào [Packages & Assets](../packages/index.md).

---

!!! tip "Sau checklist"
    Vào từng section theo nhu cầu. Trang nào có `Cần verify` nghĩa là cần đối chiếu Editor 6.3 trước khi tin tuyệt đối.
