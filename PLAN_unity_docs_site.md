# PLAN — Unity 6.3 LTS Documentation Site (MkDocs Material)

> **Mục đích file này:** Brief để Claude Code thực thi. Đọc TOÀN BỘ trước khi bắt đầu, đặc biệt mục **0.5 Research Mandate** — đó là rule quan trọng nhất.
> Làm theo từng TASK có đánh số. Mỗi task có **Acceptance criteria** — chỉ qua task tiếp khi pass.

---

## 0. Context & Decisions (đã chốt, không tự đổi)

- **Target Unity version:** **Unity 6.3 LTS** — version string nội bộ **6000.3** (6000.3.0f1). Support đến 12/2027. Đây là LTS đầu tiên kể từ 6.0 LTS.
- **Stack site:** MkDocs + Material for MkDocs (Python). Pure Markdown.
- **Mục đích:** Personal Unity reference — settings & optimization. Code/settings-heavy. Đối tượng: beginner-friendly, không đi sâu nhiều genre.
- **Scope nội dung:** Settings & optimize CHUNG cho:
  - **2D hoặc 3D** project
  - **Mobile hoặc PC** platform
  - KHÔNG cover nhiều thể loại game cụ thể. Giữ general.
- **Tổ chức (Cách 1 — Topic-first + platform tabs):**
  - Nav theo chủ đề.
  - Khác biệt **PC vs Mobile** → dùng **content tabs** (`=== "PC"` / `=== "Mobile"`) ngay trong trang.
  - Khác biệt **2D vs 3D** → tách section/trang riêng nơi thật sự khác (Rendering, Physics, Assets); chung thì để 1 trang.
- **Hosting:** GitHub Pages (branch `gh-pages`), deploy tự động qua GitHub Actions.
- **URL mặc định:** `https://teekay2201.github.io/unity-docs/`
- **Custom domain (`teekay.qzz.io`):** OPTIONAL — Appendix A. Mặc định KHÔNG làm.

**Đã xác nhận (không hỏi lại):**
1. GitHub username: **`teekay2201`**
2. Repo name: **`unity-docs`**
3. Custom domain: **KHÔNG** (bỏ qua Appendix A)
→ URL site sẽ là: **`https://teekay2201.github.io/unity-docs/`**

---

## 0.5. RESEARCH MANDATE — Unity 6.3 LTS (RULE QUAN TRỌNG NHẤT)

> Áp dụng cho MỌI nội dung settings/optimization, dù do Claude Code draft hay user viết.

**Nguyên tắc cứng:**
1. **KHÔNG viết setting từ trí nhớ.** Mọi menu path, tên field, default value PHẢI verify với nguồn chính thức của **Unity 6.3 (6000.3)** trước khi đưa vào doc.
2. **KHÔNG copy từ tutorial cũ** (Unity 2021/2022/6.0...) mà không verify lại — Unity đã tái tổ chức menu Settings qua các version; path cũ rất dễ sai ở 6.3.
3. Mỗi trang settings phải ghi: **menu path chính xác như trong 6.3**, **default value**, và **lý do** đổi (nếu khác default).
4. Khi không chắc → ĐÁNH DẤU `!!! warning "Cần verify"` thay vì đoán. Để user review.

**Nguồn ưu tiên (theo thứ tự tin cậy):**
- Official Manual 6.3: `https://docs.unity3d.com/6000.3/Documentation/Manual/`
- Unity 6.3 Release Notes / "New in Unity 6.3": `https://docs.unity3d.com/6000.3/Documentation/Manual/WhatsNewUnity63.html`
- Official URP / mobile optimization guides (bản cho Unity 6).
- Tránh: blog cá nhân cũ, video không ghi rõ version, tutorial pre-Unity-6.

