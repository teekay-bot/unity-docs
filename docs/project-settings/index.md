# Project Settings — Overview

> **Target: Unity 6.3 LTS (6000.3)** · URP only. `Edit > Project Settings` — cấu hình toàn project. Trang này dẫn vào từng nhóm.

!!! abstract "TL;DR"
    Nhóm quan trọng cho tối ưu: **Quality** (per-platform/tiered + URP Asset), **Player** (color space, scripting backend), **Graphics & Render Pipeline** (gán URP, batching), **Physics** (3D/2D), **Time** (fixed timestep).

## :material-tune: Các nhóm

<div class="grid cards" markdown>

-   :material-quality-high: __[Quality](quality.md)__

    ---

    Mobile/PC vs tiered, URP Asset per level, VSync, LOD, mipmap streaming.

-   :material-account-cog: __[Player](player.md)__

    ---

    Color space (Linear), scripting backend (IL2CPP/Mono), API level, icon, company name.

-   :material-palette: __[Graphics & Render Pipeline](graphics-render-pipeline.md)__

    ---

    Gán URP Asset mặc định, batching, shader stripping.

-   :material-atom: __[Physics](physics.md)__

    ---

    3D (DynamicsManager) + 2D (Box2D) — gravity, solver, collision callbacks.

-   :material-clock-outline: __[Time](time.md)__

    ---

    Fixed timestep (nhịp physics), maximum allowed timestep, time scale.

</div>
