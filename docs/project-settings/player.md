# Player Settings

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Menu: `Edit > Project Settings > Player`. Một số default lấy từ template `6000.3.10f1`.

!!! abstract "TL;DR"
    - **Color Space = Linear** (URP yêu cầu).
    - **Scripting Backend:** IL2CPP cho build release/mobile (nhanh hơn, nhỏ hơn; bắt buộc iOS & Android 64-bit).
    - **Api Compatibility:** .NET Standard 2.1 (default, nhẹ) — chỉ đổi .NET Framework nếu thư viện cần.
    - **Managed Stripping Level** cao hơn → build nhỏ hơn (test kỹ reflection).

## :material-tune: Mở ở đâu

`Edit > Project Settings > Player` — phần quan trọng nhất cho tối ưu nằm trong **Other Settings**.

## :material-cog: Other Settings — default

⚠️ Nhiều field **khác default theo platform tab** (Configuration / Optimization). Default thật từ template `6000.3.10f1`:

| Field | PC (Standalone) | Android | Ghi chú |
|---|---|---|---|
| **Color Space** | Linear | Linear | *(shared)* URP cần Linear |
| **Scripting Backend** | **Mono** | **IL2CPP** | Mono dev nhanh; **IL2CPP cho release** (AOT, nhanh, khó decompile). iOS luôn IL2CPP |
| **Api Compatibility Level** | .NET Standard 2.1 | .NET Standard 2.1 | Nhẹ; `.NET Framework` chỉ khi thư viện cần |
| **IL2CPP Code Generation** | Optimize for runtime speed | Optimize for runtime speed | Đổi *Optimize for build size* nếu cần build nhỏ/nhanh hơn |
| **Managed Stripping Level** | **Disabled** | **Minimal** | Tăng → build nhỏ hơn; cẩn thận **reflection** (giữ qua `link.xml`) |
| **Use incremental GC** | On | On | Chia nhỏ GC → đỡ giật |
| **Active Input Handling** | Input System (New) | Input System (New) | Template dùng Input System package |
| **Target Architectures** | — | **ARM64** (ARMv7 off) | Bỏ ARMv7 nếu không cần máy quá cũ |
| **Strip Engine Code** | — | On | Cắt module engine không dùng → nhẹ APK |
| **GPU Skinning** | On | On | Đẩy skinning lên GPU |

!!! note "📸 Screenshot cần chụp"
    `Player > Other Settings` cho **2 platform** (khác nhau): tab **PC/Standalone** → `player-other-pc.png`; tab **Android** → `player-other-android.png`.

## :material-flash: Tối ưu theo platform

=== "PC"
    - Scripting Backend **IL2CPP** cho bản phát hành (Mono OK khi dev cho iterate nhanh).
    - Managed Stripping vừa phải; Api .NET Standard 2.1.

=== "Mobile"
    - **IL2CPP bắt buộc** (Android 64-bit, iOS).
    - **Managed Stripping High** + `link.xml` giữ type reflection → giảm size APK/IPA.
    - **IL2CPP Code Generation:** cân nhắc "Faster (smaller) builds" nếu build time là vấn đề.
    - Target Architectures Android: **ARM64** (bỏ ARMv7 nếu không cần).

## :material-link-variant: Nguồn

- Dữ liệu: template `6000.3.10f1` — `ProjectSettings.asset`.
- [Player settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-PlayerSettings.html)
