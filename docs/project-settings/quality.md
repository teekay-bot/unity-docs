# Quality Settings

> **Target: Unity 6.3 LTS (6000.3).** Trang này tổng hợp Quality settings và recommendation cho **PC** vs **Mobile**. Mọi menu path & property đã verify với [Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-QualitySettings.html).

## Mở ở đâu

**Menu path:** `Edit > Project Settings > Quality`

!!! info "Mới ở Unity 6.3"
    Bạn có thể **đổi nhanh Quality level ngay trên Editor toolbar**, không cần mở Project Settings. (Nguồn: [What's New in Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html).)

!!! note "Project này dùng URP — không dùng Built-in"
    Toàn bộ docs giả định **URP (Universal Render Pipeline)**, hiện tại lẫn tương lai. Mọi hướng dẫn bỏ qua Built-in Render Pipeline.

## ⚠️ Đọc trước: với URP, phần lớn setting rendering nằm ở URP Asset

Trong Unity 6.3 với **URP**, **mỗi Quality level trỏ tới một URP Render Pipeline Asset** qua field **Render Pipeline**. Vì vậy phần lớn setting rendering KHÔNG nằm trong cửa sổ Quality mà do **URP Asset** (và URP Renderer / Camera) điều khiển — xem [Render Pipeline (URP)](../rendering/render-pipeline-urp.md).

Các property sau Unity đánh dấu "Built-in only" → **với project URP của chúng ta, cấu hình chúng trong URP Asset, không phải cửa sổ Quality:**

- **Anti Aliasing (MSAA)** → URP Asset › *Quality* (+ MSAA per-Camera)
- **Soft Particles** → URP Asset
- **Shadows, Shadow Resolution, Shadow Distance, Cascades** → URP Asset › *Shadows*
- **LOD Cross Fade** → URP Asset

> Nguồn: [Quality Settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-QualitySettings.html); [URP Asset reference](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest).

!!! warning "Cần verify"
    Vị trí/tên field chính xác trong **URP Asset 6.3** (URP 17.x) cho từng setting trên cần đối chiếu trực tiếp [URP Asset reference](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest) khi viết trang URP. Trang này chỉ liệt kê những gì còn thực sự nằm trong cửa sổ Quality.

## Các setting (theo nhóm, manual 6.3)

| Nhóm | Setting | Options / Default (verify ở 6.3) |
|---|---|---|
| **Rendering** | Render Pipeline | URP Asset cho quality level đó (project luôn gán URP Asset) |
| | Pixel Light Count | *(Built-in)* — với URP, lighting do URP Asset/Renderer quản → **URP Asset** |
| | Anti Aliasing (MSAA) | *(Built-in)* → **URP Asset** (+ MSAA per-Camera) |
| | Realtime Reflection Probes | On/Off |
| | Resolution Scaling Fixed DPI Factor | Hệ số scale resolution (mobile) |
| | VSync Count | Don't Sync / Every V Blank / Every Second V Blank |
| | Realtime GI CPU Usage | Low / Medium / High / Unlimited |
| **Textures** | Global Mipmap Limit | 0–3 (0 = full res, 3 = 1/8 res) |
| | Mipmap Limit Groups | Custom group: offset hoặc override |
| | Anisotropic Textures | Disabled / Per Texture / Forced On |
| | Mipmap Streaming | Memory Budget **512 MB**, Renderers Per Frame **512**, Max Level Reduction **2**, Max IO Requests **1024** |
| **Particles** | Soft Particles | *(Built-in)* → **URP Asset** |
| | Particle Raycast Budget | Số raycast tối đa cho particle collision |
| **Shadows** | Shadows / Resolution / Distance / Cascades | *(Built-in)* → **URP Asset › Shadows** |
| **Async Asset Upload** | Time Slice / Buffer Size / Persistent Buffer | ms/frame; MB; giữ buffer khi queue rỗng |
| **Level of Detail** | LOD Bias | <1 ưu tiên LOD thấp sớm; >1 giữ LOD cao lâu hơn |
| | Maximum LOD Level | LOD thấp nhất project dùng |
| | Mesh LOD Threshold | Ảnh hưởng đánh giá chọn LOD |
| | LOD Cross Fade | *(Built-in)* → **URP Asset** |
| **Meshes** | Skin Weights | Số bone ảnh hưởng 1 vertex khi animation |

!!! warning "Cần verify"
    **Default value theo từng quality level** (vd VSync hay Anti Aliasing mặc định ở level "High") thay đổi tùy preset và **không** được manual liệt kê thành con số cụ thể. Các giá trị in đậm ở trên (Mipmap Streaming) là default được manual ghi rõ; phần còn lại cần kiểm tra trực tiếp trong Editor 6.3 trước khi chốt con số.

!!! warning "Cần verify"
    Tên các **default quality level preset** trong project mới của 6.3 (vd "Performant / Balanced / High Fidelity" hay "Very Low → Ultra") chưa xác nhận được từ manual. Đừng ghi tên cụ thể cho tới khi mở Editor 6.3 kiểm tra.

## Recommendation theo platform

> Ý tưởng chung: **Mobile** ưu tiên thermal/battery/fillrate → cắt giảm mạnh; **PC** có ngân sách GPU lớn hơn → ưu tiên chất lượng hình ảnh. Với URP, đa số các mục dưới đây thực chất chỉnh trong **URP Asset** của quality level tương ứng.

=== "PC"

    | Setting | Default | Recommend (PC) | Tại sao |
    |---|---|---|---|
    | VSync Count | *(verify)* | **Every V Blank** | PC desktop thường muốn tránh tearing; GPU đủ khỏe giữ 60fps. Nếu cần latency thấp (game competitive) → Don't Sync + cap fps. |
    | Anti Aliasing (URP: MSAA trong Asset) | *(verify)* | **4x MSAA** | GPU PC kham được; cạnh mượt rõ rệt. 8x nếu dư GPU. |
    | Global Mipmap Limit | 0 | **0 (full res)** | VRAM PC dư, giữ texture full resolution. |
    | Anisotropic Textures | *(verify)* | **Per Texture** hoặc Forced On | Texture góc nghiêng (sàn/đường) nét hơn; chi phí nhỏ trên PC. |
    | Shadows (URP: trong Asset) | *(verify)* | **Hard and Soft**, distance cao | Bóng mềm + tầm xa → chất lượng cảnh tốt. |
    | LOD Bias | *(verify)* | **≥ 1.5** | Giữ mesh chất lượng cao xa hơn; PC kham được poly count. |

    **Why tổng quát (PC):** ngân sách nhiệt/điện không phải ràng buộc chính, bottleneck thường là GPU fill/poly — nên đầu tư vào AA, shadow, texture res, LOD distance để hình đẹp.

=== "Mobile"

    | Setting | Default | Recommend (Mobile) | Tại sao |
    |---|---|---|---|
    | VSync Count | *(verify)* | **Don't Sync** + `Application.targetFrameRate = 60` (hoặc 30) | Trên mobile, điều khiển fps bằng `targetFrameRate` để giữ ổn định nhiệt/pin; VSync mobile hành xử khác desktop. |
    | Anti Aliasing (URP: MSAA trong Asset) | *(verify)* | **2x MSAA** (hoặc Off nếu nặng) | MSAA tốn bandwidth/fillrate trên tile-based GPU; 2x là cân bằng. |
    | Global Mipmap Limit | 0 | **0**, nhưng siết import (ASTC) | Quản lý VRAM ở khâu [Textures](../assets/textures.md) (ASTC) thay vì hạ mipmap toàn cục. |
    | Anisotropic Textures | *(verify)* | **Disabled** / Per Texture (hạn chế) | Aniso tốn bandwidth; mobile nên tắt hoặc chỉ bật cho vài texture sàn. |
    | Shadows (URP: trong Asset) | *(verify)* | **Hard only**, shadow distance ngắn, **Two Cascades** | Bóng mềm + cascade nhiều rất tốn trên mobile; rút distance để tiết kiệm. |
    | LOD Bias | *(verify)* | **≤ 1.0** | Chuyển sang LOD thấp sớm hơn → giảm poly, nhẹ GPU. |
    | Particle Raycast Budget | *(verify)* | **Thấp** | Giảm chi phí particle collision. |

    **Why tổng quát (Mobile):** GPU tile-based, bị giới hạn bởi **bandwidth, fillrate, thermal throttling và pin**. Mọi thứ tốn bandwidth (MSAA, aniso, soft shadow, overdraw) đều phải cân nhắc. Kiểm soát fps bằng `targetFrameRate` thay vì dựa VSync.

!!! warning "Cần verify"
    Các con số recommend ở trên là **hướng tối ưu chung**, chưa phải giá trị "default của 6.3". Trước khi coi là chuẩn: (1) mở `Edit > Project Settings > Quality` trong Unity 6.3 để đọc default thực tế, (2) mở **URP Asset** tương ứng của từng quality level để chỉnh AA / Shadows / Render Scale.

## Code: set runtime theo platform

=== "PC"
    ```csharp
    QualitySettings.vSyncCount = 1;          // Every V Blank
    ```

=== "Mobile"
    ```csharp
    Application.targetFrameRate = 60;        // hoặc 30 để tiết kiệm pin
    QualitySettings.vSyncCount = 0;          // Don't Sync — control fps bằng targetFrameRate
    ```

## Nguồn (official)

- [Quality Settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-QualitySettings.html)
- [What's New in Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html)
- [Universal Render Pipeline (URP) docs](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest) — cho các setting AA/Shadows/Render Scale khi dùng URP
