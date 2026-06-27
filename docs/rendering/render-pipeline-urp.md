# Render Pipeline (URP)

> **Target: Unity 6.3 LTS (6000.3)** · URP 17.x. Project này dùng **URP cho cả 2D lẫn 3D** — không dùng Built-in. Mọi field đã verify với [URP Asset reference 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/universalrp-asset.html).

URP điều khiển rendering qua **2 asset chính**:

1. **URP Asset** (Universal Render Pipeline Asset) — chất lượng/feature toàn pipeline (HDR, MSAA, Render Scale, Lighting, Shadows…). Có thể có **nhiều URP Asset cho từng Quality level**.
2. **Renderer** — *cách* vẽ frame. 3D dùng **Universal Renderer** (Forward / Forward+ / Deferred); 2D dùng **2D Renderer**.

## Setup & gán asset

- **Gán pipeline mặc định:** `Edit > Project Settings > Graphics` → mục **Scriptable Render Pipeline Settings** → chọn URP Asset.
- **Gán theo Quality level:** `Edit > Project Settings > Quality` → field **Render Pipeline** của mỗi level (xem [Quality](../project-settings/quality.md)). Cho phép mỗi level (Low/High…) một URP Asset khác nhau.
- **Tạo asset:** chuột phải trong Project → `Create > Rendering > URP Asset (with Universal Renderer)` cho 3D, hoặc bản 2D Renderer cho 2D.

!!! warning "Cần verify"
    Tên menu `Create > Rendering > …` và bước tạo **2D Renderer** trong 6.3 cần kiểm tra lại trực tiếp trong Editor (Unity hay đổi nhãn menu Create giữa các version). Nếu dùng template **2D (URP)** hoặc **3D (URP)** khi tạo project thì asset đã được tạo & gán sẵn.

## URP Asset — các nhóm setting (verified 6.3)

=== "Rendering"
    - **Depth Texture** — tạo `_CameraDepthTexture` cho mọi camera.
    - **Opaque Texture** — snapshot `_CameraOpaqueTexture` trước khi vẽ transparent. **Opaque Downsampling:** None / 2x Bilinear / 4x Box / 4x Bilinear.
    - **SRP Batcher** — tăng tốc CPU rendering (nên bật).
    - **GPU Resident Drawer** (Disabled / Instanced Drawing), **GPU Occlusion Culling**, **Dynamic Batching**.
    - **Store Actions:** Auto / Discard / Store.

=== "Quality"
    - **HDR** — bật high dynamic range. **HDR Precision:** 32 bit (default) / 64 bit.
    - **Anti Aliasing (MSAA):** Disabled / 2x / 4x / 8x.
    - **Render Scale** — slider scale resolution render.
    - **Upscaling Filter:** Automatic / Bilinear / Nearest-Neighbor / **FSR 1.0** / **STP 1.0**. **FSR Sharpness:** 0.0–1.0.
    - **LOD Cross Fade** + **Dithering Type:** Bayer Matrix / Blue Noise / 2x2 Stencil.

=== "Lighting"
    - **Main Light:** Pixel Lighting / None — kèm **Cast Shadows**, **Shadow Resolution**.
    - **Additional Lights:** Per Vertex / Per Pixel / Disabled — kèm **Per Object Limit** (slider), **Shadow Atlas Resolution**.
    - **Light Probe System:** Light Probe Groups (Legacy) / **Adaptive Probe Volumes (APV)** + **Memory Budget** (Low/Med/High), **SH Bands** (L1/L2).

=== "Shadows"
    - **Max Distance** (mét), **Cascade Count** (1–4) + **Split 1/2/3**, **Last Border**.
    - **Depth Bias** / **Normal Bias** — giảm shadow acne.
    - **Soft Shadows** + **Quality:** Low (4 PCF) / **Medium (5x5 tent, default)** / High (7x7 tent).

=== "Post-processing"
    - **Grading Mode:** HDR / LDR. **LUT Size:** default **32**.
    - **Screen Space Lens Flare**, **Data Driven Lens Flare**, **Fast sRGB/Linear Conversions**.

## Universal Renderer (3D) — Rendering Path

Field **Rendering Path** (verified 6.3): **Forward**, **Forward+**, **Deferred**, **Deferred+**.

| Path | Ý tưởng | Ghi chú |
|---|---|---|
| **Forward** | Forward truyền thống, bị giới hạn số light/object | Đơn giản, nhẹ |
| **Forward+** | Forward tối ưu, xử lý **nhiều light** không vướng per-object limit | Default phổ biến ở Unity 6 |
| **Deferred / Deferred+** | Deferred cho cảnh nhiều light phức tạp | Cân nhắc bandwidth |

