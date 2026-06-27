# Object Pooling

> **Target: Unity 6.3 LTS (6000.3)** · URP only. **Tái dùng** object thay vì `Instantiate`/`Destroy` liên tục → tránh GC spike và chi phí tạo/hủy. Unity có sẵn **`UnityEngine.Pool.ObjectPool<T>`**.

!!! abstract "TL;DR"
    - `Instantiate`/`Destroy` liên tục (bullet, enemy, VFX) → **alloc + GC spike + giật**.
    - **Pool:** tạo sẵn 1 lượng object, **bật/tắt** (`SetActive`) để tái dùng.
    - Unity có **`ObjectPool<T>`** trong `UnityEngine.Pool` (không cần tự viết).
    - Khi "spawn" → lấy từ pool & reset trạng thái; khi "hủy" → trả về pool (deactivate).
    - Hợp nhất cho: đạn, kẻ địch, hiệu ứng, damage number, AudioSource.

## :material-help-circle: Vì sao pool

- **`Instantiate`** clone object + cấp phát; **`Destroy`** để lại rác cho GC.
- Bắn 100 viên đạn/giây = 100 instantiate + 100 destroy → **GC spike** (xem [Caching & GC](caching-gc.md)).
- Pool: trả phí tạo **một lần** lúc đầu (hoặc lúc load), runtime chỉ **bật/tắt** — gần như miễn phí.

## :material-recycle: Dùng `ObjectPool<T>` có sẵn

```csharp
using UnityEngine;
using UnityEngine.Pool;

public class BulletSpawner : MonoBehaviour
{
    [SerializeField] Bullet _prefab;
    ObjectPool<Bullet> _pool;

    void Awake()
    {
        _pool = new ObjectPool<Bullet>(
            createFunc:      () => Instantiate(_prefab),
            actionOnGet:     b => b.gameObject.SetActive(true),
            actionOnRelease: b => b.gameObject.SetActive(false),
            actionOnDestroy: b => Destroy(b.gameObject),
            defaultCapacity: 50,
            maxSize:         200);
    }

    public Bullet Spawn(Vector3 pos)
    {
        var b = _pool.Get();          // lấy từ pool (tái dùng nếu có)
        b.transform.position = pos;
        b.Init(_pool);                // cho bullet biết pool để tự trả về
        return b;
    }
}
```

```csharp
public class Bullet : MonoBehaviour
{
    ObjectPool<Bullet> _pool;
    public void Init(ObjectPool<Bullet> pool) => _pool = pool;

    void OnDisableOrHit()
    {
        _pool.Release(this);          // trả về pool thay vì Destroy
    }
}
```

!!! warning "Cần verify"
    Tên tham số constructor `ObjectPool<T>` (`actionOnGet`, `actionOnRelease`, `collectionCheck`…) theo [Scripting API 6.3](https://docs.unity3d.com/6000.3/Documentation/ScriptReference/Pool.ObjectPool_1.html) — đối chiếu khi code thật.

## :material-refresh: Reset trạng thái khi lấy ra

Object tái dùng **giữ trạng thái cũ** → phải reset khi `Get()`:

- Vị trí/rotation/scale.
- Velocity (`Rigidbody.linearVelocity = Vector3.zero`).
- Health, timer, particle, trail.
- Hủy mọi tham chiếu/coroutine còn chạy.

!!! tip "linearVelocity (Unity 6)"
    Unity 6 đổi `Rigidbody.velocity` → **`linearVelocity`** (`velocity` cũ đã deprecated). Reset cả `angularVelocity` khi trả bullet vật lý về pool.

## :material-flash: Khi nào nên pool

| Nên pool | Ít cần pool |
|---|---|
| Đạn, mảnh vỡ, VFX, damage number | Object tạo 1 lần lúc load level |
| Kẻ địch spawn liên tục | UI tĩnh |
| AudioSource one-shot | Object sống suốt scene |

## :material-flash: Checklist

- [ ] Dùng `UnityEngine.Pool.ObjectPool<T>` thay vì tự quản list.
- [ ] `Get()` → reset toàn bộ trạng thái; `Release()` → deactivate.
- [ ] Đặt `maxSize` hợp lý để không phình RAM.
- [ ] Prewarm (tạo sẵn) lúc loading nếu spike đầu màn quan trọng.
- [ ] Reset `linearVelocity`/`angularVelocity` cho object vật lý.

## :material-link-variant: Nguồn

- [ObjectPool<T0> — Unity 6.3 Scripting API](https://docs.unity3d.com/6000.3/Documentation/ScriptReference/Pool.ObjectPool_1.html)
- [Introduction to object pooling — Unity Learn](https://learn.unity.com/tutorial/introduction-to-object-pooling)
