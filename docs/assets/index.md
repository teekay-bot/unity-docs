# Assets — Overview

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Nhóm này về **import settings** — cách Unity nén/đóng gói tài nguyên ảnh hưởng trực tiếp tới **dung lượng build**, **RAM** và **hiệu năng**.

!!! abstract "TL;DR"
    - **[Textures](textures.md):** nén theo platform — **BC7/DXT (PC)** vs **ASTC (mobile)**, Max Size, mipmaps.
    - **[Audio](audio.md):** Load Type + Compression Format theo độ dài clip (SFX vs nhạc nền).
    - **[Sprites & Atlases](sprites-atlases.md):** gom sprite 2D vào **Sprite Atlas** → ít draw call.
    - **[Meshes & Models](meshes-models.md):** Mesh Compression, tắt **Read/Write**, Optimize, LOD.
    - **Nguyên tắc chung:** import settings tối ưu thường tiết kiệm nhiều hơn cả tối ưu code.

## :material-folder-multiple-image: Các trang

<div class="grid cards" markdown>

-   :material-image-size-select-large: __[Textures](textures.md)__

    ---

    Nén theo platform (BC7/ASTC), Max Size, mipmaps, sRGB vs linear.

-   :material-volume-high: __[Audio](audio.md)__

    ---

    Load Type, Compression Format (Vorbis/ADPCM/PCM), Force To Mono.

-   :material-grid: __[Sprites & Atlases](sprites-atlases.md)__

    ---

    Sprite import 2D, Sprite Atlas, Pixels Per Unit, pixel-art Point filter.

-   :material-cube-outline: __[Meshes & Models](meshes-models.md)__

    ---

    Mesh Compression, Read/Write Enabled, Optimize Mesh, LOD, collider.

</div>

## :material-lightbulb-on: Vì sao import settings quan trọng

- **Dung lượng build:** texture chiếm phần lớn size game mobile — nén đúng giảm cả trăm MB.
- **RAM runtime:** texture/audio không nén ăn RAM gấp nhiều lần.
- **Per-platform overrides:** một asset, nhiều cấu hình — PC nét, mobile nhẹ (xem từng trang).
