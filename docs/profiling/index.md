# Profiling — Overview

> **Target: Unity 6.3 LTS (6000.3)** · URP only. **Đo trước, tối ưu sau.** Profiler cho biết hot path thật ở đâu — đừng đoán.

!!! abstract "TL;DR"
    - **Đo trên thiết bị thật** với **Development Build** — editor không đại diện hiệu năng mobile.
    - **[Tools](tools.md):** Profiler window, Frame Debugger, Memory Profiler, Profile Analyzer.
    - Tìm **CPU-bound hay GPU-bound** trước, rồi đào vào đúng chỗ.
    - Soi **GC Alloc** (xem [Caching & GC](../scripting/caching-gc.md)) và **draw call** (xem [Draw Calls](../rendering/draw-calls-batching.md)).

## :material-speedometer: Quy trình

1. **Đặt mục tiêu fps** (vd 60 trên PC, 30/60 trên mobile) → suy ra **frame budget** (60fps = 16.6 ms/frame).
2. **Development Build** trên **thiết bị thật**, kết nối Profiler.
3. Xem frame vượt budget: **CPU hay GPU** giới hạn?
4. Đào vào module tương ứng (CPU script/physics, Rendering, Memory).
5. Sửa **một** thứ → đo lại → so sánh. Đừng đổi nhiều thứ cùng lúc.

## :material-tools: Trang

<div class="grid cards" markdown>

-   :material-chart-timeline: __[Tools](tools.md)__

    ---

    Profiler window, Frame Debugger, Memory Profiler, Rendering Statistics.

</div>

## :material-target: CPU-bound vs GPU-bound

| Triệu chứng | Khả năng | Hướng xử lý |
|---|---|---|
| CPU main thread cao, GPU rảnh | **CPU-bound** | Script, physics, GC, draw call submit |
| GPU cao, CPU chờ | **GPU-bound** | Overdraw, fillrate, shader, độ phân giải, post |
| Cả hai thấp nhưng fps thấp | VSync / giới hạn frame | Kiểm [Quality](../project-settings/quality.md) VSync, target frame rate |

!!! tip "16.6 ms cho 60fps"
    60fps = 16.6 ms/frame, 30fps = 33.3 ms. Đặt mốc ms cho từng hệ (script, render, physics) để biết cái nào ăn budget.
