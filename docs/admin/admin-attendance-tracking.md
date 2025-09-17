# Attendance Tracking — Panduan Administrator

> Dokumen ini untuk **administrator/HR admin/ops** yang mengelola modul **Attendance Tracking**: konfigurasi, peran/izin, integrasi, data, keamanan, pemeliharaan, dan troubleshooting.
> Terakhir diperbarui: 2025-09-17.

---

## 1) Ringkasan Modul & Tanggung Jawab Admin
- **Tujuan modul:** Kehadiran harian, koreksi, dan kepatuhan jam kerja.
- **Pemilik proses:** HR / Timekeeper
- **Dependensi:** Shift, geofencing/biometric (opsional)
- **Peran yang terlibat:** Admin, HR/Timekeeper, Manager, Employee
- **Data sensitif:** Lokasi, foto (jika face detection)

!!! note "Checklist kesiapan produksi"
    - Konfigurasi dasar selesai
    - Role & permission diuji minimal 1 siklus
    - Alur approval berjalan (happy path & edge case)
    - Backup/retention ditetapkan
    - Monitoring dasar aktif

---

## 2) Konfigurasi Dasar
1. Buka **Settings → Attendance**
2. Isi parameter utama:
   - - Shift & jam kerja
- Geofencing/biometrik
- Kebijakan koreksi
- Batas keterlambatan
3. Simpan & lakukan smoke test (lihat bagian *Pengujian & Validasi*).

**Variabel lingkungan (opsional):**
- - GEO_RADIUS, DEVICE_WHITELIST (opsional)

---

## 3) Role, Permission, dan Kebijakan Akses
- **Peran utama:** Admin, HR/Timekeeper, Manager, Employee
- **Akses minimum:** Employee check-in/out; manager approve koreksi; HR mengelola shift
- **Kebijakan data:** Data lokasi/foto diproteksi & dibatasi retensi

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
- - Attendance (in/out/time, device)
- Correction Request (reason, proof)

**Validasi:** 
- Wajib: Tanggal/jam, employee
- Unik: Record per hari/shift
- Aturan khusus: Check-out wajib setelah check-in; koreksi perlu bukti

**Retensi & arsip:** Log kehadiran disimpan {24} bulan

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
- Rantai approve: Employee → Manager/HR
- SLA internal: Koreksi diproses < 2 hari kerja
- Notifikasi: email/in-app (pastikan SMTP aktif)

---

## 6) Integrasi & Otomatisasi (opsional)
- - Perangkat fingerprint
- Face detection

**Webhook/Callback:** onCheckIn, onCheckOut, onCorrectionApproved
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
- **Retensi:** Log kehadiran disimpan {24} bulan
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
- Analitik keterlambatan & heatmap lokasi

---

## Lampiran
- **Endpoint terkait (jika API terbuka):** /api/attendance/*
- **Lokasi menu:** Attendance
- **Tugas admin harian:** - Monitor anomali (double check-in)
- Proses koreksi
