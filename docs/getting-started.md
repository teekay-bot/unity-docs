# Getting Started

> **Target: Unity 6.3 LTS (6000.3)** · Pipeline: **URP only** (2D & 3D). Site này là personal reference về **settings & optimization**.

## Site này là gì

Tổng hợp cấu hình & tối ưu Unity cho:

- **2D hoặc 3D** project
- **Mobile hoặc PC** platform

Giữ **general** — không đi sâu vào thể loại game cụ thể.

## Cách tổ chức

- **Nav theo chủ đề** (Project Settings, Rendering, Assets, Scripting, Build, Profiling…).
- Khác biệt **PC vs Mobile** → **content tabs** ngay trong trang:

    === "PC"
        Khuyến nghị cho desktop.
    === "Mobile"
        Khuyến nghị cho Android / iOS.

- Khác biệt **2D vs 3D** → tách section/trang riêng nơi thật sự khác (Rendering, Physics, Assets); chung thì để một trang.

## Quy ước trong docs

| Ký hiệu | Ý nghĩa |
|---|---|
| `!!! note` / `!!! tip` | Ghi chú / mẹo tối ưu |
| `!!! warning "Cần verify"` | **Chỗ chưa verify chắc chắn với Editor 6.3** — kiểm tra lại trước khi tin tuyệt đối |
| Bảng *setting → default → recommend* | Giá trị mặc định và khuyến nghị, kèm lý do |

!!! note "Nguyên tắc nội dung"
    Mọi menu path / field / default được verify với [Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/) và [URP docs](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/urp-reference-landing.html). Vì project **chỉ dùng URP**, docs bỏ qua hoàn toàn Built-in Render Pipeline.

## Bắt đầu từ đâu

1. **[Setup (Quick Start)](setup/index.md)** — checklist settings ngay sau khi tạo project 2D/3D.
2. **[Render Pipeline (URP)](rendering/render-pipeline-urp.md)** — xương sống rendering, đọc sớm.
3. Các section còn lại — tra theo nhu cầu.
4. **[Packages & Assets](packages/index.md)** — dependency của project (vd UniTask).
