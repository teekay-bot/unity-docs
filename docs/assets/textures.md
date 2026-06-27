# Textures

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Cấu hình ở **Inspector của file ảnh** (chọn texture trong Project). Texture thường là phần **nặng nhất** của build & RAM.

!!! abstract "TL;DR"
    - **Texture Type** quyết định cách dùng: `Default` (3D), `Sprite (2D and UI)` (2D), `Normal map`…
    - **Nén theo platform** (tab override): **BC7 / DXT** cho **PC**, **ASTC** cho **mobile**.
    - **Max Size** giới hạn độ phân giải — hạ trên mobile để tiết kiệm RAM/băng thông.
    - **Mipmaps:** bật cho 3D (object xa), **tắt** cho sprite/UI 2D.
    - **sRGB:** bật cho ảnh màu (albedo); **tắt** cho data map (normal, mask, roughness).

## :material-cog: Các field chính

| Field | Ý nghĩa | Gợi ý |
|---|---|---|
| **Texture Type** | Cách Unity diễn giải ảnh | `Default` (3D), `Sprite (2D and UI)` (2D), `Normal map` |
| **sRGB (Color Texture)** | Ảnh ở không gian màu gamma | **On** cho albedo/ảnh màu; **Off** cho normal/mask/data |
| **Generate Mipmaps** | Tạo bản thu nhỏ cho object xa | **On** cho 3D; **Off** cho UI/sprite 2D |
| **Max Size** | Trần độ phân giải | Hạ xuống (1024/512) trên mobile |
| **Compression** | Mức nén (None/Low/Normal/High) | `Normal` mặc định; cân nét vs size |
| **Use Crunch Compression** | Nén thêm trên đĩa (build nhỏ hơn) | Tốt để giảm size; tốn thời gian import |

!!! warning "Cần verify"
    Tên/nhãn chính xác của vài field trong Inspector 6.3 (vd nhóm **Advanced**, vị trí **Crunch**) nên đối chiếu trực tiếp Editor khi chụp screenshot.

## :material-tune-variant: Nén theo platform (override)

Trong Inspector texture có hàng tab platform: **Default**, **PC/Standalone**, **Android**, **iOS**… Tick **Override for \<platform\>** để đặt riêng format.

=== "PC / Standalone"
    - Format khuyến nghị: **BC7** (chất lượng cao, RGBA) hoặc **DXT1/DXT5 (BC1/BC3)** khi cần nhẹ.
    - **BC5** cho normal map (2 kênh, nét).
    - Max Size thoải mái (2048+).

=== "Mobile (Android/iOS)"
    - Format khuyến nghị: **ASTC** (linh hoạt block size — `ASTC 6x6`/`8x8` cân nét/size).
    - Block lớn hơn = nén mạnh hơn, nhẹ hơn, kém nét hơn.
    - Hạ **Max Size** (1024/512), bật **Crunch** để giảm size tải về.

!!! tip "Quy tắc nhanh"
    Albedo màu → **BC7 (PC) / ASTC (mobile)** + sRGB On. Normal map → **BC5 (PC) / ASTC** + sRGB Off. Data/mask → sRGB Off.

## :material-image-multiple: Mipmaps

- **Mipmap** = chuỗi bản thu nhỏ; GPU chọn mức theo khoảng cách → **giảm aliasing & tiết kiệm băng thông** cho object xa.
- **Bật** cho texture 3D world.
- **Tắt** cho **sprite 2D / UI** (luôn hiển thị 1:1, mipmap chỉ phí RAM +33% và làm mờ).

!!! note "📸 Screenshot cần chụp"
    Inspector của một texture với hàng tab **platform override** (thấy Max Size + Format BC7/ASTC). → `texture-import.png`

## :material-flash: Checklist tối ưu

- [ ] Texture Type đúng (Sprite cho 2D, Default cho 3D, Normal map cho normal).
- [ ] sRGB: On cho ảnh màu, Off cho data map.
- [ ] Mipmaps: On (3D) / Off (UI-sprite).
- [ ] Override mobile: ASTC + Max Size thấp hơn PC.
- [ ] Cân nhắc Crunch để giảm dung lượng build.
- [ ] **Power-of-two** size để nén tốt nhất.

## :material-link-variant: Nguồn

- [Texture import settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-TextureImporter.html)
- [Recommended texture compression formats by platform](https://docs.unity3d.com/6000.3/Documentation/Manual/texture-compression-formats.html)
