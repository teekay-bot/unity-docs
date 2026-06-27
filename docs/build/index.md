# Build — Overview

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Đóng gói game ra file chạy được. Menu: `File > Build Profiles` (mô hình mới ở Unity 6) hoặc `Ctrl+Shift+B`.

!!! abstract "TL;DR"
    - **Build Profiles** (Unity 6) thay cho Build Settings cũ — mỗi platform 1 profile riêng.
    - **[PC Build](pc-build.md):** Windows/Mac/Linux standalone — **Mono** ok, build nhanh.
    - **[Mobile Build](mobile-build.md):** Android/iOS — **IL2CPP + ARM64** bắt buộc, ký app.
    - Cấu hình scripting backend/stripping ở [Player Settings](../project-settings/player.md).
    - **Development Build** để profile trên thiết bị thật.

## :material-package-variant-closed: Các trang

<div class="grid cards" markdown>

-   :material-microsoft-windows: __[PC Build](pc-build.md)__

    ---

    Windows/Mac/Linux standalone, Mono, Development Build, IL2CPP tùy chọn.

-   :material-cellphone: __[Mobile Build](mobile-build.md)__

    ---

    Android (APK/AAB) & iOS, IL2CPP + ARM64, keystore/signing, kích thước build.

</div>

## :material-file-cog: Build Profiles (Unity 6)

- Mở: `File > Build Profiles`.
- Mỗi **profile** gắn 1 platform + danh sách scene + override Player settings riêng.
- Chọn platform → **Switch Platform** (lần đầu reimport asset theo platform, hơi lâu).
- **Build** hoặc **Build And Run**.

![Cửa sổ Build Profiles — danh sách Platforms (Windows Active, Android, iOS, Web…), Scene List, Platform Settings (Architecture Intel 64-bit, Development Build…), nút Build / Build And Run.](../assets/screenshots/build-profiles.png){ width="680" }

!!! note "Để ý trong ảnh (click để phóng to)"
    Cột **Platforms** liệt kê mọi nền tảng (Windows đang **Active**). **Scene List** dùng chung (đổi riêng thì *Add Build Profile*). **Platform Settings (Windows):** *Architecture = Intel 64-bit*, *Build and Run on = Local Machine*, checkbox **Development Build / Autoconnect Profiler / Deep Profiling / Script Debugging**, *Compression Method = Default*. Hai tab trên-phải: **Player Settings** & **Asset Import Overrides**.

## :material-bug-check: Development Build

- Tick **Development Build** để: bật Profiler kết nối, Deep Profiling, script debugging, log đầy đủ.
- **Luôn profile trên Development Build ở thiết bị thật** (mobile khác xa editor) — xem [Profiling](../profiling/tools.md).
- **Tắt** Development Build cho bản phát hành (nhanh hơn, nhỏ hơn).

## :material-link-variant: Nguồn

- [Build Profiles — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/build-profiles.html)
- [Publishing builds — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/PublishingBuilds.html)
