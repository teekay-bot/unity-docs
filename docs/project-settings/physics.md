# Physics Settings

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Default lấy từ template `6000.3.10f1`: 3D `DynamicsManager.asset`, 2D `Physics2DSettings.asset`.

!!! abstract "TL;DR"
    - **3D:** `Edit > Project Settings > Physics` · Gravity (0, -9.81, 0), Solver Iterations 6 / 1.
    - **2D:** `Edit > Project Settings > Physics 2D` · Gravity (0, -9.81), Simulation Mode = Fixed Update.
    - **Ở 6.3:** `Reuse Collision Callbacks` **bật mặc định** (giảm GC); `Auto Sync Transforms` **tắt** → gọi `SyncTransforms()` thủ công.
    - Nhịp physics = **Fixed Timestep** ([Time](time.md)).

## :material-tune: Mở ở đâu

- **3D:** `Edit > Project Settings > Physics`
- **2D:** `Edit > Project Settings > Physics 2D`

## :material-atom: Default value

=== "3D (DynamicsManager)"

    | Field | Default | Ghi chú |
    |---|---|---|
    | Gravity | (0, **-9.81**, 0) | |
    | Default Solver Iterations | **6** | Tăng → ổn định hơn, tốn CPU |
    | Default Solver Velocity Iterations | 1 | |
    | Bounce Threshold | 2 | |
    | Sleep Threshold | 0.005 | Ngưỡng đưa rigidbody vào "ngủ" |
    | Default Contact Offset | 0.01 | |
    | Default Max Angular Speed | 50 | |
    | Reuse Collision Callbacks | **On** | Mặc định 6.3 |
    | Auto Sync Transforms | **Off** | Dùng `Physics.SyncTransforms()` |

=== "2D (Physics 2D)"

    | Field | Default | Ghi chú |
    |---|---|---|
    | Gravity | (0, **-9.81**) | |
    | Simulation Mode | **Fixed Update** | Theo fixed timestep |
    | Velocity Iterations | 8 | |
    | Position Iterations | 3 | |
    | Reuse Collision Callbacks | **On** | Mặc định 6.3 |
    | Auto Sync Transforms | **Off** | Dùng `Physics2D.SyncTransforms()` |

!!! info "Mới ở 6.3 — API 2D physics low-level (Box2D v3)"
    Unity 6.3 **thêm** bộ API 2D physics low-level tích hợp **Box2D v3** (bản Box2D mới nhất), nằm ở namespace `UnityEngine.LowLevelPhysics2D`. Ưu điểm: đa luồng nhanh hơn, tính xác định (determinism) tốt hơn, debug trực quan trong Editor & Runtime. Đây là **bổ sung chạy song song** với hệ 2D physics hiện có (component Rigidbody2D… ở trên vẫn dùng bình thường), **không** thay thế. (Nguồn: [What's New 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html).)

## :material-flash: Tối ưu

- **Layer Collision Matrix** (`Physics > Layer Collision Matrix`): tắt cặp layer không cần va chạm → bớt tính toán. Sắp xếp layer hợp lý ngay từ đầu.
- **Fixed Timestep** ([Time](time.md)) quyết định số physics step/giây. Mobile nặng physics → cân nhắc tăng timestep (giảm tần suất) để nhẹ CPU.
- Giữ **Auto Sync Transforms = Off** (default): tránh sync ngầm tốn kém mỗi khi đọc transform; chủ động gọi `SyncTransforms()` khi thật sự cần.
- **Reuse Collision Callbacks = On** (default): giảm rác GC sinh ra từ `Collision`/`Collision2D` object mỗi callback.

!!! tip "Mới ở 6.3 — Disable & strip physics back end"
    Nếu game **không dùng physics**, Unity 6.3 cho **tắt & strip hẳn physics integration SDK** khỏi project → **build nhỏ hơn** (vài build platform) + tài nguyên tối ưu hơn. (Nguồn: [What's New 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html).)

## :material-link-variant: Nguồn

- Dữ liệu: template `6000.3.10f1` — `DynamicsManager.asset`, `Physics2DSettings.asset`.
- [What's New in Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html)