**Danh sách 6.3-specific cần research & confirm (seed list — verify với official docs, ĐỪNG tin tuyệt đối nguồn thứ cấp):**
- [ ] **2D Physics:** API low-level mới dựa trên **Box2D v3** (chạy song song API cũ, sẽ thay thế dần). Ảnh hưởng trang Physics 2D.
- [ ] **Lighting:** **OpenCL GPU lightmapper** là default cho project mới; packing **xAtlas** là default cho scene mới.
- [ ] **Physics defaults:** "Reuse Collision Callbacks" bật mặc định cho project mới; `Physics.autoSyncTransforms` deprecated → dùng `Physics.SyncTransforms`.
- [ ] **Mobile rendering:** URP có **Kawase / Dual filtering** cho Bloom (tối ưu mobile); "On Tile Post Processing" (XR).
- [ ] **Build:** Burst + IL2CPP giảm build time (tới ~22% vài case).
- [ ] **Render Pipeline:** ❗VERIFY tình trạng **Built-In Render Pipeline có bị deprecate** không. Nếu có → doc mặc định **URP** cho cả 2D lẫn 3D.
- [ ] **Editor compatibility (ghi vào Setup):** Windows 10+, macOS 13.0+, Ubuntu 22.04/24.04. Free Personal cho studio < $200k/năm.

**Per-page research checklist (mọi trang settings phải pass):**
- [ ] Menu path verify đúng 6.3?
- [ ] Default value ghi rõ?
- [ ] PC vs Mobile tách rõ (tab) nếu khác?
- [ ] 2D vs 3D phân biệt nếu liên quan?
- [ ] Có nguồn official link cuối trang?

---

## TASK 0 — Prerequisites (KIỂM TRA TRƯỚC, không tự cài bừa)

> User KHÔNG phải web developer. Phần lớn thao tác cài đặt nằm ngoài Claude Code (cần tay user / cần quyền admin). Claude Code: kiểm tra cái gì có sẵn, cái gì thiếu thì HƯỚNG DẪN user cài, đừng giả định.

| Tool | Để làm gì | Cách kiểm tra | Nếu thiếu |
|---|---|---|---|
| **Claude Code** | Chạy plan này | đang dùng rồi | — |
| **Git** | Version control + push GitHub | `git --version` | Hướng dẫn user cài Git for Windows |
| **Python 3.x + pip** | Build/preview MkDocs local | `python --version` | Claude Code có thể cài qua `winget install Python.Python.3.12` (hỏi user trước), hoặc hướng dẫn tải từ python.org |
| **GitHub account** | Host repo + Pages | hỏi user | User tự tạo (free) |

**Không cần:** Node.js (Claude Code native installer không cần), GPU, framework web.

**Lưu ý môi trường:** OS là Windows 11 → dùng `.venv\Scripts\activate` (không phải `source`), path dùng `\`.

**Acceptance:** `git --version` và `python --version` đều trả version hợp lệ; user xác nhận đã có GitHub account.

---

## TASK 1 — Khởi tạo project & môi trường

`requirements.txt`:
```
mkdocs-material
```
> Cài bản stable mới nhất, KHÔNG pin bản cũ. Sau khi cài xong, pin lại version thực tế vào `requirements.txt` để CI reproducible.

```bash
python -m venv .venv
source .venv/bin/activate    # Windows: .venv\Scripts\activate
pip install mkdocs-material
mkdocs --version
```

**Acceptance:** `mkdocs --version` chạy được, không lỗi.

---

## TASK 2 — Scaffold cấu trúc thư mục

```
.
├── docs/
│   ├── index.md
│   ├── getting-started.md            # site là gì, dùng sao, NOTE: target Unity 6.3 LTS
│   ├── setup/
│   │   ├── index.md                  # cách dùng quick-start templates
│   │   ├── new-2d-project.md         # checklist settings ngay sau khi tạo project 2D
│   │   └── new-3d-project.md         # checklist settings ngay sau khi tạo project 3D
│   ├── project-settings/
│   │   ├── index.md
│   │   ├── quality.md                # ⭐ trang MẪU đã research (xem Task 4b)
│   │   ├── player.md
│   │   ├── graphics-render-pipeline.md
│   │   ├── physics.md                # tách section 2D (Box2D v3) vs 3D
│   │   └── time.md
│   ├── rendering/
│   │   ├── index.md
│   │   ├── render-pipeline-urp.md    # 2D URP vs 3D URP
│   │   ├── draw-calls-batching.md
│   │   ├── lighting.md               # GPU lightmapper / xAtlas default
│   │   └── post-processing.md        # mobile-optimized notes (Kawase/Dual bloom)
│   ├── assets/
│   │   ├── index.md
│   │   ├── textures.md               # PC (BC7) vs Mobile (ASTC) — tabs
│   │   ├── audio.md
│   │   ├── sprites-atlases.md        # 2D focus
│   │   └── meshes-models.md          # 3D focus
│   ├── scripting/
│   │   ├── index.md
│   │   ├── update-loops.md
│   │   ├── caching-gc.md
│   │   └── object-pooling.md
│   ├── build/
│   │   ├── index.md
│   │   ├── pc-build.md
│   │   └── mobile-build.md           # Android / iOS
│   ├── profiling/
│   │   ├── index.md
│   │   └── tools.md                  # Profiler, Frame Debugger, Memory Profiler
│   └── snippets/
│       └── index.md
├── mkdocs.yml
├── requirements.txt
├── .gitignore
└── .github/workflows/deploy.yml
```

- Mỗi `.md` (trừ trang mẫu ở Task 4b) để placeholder ngắn: 1 heading + `> TODO`.
- `index.md` (home): intro tử tế + ghi rõ **"Target: Unity 6.3 LTS (6000.3)"** ngay đầu.

`.gitignore`:
```
.venv/
site/
__pycache__/
*.pyc
.DS_Store
```

**Acceptance:** Cây thư mục đúng, mọi `.md` tồn tại, không rỗng.

---

## TASK 3 — Cấu hình `mkdocs.yml`

> Thay `teekay2201` và `unity-docs` bằng giá trị thật.

```yaml
site_name: Unity 6.3 Docs
site_description: Personal Unity 6.3 LTS settings & optimization reference (2D/3D, Mobile/PC)
site_url: https://teekay2201.github.io/unity-docs/
repo_url: https://github.com/teekay2201/unity-docs
repo_name: teekay2201/unity-docs

