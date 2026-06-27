# Caching & GC

> **Target: Unity 6.3 LTS (6000.3)** · URP only. **Garbage Collection (GC)** dọn bộ nhớ managed bị bỏ. Alloc rác trong vòng lặp → **GC spike → khựng frame**. Mục tiêu: hot path **không cấp phát**.

!!! abstract "TL;DR"
    - Tránh **cấp phát (alloc)** trong `Update`/hot loop → tránh GC spike gây giật.
    - Thủ phạm hay gặp: **string nối**, **boxing**, **LINQ**, **lambda capture**, API trả mảng mới mỗi lần.
    - **Cache** mảng/list/collection, **tái dùng** thay vì `new` mỗi frame.
    - Đo bằng **Profiler → GC Alloc** ([Profiling](../profiling/tools.md)) — tìm dòng alloc mỗi frame.
    - Unity dùng **Incremental GC** (chia nhỏ GC qua nhiều frame) — giúp nhưng không thay việc bớt rác.

## :material-delete-clock: Vì sao GC gây giật

- Code managed (C#) cấp phát trên **managed heap**. Khi đầy, **GC chạy** để dọn.
- GC quét = **dừng/khựng** → frame spike, rõ nhất trên mobile.
- Ít alloc → GC chạy thưa hơn → ít spike.

## :material-bug: Thủ phạm alloc thường gặp

| Nguồn rác | Thay bằng |
|---|---|
| `"a" + b + "c"` mỗi frame | `StringBuilder`, hoặc chỉ cập nhật khi đổi |
| **Boxing** (`int` → `object`, struct vào API `object`) | Generic, tránh `object` |
| **LINQ** (`.Where().ToList()`) trong hot path | Vòng lặp `for` thủ công |
| **Lambda/closure** capture biến | Cache delegate, tránh capture |
| API trả **mảng mới** (vd `GetComponents`, `Physics.RaycastAll`) | Bản **NonAlloc** / truyền buffer |
| `foreach` trên vài collection (boxing enumerator cũ) | `for` với index |
| `new List<>()`/`new T[]` mỗi frame | Cache & `Clear()` rồi tái dùng |

```csharp
// ✗ rác mỗi frame
void Update()
{
    var hits = Physics.RaycastAll(ray);          // mảng mới mỗi lần
    scoreText.text = "Score: " + score;          // string mới mỗi frame
}

// ✓ không alloc trong hot path
readonly RaycastHit[] _hits = new RaycastHit[16];
void Update()
{
    int n = Physics.RaycastNonAlloc(ray, _hits); // ghi vào buffer cache sẵn
    if (score != _lastScore)                     // chỉ cập nhật khi đổi
    {
        scoreText.text = $"Score: {score}";
        _lastScore = score;
    }
}
```

!!! tip "Cập nhật UI khi đổi, không phải mỗi frame"
    Gán `Text`/`TMP_Text` mỗi frame tạo string + dirty layout dù giá trị không đổi. Chỉ set khi giá trị thay đổi.

## :material-cube-outline: Struct vs Class

- **struct** = value type, cấp phát trên **stack** (không tạo rác GC) khi là biến cục bộ.
- **class** = reference type, luôn trên **heap** (GC quản).
- Dữ liệu nhỏ, tạm thời, nhiều → cân nhắc **struct** để khỏi sinh rác.
- Cẩn thận **boxing** struct (ép vào `object`/interface không generic) → lại tạo rác.

## :material-flash: Checklist không rác

- [ ] Không `new` collection/array trong `Update`/hot loop — cache & tái dùng.
- [ ] Dùng API **NonAlloc** (Physics, GetComponents truyền `List`).
- [ ] Không LINQ / string concat trong hot path.
- [ ] Cập nhật UI text chỉ khi giá trị đổi.
- [ ] Đo **GC Alloc** trong Profiler; mục tiêu **0 B/frame** ở hot path.

!!! warning "Đừng tự gọi GC.Collect() bừa"
    `System.GC.Collect()` ép GC chạy ngay → có thể gây spike còn tệ hơn. Để Incremental GC tự lo; chỉ dùng ở thời điểm an toàn (màn loading) nếu thật cần.

## :material-link-variant: Nguồn

- [Understanding the managed heap — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/performance-managed-memory.html)
- [Garbage collection best practices — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/performance-garbage-collection-best-practices.html)
