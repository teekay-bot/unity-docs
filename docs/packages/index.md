# Packages & Assets

> Các **package / asset bên ngoài** mà project dùng, kèm link tới repo / Asset Store / docs. Cập nhật danh sách này mỗi khi thêm dependency mới để dễ setup lại project.

!!! abstract "TL;DR"
    Hub dependency ngoài + link (repo / Asset Store / docs). Đã seed: **UniTask**. Import qua Git URL / OpenUPM / Asset Store. Thêm package mới → cập nhật trang này (pin theo tag để reproducible).

## :material-download: Cách import

=== "Git URL (UPM)"
    `Window > Package Manager > + > Add package from git URL…` rồi dán URL `.git`.

=== "OpenUPM"
    Cài qua [OpenUPM CLI](https://openupm.com/) hoặc thêm scoped registry trong `Edit > Project Settings > Package Manager`.

=== "Asset Store / .unitypackage"
    `Window > Package Manager > My Assets` để import, hoặc kéo file `.unitypackage` vào project.

## :material-package-variant: Danh sách

<div class="grid cards" markdown>

-   __UniTask__

    ---

    Async/await hiệu năng cao, **zero-allocation** cho Unity — thay thế coroutine, tích hợp `async`/`await`, `UniTask.Delay`, cancellation…

    **Loại:** Package (Git URL / OpenUPM)

    [:material-github: Repo](https://github.com/Cysharp/UniTask) ·
    [:material-book-open-variant: Docs](https://github.com/Cysharp/UniTask#readme)

-   __(thêm package của bạn)__

    ---

    Copy block này, điền tên · mô tả ngắn · loại · link. Giữ mỗi card 1 dependency để dễ scan.

    **Loại:** Package / Asset / Plugin

    [Link repo / Asset Store / Docs](#)

</div>

## :material-table: Bảng tham chiếu nhanh

| Package / Asset | Loại | Link | Ghi chú |
|---|---|---|---|
| **UniTask** | Package (Git URL / OpenUPM) | [Cysharp/UniTask](https://github.com/Cysharp/UniTask) | async/await zero-alloc, thay coroutine |
| _(thêm của bạn)_ | | | |

!!! tip "Mẹo"
    Khi thêm package qua Git URL, **pin theo tag/commit** (vd `...UniTask.git#2.5.10`) để project reproducible — tránh tự nhảy version khi pull lại.
