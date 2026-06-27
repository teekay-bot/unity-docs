# Mobile Build (Android / iOS)

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Build mobile khắt khe hơn PC: **IL2CPP + ARM64 bắt buộc**, phải ký app, và size/RAM bị giới hạn chặt.

!!! abstract "TL;DR"
    - **Android & iOS bắt buộc IL2CPP + ARM64** (Mono không được phép phát hành).
    - **Managed Stripping = Minimal/Low** + **Strip Engine Code** để giảm size.
    - **Android:** xuất **AAB** (Google Play) hoặc **APK** (test); cần **keystore** ký.
    - **iOS:** Unity xuất **Xcode project** → build/ký bằng Xcode (cần Mac + Apple account).
    - **Luôn Development Build + profile trên máy thật** — editor không đại diện hiệu năng mobile.

## :material-android: Android

### Cấu hình bắt buộc

| Setting | Giá trị | Ghi chú |
|---|---|---|
| **Scripting Backend** | **IL2CPP** | Bắt buộc để phát hành |
| **Target Architectures** | **ARM64** (+ ARMv7 tùy) | Google Play yêu cầu 64-bit |
| **Managed Stripping Level** | Minimal / Low | Giảm size; coi chừng reflection |
| **Strip Engine Code** | On | Bỏ module engine không dùng |
| **Api Compatibility** | .NET Standard 2.1 | Mặc định |

(Khớp tab **Android** trong [Player Settings](../project-settings/player.md).)

### APK vs AAB

- **APK:** cài trực tiếp lên máy/test, hoặc store ngoài Google Play.
- **AAB (Android App Bundle):** định dạng **Google Play yêu cầu** — Play tự tạo APK tối ưu theo thiết bị (nhỏ hơn khi tải).
- Bật **Build App Bundle (Google Play)** trong Build Profiles để xuất `.aab`.

### Keystore (ký app)

- Cần **keystore** để ký build phát hành: `Player > Publishing Settings > Keystore Manager`.
- **Giữ keystore + mật khẩu an toàn** — mất là không update được app trên Play.

!!! warning "Cần verify"
    Đường dẫn chính xác **Publishing Settings / Keystore Manager** và mục **Minimum API Level / Target API Level** trong Player (Android) 6.3 nên đối chiếu trực tiếp Editor khi chụp screenshot.

## :material-apple-ios: iOS

- Cần **macOS + Xcode + tài khoản Apple Developer**.
- Unity **không** xuất `.ipa` trực tiếp — nó xuất **Xcode project**; mở bằng Xcode để build, ký, archive.
- **IL2CPP + ARM64** (mặc định iOS).
- Cấu hình **Signing Team / Bundle Identifier** trong Xcode (hoặc Player Settings).

## :material-tape-measure: Giảm size & RAM mobile

- **Texture:** ASTC + Max Size thấp ([Textures](../assets/textures.md)) — thường là phần lớn size.
- **Audio:** nén hợp lý ([Audio](../assets/audio.md)).
- **Mesh:** compression, Read/Write Off ([Meshes](../assets/meshes-models.md)).
- **Strip Engine Code** + Managed Stripping.
- Kiểm **Build Report / Editor.log** để biết asset nào chiếm size.

## :material-flash: Checklist mobile

- [ ] IL2CPP + ARM64.
- [ ] Strip Engine Code + Managed Stripping Minimal/Low.
- [ ] Quality/URP Asset đúng tier mobile ([Quality](../project-settings/quality.md)).
- [ ] Texture ASTC, audio nén, mesh tối ưu.
- [ ] Android: keystore sẵn sàng; AAB cho Play.
- [ ] iOS: Bundle ID + Signing Team trong Xcode.
- [ ] **Profile trên máy thật** với Development Build ([Profiling](../profiling/tools.md)).

## :material-link-variant: Nguồn

- [Android build settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/android-BuildProcess.html)
- [iOS build settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/iphone-BuildProcess.html)
- [Reducing the file size of your build — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/ReducingFilesize.html)