!!! warning "Cần verify"
    Doc URP 6.3 (Universal Renderer) **không nêu** khuyến nghị path nào cho mobile vs desktop hay ngưỡng số light cụ thể. Khuyến nghị "Forward+/Deferred cho PC, Forward/Forward+ cho mobile" bên dưới là **nguyên tắc tối ưu chung**, hãy đo thực tế (Profiler) trước khi chốt cho game của bạn.

Các setting Universal Renderer khác: **Depth Priming Mode** (Disabled/Auto/Forced), **Native RenderPass**, **Transparent Receive Shadows**, **Renderer Features** (list), **Filtering** layer masks.

## 2D vs 3D

=== "3D — Universal Renderer"
    Dùng **Universal Renderer** với Rendering Path ở trên. Lighting/Shadows theo URP Asset.

=== "2D — 2D Renderer"
    Template **Universal 2D** dùng **2D Renderer** (asset `Renderer2D`) + hệ thống **2D Lights** (không dùng rendering path 3D). Khác template 3D: 2D chỉ có **1 URP Asset** (`UniversalRP.asset`) dùng chung cho **6 quality level** (Very Low→Ultra). Verified từ `Assets/Settings/Renderer2D.asset`:

    | Field | Default (template 2D) | Ý nghĩa |
    |---|---|---|
    | **Transparency Sort Mode** | Default | Cách sắp xếp vẽ sprite trong suốt |
    | Transparency Sort Axis | (0, 1, 0) | Trục sort khi chọn Custom Axis |
    | **Light Blend Styles** | Multiply · Additive · Multiply with Mask · Additive with Mask | 4 kiểu blend cho 2D Light |
    | HDR Emulation Scale | 1 | Scale dải sáng giả lập HDR cho 2D |
    | Max Light Render Texture Count | 16 | Giới hạn render texture cho 2D Light |
    | Depth/Stencil Buffer | On | |

    > Template 2D ship sẵn package 2D: 2D Animation, Aseprite, PSD Importer, SpriteShape, Tilemap (+Extras), Sprite, Tooling. Xem [Sprites & Atlases](../assets/sprites-atlases.md).

## Recommendation theo platform

> Đây là **hướng tối ưu chung** (chưa phải default 6.3) — đo bằng [Profiler](../profiling/tools.md) cho game thật.

=== "PC"

    | Setting (URP Asset / Renderer) | Recommend (PC) | Tại sao |
    |---|---|---|
    | Rendering Path | **Forward+** (hoặc Deferred nếu rất nhiều light) | Xử lý nhiều light tốt, GPU PC kham được |
    | Render Scale | **1.0** | VRAM/GPU dư, render full res |
    | MSAA | **4x** | Cạnh mượt; chi phí chấp nhận được trên PC |
    | HDR | **On** | Màu/độ sáng tốt cho post-processing |
    | Soft Shadows | **On**, Max Distance cao, 4 Cascades | Bóng đẹp, tầm xa |
    | Additional Lights | **Per Pixel** | Chất lượng ánh sáng cao |

=== "Mobile"

    | Setting (URP Asset / Renderer) | Recommend (Mobile) | Tại sao |
    |---|---|---|
    | Rendering Path | **Forward** / **Forward+** | Tile-based GPU; tránh Deferred tốn bandwidth (đo lại) |
    | Render Scale | **≤ 1.0** (vd 0.8) + **FSR/STP** upscaling | Giảm pixel phải vẽ → nhẹ fillrate, FSR bù nét |
    | MSAA | **2x** (hoặc Off) | MSAA tốn bandwidth trên mobile |
    | HDR | **Off** (hoặc cân nhắc) | Tiết kiệm bandwidth/bộ nhớ |
    | Depth/Opaque Texture | **Tắt** nếu shader không cần | Mỗi texture = thêm bandwidth |
    | Soft Shadows | **Off/Low**, Max Distance ngắn, **≤ 2 Cascades** | Shadow rất tốn trên mobile |
    | Additional Lights | **Per Vertex** / giới hạn Per Object Limit | Giảm chi phí lighting |

    **Why (Mobile):** GPU tile-based giới hạn bởi **bandwidth, fillrate, thermal & pin** → cắt Render Scale, MSAA, HDR, opaque/depth texture, soft shadow.

## Nguồn (official)

- [URP Asset reference — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/universalrp-asset.html)
- [Universal Renderer asset reference — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/urp-universal-renderer.html)
- [URP reference landing — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/urp-reference-landing.html)
- [Upgrading from Built-in to URP — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/upgrading-from-birp.html)
