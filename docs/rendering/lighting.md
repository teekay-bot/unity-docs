# Lighting

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Menu: `Window > Rendering > Lighting`.

!!! abstract "TL;DR"
    - **Mới ở 6.3:** **Progressive GPU** Lightmapper là back-end bake **mặc định** cho project mới — bake nhanh hơn.
    - **Baked lighting** cho mobile (rẻ); hạn chế realtime light.
    - **Adaptive Probe Volumes (APV)** cho GI gián tiếp (xem [URP Asset › Lighting](render-pipeline-urp.md)).
    - Shadow/light thật sự cấu hình ở **URP Asset** ([Render Pipeline](render-pipeline-urp.md)).

## :material-lightbulb-on: Lightmapping (baked)

- **Lightmapper:** **Progressive GPU** là back-end bake mặc định ở 6.3 (nhanh hơn Progressive CPU). (Nguồn: [What's New 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html).)
- Bake ánh sáng tĩnh vào lightmap → runtime rẻ. Lý tưởng cho **mobile** và ánh sáng không đổi.

![Window > Rendering > Lighting — tab Scene, Lightmapper = Progressive GPU, Lighting Mode Shadowmask, Lightmap Packing = Auto, GPU Baking Device hiển thị.](../assets/screenshots/lighting-window.png){ width="420" }

!!! note "Để ý trong ảnh (click để phóng to)"
    **Lightmapper = Progressive GPU** (mặc định 6.3), **Lighting Mode = Shadowmask**, **Lightmap Packing = Auto**, *Direct/Indirect/Environment Samples* = 32/512/256, *Max Bounces* = 2, *Lightmap Compression* = High Quality. Mục **GPU Baking Device** chọn card bake — xác nhận đang dùng GPU.

## :material-cube-outline: Realtime vs Baked vs Mixed

| Loại | Chi phí runtime | Dùng khi |
|---|---|---|
| **Baked** | Rẻ nhất | Ánh sáng tĩnh, mobile |
| **Mixed** | Trung bình | Vài đèn động + bóng baked |
| **Realtime** | Đắt | Đèn/bóng động thật sự cần |

- **Light Mode** đặt trên từng Light component.
- **Adaptive Probe Volumes (APV):** hệ GI probe mới (cấu hình ở URP Asset › Lighting) — GI gián tiếp mượt hơn Light Probe Groups cũ.

## :material-flash: Tối ưu theo platform

=== "PC"
    - Có thể dùng nhiều realtime light + soft shadow (xem URP Asset).
    - GPU Lightmapper bake nhanh khi iterate.

=== "Mobile"
    - **Ưu tiên Baked** — giảm tối đa realtime light (mỗi đèn realtime = thêm pass/chi phí).
    - **Additional Lights** để Per Vertex hoặc giới hạn Per Object Limit (URP Asset).
    - Shadow distance ngắn, ít cascade ([Quality](../project-settings/quality.md) / URP Asset).
    - Tránh realtime shadow từ nhiều đèn.

## :material-link-variant: Nguồn

- [What's New in Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html)
- [Lighting — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/LightingOverview.html)
