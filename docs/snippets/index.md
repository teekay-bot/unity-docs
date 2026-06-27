# Snippets

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Các đoạn code copy-paste hay dùng. Tham chiếu lý do ở các trang [Scripting](../scripting/index.md) / [Rendering](../rendering/index.md).

!!! abstract "TL;DR"
    - Giới hạn fps & VSync theo platform.
    - Cache reference & pattern không tạo rác.
    - Đổi Quality level bằng code.
    - Object pool tối giản.

## :material-speedometer: Giới hạn frame rate / VSync

=== "PC"
    ```csharp
    // PC: thường bật VSync (đồng bộ màn hình)
    QualitySettings.vSyncCount = 1;        // 1 = đồng bộ mỗi refresh
    Application.targetFrameRate = -1;      // -1 = không giới hạn (theo VSync)
    ```

=== "Mobile"
    ```csharp
    // Mobile: tắt VSync, cap fps để tiết kiệm pin/nhiệt
    QualitySettings.vSyncCount = 0;
    Application.targetFrameRate = 60;      // hoặc 30 cho game nhẹ pin
    ```

!!! tip "Đặt sớm"
    Gọi trong `Awake`/bootstrap. Trên mobile, `targetFrameRate` mặc định 30 nếu không set — nhớ set 60 nếu muốn mượt. Xem [Quality](../project-settings/quality.md).

## :material-cached: Cache reference (tránh tìm mỗi frame)

```csharp
using UnityEngine;

public class Mover : MonoBehaviour
{
    Transform _tf;
    Rigidbody _rb;

    void Awake()
    {
        _tf = transform;                  // cache 1 lần
        _rb = GetComponent<Rigidbody>();
    }

    void FixedUpdate()
    {
        _rb.MovePosition(_rb.position + Vector3.forward * Time.fixedDeltaTime);
    }
}
```

Lý do: [Update Loops](../scripting/update-loops.md).

## :material-broom: Pattern không tạo rác (GC-free)

```csharp
// Physics NonAlloc — dùng buffer cache sẵn, không tạo mảng mỗi lần
readonly RaycastHit[] _hits = new RaycastHit[16];

void Scan(Ray ray)
{
    int n = Physics.RaycastNonAlloc(ray, _hits, 100f);
    for (int i = 0; i < n; i++) { /* _hits[i] */ }
}
```

```csharp
// Cập nhật UI chỉ khi giá trị đổi (tránh string rác mỗi frame)
int _lastScore = -1;
void SetScore(int score)
{
    if (score == _lastScore) return;
    _lastScore = score;
    _scoreText.text = $"Score: {score}";
}
```

Lý do: [Caching & GC](../scripting/caching-gc.md).

## :material-tune: Đổi Quality level bằng code

```csharp
using UnityEngine;

// Lấy danh sách tên các quality level (đã cấu hình ở Project Settings > Quality)
string[] names = QualitySettings.names;

// Đặt level theo index (true = áp dụng ngay, đổi cả URP Asset gắn với level)
QualitySettings.SetQualityLevel(2, applyExpensiveChanges: true);

// Level hiện tại
int current = QualitySettings.GetQualityLevel();
```

Lý do & mô hình per-platform vs tiered: [Quality](../project-settings/quality.md).

## :material-recycle: Object pool tối giản

```csharp
using UnityEngine;
using UnityEngine.Pool;

public class VfxSpawner : MonoBehaviour
{
    [SerializeField] ParticleSystem _prefab;
    ObjectPool<ParticleSystem> _pool;

    void Awake()
    {
        _pool = new ObjectPool<ParticleSystem>(
            () => Instantiate(_prefab),
            p => p.gameObject.SetActive(true),
            p => p.gameObject.SetActive(false),
            p => Destroy(p.gameObject),
            defaultCapacity: 20, maxSize: 100);
    }

    public void Play(Vector3 pos)
    {
        var p = _pool.Get();
        p.transform.position = pos;
        p.Play();
        // trả về pool sau khi chạy xong (vd qua coroutine / callback)
    }
}
```

Lý do: [Object Pooling](../scripting/object-pooling.md).

## :material-link-variant: Liên quan

- [Scripting — Overview](../scripting/index.md)
- [Profiling Tools](../profiling/tools.md)
- [Project Settings — Quality](../project-settings/quality.md)
