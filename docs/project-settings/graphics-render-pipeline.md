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

- Section **Set Default Render Pipeline Asset** → field **Default Render Pipeline** = URP Asset dùng khi **Quality level đang active chưa gán** Render Pipeline riêng (template 3D = `PC_RPAsset`).
- Mỗi **Quality level** có thể override bằng URP Asset riêng (xem [Quality](quality.md)) — đó là cách tách **Mobile/PC**.
- Project chỉ dùng URP → field này **luôn** có URP Asset, không để trống.

## :material-layers: Batching dưới URP

- **SRP Batcher** (bật trong [URP Asset > Rendering](../rendering/render-pipeline-urp.md)) — cơ chế batching chính của URP, tăng tốc CPU.
- **Static / Dynamic Batching** (Graphics legacy): vai trò giảm nhiều dưới URP; SRP Batcher xử lý phần lớn.
- **GPU Instancing:** bật per-material; hợp cho nhiều object cùng mesh/material.

!!! warning "Conflict: SRP Batcher ⚔️ GPU Instancing"
    **Không dùng chung được.** Nếu object tương thích SRP Batcher, Unity ưu tiên SRP Batcher và bỏ qua GPU Instancing. Muốn GPU Instancing → `Graphics.DrawMeshInstanced` hoặc gỡ tương thích SRP Batcher. Chi tiết: [Render Pipeline (URP)](../rendering/render-pipeline-urp.md). (Nguồn: [SRP Batcher in URP 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/SRPBatcher-landing.html).)

## :material-content-cut: Shader stripping & Shader Build Settings (giảm build)

Trong cửa sổ Graphics:

- **Shader Build Settings** *(mới ở 6.3)* — **Keyword Declaration Overrides**: giới hạn shader variants theo keyword set → giảm build size & time. *(Đổi rồi **Apply** sẽ trigger shader re-import.)*
- **Shader Stripping** (default):
    - **Instancing Variants:** `Strip Unused`
    - **Lightmap Modes** / **Fog Modes:** `Automatic`
    - **Batch Renderer Group Variants:** `Strip if Entities Graphics Package is not installed`
- Cuối cửa sổ có bộ đếm **"Currently tracked: N shaders, M variants"** để theo dõi.

> Shader variants nhiều = build phình to + compile lâu → strip mạnh tay những gì không dùng.

## :material-link-variant: Nguồn

- Dữ liệu: template `6000.3.10f1` — `GraphicsSettings.asset` (SRP default = `PC_RPAsset`).
- [What's New in Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html)
- [SRP Batcher in URP — Unity 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/SRPBatcher-landing.html)
