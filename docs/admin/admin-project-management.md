# Project Management (Development Under Process) — Panduan Administrator

> Dokumen ini untuk **administrator/HR admin/ops** yang mengelola modul **Project Management**: konfigurasi, peran/izin, integrasi, data, keamanan, pemeliharaan, dan troubleshooting.
> Terakhir diperbarui: 2025-09-17.

---

## 1) Ringkasan Modul & Tanggung Jawab Admin
- **Tujuan modul:** Tugas/proyek & progres (dalam pengembangan).
- **Pemilik proses:** Project Owner / PM
- **Dependensi:** Template proyek, relasi ke attendance (opsional)
- **Peran yang terlibat:** Admin, PM, Member
- **Data sensitif:** Lampiran proyek

!!! note "Checklist kesiapan produksi"
    - Konfigurasi dasar selesai
    - Role & permission diuji minimal 1 siklus
    - Alur approval berjalan (happy path & edge case)
    - Backup/retention ditetapkan
    - Monitoring dasar aktif

---

## 2) Konfigurasi Dasar
1. Buka **Settings → Projects**
2. Isi parameter utama:
   - - Template task
- Status/label
- Visibilitas proyek
3. Simpan & lakukan smoke test (lihat bagian *Pengujian & Validasi*).

**Variabel lingkungan (opsional):**
- - PM_REPORT (opsional)

---

## 3) Role, Permission, dan Kebijakan Akses
- **Peran utama:** Admin, PM, Member
- **Akses minimum:** PM membuat & assign; member update progres
- **Kebijakan data:** Akses berbasis keanggotaan proyek

Contoh pemetaan (sesuaikan di Django Admin/Role Manager):

| Role | Create | Read | Update | Delete | Approve |
|------|--------|------|--------|--------|---------|
| Admin | ✔ | ✔ | ✔ | ✔ | ✔ |
| HR/Owner | ✔ | ✔ | ✔ | ⚠ (terbatas) | ✔ |
| Manager | ✖ | ✔ (bawahan) | ✖ | ✖ | ✔ |
| Employee | ✖ | ✔ (pribadi) | ✖ | ✖ | ✖ |

---

## 4) Struktur Data & Validasi
**Entitas utama & field penting:**
- - Project (name, owner)
- Task (assignee, due, status)

**Validasi:** 
- Wajib: Nama, owner
- Unik: Project code (opsional)
- Aturan khusus: Task wajib punya assignee & due date

**Retensi & arsip:** Arsip proyek {24} bulan

---

## 5) Alur Kerja & Approval

```mermaid
flowchart TD
  A[Create/Update Item] --> B{{Validation}}
  B -->|OK| C[Submit]
  B -->|Fail| X[Fix & Resubmit]
  C --> D{{Approval Chain}}
  D -->|Approve| E[Publish/Activate]
  D -->|Reject| X
  E --> F[Notify Stakeholders]
```

**Konfigurasi approval:**
- Rantai approve: Tidak wajib; gunakan review step jika perlu
- SLA internal: Update progres mingguan
- Notifikasi: email/in-app (pastikan SMTP aktif)

---

## 6) Integrasi & Otomatisasi (opsional)
- - BI/Reporting

**Webhook/Callback:** onTaskCompleted
**Import/Export:** CSV/XLSX (periksa delimiter, encoding UTF-8)

---

## 7) Pengujian & Validasi
- **Smoke test:** buat → submit → approve → publish
- **Hak akses:** uji view/edit/delete per role
- **Data edge:** nilai kosong, tanggal bentrok, lampiran besar
- **Kinerja:** list >10k baris (gunakan filter & pagination)
- **Pembuktian:** screenshot/log hasil uji disimpan

---

## 8) Monitoring, Logging & Audit
- **Audit trail:** perubahan penting (create/update/delete/approve)
- **Log aplikasi:** error 4xx/5xx, timeout, validasi
- **Metrik:** throughput, error rate, waktu approve, backlog
- **Alert:** lonjakan 5xx, antrean approval > SLA

---

## 9) Backup, Restore & Retensi
- **Backup DB:** harian, format *custom* `.dump`
- **Backup lampiran:** sinkron rsync/object storage
- **Retensi:** Arsip proyek {24} bulan
- **Uji restore berkala:** buat environment *restore-test*

---

## 10) Keamanan & Kepatuhan
- **RBAC ketat** (least privilege)
- **PII/Payroll**: enkripsi in-transit (TLS), at-rest sesuai kebijakan
- **Sanitasi upload** (ekstensi/ukuran), antivirus (opsional)
- **Log admin** disimpan minimal 12 bulan

---

## 11) Troubleshooting Cepat
- **Tidak bisa create/update:** cek validation & permission
- **Approval tidak terkirim:** cek SMTP & rules notifier
- **Duplikasi data:** periksa constraint unik & import policy
- **Lambat saat listing:** aktifkan filter/pagination, kaji index DB
- **Lampiran gagal:** periksa batas ukuran & storage path

---

## 12) Roadmap & Catatan
- Gantt & kapasitas tim

---

## Lampiran
- **Endpoint terkait (jika API terbuka):** /api/projects/*
- **Lokasi menu:** Projects (Beta)
- **Tugas admin harian:** - Bersihkan backlog stale
- Review milestone
