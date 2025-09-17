# Calendar App (Development Under Process) — Panduan Pengguna

> Dokumen ini menjelaskan cara menggunakan modul **Calendar App** untuk pengguna aplikasi Horilla.
> Terakhir diperbarui: 2025-09-17.

---

## 1) Ringkasan Modul
- **Tujuan:** Penjadwalan event rapat/cuti, sinkronisasi kalender (fitur dalam pengembangan).
- **Siapa yang menggunakan:** Semua pengguna (saat rilis).
- **Tergantung pada:** Integrasi kalender (Google/MS) — opsional ke depan.
- **Izin minimal:** Create/read event pribadi, admin dapat mengatur kalender tim.

!!! tip "Butuh bantuan?"
    Jika ada menu yang tidak terlihat, kemungkinan Anda tidak memiliki izin/role yang sesuai. Hubungi admin.

---

## 2) Akses & Navigasi
1. Masuk ke aplikasi Horilla.
2. Buka menu **Calendar (Beta)** dari sidebar.
3. Gunakan **pencarian, filter,** dan **aksi** yang tersedia di bagian atas daftar.

---

## 3) Alur Kerja Umum

```mermaid
flowchart TD
  A[Mulai] --> B[Open Calendar App]
  B --> C{{Tinjau data/daftar}}
  C -->|Tambah| D[Form input]
  C -->|Edit| E[Ubah data]
  C -->|Lihat| F[Detail]
  D --> G[Submit]
  E --> G
  F --> G
  G --> H{{Approval/Validasi?}}
  H -->|Ya| I[Menunggu keputusan]
  H -->|Tidak| J[Selesai]
  I --> K{{Keputusan}}
  K -->|Disetujui| J
  K -->|Ditolak| L[Perbaiki & ajukan ulang]
```

---

## 4) Tugas yang Sering Dilakukan

### 4.1 Membuat entri baru
1. Klik **New / Create**.
2. Isi field yang wajib bertanda *\**.
3. Klik **Save/Submit**.

### 4.2 Mengedit entri
1. Buka item pada daftar → **Edit**.
2. Ubah field yang diizinkan → **Save**.

### 4.3 Mencari & memfilter
- Gunakan kolom pencarian dan filter (tanggal/status/kategori).
- Klik **Reset** untuk menghapus filter.

### 4.4 Ekspor data (jika tersedia)
- Klik **Export** untuk mengunduh CSV/XLSX/PDF.

---

## 5) Notifikasi & Persetujuan
- Notifikasi dikirim saat item dibuat/diubah/diajukan untuk approval.
- Status **Pending/Approved/Rejected** tampil pada kolom **Status**.
- Manajer melakukan **Approve/Reject** dari menu **Approvals** atau dari detail item (jika tersedia).

---

## 6) Tips & Best Practice
- Gunakan **lampiran/evidence** bila diminta (format JPG/PNG/PDF).
- Pastikan data yang diisi akurat untuk mempercepat approval.
- Periksa **riwayat/aktivitas** untuk melihat perubahan pada item.

---

## 7) FAQ
**Q:** Saya tidak melihat tombol *New/Create*  
**A:** Izin Anda kemungkinan hanya *read-only*. Hubungi admin untuk akses yang sesuai.

**Q:** Status saya tidak berubah sejak kemarin  
**A:** Cek notifikasi/komentar di item; jika perlu, hubungi approver atau buat tiket Helpdesk.

**Q:** File lampiran gagal diunggah  
**A:** Periksa ukuran/format file, coba ulang, atau kompres dokumen.

---

## 8) Referensi Cepat
- Sidebar → **Calendar (Beta)**
- Notifikasi → ikon lonceng di header
- Bantuan → **Helpdesk**

---

## 9) Catatan Khusus Modul
- Saat ini dalam pengembangan; beberapa fitur mungkin belum tersedia.

