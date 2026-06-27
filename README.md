# Unity 6.3 Docs — Personal Reference

Site tham khảo cá nhân về **settings & tối ưu Unity 6.3 LTS (6000.3), URP-only** (2D + 3D). Dựng bằng [MkDocs](https://www.mkdocs.org/) + [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

🔗 **Live:** https://teekay-bot.github.io/unity-docs/

---

## Chạy local

```bash
# lần đầu
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt   # hoặc: pip install mkdocs-material==9.7.6 mkdocs-glightbox==0.5.2

# preview (auto-reload khi sửa file)
.venv/Scripts/mkdocs serve        # mở http://127.0.0.1:8000

# build kiểm tra (PHẢI sạch trước khi push)
.venv/Scripts/mkdocs build --strict
```

> Windows: gọi mkdocs bằng đường dẫn tuyệt đối `.venv\Scripts\mkdocs.exe` để tránh lỗi PATH.

## Deploy

Push lên `main` → GitHub Actions (`.github/workflows/deploy.yml`) tự chạy `mkdocs gh-deploy` → publish lên branch `gh-pages` → site live. **Không** commit thư mục `site/` (đã gitignore).

---

## Viết thêm nội dung

1. Tạo/sửa file `.md` trong `docs/`.
2. Thêm trang vào `nav:` trong `mkdocs.yml`.
3. `mkdocs build --strict` → sạch → `git push`.

### ⚠️ Research Mandate (luật #1)

**KHÔNG** viết setting Unity (menu path, tên field, default) từ trí nhớ. Mọi giá trị phải đối chiếu [Unity 6.3 Manual chính thức](https://docs.unity3d.com/6000.3/Documentation/Manual/) hoặc verify từ project/Editor thật. Chỗ chưa chắc → đánh dấu `!!! warning "Cần verify"` cho tới khi xác nhận.

### Template trang (theo `docs/project-settings/quality.md`)

Mỗi trang content nên có:
- Blockquote target dòng đầu: `> **Target: Unity 6.3 LTS (6000.3)** · URP only…`
- `!!! abstract "TL;DR"` ngay sau intro (2–4 bullet).
- Icon `:material-...:` ở mỗi `## H2`.
- Bảng *setting → default → khuyến nghị* khi hợp lý.
- `!!! warning "Conflict: A ⚔️ B"` khi 2 setting xung khắc (verify trước).
- `## :material-link-variant: Nguồn` cuối trang, link tới Manual 6.3.

### Screenshot

Lưu PNG vào `docs/assets/screenshots/`, chèn bằng:
```markdown
![caption mô tả](../assets/screenshots/TÊN.png){ width="…" }
```
glightbox tự bật click-to-zoom. Trang trong `docs/assets/` thì dùng đường dẫn `screenshots/TÊN.png`.

---

## Quy ước

- **URP-only:** không viết nhánh Built-in Render Pipeline.
- **Tiếng Việt** cho nội dung; giữ thuật ngữ Unity bằng tiếng Anh (Scripting Backend, SRP Batcher…).
- Đã verify thì **không** gắn nhãn "(verified)" — chỉ giữ `Cần verify` cho chỗ chưa chắc.

## Cấu trúc

```
docs/                  nội dung (.md) + assets/screenshots/ + stylesheets/extra.css
mkdocs.yml             config + nav + theme + palette
.github/workflows/     CI deploy
SCREENSHOTS_TODO.md    bản đồ ảnh ↔ trang
PLAN_unity_docs_site.md  brief gốc
```
