# Employee Management — Panduan Administrator

> Dokumen ini untuk **administrator/HR admin/ops** yang mengelola modul **Employee Management**: konfigurasi, peran/izin, integrasi, data, keamanan, pemeliharaan, dan troubleshooting.
> Terakhir diperbarui: 2025-09-17.

---

## 1) Ringkasan Modul & Tanggung Jawab Admin
- **Tujuan modul:** Sumber data master karyawan dan lifecycle.
- **Pemilik proses:** HR / People Ops
- **Dependensi:** Org structure, payroll, attendance
- **Peran yang terlibat:** Admin, HR, Manager (read subordinates), Employee (self-service)
- **Data sensitif:** PII (alamat, kontak, dokumen)

!!! note "Checklist kesiapan produksi"
    - Konfigurasi dasar selesai
    - Role & permission diuji minimal 1 siklus
    - Alur approval berjalan (happy path & edge case)
    - Backup/retention ditetapkan
    - Monitoring dasar aktif

---

## 2) Konfigurasi Dasar
1. Buka **Settings → Employee**
2. Isi parameter utama:
   - - Field wajib & dynamic fields
- Dokumen wajib
- Akses self-service
3. Simpan & lakukan smoke test (lihat bagian *Pengujian & Validasi*).

**Variabel lingkungan (opsional):**
- - STORAGE_PATH untuk media

---

## 3) Role, Permission, dan Kebijakan Akses
- **Peran utama:** Admin, HR, Manager (read subordinates), Employee (self-service)
- **Akses minimum:** HR full; employee hanya akses data diri
- **Kebijakan data:** PII dilindungi; audit trail untuk perubahan kritikal

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
- - Employee (bio, job, status)
- Documents (type, expiry)
- Org (dept, manager)

**Validasi:** 
- Wajib: Nama, jabatan, status
- Unik: Employee ID, NIK (jika dipakai)
- Aturan khusus: Perubahan jabatan mengupdate struktur org

**Retensi & arsip:** Data ex-employee disimpan {5} tahun (kebijakan)

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
- Rantai approve: Employee → HR (untuk perubahan sensitif)
- SLA internal: Update profil sensitif < 3 hari kerja
- Notifikasi: email/in-app (pastikan SMTP aktif)

---

## 6) Integrasi & Otomatisasi (opsional)
- - Directory/LDAP (opsional)
- Payroll, Attendance

**Webhook/Callback:** onEmployeeCreated, onEmployeeUpdated
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
- **Retensi:** Data ex-employee disimpan {5} tahun (kebijakan)
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
- Self-service dynamic fields lebih kaya

---

## Lampiran
- **Endpoint terkait (jika API terbuka):** /api/employees/*
- **Lokasi menu:** Employee → Employees
- **Tugas admin harian:** - Review perubahan menunggu approval
- Validasi dokumen kadaluarsa