theme:
  name: material
  language: en
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.top
    - navigation.instant
    - navigation.tracking
    - toc.follow
    - search.suggest
    - search.highlight
    - content.code.copy
    - content.code.annotate
  palette:
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/weather-night
        name: Switch to dark mode
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/weather-sunny
        name: Switch to light mode

markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.tabbed:
      alternate_style: true     # ⭐ content tabs cho PC/Mobile
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - attr_list
  - md_in_html
  - tables
  - toc:
      permalink: true

plugins:
  - search

nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - Setup (Quick Start):
      - Overview: setup/index.md
      - New 2D Project: setup/new-2d-project.md
      - New 3D Project: setup/new-3d-project.md
  - Project Settings:
      - Overview: project-settings/index.md
      - Quality: project-settings/quality.md
      - Player: project-settings/player.md
      - Graphics & Render Pipeline: project-settings/graphics-render-pipeline.md
      - Physics: project-settings/physics.md
      - Time: project-settings/time.md
  - Rendering:
      - Overview: rendering/index.md
      - Render Pipeline (URP): rendering/render-pipeline-urp.md
      - Draw Calls & Batching: rendering/draw-calls-batching.md
      - Lighting: rendering/lighting.md
      - Post-processing: rendering/post-processing.md
  - Assets:
      - Overview: assets/index.md
      - Textures: assets/textures.md
      - Audio: assets/audio.md
      - Sprites & Atlases: assets/sprites-atlases.md
      - Meshes & Models: assets/meshes-models.md
  - Scripting:
      - Overview: scripting/index.md
      - Update Loops: scripting/update-loops.md
      - Caching & GC: scripting/caching-gc.md
      - Object Pooling: scripting/object-pooling.md
  - Build:
      - Overview: build/index.md
      - PC Build: build/pc-build.md
      - Mobile Build: build/mobile-build.md
  - Profiling:
      - Overview: profiling/index.md
      - Tools: profiling/tools.md
  - Snippets: snippets/index.md
