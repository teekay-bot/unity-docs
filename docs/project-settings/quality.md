# Quality Settings

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Default value trên trang này **verified trực tiếp từ template Universal 3D** (`6000.3.10f1`, file `ProjectSettings/QualitySettings.asset` + `Assets/Settings/*_RPAsset.asset`). Field/menu path verify với [Quality Settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-QualitySettings.html).

## Mở ở đâu

**Menu path:** `Edit > Project Settings > Quality`

!!! info "Mới ở Unity 6.3"
    Đổi nhanh Quality level ngay trên **Editor toolbar**, không cần mở Project Settings. (Nguồn: [What's New in Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html).)

## 2 quality level mặc định: **Mobile** & **PC**

Template **Universal 3D / Universal 2D** tạo sẵn đúng **2 quality level**, mỗi level trỏ tới một URP Asset riêng qua field **Render Pipeline**:

| Quality level | Render Pipeline asset | Mặc định cho platform |
|---|---|---|
| **Mobile** (index 0) | `Mobile_RPAsset` | Android, iOS, WebGL… |
| **PC** (index 1) | `PC_RPAsset` | Standalone (Win/Mac/Linux), consoles |

> Verified: `m_PerPlatformDefaultQuality` (Android→Mobile, Standalone→PC). Mỗi level `excludedTargetPlatforms` loại nền không liên quan.

!!! note "URP điều khiển phần lớn rendering"
    Trong cửa sổ Quality, các field **Anti Aliasing (MSAA), Shadows, Soft Particles, Pixel Light Count** thực tế bị URP "vô hiệu" — cấu hình thật nằm trong **URP Asset** (xem bảng URP Asset bên dưới và [Render Pipeline (URP)](../rendering/render-pipeline-urp.md)). Đó là lý do `antiAliasing` = **0 (Disabled)** ở cả 2 level trong template.

## Default value — Quality window (verified)

Các field **còn thực sự tác dụng dưới URP** (verified từ template):

| Field | Mobile | PC | Ghi chú |
|---|---|---|---|
| VSync Count | **Don't Sync** (0) | **Don't Sync** (0) | Cả 2 = 0 |
| Anisotropic Textures | **Per Texture** (1) | **Forced On** (2) | |
| Global Mipmap Limit | 0 (Full Res) | 0 (Full Res) | |
| Mipmap Streaming | **Off** | **Off** | Budget 512 MB, 512 renderers/frame, max reduction 2, 1024 IO khi bật |
| LOD Bias | **1** | **2** | PC giữ LOD cao xa hơn |
| Maximum LOD Level | 0 | 0 | |
| LOD Cross Fade | On (1) | On (1) | |
| Particle Raycast Budget | 256 | 256 | |
| Async Upload Time Slice / Buffer | 2 ms / 16 MB | 2 ms / 16 MB | Persistent Buffer: On |
| Skin Weights | **2 Bones** | **4 Bones** | |
| Realtime Reflection Probes | Off | Off | |
| Realtime GI CPU Usage | 100 (Unlimited) | 100 (Unlimited) | |
| Anti Aliasing (MSAA) | Disabled (0)\* | Disabled (0)\* | \*thực tế dùng URP Asset |

## Default value — URP Asset (verified)

Đây mới là nơi quyết định rendering. Verified từ `Mobile_RPAsset` / `PC_RPAsset`:

| URP Asset field | Mobile_RPAsset | PC_RPAsset |
|---|---|---|
| **MSAA** | Disabled | Disabled |
| **Render Scale** | **0.8** | **1.0** |
| HDR | On (32-bit) | On (32-bit) |
| Upscaling Filter | Automatic | Automatic |
| Depth Texture | **Off** | **On** |
| Main Light | Per Pixel, shadows on | Per Pixel, shadows on |
| Main Light Shadow Resolution | **1024** | **2048** |
| Additional Lights | Per Pixel, Per Object Limit 4 | Per Pixel, Per Object Limit 4 |
| Shadow Max Distance | 50 | 50 |
| **Shadow Cascades** | **1** | **4** |
| **Soft Shadows** | **Off** | **On** (High) |
| Color Grading | LDR, LUT 32 | LDR, LUT 32 |

> Field path: `URP Asset > Quality` (HDR, MSAA, Render Scale), `> Lighting` (Main/Additional Lights), `> Shadows` (Max Distance, Cascades, Soft Shadows). Chi tiết: [Render Pipeline (URP)](../rendering/render-pipeline-urp.md).

## Đọc bảng trên thế nào (PC vs Mobile)

> Unity đã tune sẵn 2 preset hợp lý. Hiểu **tại sao** để biết khi nào nên đổi.

=== "PC"

    Template để PC "ăn chắc chất lượng":

    - **Render Scale 1.0** — render full res, GPU desktop dư.
    - **Shadow Cascades 4 + Soft Shadows On + shadowmap 2048** — bóng đẹp, tầm xa.
    - **Anisotropic Forced On**, **LOD Bias 2** (giữ mesh nét xa hơn), **Skin Weights 4**.
    - **Depth Texture On** — nhiều effect (SSAO…) cần.

    **Có thể đổi:** muốn cạnh mượt hơn → bật **MSAA 2x/4x** trong `PC_RPAsset > Quality` (template để Disabled). Muốn tránh tearing → VSync **Every V Blank** (template để Don't Sync, hợp cho game cap fps).

=== "Mobile"

    Template cắt giảm cho tile-based GPU / nhiệt / pin:

    - **Render Scale 0.8** — render ~64% số pixel rồi upscale → nhẹ fillrate (đòn bẩy lớn nhất trên mobile).
    - **Shadow Cascades 1 + Soft Shadows Off + shadowmap 1024** — shadow rẻ.
    - **Depth Texture Off** — tiết kiệm bandwidth (bật lại nếu shader cần).
    - **Anisotropic Per Texture** (không Forced), **LOD Bias 1** (xuống LOD thấp sớm), **Skin Weights 2**.

    **Có thể đổi:** kiểm soát fps bằng `Application.targetFrameRate` thay vì VSync. Nếu vẫn nặng → hạ Render Scale tiếp (0.7) hoặc bật **FSR 1.0** ở Upscaling Filter.

!!! tip "Đòn bẩy tối ưu mobile theo thứ tự"
    1) **Render Scale** ↓ · 2) **Shadow** (cascades/distance/soft off) · 3) **Depth/Opaque Texture** off · 4) **MSAA** off · 5) Additional Lights Per Vertex / giảm Per Object Limit.

## Code: set runtime theo platform

=== "PC"
    ```csharp
    QualitySettings.vSyncCount = 1;          // Every V Blank (tránh tearing)
    ```

=== "Mobile"
    ```csharp
    Application.targetFrameRate = 60;        // hoặc 30 để tiết kiệm pin
    QualitySettings.vSyncCount = 0;          // Don't Sync — control fps bằng targetFrameRate
    ```

## Nguồn

- **Verified từ project thật:** template **Universal 3D** `6000.3.10f1` — `ProjectSettings/QualitySettings.asset`, `Assets/Settings/PC_RPAsset.asset`, `Assets/Settings/Mobile_RPAsset.asset`.
- [Quality Settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-QualitySettings.html)
- [URP Asset reference — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/universalrp-asset.html)
- [What's New in Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html)
