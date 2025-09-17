# Asset Management — Panduan Administrator

> Dokumen ini untuk **administrator/HR admin/ops** yang mengelola modul **Asset Management**: konfigurasi, peran/izin, integrasi, data, keamanan, pemeliharaan, dan troubleshooting.
> Terakhir diperbarui: 2025-09-17.

---

## 1) Ringkasan Modul & Tanggung Jawab Admin
- **Tujuan modul:** Siklus aset: stok, handover, retur, hilang/rusak.
- **Pemilik proses:** GA/IT Asset Admin
- **Dependensi:** Kategori, lokasi, nomor seri
- **Peran yang terlibat:** Admin aset, HR/Manager (read), Employee (own assets)
- **Data sensitif:** Nomor seri, data lokasi aset

!!! note "Checklist kesiapan produksi"
    - Konfigurasi dasar selesai
    - Role & permission diuji minimal 1 siklus
    - Alur approval berjalan (happy path & edge case)
    - Backup/retention ditetapkan
    - Monitoring dasar aktif

---

## 2) Konfigurasi Dasar
1. Buka **Settings → Assets**
2. Isi parameter utama:
   - - Kategori & kode aset
- Status (available/in-use)
- Handover form
3. Simpan & lakukan smoke test (lihat bagian *Pengujian & Validasi*).

**Variabel lingkungan (opsional):**
- - ASSET_PREFIX (opsional)

---

## 3) Role, Permission, dan Kebijakan Akses
- **Peran utama:** Admin aset, HR/Manager (read), Employee (own assets)
- **Akses minimum:** Admin aset CRUD; employee melihat asetnya
- **Kebijakan data:** Audit trail wajib untuk serah-terima

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
- - Asset (code, serial, status)
- Assignment (employee, date)
- Incident (lost/damaged)

**Validasi:** 
- Wajib: Code, kategori, status
- Unik: Asset code, serial number
- Aturan khusus: Tidak bisa assign jika status bukan available

**Retensi & arsip:** Riwayat aset disimpan {60} bulan

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
- Rantai approve: Assignment oleh admin aset; manager diberi notifikasi
- SLA internal: Penyerahan aset H-1 sebelum mulai kerja
- Notifikasi: email/in-app (pastikan SMTP aktif)

---

## 6) Integrasi & Otomatisasi (opsional)
- - Barcode/QR (opsional)

**Webhook/Callback:** onAssetAssigned, onAssetReturned
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
- **Retensi:** Riwayat aset disimpan {60} bulan
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
- Stok minimum & reminder otomatis

---

## Lampiran
- **Endpoint terkait (jika API terbuka):** /api/assets/*
- **Lokasi menu:** Assets
- **Tugas admin harian:** - Review aset overdue retur
- Update status hilang/rusak
