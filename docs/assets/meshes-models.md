# Meshes & Models

> **Target: Unity 6.3 LTS (6000.3)** · URP only · **3D**. Cấu hình ở **Inspector của file model** (.fbx/.obj…), tab **Model**. Ảnh hưởng vertex count, RAM, draw call.

!!! abstract "TL;DR"
    - **Scale Factor:** chuẩn hoá kích thước về mét (1 unit = 1 m).
    - **Mesh Compression:** nén dữ liệu mesh (Off → High) — tiết kiệm size, có thể giảm chính xác.
    - **Read/Write Enabled:** **TẮT** nếu không sửa mesh lúc runtime → tiết kiệm RAM (nếu bật, mesh giữ 2 bản: CPU+GPU).
    - **Optimize Mesh** + **LOD** giảm chi phí GPU cho object xa.
    - **Generate Colliders:** chỉ bật khi cần collider từ mesh.

## :material-cog: Field chính (tab Model)

| Field | Ý nghĩa | Gợi ý |
|---|---|---|
| **Scale Factor** | Hệ số scale khi import | Chỉnh để 1 unit = 1 m |
| **Mesh Compression** | Nén mesh (Off/Low/Medium/High) | Tăng dần tới khi thấy méo |
| **Read/Write** | Giữ bản mesh ở CPU | **Off** trừ khi đọc/sửa mesh runtime |
| **Optimize Mesh** | Sắp lại vertex/index cho GPU | **On** |
| **Generate Colliders** | Tạo Mesh Collider | Off trừ khi cần |
| **Normals / Tangents** | Import hay tính lại | Tangents `Calculate` nếu có normal map |
| **Import BlendShapes** | Import morph target | Tắt nếu không dùng |

!!! warning "Conflict: Read/Write ⚔️ RAM"
    Bật **Read/Write** khiến mesh tồn tại **2 bản** (CPU + GPU) → gấp đôi RAM mesh. Chỉ bật khi thật sự cần truy cập mesh ở runtime (vd procedural, `Mesh.vertices`). Tương tự có **Read/Write** cho texture.

!!! info "Bố cục Inspector Model"
    Tab **Model** chia thành các nhóm *Scene* (có **Import BlendShapes**), *Meshes* (**Mesh Compression**, **Read/Write**, **Optimize Mesh**), *Geometry* (**Normals**, **Tangents**, **Generate Colliders**). Rig & animation nằm ở **tab Rig** và **tab Animation** riêng. (Nguồn: [Model Import Settings 6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/FBXImporter-Model.html).)

## :material-arrow-collapse: LOD (Level of Detail)

- **LOD Group** component: hoán đổi mesh đơn giản hơn khi object ra xa camera → giảm vertex GPU phải xử lý.
- Cấu hình ngưỡng chuyển LOD; liên quan **LOD Group Bias / Maximum LOD Group Level** ở [Quality](../project-settings/quality.md).
- Quan trọng cho cảnh nhiều object / tầm nhìn xa, đặc biệt **mobile**.

## :material-flash: Tối ưu theo platform

=== "PC"
    - Vertex budget cao hơn; vẫn dùng LOD cho cảnh lớn.
    - Mesh Compression vừa phải để giữ nét.

=== "Mobile"
    - **Giảm poly count** ngay từ DCC (Blender/Maya).
    - Mesh Compression mạnh hơn; **Read/Write Off**.
    - LOD + culling tích cực; gộp mesh tĩnh để batch.

## :material-flash: Checklist 3D

- [ ] Scale Factor → 1 unit = 1 m.
- [ ] Read/Write **Off** (trừ khi cần runtime).
- [ ] Optimize Mesh **On**.
- [ ] Tangents = Calculate nếu dùng normal map, ngược lại None.
- [ ] Tắt Blend Shapes/Rig nếu model tĩnh.
- [ ] LOD Group cho object xuất hiện ở xa.

## :material-link-variant: Nguồn

- [Model import settings — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/class-FBXImporter.html)
- [Optimizing graphics performance — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/OptimizingGraphicsPerformance.html)
- [Level of Detail (LOD) — Unity 6.3 Manual](https://docs.unity3d.com/6000.3/Documentation/Manual/LevelOfDetail.html)
