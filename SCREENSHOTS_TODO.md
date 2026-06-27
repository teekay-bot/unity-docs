# Screenshots — DONE ✅

Tất cả screenshot đã chụp, lưu vào `docs/assets/screenshots/` và chèn vào trang (có zoom glightbox). Giữ file này làm bản đồ ảnh ↔ trang.

## Danh sách (tất cả ✅)

| Trang | File | Nội dung | Trạng thái |
|---|---|---|---|
| project-settings/quality.md | `quality-window.png` | Cửa sổ Quality 3D (Mobile/PC, SRP in use) | ✅ |
| project-settings/player.md | `player-other-pc-1.png` · `player-other-pc-2.png` | PC: Scripting Backend=Mono / Managed Stripping=Disabled (chia 2 ảnh) | ✅ |
| project-settings/player.md | `player-other-android-1.png` · `player-other-android-2.png` | Android: IL2CPP / Strip Engine Code + Stripping=Minimal (chia 2 ảnh) | ✅ |
| project-settings/graphics-render-pipeline.md | `graphics-srp.png` | Default Render Pipeline=PC_RPAsset + Shader Build/Stripping | ✅ |
| rendering/render-pipeline-urp.md | `create-rendering-menu.png` | Menu Create > Rendering (các asset URP) | ✅ |
| rendering/lighting.md | `lighting-window.png` | Lighting — Lightmapper = **Progressive GPU** | ✅ |
| rendering/post-processing.md | `volume-bloom.png` | Bloom override — Filter: Gaussian/Dual/**Kawase** | ✅ |
| assets/textures.md | `texture-import-3D.png` · `texture-import-2D.png` | Cùng ảnh: Default(3D, DXT5\|BC3) vs Sprite(2D, ETC2) | ✅ |
| assets/sprites-atlases.md | `sprite-atlas.png` | Inspector Sprite Atlas (Master, Packing, Objects) | ✅ |
| build/index.md | `build-profiles.png` | File > Build Profiles (Platforms + Scene List) | ✅ |
| profiling/tools.md | `profiler-window.png` | Profiler — CPU/Rendering/Memory + Timeline | ✅ |

## Đính chính rút ra từ screenshot (đã sửa nội dung)

- **Texture format mặc định** KHÔNG phải BC7/ASTC: PC = `DXT5|BC3`, Android = `ETC2 8 bits`. BC7/ASTC là nâng cấp tự chọn. → đã sửa `assets/textures.md`.
- **Lightmapper** label đúng là **Progressive GPU** (không phải "GPU (OpenCL)"). → đã sửa `rendering/lighting.md`.
- **Bloom Kawase/Dual** nằm ở field **Filter** (Gaussian/Dual/Kawase) trong override Bloom. → đã sửa `rendering/post-processing.md`.
