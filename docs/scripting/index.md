# Scripting — Overview

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Nhóm này về **viết code chạy nhanh**: vòng lặp, cấp phát/GC, và tái dùng object.

!!! abstract "TL;DR"
    - **[Update Loops](update-loops.md):** dùng đúng `Update`/`FixedUpdate`/`LateUpdate`; cache, đừng tìm lại mỗi frame.
    - **[Caching & GC](caching-gc.md):** tránh cấp phát rác trong vòng lặp → giảm GC spike/giật.
    - **[Object Pooling](object-pooling.md):** tái dùng object thay vì `Instantiate`/`Destroy` liên tục.
    - **Nguyên tắc:** code chạy mỗi frame phải sạch rác và rẻ; đo bằng [Profiler](../profiling/tools.md) trước khi tối ưu.

## :material-code-braces: Các trang

<div class="grid cards" markdown>

-   :material-sync: __[Update Loops](update-loops.md)__

    ---

    Update vs FixedUpdate vs LateUpdate, cache reference, tránh việc thừa mỗi frame.

-   :material-broom: __[Caching & GC](caching-gc.md)__

    ---

    Garbage Collection, tránh alloc trong hot path, struct vs class, string.

-   :material-recycle: __[Object Pooling](object-pooling.md)__

    ---

    `ObjectPool<T>`, tái dùng bullet/enemy/VFX, tránh Instantiate/Destroy spike.

</div>

## :material-alert: Thứ tự ưu tiên khi tối ưu

1. **Đo trước** ([Profiler](../profiling/tools.md)) — tìm hot path thật, đừng đoán.
2. **Thuật toán/cấu trúc** — sửa cái O(n²) chạy mỗi frame trước.
3. **GC** — diệt alloc trong vòng lặp (xem [Caching & GC](caching-gc.md)).
4. **Pooling** — cho object sinh/hủy liên tục.

!!! tip "IL2CPP cho build"
    Build mobile dùng **IL2CPP** (xem [Player Settings](../project-settings/player.md)) — code C# dịch sang C++, nhanh hơn Mono runtime. Không thay đổi cách viết code nhưng đáng biết khi đo hiệu năng build vs editor.
