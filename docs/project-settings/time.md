# Time Settings

> **Target: Unity 6.3 LTS (6000.3)**. Default từ template `6000.3.10f1` (`TimeManager.asset`). Menu: `Edit > Project Settings > Time`.

!!! abstract "TL;DR"
    - **Fixed Timestep 0.02** (50 Hz) — nhịp `FixedUpdate` & physics.
    - **Maximum Allowed Timestep 0.3333** — chặn "spiral of death" khi lag.
    - **Time Scale 1** — pause = 0, slow-mo < 1.

## :material-clock-outline: Default value

| Field | Default | Ý nghĩa |
|---|---|---|
| Fixed Timestep | **0.02** (50 Hz) | Tần suất `FixedUpdate` + mỗi physics step |
| Maximum Allowed Timestep | **0.3333** | Trần thời gian dành cho physics mỗi frame khi máy lag |
| Time Scale | **1** | Hệ số tốc độ thời gian (0 = pause, 0.5 = slow-mo) |
| Maximum Particle Timestep | **0.03** | Bước thời gian tối đa cho particle simulation |

## :material-flash: Tối ưu & lưu ý

- **Fixed Timestep ↔ Physics:** mỗi `FixedUpdate` chạy 1 physics step. `0.02` = 50 lần/giây.
    - **Mobile nặng physics:** cân nhắc `0.0333` (30 Hz) → giảm tải CPU, đổi lại physics kém mượt/chính xác hơn.
    - **Cần physics mượt 60 Hz:** `0.01667`.
- ⚠️ **Đừng** đặt Fixed Timestep quá nhỏ (vd `0.005`): physics chạy quá nhiều lần mỗi frame → tụt fps.
- **Maximum Allowed Timestep** giữ ở mặc định: khi 1 frame quá dài (lag spike), Unity giới hạn số physics step bù để không "lag chồng lag" (spiral of death).
- **`Time.timeScale`** (code) dùng cho pause / slow-mo. Lưu ý `FixedUpdate` cũng co giãn theo timeScale; UI/animation muốn chạy khi pause thì dùng `Time.unscaledDeltaTime`.

## :material-link-variant: Nguồn

- Dữ liệu: template `6000.3.10f1` — `TimeManager.asset`.
- [Time settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-TimeManager.html)
