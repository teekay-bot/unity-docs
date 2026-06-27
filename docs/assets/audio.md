# Audio

> **Target: Unity 6.3 LTS (6000.3)** · URP only. Cấu hình ở **Inspector của file âm thanh**. Chiến lược nén khác nhau giữa **SFX ngắn** và **nhạc nền dài**.

!!! abstract "TL;DR"
    - **Load Type** quyết định cách clip vào RAM: `Decompress On Load`, `Compressed In Memory`, `Streaming`.
    - **Compression Format:** `Vorbis` (mặc định, nhạc), `ADPCM`/`PCM` (SFX ngắn), `MP3`.
    - **SFX ngắn** → ADPCM/PCM + Decompress On Load (CPU rẻ khi phát).
    - **Nhạc nền dài** → Vorbis + **Streaming** (không nạp hết vào RAM).
    - **Force To Mono** cho SFX → nửa dung lượng, hợp âm thanh 3D positional.

## :material-cog: Load Type

| Load Type | Cách hoạt động | Dùng cho |
|---|---|---|
| **Decompress On Load** | Giải nén hết vào RAM khi load | SFX ngắn, phát nhiều lần |
| **Compressed In Memory** | Giữ nén trong RAM, giải nén khi phát | Clip vừa, nhiều clip |
| **Streaming** | Đọc dần từ đĩa, RAM tối thiểu | Nhạc nền dài, voice dài |

!!! warning "Conflict: Decompress On Load ⚔️ clip dài"
    `Decompress On Load` với clip **dài** (nhạc nền) sẽ ngốn **RAM khổng lồ** (giải nén toàn bộ). Nhạc dài luôn dùng **Streaming** hoặc Compressed In Memory.

## :material-tune: Compression Format

| Format | Đặc điểm | Dùng cho |
|---|---|---|
| **Vorbis** | Nén lossy, có **Quality** slider | Nhạc nền, voice (mặc định) |
| **ADPCM** | Nén nhẹ, giải nén CPU rất rẻ | SFX bắn/va chạm phát liên tục |
| **PCM** | Không nén, chất lượng tối đa | SFX rất ngắn cần nét |
| **MP3** | Lossy | Tùy nền tảng |

- **Quality** (Vorbis): kéo xuống ~70% thường vẫn ổn tai, giảm size đáng kể.
- **Sample Rate Setting:** `Optimize Sample Rate` hoặc override để hạ sample rate clip không cần nét.

!!! warning "Cần verify"
    Tên/nhãn chính xác các tùy chọn (vd `Preload Audio Data`, `Load In Background`) trong Inspector 6.3 nên xác nhận trực tiếp Editor.

## :material-account-voice: Force To Mono & 3D

- **Force To Mono:** SFX positional trong không gian 3D nghe mono là đủ → **giảm nửa dung lượng**.
- Nhạc nền/ambience stereo thì giữ stereo.

## :material-flash: Khuyến nghị theo loại clip

=== "SFX ngắn (bắn, click, bước chân)"
    - Load Type: **Decompress On Load**
    - Format: **ADPCM** (hoặc PCM nếu cực ngắn)
    - **Force To Mono** nếu là âm 3D
    - Phát qua **pooled AudioSource** (xem [Object Pooling](../scripting/object-pooling.md))

=== "Nhạc nền dài"
    - Load Type: **Streaming**
    - Format: **Vorbis**, Quality ~70%
    - Giữ Stereo

=== "Voice / dialogue dài"
    - Load Type: **Streaming** hoặc Compressed In Memory
    - Format: **Vorbis**

## :material-flash: Checklist tối ưu

- [ ] SFX ngắn: ADPCM/PCM + Decompress On Load + Force To Mono.
- [ ] Nhạc dài: Vorbis + Streaming (KHÔNG Decompress On Load).
- [ ] Hạ Vorbis Quality tới mức tai chấp nhận được.
- [ ] Cân nhắc hạ Sample Rate cho clip không cần nét.

## :material-link-variant: Nguồn

- [Audio Clip import settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-AudioClip.html)
- [Audio files — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/AudioFiles.html)
