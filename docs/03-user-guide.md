# :material-account-circle: Panduan Pengguna Horilla

> Untuk **karyawan (user biasa)** dan **atasan (manager)**. Screenshot masih berupa placeholder—ganti dengan milikmu di folder `docs/img/`.

---

## :material-rocket-launch: Mulai Cepat

1. Buka aplikasi: `https://app.domain`
2. Login dengan **username & password** atau **SSO/LDAP** (jika diaktifkan)
3. Anda akan tiba di **Dashboard**

![Dashboard utama](img/dashboard.png){ loading=lazy }

!!! tip "Lupa password?"
    Klik **Forgot Password** di halaman login. Jika pakai SSO, hubungi admin.

---

## :material-view-dashboard: Navigasi Utama

- :material-card-account-details-outline: **Profile**
- :material-calendar-check: **Attendance**
- :material-beach: **Leave**
- :material-cash: **Payroll**
- :material-lifebuoy: **Helpdesk**
- :material-check-decagram: **Approvals** *(khusus Manager)*
- :material-chart-box: **Reports** *(jika tersedia)*

---

## :material-card-account-details: Profil Karyawan

### Lihat & Ubah Profil
1. Masuk **Profile**
2. Edit field (alamat, kontak, foto) → **Save**

![Edit Profil](img/profile-edit.png){ loading=lazy }

### Dokumen
- Unggah KTP/NPWP/KK sesuai kebijakan (format: PDF/JPG/PNG)
- Perhatikan ukuran maksimum file

---

## :material-calendar-check: Kehadiran (Attendance)

### Check-In / Check-Out
1. Buka **Attendance**
2. Klik **Check-In** saat mulai kerja, dan **Check-Out** saat selesai

![Check-In / Check-Out](img/attendance-checkin.png){ loading=lazy }

### Face Detection / Biometrik *(opsional)*
- Pastikan kamera menyala & izin browser aktif
- Pencahayaan cukup

### Geofencing *(opsional)*
- Aktifkan layanan lokasi pada perangkat
- Absen hanya saat berada di area yang diizinkan

!!! tip
    Pengajuan **koreksi jam** bisa melalui menu koreksi (jika tersedia) atau **Helpdesk**.

---

## :material-beach: Cuti (Leave)

### Ajukan Cuti
1. **Leave → Apply Leave**
2. Pilih jenis & tanggal, isi alasan → **Submit**

![Form Apply Leave](img/leave-apply.png){ loading=lazy }

#### Alur Persetujuan

```mermaid
flowchart TD
  A["Employee Apply Leave"] --> B{"Validasi: kuota/rule"}
  B -->|OK| C["Send to Approver"]
  B -->|Tidak| X["Reject"]
  C --> D{"Approver Decide"}
  D -->|Approve| E["HR Check (opsional)"]
  D -->|Reject| X
  E --> F["Approved"]
  F --> G["Notifikasi"]
```

