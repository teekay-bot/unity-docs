# New 2D Project — Checklist

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Checklist settings ngay sau khi tạo project bằng template **Universal 2D**. Làm theo thứ tự; mỗi mục link tới trang chi tiết.

!!! note "Giả định"
    Bạn đã tạo project bằng template **Universal 2D** (URP + Linear color space đã set sẵn). Nếu chưa, xem [Setup overview](index.md).

## 1. Chọn platform target

Đặt platform **sớm** để mọi import setting (texture, audio) đúng ngay từ đầu.

`File > Build Profiles` (Ctrl+Shift+B) → chọn platform → **Switch Platform**. *(Unity 6.3 đổi "Build Settings" cũ thành **Build Profiles**.)*

=== "PC"
    Target **Windows / Mac / Linux** (Standalone).
=== "Mobile"
    Target **Android** hoặc **iOS**. Xem [Mobile Build](../build/mobile-build.md).

## 2. Render pipeline (URP 2D)

- Template đã gán **1 URP Asset (`UniversalRP`) + `Renderer2D`** dùng chung cho **6 quality level** (Very Low→Ultra). Kiểm tra `Edit > Project Settings > Graphics` đã trỏ URP Asset.
- 2D Renderer có **2D Lights** (4 blend style), Transparency Sort. Chi tiết: [Render Pipeline (URP)](../rendering/render-pipeline-urp.md).

## 3. Quality

- `Edit > Project Settings > Quality` — set per-level URP Asset, VSync, Mipmap Streaming.
- Recommendation PC vs Mobile: xem [Quality](../project-settings/quality.md).

## 4. Player settings

- `Edit > Project Settings > Player` — Company/Product name, icon, **color space = Linear** (URP default), API/compression.
- Chi tiết: [Player](../project-settings/player.md).

## 5. Physics 2D

`Edit > Project Settings > Physics 2D`. Default từ template 2D (`6000.3.10f1`):

| Field | Default | Ghi chú |
|---|---|---|
| Gravity | (0, **-9.81**) | |
| Simulation Mode | **Fixed Update** | Chạy physics theo fixed timestep ([Time](../project-settings/time.md)) |
| Reuse Collision Callbacks | **On** | Bật mặc định ở 6.3 — giảm GC từ collision callback |
| Auto Sync Transforms | **Off** | Dùng `Physics2D.SyncTransforms()` khi cần (thay vì auto) |
| Velocity / Position Iterations | 8 / 3 | |

Chi tiết & Box2D: xem [Physics](../project-settings/physics.md).

## 6. Assets 2D

- **Sprites & Atlases:** gom sprite vào atlas để giảm draw call → [Sprites & Atlases](../assets/sprites-atlases.md).
- **Textures:** nén theo platform (PC: BC7 · Mobile: ASTC) → [Textures](../assets/textures.md).

## 7. Scripting & version control

- **Input System** (`com.unity.inputsystem` 1.18.0) đã có sẵn trong template 2D.
- 2D packages có sẵn: 2D Animation, Aseprite, PSD Importer, SpriteShape, Tilemap (+Extras), Sprite, Tooling.
- Tạo `.gitignore` cho Unity (bỏ `Library/`, `Temp/`, `Build/`…).
- Khai báo dependency thêm (vd UniTask) vào [Packages & Assets](../packages/index.md).

---

!!! tip "Sau checklist"
    Vào từng section theo nhu cầu. Trang nào có `Cần verify` nghĩa là cần đối chiếu Editor 6.3 trước khi tin tuyệt đối.
