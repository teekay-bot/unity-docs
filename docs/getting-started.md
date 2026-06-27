# Getting Started

> **Target: Unity 6.3 LTS (6000.3)** · Pipeline: **URP only** (2D & 3D). Site này là personal reference về **settings & optimization**.

!!! abstract "TL;DR"
    - Reference **settings & tối ưu** cho **Unity 6.3 LTS (6000.3)**, **URP only** (2D & 3D).
    - **PC vs Mobile** → content tabs; **2D vs 3D** → tách nơi thật sự khác.
    - Mới vào? Đọc [Setup](setup/index.md) → [Render Pipeline (URP)](rendering/render-pipeline-urp.md).

## :material-information-outline: Site này là gì

Tổng hợp cấu hình & tối ưu Unity cho:

- **2D hoặc 3D** project
- **Mobile hoặc PC** platform

Giữ **general** — không đi sâu vào thể loại game cụ thể.

## :material-file-tree: Cách tổ chức

- **Nav theo chủ đề** (Project Settings, Rendering, Assets, Scripting, Build, Profiling…).
- Khác biệt **PC vs Mobile** → **content tabs** ngay trong trang:

    === "PC"
        Khuyến nghị cho desktop.
    === "Mobile"
        Khuyến nghị cho Android / iOS.

- Khác biệt **2D vs 3D** → tách section/trang riêng nơi thật sự khác (Rendering, Physics, Assets); chung thì để một trang.

## :material-format-list-checks: Quy ước trong docs

| Ký hiệu | Ý nghĩa |
|---|---|
| `!!! abstract "TL;DR"` | Tóm nhanh đầu trang — đọc lướt vẫn nắm |
| `!!! note` / `!!! tip` | Ghi chú / mẹo tối ưu |
| `!!! warning "Conflict: A ⚔️ B"` | **2 setting xung đột / không dùng chung được** |
| `!!! warning "Cần verify"` | **Chỗ chưa verify chắc chắn với Editor 6.3** — kiểm tra lại trước khi tin tuyệt đối |
| Bảng *setting → default → recommend* | Giá trị mặc định và khuyến nghị, kèm lý do |

!!! note "Nguyên tắc nội dung"
    Menu path / field / default đối chiếu với [Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/) và [URP docs](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/urp-reference-landing.html), hoặc lấy trực tiếp từ project template thật. Vì project **chỉ dùng URP**, docs bỏ qua hoàn toàn Built-in Render Pipeline.

## :material-rocket-launch-outline: Bắt đầu từ đâu

1. **[Setup (Quick Start)](setup/index.md)** — checklist settings ngay sau khi tạo project 2D/3D.
2. **[Render Pipeline (URP)](rendering/render-pipeline-urp.md)** — xương sống rendering, đọc sớm.
3. Các section còn lại — tra theo nhu cầu.
4. **[Packages & Assets](packages/index.md)** — dependency của project (vd UniTask).