```

**Acceptance:** `mkdocs build --strict` chạy SẠCH, không warning.

---

## TASK 4a — Verify local (kỹ thuật)

```bash
mkdocs serve   # mở http://127.0.0.1:8000
```

Checklist:
- [ ] Nav tabs đủ nhóm (Setup, Project Settings, Rendering, Assets, Scripting, Build, Profiling)
- [ ] Dark/light toggle OK
- [ ] Search trả kết quả
- [ ] Code block có copy button + highlight
- [ ] Một `!!! warning` admonition render đúng
- [ ] **Content tabs PC/Mobile render đúng** (test snippet bên dưới)

Test snippet (bỏ vào `snippets/index.md`):

````markdown
!!! tip "Optimization note"
    Box dùng cho ghi chú tối ưu.

=== "PC"
    ```csharp
    QualitySettings.vSyncCount = 1;
    ```

=== "Mobile"
    ```csharp
    Application.targetFrameRate = 60;
    QualitySettings.vSyncCount = 0;
    ```
````

**Acceptance:** Toàn bộ checklist pass trên browser.

---

## TASK 4b — Viết 1 trang MẪU đã research (khóa format)

> Mục tiêu: tạo template chuẩn để các trang còn lại copy theo. Trang chọn: **`project-settings/quality.md`**.

Yêu cầu trang mẫu (TUÂN THỦ mục 0.5):
1. Research **Quality settings trong Unity 6.3 (6000.3)** từ official manual TRƯỚC khi viết.
2. Ghi **menu path chính xác** (verify ở 6.3, vd `Edit > Project Settings > Quality`).
3. Có **content tabs PC vs Mobile** với recommendation khác nhau + giải thích **tại sao**.
4. Có bảng setting → default → recommend.
5. Cuối trang: link nguồn official.
6. Chỗ nào không chắc → `!!! warning "Cần verify"`.

**Acceptance:** Trang `quality.md` build OK, đúng format trên, mọi claim có nguồn hoặc được đánh dấu cần verify. Đây là template cho các trang sau.

---

## TASK 5 — GitHub Actions deploy

`.github/workflows/deploy.yml`:
```yaml
name: Deploy docs
on:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.x"
      - run: pip install -r requirements.txt
      - run: mkdocs gh-deploy --force --clean
```

**Acceptance:** File tồn tại, YAML hợp lệ (indent 2 space, không tab).

---

## TASK 6 — Push & enable GitHub Pages

> Có thao tác web GitHub mà Claude Code KHÔNG tự làm — liệt kê cho user làm tay.

1. Tạo repo `unity-docs` (public) trên GitHub.
2. Push:
   ```bash
   git add .
   git commit -m "init: unity 6.3 docs (mkdocs material)"
   git branch -M main
   git remote add origin https://github.com/teekay2201/unity-docs.git
   git push -u origin main
   ```
3. Đợi tab **Actions** job xanh.
4. **User làm tay:** Settings → Pages → Source = **Deploy from a branch** → Branch = **`gh-pages`** / `root` → Save.
5. Truy cập `https://teekay2201.github.io/unity-docs/`.

**Acceptance:** Site live, search + dark mode OK, trang mẫu `quality.md` hiển thị đúng.

---

## TASK 7 — Bàn giao (kết thúc MVP)

> Task 0-7 = MVP chạy được. Task 8 (design) là Phase 2, làm SAU.

In cho user:
- URL live.
- Workflow viết tiếp: theo **template `quality.md`** + **mục 0.5 Research Mandate**; sửa/thêm `.md`, update `nav`, `git push` → CI tự deploy.
- Preview local: `mkdocs serve`.

---

## TASK 8 — Design & UX polish pass (PHASE 2 — chỉ làm sau khi MVP live)

> Mục tiêu: UI đẹp/hợp thời, UX polish, có "juice" — NHƯNG giữ trên Material (không đổi stack). Đừng để block pipeline content.
> **Nguyên tắc:** đẹp nhưng KHÔNG hy sinh readability/maintainability. Mọi custom CSS để trong `docs/stylesheets/extra.css`, custom JS trong `docs/javascripts/extra.js`, khai báo qua `extra_css` / `extra_javascript` trong `mkdocs.yml`. KHÔNG fork theme.

**Cần research design trước khi code:** đọc Material customization docs (color, fonts, custom CSS, social cards) cho bản hiện tại. Không bịa class/biến.

