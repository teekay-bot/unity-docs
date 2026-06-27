# Rendering — Overview

> **Target: Unity 6.3 LTS (6000.3)** · URP only (2D & 3D). Nhóm này về cách Unity vẽ frame và cách tối ưu.

!!! abstract "TL;DR"
    - **[Render Pipeline (URP)](render-pipeline-urp.md):** xương sống — URP Asset + Renderer.
    - **[Draw Calls & Batching](draw-calls-batching.md):** giảm số lệnh vẽ (SRP Batcher, instancing, atlas).
    - **[Lighting](lighting.md):** GPU lightmapper (mới 6.3), Adaptive Probe Volumes, baked cho mobile.
    - **[Post-processing](post-processing.md):** Volume system; Bloom Kawase/Dual (mới 6.3, nhẹ mobile).

## :material-tune: Các trang

<div class="grid cards" markdown>

-   :material-cube-scan: __[Render Pipeline (URP)](render-pipeline-urp.md)__

    ---

    URP Asset + Renderer (3D Universal / 2D Renderer), rendering path, setup.

-   :material-layers-triple: __[Draw Calls & Batching](draw-calls-batching.md)__

    ---

    SRP Batcher, GPU Instancing, static/dynamic batching, atlas — giảm draw call.

-   :material-lightbulb-on: __[Lighting](lighting.md)__

    ---

    GPU Lightmapper (mới 6.3), Adaptive Probe Volumes, realtime vs baked.

-   :material-image-filter-vintage: __[Post-processing](post-processing.md)__

    ---

    Volume framework, Bloom (Kawase/Dual filtering), tối ưu post cho mobile.

</div>
