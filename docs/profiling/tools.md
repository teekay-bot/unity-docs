# Profiling Tools

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Bộ công cụ đo hiệu năng trong Unity. Mở Profiler: `Window > Analysis > Profiler` (`Ctrl+7`).

!!! abstract "TL;DR"
    - **Profiler** (`Window > Analysis > Profiler`): timeline CPU/GPU/Memory/Rendering theo frame.
    - **Frame Debugger** (`Window > Analysis > Frame Debugger`): từng draw call, vì sao không batch.
    - **Memory Profiler** (package): snapshot RAM chi tiết — tìm rò rỉ, asset trùng.
    - **Rendering Statistics** (Game view `Stats`): Batches/SetPass/Tris nhanh gọn.
    - Luôn đo bằng **Development Build trên thiết bị thật**.

## :material-chart-timeline-variant: Profiler window

- Mở: `Window > Analysis > Profiler` (`Ctrl+7`).
- Các **module**: CPU Usage, GPU Usage, Rendering, Memory, Physics, Audio…
- **CPU Usage → Timeline** view: thấy từng function tốn bao nhiêu ms trong frame.
- Cột **GC Alloc**: phát hiện cấp phát rác mỗi frame (mục tiêu 0 ở hot path — xem [Caching & GC](../scripting/caching-gc.md)).
- Kết nối thiết bị: chọn target ở thanh trên (Editor / Play / **thiết bị Android-iOS qua Development Build**).

!!! warning "Cần verify"
    Tên/đường dẫn module & nút trong Profiler 6.3 (vd vị trí dropdown target, **Deep Profile**) nên đối chiếu trực tiếp Editor khi chụp screenshot.

!!! note "📸 Screenshot cần chụp"
    `Window > Analysis > Profiler` — CPU Usage Timeline của 1 frame (thấy các module + GC Alloc). → `profiler-window.png`

### Deep Profile

- Bật **Deep Profile** để đo **mọi** lời gọi hàm (không chỉ những mốc Unity đặt sẵn).
- Cho chi tiết sâu nhưng **làm chậm** đáng kể → dùng để đào sâu, không phải đo số tổng.

## :material-image-search: Frame Debugger

- Mở: `Window > Analysis > Frame Debugger`, bấm **Enable**.
- Tua **từng draw call** để xem GPU dựng frame ra sao.
- Biết **vì sao 2 draw không batch** (khác material/keyword/state…).
- Dùng cùng [Draw Calls & Batching](../rendering/draw-calls-batching.md) để giảm SetPass.

## :material-memory: Memory Profiler

- **Package riêng** (`Window > Package Manager` → cài **Memory Profiler**).
- Chụp **snapshot** RAM: thấy texture/mesh/asset nào tốn nhất, asset **trùng lặp**, rò rỉ.
- Rất hữu ích cho mobile (RAM giới hạn) và truy lùng tăng RAM bất thường.

## :material-counter: Rendering Statistics (nhanh)

- **Game view → nút `Stats`**: xem nhanh **Batches**, **SetPass calls**, **Tris**, **Verts**, fps.
- Không chi tiết bằng Profiler nhưng tiện liếc khi chỉnh scene.

## :material-clipboard-list: Công cụ khác

| Công cụ | Dùng cho |
|---|---|
| **Profile Analyzer** (package) | So sánh nhiều khung profile, trước/sau tối ưu |
| **Profiler → Rendering module** | Draw call, SetPass, batches theo frame |
| **Physics Debugger** (`Window > Analysis`) | Soi collider/contact |

## :material-flash: Thói quen tốt

- [ ] Profile **Development Build** trên **thiết bị thật**, không chỉ editor.
- [ ] Đặt **frame budget** (16.6 ms@60fps) và đo theo nó.
- [ ] Sửa **một** thứ → đo lại → so sánh.
- [ ] Soi **GC Alloc** = 0 ở hot path.
- [ ] Frame Debugger để hạ **SetPass/Batches**.

## :material-link-variant: Nguồn

- [Profiler overview — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/Profiler.html)
- [Frame Debugger — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/FrameDebugger.html)
- [Memory Profiler — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/profiler-memory.html)
