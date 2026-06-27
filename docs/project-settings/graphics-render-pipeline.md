# Graphics & Render Pipeline

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Menu: `Edit > Project Settings > Graphics`. Nơi gán URP pipeline mặc định + cấu hình batching/shader cho toàn project.

!!! abstract "TL;DR"
    - **Gán URP Asset** mặc định ở `Graphics > Scriptable Render Pipeline Settings` (template 3D default = `PC_RPAsset`).
    - Batching dưới URP chủ yếu là **SRP Batcher** (bật trong URP Asset), không phải Static/Dynamic batching cũ.
    - **Mới ở 6.3:** **Shader Build Settings** giảm shader variants → build nhỏ & nhanh hơn.

## :material-tune: Mở ở đâu

`Edit > Project Settings > Graphics`.

!!! note "📸 Screenshot cần chụp"
    `Project Settings > Graphics` — phần **Scriptable Render Pipeline Settings** (URP Asset được gán) + **Shader Stripping / Shader Build Settings**. → `docs/assets/screenshots/graphics-srp.png`

## :material-palette: Gán URP pipeline

- **Scriptable Render Pipeline Settings** → trỏ tới một **URP Asset** (default project = pipeline mặc định toàn cục).
- Mỗi **Quality level** có thể override bằng URP Asset riêng (xem [Quality](quality.md)) — đó là cách tách **Mobile/PC**.
- Project chỉ dùng URP → field này **luôn** có URP Asset, không để trống.

## :material-layers: Batching dưới URP

- **SRP Batcher** (bật trong [URP Asset > Rendering](../rendering/render-pipeline-urp.md)) — cơ chế batching chính của URP, tăng tốc CPU.
- **Static / Dynamic Batching** (Graphics legacy): vai trò giảm nhiều dưới URP; SRP Batcher xử lý phần lớn.
- **GPU Instancing:** bật per-material; hợp cho nhiều object cùng mesh/material.

!!! warning "Conflict: SRP Batcher ⚔️ GPU Instancing"
    **Không dùng chung được.** Nếu object tương thích SRP Batcher, Unity ưu tiên SRP Batcher và bỏ qua GPU Instancing. Muốn GPU Instancing → `Graphics.DrawMeshInstanced` hoặc gỡ tương thích SRP Batcher. Chi tiết: [Render Pipeline (URP)](../rendering/render-pipeline-urp.md). (Nguồn: [SRP Batcher in URP 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/SRPBatcher-landing.html).)

## :material-content-cut: Shader stripping (giảm build)

- **Mới ở 6.3 — Shader Build Settings** trong cửa sổ Graphics: giới hạn shader variants theo keyword, loại shader code cho keyword cụ thể trong build profile → **giảm build size & build time**. (Nguồn: [What's New 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html).)
- Shader variants nhiều = build phình to + lâu. Strip những gì không dùng.

!!! warning "Cần verify"
    Vị trí/tên chính xác của **Shader Build Settings** và các tùy chọn stripping trong Graphics window 6.3 — xác nhận bằng screenshot ở trên.

## :material-link-variant: Nguồn

- Dữ liệu: template `6000.3.10f1` — `GraphicsSettings.asset` (SRP default = `PC_RPAsset`).
- [What's New in Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html)
- [SRP Batcher in URP — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/SRPBatcher-landing.html)
