# Recruitment — Panduan Administrator

> Dokumen ini untuk **administrator/HR admin/ops** yang mengelola modul **Recruitment**: konfigurasi, peran/izin, integrasi, data, keamanan, pemeliharaan, dan troubleshooting.
> Terakhir diperbarui: 2025-09-17.

---

## 1) Ringkasan Modul & Tanggung Jawab Admin
- **Tujuan modul:** Mengelola lowongan, pipeline kandidat, interview, dan offering.
- **Pemilik proses:** HR / Recruitment Lead
- **Dependensi:** Struktur jabatan, departemen, email notifier
- **Peran yang terlibat:** Admin, HR Recruiter, Manager (Approver)
- **Data sensitif:** CV, data pribadi kandidat

!!! note "Checklist kesiapan produksi"
    - Konfigurasi dasar selesai
    - Role & permission diuji minimal 1 siklus
    - Alur approval berjalan (happy path & edge case)
    - Backup/retention ditetapkan
    - Monitoring dasar aktif

---

## 2) Konfigurasi Dasar
1. Buka **Settings → Recruitment**
2. Isi parameter utama:
   - - Pipeline stages
- Template email
- SLA interview
- Lampiran (maks ukuran)
3. Simpan & lakukan smoke test (lihat bagian *Pengujian & Validasi*).

**Variabel lingkungan (opsional):**
- - EMAIL_* untuk SMTP
- LIMIT_UPLOAD_MB (opsional)

---

## 3) Role, Permission, dan Kebijakan Akses
- **Peran utama:** Admin, HR Recruiter, Manager (Approver)
- **Akses minimum:** HR Recruiter untuk CRUD kandidat; Manager sebagai approver; Employee read-only tidak diperlukan
- **Kebijakan data:** Kandidat bukan karyawan → batasi akses hanya ke HR terkait; hapus/anonimkan data sesuai kebijakan privasi

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
- - Job Opening (title, dept, location, status)
- Candidate (name, email, phone, source)
- Stage (status, notes)
- Interview (time, interviewer, result)

**Validasi:** 
- Wajib: Job title, kandidat (nama, kontak), stage
- Unik: Job code (opsional), email kandidat (opsional per job)
- Aturan khusus: Wajib stage berurutan; jadwal interview tidak boleh bentrok

**Retensi & arsip:** Kandidat ditolak disimpan {6-12} bulan (sesuai kebijakan)

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
- Rantai approve: HR → Hiring Manager
- SLA internal: Undangan interview < 3 hari kerja; keputusan < 5 hari kerja
- Notifikasi: email/in-app (pastikan SMTP aktif)

---

## 6) Integrasi & Otomatisasi (opsional)
- - Kalender email untuk undangan interview
- ATS eksternal (opsional)

**Webhook/Callback:** onCandidateStageChanged, onOfferIssued
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
- **Retensi:** Kandidat ditolak disimpan {6-12} bulan (sesuai kebijakan)
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
- Integrasi e-sign untuk offering
- Penilaian terstruktur (scorecard)

---

## Lampiran
- **Endpoint terkait (jika API terbuka):** /api/recruitment/* (cek dokumentasi API)
- **Lokasi menu:** Recruitment
- **Tugas admin harian:** - Review kandidat baru
- Update stage
- Kirim undangan interview
- Laporan harian pipeline
