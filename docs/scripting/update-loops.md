# Update Loops

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Chọn đúng callback và giữ thân vòng lặp **rẻ** — đây là code chạy **mỗi frame**.

!!! abstract "TL;DR"
    - **`Update`:** logic game mỗi frame (input, gameplay). Dùng `Time.deltaTime`.
    - **`FixedUpdate`:** vật lý (Rigidbody). Chạy theo Fixed Timestep, dùng `Time.fixedDeltaTime`.
    - **`LateUpdate`:** sau khi mọi Update xong — camera follow, IK.
    - **Cache reference** (GetComponent, Camera.main…) trong `Awake`/`Start`, **đừng gọi mỗi frame**.
    - Empty `Update(){}` vẫn tốn chi phí gọi — bỏ nếu không dùng.

## :material-sync: Update vs FixedUpdate vs LateUpdate

| Callback | Khi nào chạy | Dùng cho | Delta |
|---|---|---|---|
| **`FixedUpdate`** | Theo Fixed Timestep (mặc định 0.02s) | **Vật lý** Rigidbody, `AddForce` | `Time.fixedDeltaTime` |
| **`Update`** | Mỗi frame render | Input, gameplay, non-physics | `Time.deltaTime` |
| **`LateUpdate`** | Sau tất cả `Update` | Camera follow, look-at, IK | `Time.deltaTime` |

- Fixed Timestep cấu hình ở [Time settings](../project-settings/time.md) (mặc định **0.02 = 50 Hz**).
- **Di chuyển bằng vật lý** (`Rigidbody.MovePosition`, `AddForce`) → đặt trong `FixedUpdate`.
- **Đọc input** (`Input.GetKeyDown`) → trong `Update` (FixedUpdate có thể bỏ lỡ frame input).

!!! warning "Conflict: di chuyển Rigidbody trong Update ⚔️ vật lý"
    Đổi vị trí Rigidbody trong `Update` (hoặc set `transform.position` trực tiếp) đá nhau với hệ vật lý → giật, xuyên collider. Vật lý phải ở **`FixedUpdate`** qua API Rigidbody.

## :material-cached: Cache, đừng tìm lại mỗi frame

```csharp
public class Player : MonoBehaviour
{
    Rigidbody _rb;
    Transform _tf;
    Camera _cam;

    void Awake()
    {
        _rb  = GetComponent<Rigidbody>(); // cache 1 lần
        _tf  = transform;
        _cam = Camera.main;               // KHÔNG gọi Camera.main mỗi frame
    }

    void Update()
    {
        // dùng _cam, _tf đã cache — không GetComponent / Camera.main ở đây
    }
}
```

- **`GetComponent<T>()`** mỗi frame = lãng phí → cache trong `Awake`/`Start`.
- **`Camera.main`** = `FindGameObjectsWithTag` ẩn → tốn; cache lại.
- **`transform`** truy cập lặp cũng nên cache vào biến cục bộ trong hot loop.

## :material-timer-off: Giảm tải vòng lặp

- **Bỏ `Update` rỗng:** Unity vẫn trả phí gọi callback dù thân rỗng.
- **Không cần mỗi frame thì đừng chạy mỗi frame:** dùng timer, `InvokeRepeating`, coroutine, hoặc event.
- **Phân tải (time-slicing):** xử lý N object mỗi frame thay vì tất cả cùng lúc.
- **Tránh `Find`/`GetComponent`/`SendMessage`** trong hot path.

```csharp
// Thay vì kiểm tra mỗi frame:
float _next;
void Update()
{
    if (Time.time < _next) return;
    _next = Time.time + 0.2f;   // chỉ chạy mỗi 0.2s
    ScanForEnemies();
}
```

!!! tip "deltaTime cho mọi chuyển động"
    Nhân `Time.deltaTime` (Update) / `Time.fixedDeltaTime` (FixedUpdate) để chuyển động độc lập framerate. Time Scale & Maximum Allowed Timestep ở [Time settings](../project-settings/time.md).

## :material-link-variant: Nguồn

- [Order of execution for event functions — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/ExecutionOrder.html)
- [MonoBehaviour — Unity 6.3 Scripting API](https://docs.unity3d.com/6000.3/Documentation/ScriptReference/MonoBehaviour.html)
- [Time and frame rate management — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/TimeFrameManagement.html)
