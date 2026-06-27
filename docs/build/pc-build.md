# PC Build

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Standalone **Windows / macOS / Linux**. Cấu hình chi tiết ở [Player Settings](../project-settings/player.md).

!!! abstract "TL;DR"
    - Platform: **Windows / Mac / Linux** trong `File > Build Profiles`.
    - **Scripting Backend = Mono** ổn cho PC (build nhanh, iterate dễ); IL2CPP nếu cần bảo vệ code/hiệu năng tối đa.
    - **Architecture:** x86_64 (Intel/AMD 64-bit).
    - **Managed Stripping = Disabled/Low** cho PC (đỡ lỗi reflection).
    - Test bằng **Development Build** + Profiler trước khi build release.

## :material-cog: Cấu hình khuyến nghị (PC)

| Setting | Giá trị | Ghi chú |
|---|---|---|
| **Scripting Backend** | Mono | Build nhanh; IL2CPP nếu cần |
| **Api Compatibility** | .NET Standard 2.1 | Mặc định ([Player](../project-settings/player.md)) |
| **Architecture** | x86_64 | 64-bit |
| **Managed Stripping Level** | Disabled / Low | PC dư dung lượng |
| **Color Space** | Linear | Đúng cho URP |

(Các giá trị này khớp [Player Settings](../project-settings/player.md) — tab **PC/Standalone**.)

## :material-microsoft-windows: Các bước build (Windows)

1. `File > Build Profiles` → chọn **Windows**.
2. **Switch Platform** nếu đang ở platform khác.
3. Kiểm **Scene List** — đủ scene, đúng thứ tự (scene 0 = scene khởi động).
4. (Tùy) tick **Development Build** để profile.
5. **Build** → chọn thư mục output → ra `.exe` + thư mục `_Data`.

!!! tip "Giữ scene khởi động ở index 0"
    Scene đầu trong danh sách (index 0) là scene load đầu tiên khi chạy build. Thường là splash/loading/menu.

## :material-shield-lock: Mono vs IL2CPP trên PC

| | Mono | IL2CPP |
|---|---|---|
| Tốc độ build | **Nhanh** | Chậm (dịch sang C++) |
| Hiệu năng runtime | Tốt | **Tốt hơn** chút |
| Bảo vệ code | Dễ decompile | **Khó** hơn |
| Khi nào | Dev/iterate, đa số game PC | Release cần bảo vệ/hiệu năng |

!!! info "Build Profiles"
    Xem ảnh cửa sổ **Build Profiles** ở [trang Overview](index.md): cột Platforms, Scene List dùng chung, Platform Settings (Architecture, Development Build…) và nút **Build** / **Build And Run** ở góc dưới-phải.

## :material-flash: Checklist trước khi build release

- [ ] Tắt **Development Build**.
- [ ] Scene List đúng & đủ.
- [ ] Quality/URP Asset đúng tier PC ([Quality](../project-settings/quality.md)).
- [ ] Test build trên máy sạch (không có Unity) nếu phát hành.
- [ ] Icon, Company/Product Name ([Player](../project-settings/player.md)).

## :material-link-variant: Nguồn

- [Windows standalone build settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/BuildSettingsStandalone.html)
- [IL2CPP — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/IL2CPP.html)
