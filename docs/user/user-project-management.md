# :material-clipboard-text: Project Management

Kelola proyek, tugas, dan kolaborasi tim (kanban/list).

## Ringkas
- Buat **Project**, tambah **Task/Subtask**
- Assign ke anggota, set **prioritas & due date**
- Ubah status via **Board (Kanban)** atau **List**
- Komentar, lampiran, dan **time log** (opsional)

## Mulai Cepat
1. **Projects → New Project**
2. Isi *Name, Owner, Members, Dates*
3. **Add Task** → isi *Title, Assignee, Priority, Due*
4. Pindah status di **Board** (To Do → In Progress → Review → Done)

### Alur Task
<div class="mermaid">
flowchart LR
  A["New Task"] --> B["In Progress"]
  B --> C{"Review"}
  C -->|Approve| D["Done"]
  C -->|Rework| B
</div>

## Fitur Utama
- **Views**: Board, List, My Tasks
- **Subtasks & checklists**
- **Labels/Tags** dan **Priority**
- **Attachments & comments**
- **Time logging** (opsional) & simple report

## Tips
- Gunakan **filters** (assignee/label/status) untuk fokus
- Mention rekan dengan `@nama` di komentar

## FAQ
**Tidak bisa memindah kartu?** Kemungkinan read-only: minta akses **Project Member** ke admin.