**Scope juice (bounded — làm theo thứ tự ưu tiên):**
1. **Identity:** custom color palette (accent game-dev, vd cyan/lime trên nền slate), custom fonts (heading + monospace code rõ ràng), favicon/logo.
2. **Motion nhẹ:** bật `navigation.instant` đã có (SPA-like). Thêm CSS transition cho hover (link, card, nav item), scroll-reveal nhẹ cho heading/section (CSS `@keyframes`, KHÔNG lạm dụng).
3. **Code blocks:** style đẹp hơn (border accent, font-size, line-height dễ đọc), giữ copy button.
4. **Components:** dùng Material **cards grid** cho trang Overview, **tags** cho phân loại (vd `mobile`, `pc`, `2d`, `3d`), **social cards** (link preview đẹp khi share).
5. **Micro-juice (optional, cuối cùng):** subtle hover scale, animated TOC active highlight, custom admonition icons cho "Mobile gotcha" / "PC gotcha".

**Ràng buộc:**
- Test trên cả light + dark mode.
- Test responsive (mobile viewport) — site phải đọc tốt trên điện thoại.
- KHÔNG thêm animation gây giật/chậm; ưu tiên `transform`/`opacity` (GPU-friendly).
- `mkdocs build --strict` vẫn phải sạch.

**Acceptance:** Site giữ nguyên chức năng, có identity riêng (không còn trông như Material mặc định), hover/transition mượt, đẹp ở cả 2 theme + mobile, build strict sạch. User review và OK.

---

## Appendix A — Custom domain `teekay.qzz.io` (OPTIONAL)

> CHỈ làm nếu user xác nhận.

1. `mkdocs.yml`: `site_url: https://teekay.qzz.io/`
2. Tạo `docs/CNAME` (1 dòng): `teekay.qzz.io`
3. Cloudflare DNS:

   | Type  | Name | Target                        | Proxy        | TTL  |
   |-------|------|-------------------------------|--------------|------|
   | CNAME | `@`  | `teekay2201.github.io` | **DNS only** | Auto |
   | CNAME | `www`| `teekay2201.github.io` | **DNS only** | Auto |

   ⚠️ Phải **DNS only** (cloud xám), KHÔNG Proxied — nếu Proxied, Cloudflare chặn SSL verification của GitHub Pages → HTTPS lỗi.
4. **User làm tay:** Settings → Pages → Custom domain → `teekay.qzz.io` → Save. Đợi cấp cert, bật **Enforce HTTPS** khi sẵn sàng.

**Acceptance:** `https://teekay.qzz.io` load site, HTTPS hợp lệ.

---

## Appendix B — Chuyển Unity version sau này (vd 6.3 → 6.7 LTS)

Khi target version đổi, có 2 chiến lược:

**B1 — Update tại chỗ (RECOMMEND cho doc cá nhân):**
- Sửa thẳng content trên `main`, đổi mọi chỗ ghi version (`6.3` / `6000.3`) sang version mới, re-research các setting bị đổi.
- Git history tự lưu trạng thái 6.3 cũ → rollback/tra cứu được.
- Site luôn hiển thị 1 version hiện hành. Đơn giản, ít maintain.

**B2 — Versioned docs với `mike` (OPTIONAL, advanced):**
- Plugin `mike` cho phép giữ **nhiều version live cùng lúc** (vd `/6.3/` và `/6.7/`) + version switcher trên navbar.
- Chỉ làm nếu muốn cả 2 bản truy cập song song.
- Trade-off: maintain nặng hơn (phải build/deploy từng version), CI phức tạp hơn.
- KHÔNG setup `mike` ngay từ đầu — chỉ thêm khi thật sự cần.

---

## Lưu ý chung cho Claude Code

- **Mục 0.5 Research Mandate là rule #1** khi viết bất kỳ nội dung settings nào. Không bịa từ trí nhớ.
- Chạy `mkdocs build --strict` trước khi báo xong mỗi task liên quan config.
- KHÔNG commit `site/`.
- KHÔNG tự đổi stack/theme/structure/thêm plugin ngoài plan trừ khi user yêu cầu.
- Thao tác trên web GitHub/Cloudflare → KHÔNG tự làm, liệt kê rõ cho user.
