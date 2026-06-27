# Player Settings

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Menu: `Edit > Project Settings > Player`. Một số default lấy từ template `6000.3.10f1`.

!!! abstract "TL;DR"
    - **Color Space = Linear** (URP yêu cầu).
    - **Scripting Backend:** IL2CPP cho build release/mobile (nhanh hơn, nhỏ hơn; bắt buộc iOS & Android 64-bit).
    - **Api Compatibility:** .NET Standard 2.1 (default, nhẹ) — chỉ đổi .NET Framework nếu thư viện cần.
    - **Managed Stripping Level** cao hơn → build nhỏ hơn (test kỹ reflection).

## :material-tune: Mở ở đâu

`Edit > Project Settings > Player` — phần quan trọng nhất cho tối ưu nằm trong **Other Settings**.

!!! note "📸 Screenshot cần chụp"
    `Project Settings > Player > Other Settings` — cho thấy **Color Space, Scripting Backend, Api Compatibility Level, Managed Stripping Level**. → `docs/assets/screenshots/player-other-settings.png`

## :material-cog: Other Settings — default & ý nghĩa

| Field | Default (template) | Ý nghĩa / khuyến nghị |
|---|---|---|
| **Color Space** | **Linear** | URP cần Linear để ánh sáng/khử gamma đúng. Đừng đổi Gamma. |
| **Scripting Backend** | Mono (editor) / theo platform | Build release & mobile → **IL2CPP** (AOT, nhanh, khó decompile). iOS luôn IL2CPP. |
| **Api Compatibility Level** | **.NET Standard 2.1** | Nhẹ, đủ cho đa số. `.NET Framework` chỉ khi thư viện yêu cầu (build nặng hơn). |
| **IL2CPP Code Generation** | Faster runtime | "Faster (smaller) builds" nếu muốn build nhanh/nhỏ hơn, đổi lại runtime chậm hơn chút. |
| **Managed Stripping Level** | theo platform | Tăng (High) để cắt code không dùng → build nhỏ. Cẩn thận code dùng **reflection** (giữ qua `link.xml`). |
| **GPU Skinning** | On | Đẩy skinning lên GPU, nhẹ CPU. |
| Company / Product Name | DefaultCompany / My project | Đổi cho đúng dự án. |

!!! warning "Cần verify"
    Nhãn chính xác của **Api Compatibility Level** và **default Scripting Backend theo từng platform** trong 6.3 — xác nhận bằng screenshot ở trên. Nhiều field này khác nhau **theo platform tab** (Windows / Android / iOS).

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
