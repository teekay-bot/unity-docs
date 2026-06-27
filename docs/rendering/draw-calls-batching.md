# Draw Calls & Batching

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Giảm số **draw call** (lệnh CPU gửi GPU để vẽ) → nhẹ CPU, fps cao hơn, đặc biệt quan trọng trên mobile.

!!! abstract "TL;DR"
    - **SRP Batcher** (URP, bật trong URP Asset) — cơ chế chính, gộp draw theo shader tương thích.
    - **GPU Instancing** (per-material) — nhiều object **cùng mesh + material**.
    - **Atlas** texture/sprite → ít material switch.
    - ⚔️ **SRP Batcher không dùng chung GPU Instancing** (xem dưới).
    - Đo bằng **Frame Debugger** + [Profiler](../profiling/tools.md).

## :material-engine: Các cơ chế batching

| Cơ chế | Gộp gì | Bật ở đâu |
|---|---|---|
| **SRP Batcher** | Draw dùng **shader tương thích** (khác material vẫn gộp) | URP Asset › Rendering (mặc định On) |
| **GPU Instancing** | Nhiều instance **cùng mesh + material** | Tick trên **Material** (Enable GPU Instancing) |
| **Static Batching** | Object **tĩnh** gần nhau | Player / đánh dấu Static |
| **Dynamic Batching** | Mesh nhỏ động | Player (vai trò giảm dưới URP) |

!!! warning "Conflict: SRP Batcher ⚔️ GPU Instancing"
    **Không dùng chung được.** Object tương thích SRP Batcher → Unity ưu tiên SRP Batcher, **bỏ qua** GPU Instancing cho object đó. Muốn GPU Instancing: `Graphics.DrawMeshInstanced` / `RenderMeshInstanced`, hoặc gỡ tương thích SRP Batcher cho shader. (Nguồn: [SRP Batcher in URP 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/SRPBatcher-landing.html).)

## :material-flash: Giảm draw call — checklist

- **Bật SRP Batcher** trong URP Asset (mặc định On) — dùng shader URP/Shader Graph (tương thích sẵn).
- **Atlas:** gom texture (3D) / sprite (2D, [Sprites & Atlases](../assets/sprites-atlases.md)) → ít material → ít draw call.
- **Gộp material:** dùng chung material khi được; tránh tạo material instance thừa lúc runtime (vd đụng `renderer.material` tạo bản copy).
- **GPU Instancing** cho rừng cây / đám đông cùng mesh+material (khi không qua SRP Batcher).
- **Static** cho geometry không di chuyển.
- **Giảm overdraw** (transparent chồng lớp) — tốn fillrate nhất là mobile.

## :material-magnify: Đo & kiểm

- **Frame Debugger** (`Window > Analysis > Frame Debugger`): xem từng draw call, vì sao không batch.
- **[Profiler](../profiling/tools.md)** + **Rendering Statistics** (Game view > Stats): số Batches, SetPass calls.

=== "PC"
    Ngân sách draw call cao hơn, nhưng vẫn nên batch để giảm CPU overhead.
=== "Mobile"
    **Rất nhạy** với draw call & SetPass. Mục tiêu giữ SetPass/Batches thấp; atlas + SRP Batcher là bắt buộc.

## :material-link-variant: Nguồn

- [SRP Batcher in URP — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/SRPBatcher-landing.html)
