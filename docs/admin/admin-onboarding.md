# Onboarding — Panduan Administrator

> Dokumen ini untuk **administrator/HR admin/ops** yang mengelola modul **Onboarding**: konfigurasi, peran/izin, integrasi, data, keamanan, pemeliharaan, dan troubleshooting.
> Terakhir diperbarui: 2025-09-17.

---

## 1) Ringkasan Modul & Tanggung Jawab Admin
- **Tujuan modul:** Menjamin karyawan baru siap bekerja melalui checklist terstruktur.
- **Pemilik proses:** HR / People Ops
- **Dependensi:** Employee master, akses sistem, perangkat
- **Peran yang terlibat:** Admin, HR, Manager, Buddy
- **Data sensitif:** Dokumen pribadi, kontrak

!!! note "Checklist kesiapan produksi"
    - Konfigurasi dasar selesai
    - Role & permission diuji minimal 1 siklus
    - Alur approval berjalan (happy path & edge case)
    - Backup/retention ditetapkan
    - Monitoring dasar aktif

---

## 2) Konfigurasi Dasar
1. Buka **Settings → Onboarding**
2. Isi parameter utama:
   - - Template checklist
- Penanggung jawab (PIC)
- Batas waktu tugas
- Notifikasi
3. Simpan & lakukan smoke test (lihat bagian *Pengujian & Validasi*).

**Variabel lingkungan (opsional):**
- - EMAIL_* untuk notifikasi

---

## 3) Role, Permission, dan Kebijakan Akses
- **Peran utama:** Admin, HR, Manager, Buddy
- **Akses minimum:** HR membuat paket onboarding; PIC update status; employee melihat tugasnya
- **Kebijakan data:** Dokumen pribadi terbatas hanya HR dan employee terkait

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
- - Onboarding Package (tasks, due date)
- Assignment (employee, PIC, status)

**Validasi:** 
- Wajib: Employee, paket, due date
- Unik: ID assignment
- Aturan khusus: Tidak boleh selesai jika ada task yang belum done

**Retensi & arsip:** Checklist disimpan minimal {24} bulan

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
- Rantai approve: HR → Manager (opsional)
- SLA internal: Semua tugas selesai di hari H+7 kerja (contoh)
- Notifikasi: email/in-app (pastikan SMTP aktif)

---

## 6) Integrasi & Otomatisasi (opsional)
- - Provisioning akun (opsional)
- DMS untuk dokumen

**Webhook/Callback:** onOnboardingComplete
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
- **Retensi:** Checklist disimpan minimal {24} bulan
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
- Otomasi provisioning
- Dashboard SLA per PIC

---

## Lampiran
- **Endpoint terkait (jika API terbuka):** /api/onboarding/*
- **Lokasi menu:** Onboarding
- **Tugas admin harian:** - Pantau tugas overdue
- Follow-up PIC
- Bereskan akses & perangkat
