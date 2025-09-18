# Roadmap, Framework, KPI & RACI – HRIS (Horilla) untuk Operasi Manage Services
_Tanggal: 2025-09-18_

## Ringkasan Eksekutif
Tujuan: membangun HRIS berbasis **Horilla** untuk mendukung operasi **manage services** (body shopping, partial & full manage service) agar:
- Proses SDM ujung-ke-ujung (hire → onboard → assign → timesheet → kinerja → pelatihan → payroll → offboard) berjalan konsisten sesuai **SLA/KPI pelanggan**.
- Ketersediaan dan utilisasi personil terjaga, biaya terkendali, serta kepatuhan kontrak/etik terjamin.

Stakeholder utama: **Product IT Manage Outsourcing (PIMO), HCM, Presales, Sales, Solution Architect (SA), Delivery Project (DP), Project Manager (PM), Finance, Procurement, Customer Operation (CO), Legal.**

---

## Prinsip & Scope
**Prinsip**
1. *Compliance by design*: kebijakan & kontrak jadi kontrol di sistem.
2. *Single source of truth*: master data karyawan, project & kompetensi terpusat.
3. *Automation first*: pengingat, SLA counter, dan approval berjenjang otomatis.
4. *Measurable outcomes*: setiap proses punya metrik & dashboard.
5. *Security & privacy*: role-based access (least privilege), audit trail.

**Scope modul Horilla (prioritas)**
- Core HR: struktur organisasi, jabatan, grade, kontrak, dokumen.
- Recruitment & Interview: pipeline, panel interviewer, skor, offer.
- Onboarding/Offboarding: checklist multi-stakeholder, akses & aset.
- Assignment & Project: penempatan, skill matching, kontrak/SOW.
- Attendance, Leave, Timesheet: kehadiran, cuti, jam kerja & approval.
- Performance & L&D: OKR/KPI, review 90 hari, training & sertifikasi.
- Payroll/Expense (integrasi): komponen gaji, allowance, reimbursement.
- Compliance & Legal: kontrak, addendum, SLA, kode etik, NDA.
- Reporting & Dashboard: eksekutif, operasional, hiring, training.

---

## Roadmap Implementasi (fase & deliverables)
> Estimasi dapat disesuaikan kapasitas tim; tiap fase punya **exit criteria** yang jelas.

### Discovery & Blueprint (2–4 minggu)
**Aktivitas kunci**
- Pemetaan proses E2E manage service (as-is → to-be), kebijakan & SLA per pelanggan.
- Definisi data model: Employee, Project, Assignment, Skill & Level, Certification, Timesheet, Leave, Payroll element.
- Strategi migrasi data & penomoran dokumen.
- RACI awal dan tahapan cutover.

**Deliverables**: Dokumen Blueprint, DFD/Swimlane, Data Dictionary, RACI v1, Backlog Epik/User Story, Strategi Migrasi & Cutover.

**Exit criteria**: proses to-be disetujui; scope & prioritas modul disepakati.

### Foundation & Core HR (4–6 minggu)
**Aktivitas kunci**
- Setup Horilla: struktur organisasi, departemen, role/permission, security.
- Master data karyawan & kontrak; template dokumen & e-sign flow.
- Kebijakan cuti & jam kerja; kalender hari libur.

**Deliverables**: lingkungan *non-prod & prod*, role matrix, kebijakan cuti/attendance, template kontrak, audit trail baseline.

**Exit criteria**: login SSO (opsional), master data akurat ≥98%, kebijakan & approval berjalan.

### Operasi Manage Service (6–8 minggu)
**Aktivitas kunci**
- Recruitment & Interview: pipeline, panel, scoring, SLA *time-to-fill*.
- Assignment & Project: skill matrix, *bench management*, demand intake.
- Timesheet & SLA: definisi paket layanan per pelanggan, counter SLA, approval.
- Performance & L&D: KPI/OKR, 90-day review, training plan & sertifikasi.
- Dashboard Operasional & Eksekutif.

**Deliverables**: alur recruit→assign→timesheet end-to-end, dashboard KPI, notifikasi & eskalasi.

**Exit criteria**: ≥95% timesheet on-time 2 siklus berturut-turut; laporan SLA per pelanggan terbit otomatis.

### Integrasi & Finansial (6–8 minggu)
**Aktivitas kunci**
- Integrasi: Payroll & Finance (komponen gaji, GL mapping, invoicing data), Procurement (PO outsourcing), Ticketing/ITSM & Customer portal (opsional), DMS/e-sign.
- Biaya proyek: *rate card*, margin tracking, *budget vs actual*.
- Compliance & Legal: kontrak, addendum, NDA & audit.

**Deliverables**: integrasi prioritas, *billing pack* otomatis (timesheet tersertifikasi), laporan margin per proyek.

**Exit criteria**: *billing pack* terbit tepat waktu ≥98%; *budget variance* <±5%.

### Fase 4 – Scale & Optimization (berjalan)
**Aktivitas kunci**
- Automasi lanjutan (pengingat SLA, rebalancing beban kerja, rekomendasi matching skill).
- Analitik & prediksi: *attrition risk*, *capacity forecasting*, *recruitment funnel effectiveness*.
- *Post-implementation review* triwulanan.

**Deliverables**: playbook otomatisasi, model prediktif dasar, rencana perbaikan berkelanjutan.

**Exit criteria**: KPI stabil ≥2 kuartal; efisiensi operasional meningkat.

---

## Framework Operasi E2E Manage Service (DAP²: Data–Application–Process–People)

**A. Data**
- Master: Employee, Skill, Certification, Project, Assignment, Customer, Rate Card.
- Transaksional: Requisition, Interview, Offer, Onboarding, Timesheet, Leave, Expense, Performance, Training, Offboarding.
- Kualitas data: duplikasi <0,5%; kelengkapan >98%; audit trail 100%.

**B. Aplikasi (Horilla + Integrasi)**
- Horilla sebagai sistem inti HR. Integrasi: Payroll, Finance/ERP, Procurement, ITSM/Ticketing, DMS/e-sign, SSO.
- Role-based access: HCM, Delivery Project, **PM**, Finance, Procurement, Legal, Customer Operation.

**C. Proses (Swimlane ringkas)**

1) **Demand Intake** (Sales/Presales → Delivery Project/HCM/PM): requisition, skill & SLA.
2) **Workforce Planning** (Delivery Project/HCM/PM): cek bench, *gap*, rencana perekrutan.
3) **Recruitment & Interview** (HCM + SA + Delivery + **PM**): shortlist, panel, keputusan.
4) **Offer & Contract** (HCM + Legal + Finance): paket kompensasi, *rate card*, e-sign.
5) **Onboarding** (HCM + PIMO + CO + **PM**): akses, aset, induksi.
6) **Assignment** (Delivery Project + **PM**): mapping ke proyek & jadwal.
7) **Timesheet & SLA** (Delivery Project + **PM** + CO): pencatatan, verifikasi pelanggan, counter SLA.
8) **Performance & L&D** (HCM + Delivery Project + **PM**): KPI/OKR, 90-hari, training/sertifikasi.
9) **Payroll & Billing** (Finance + Procurement + **PM**): payroll, *billing pack*, invoice.
10) **Offboarding/Rotation** (HCM + Delivery Project + Legal + **PM**): exit, *knowledge transfer*.

**D. People (Governance & Cadence)**
- **SteerCo bulanan**: eksekutif lintas fungsi, review KPI, *risk/decision log*.
- **PMO mingguan**: burning issues, kapasitas, rekrutmen, SLA.
- **Ops daily**: pengecekan timesheet, insiden, *approvals*.

---

## KPI (Balanced Scorecard) – definisi, rumus, target
> Gunakan *leading & lagging indicators*; target awal dapat dikalibrasi per pelanggan.

### A. Pelanggan
1. **SLA Kepatuhan** = (# terekam sesuai SLA ÷ # total permintaan) × 100% → **Target ≥ 98%**
2. **On-time Billing Pack** = (# billing pack tepat waktu ÷ # billing pack) × 100% → **≥ 98%**
3. **Customer Satisfaction (CSAT/NPS)**: survei bulanan/kuartal → **CSAT ≥ 4,5/5; NPS ≥ +40**
4. **Incident MTTR**: median jam dari tiket dibuka → tertutup → **≤ 8 jam** (sesuai kontrak)

### B. Operasional
5. **Utilization Rate** = (jam billable ÷ jam kerja tersedia) × 100% → **75–85%**
6. **Time-to-Fill** (recruitment) = rata-rata hari dari requisition → offer *accepted* → **≤ 21 hari**
7. **Time-to-Onboard** = hari dari offer *accepted* → *productive ready* → **≤ 7 hari**
8. **Timesheet Compliance** = (# timesheet on-time ÷ # karyawan aktif) × 100% → **≥ 95%**
9. **First-90-Day Success Rate** = (# karyawan lulus review 90 hari ÷ # onboard) × 100% → **≥ 90%**

### C. People & Kualitas
10. **Training Coverage** = (# karyawan ikut pelatihan ÷ # target) × 100% → **≥ 90%/kuartal**
11. **Certification Count** = jumlah sertifikasi aktif per skill area → **tren meningkat**
12. **Attrition (Voluntary)** = (# resign sukarela ÷ # rata-rata headcount) × 100% → **≤ 10%/tahun**
13. **Quality of Hire** = skor gabungan (90-day + manager rating + probation pass) → **≥ 4/5**

### D. Finansial
14. **Margin Proyek** = (pendapatan – biaya langsung) ÷ pendapatan → **≥ 25%**
15. **Budget Variance** = (aktual – anggaran) ÷ anggaran → **−5% s/d +5%**
16. **DSO (Days Sales Outstanding)** → **≤ 45 hari**

**Dashboard Minimum**
- Eksekutif: SLA, margin, utilization, CSAT, attrition.
- Operasional: timesheet compliance per proyek/individu, *time-to-fill*, onboarding, incident MTTR.
- People: training coverage, sertifikasi, 90-day success.
- Finansial: billing pack status, AR ageing, budget vs actual.

---

## RACI Matrix (dengan Project Manager)
**Legenda**: R = Responsible, A = Accountable, C = Consulted, I = Informed.

### 5.1 Rekrutmen & Penempatan
| Aktivitas | PIMO | HCM | Presales | Sales | SA | DP | **PM** | Finance | Procurement | CO | Legal |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Demand Intake & Requisition | C | A/R | C | R | C | C | C | I | I | C | I |
| Penyusunan Job/Skill Profile | C | A/R | C | I | R | C | C | I | I | C | C |
| Sourcing & Screening | I | A/R | I | I | C | C | I | I | I | I | I |
| Interview & Scoring | I | A/R | I | I | R | R | **R** | I | I | I | I |
| Offer & Kompensasi | I | R | I | I | C | C | C | A/R | C | I | C |
| Kontrak Tenaga Kerja | I | R | I | I | I | I | I | C | I | I | A/R |
| Assignment ke Proyek | C | C | I | I | C | A | **R** | I | I | C | I |

### Operasi & SLA
| Aktivitas | PIMO | HCM | Presales | Sales | SA | DP | **PM** | Finance | Procurement | CO | Legal |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timesheet Submission & Approval | I | C | I | I | I | **A** | **R** | C | I | C | I |
| Monitoring SLA & Reporting | C | I | I | I | C | **A/R** | **R** | C | I | R | I |
| Incident Management (Operasional) | C | I | I | I | C | R | C | I | I | **A** | I |
| Change Request (Scope/SLA) | C | I | C | C | R | **A/R** | **R** | I | I | C | C |
| Pelatihan & Sertifikasi | C | A/R | I | I | C | C | C | I | I | I | I |
| Review Kinerja & 90-Hari | I | A/R | I | I | C | R | **R** | I | I | I | I |

### Finansial & Kepatuhan
| Aktivitas | PIMO | HCM | Presales | Sales | SA | DP | **PM** | Finance | Procurement | CO | Legal |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Payroll (komponen HRIS) | I | A/R | I | I | I | C | I | R | I | I | I |
| Billing Pack & Invoicing | I | C | I | I | I | R | **R** | **A/R** | C | C | I |
| Budgeting & Margin Tracking | C | I | I | I | C | R | **R** | **A/R** | I | I | I |
| Kontrak Pelanggan & Addendum | C | I | C | C | I | I | C | I | I | C | A/R |
| Kepatuhan Kode Etik | A | C | I | I | I | R | **R** | I | I | I | C |

---

## Artefak Proses & Template Minimum
- **Form Requisition** (Sales/Presales → HCM/DP/PM): skill, SLA, rate card, lokasi.
- **Interview Scorecard**: kriteria teknis & soft-skill, *decision log*.
- **Onboarding Checklist**: akses sistem, aset, induksi, *customer induction*.
- **Assignment Letter** & SOW link.
- **Timesheet Policy**: cut-off, sanksi, *auto-reminder*.
- **Performance Template**: KPI/OKR, 90-hari, *PIP* (jika perlu).
- **Training Plan** & *Skills Matrix*.
- **Billing Pack**: timesheet tersertifikasi, PO/kontrak, ringkasan SLA.
- **Compliance Register**: NDA, audit trail, pelanggaran, *corrective action*.

---

## Risiko Utama & Mitigasi
- **Data kualitas rendah** → validasi 4 mata, *import rules*, audit trail.
- **Timesheet tidak disiplin** → kebijakan & insentif, *auto-reminder*, eskalasi.
- **SLA tidak konsisten antar pelanggan** → parameterisasi paket layanan & counter SLA per kontrak.
- **Integrasi tersendat** → *stub/mocking*, *phased integration*, prioritas payroll & billing dulu.
- **Perubahan budaya** → *change champions*, pelatihan berjenjang, *office hours*.

---

## Backlog Awal (Epik → contoh User Story)
- **Epik-1 Core HR**: sebagai HCM, saya dapat membuat struktur org, job & grade; sebagai Legal, saya upload template kontrak untuk e‑sign.
- **Epik-2 Recruitment**: sebagai Recruiter, saya kelola pipeline & panel interviewer dengan SLA time-to-fill.
- **Epik-3 Assignment & Timesheet**: sebagai PM Delivery, saya menempatkan talent ke proyek, menentukan jadwal, dan menyetujui timesheet.
- **Epik-4 SLA & Dashboard**: sebagai Customer Operation, saya melihat SLA dashboard per pelanggan dan *auto-report* bulanan.
- **Epik-5 Performance & L&D**: sebagai Line Manager, saya mengatur KPI/OKR, review 90-hari, dan training plan.
- **Epik-6 Integrasi Payroll & Billing**: sebagai Finance, saya menarik data timesheet tersertifikasi untuk invoicing dan payroll.

---

## Kriteria Go-Live
- 2 siklus timesheet on-time ≥95%, error payroll <0,5%, SLA report on-time ≥98%.
- SOP/Work Instruction tersedia & pelatihan selesai untuk seluruh peran.
- RACI dikonfirmasi, risk register *green*, dan *hypercare* 2–4 minggu siap.

---

## Checklist Konfigurasi Horilla (ringkas)
- Struktur Org, Role & Permission, Kalender, Cuti/Jam kerja.
- Template kontrak & dokumen (offer, NDA, assignment letter).
- Recruitment pipeline & scorecard; panel interviewer.
- Skills matrix & certification registry.
- Project & Assignment; *rate card*; SLA parameter (target, threshold, counter).
- Timesheet rule: cut-off, approval, notifikasi & eskalasi.
- Performance: KPI/OKR, 90-day review, rating scale.
- Training: katalog pelatihan, enrollment, tracking.
- Integrasi: Payroll/Finance, Procurement, Ticketing/ITSM, DMS/e-sign, SSO.
- Dashboard & laporan: eksekutif, operasional, people, finansial.

---

# Pilot Khusus: PT. ABC – Manage Service Helpdesk (Backlog di Teams)

## A) Service Scope & SLA (Usulan)
_Asumsi awal_: jam layanan **8×5 (09:00–18:00 WIB)**, *on-call* P1 24×7; dapat disesuaikan sesuai kontrak PT. ABC.

| Prioritas | Definisi Singkat | Target Respons | Target Pemulihan | Interval Update |
|---|---|---|---|---|
| **P1** | Layanan kritikal down/berdampak banyak pengguna | ≤ **15 menit** | ≤ **4 jam** | **30 menit** |
| **P2** | Fungsi mayor terganggu, ada workaround terbatas | ≤ **30 menit** | ≤ **8 jam** | **1 jam** |
| **P3** | Incident minor/permintaan standar | ≤ **4 jam** | ≤ **2 hari kerja** | **1 hari** |
| **P4** | Permintaan non-urgensi/perbaikan kecil | ≤ **1 hari kerja** | ≤ **5 hari kerja** | **2 hari** |

> Untuk *24×7 full*, gunakan kalender operasional terpisah dan *overtime/shift allowance* pada Horilla.

## B) Struktur Tim & Staffing Model
**Peran**: Service Delivery Manager (DP), **Project Manager (PM)**, Team Lead L1, Agent L1 (N), Engineer L2 (N), QA/Reporting (0.5 FTE), On‑call Coordinator.

**Formula kebutuhan L1**:
```
FTE = (Tiket/hari × AHT (jam)) ÷ Jam produktif/hr × (1 ÷ (1 − shrinkage))
```
Contoh: 120 tiket/hari, AHT 15 menit (0,25 jam), jam produktif 6,5 jam, shrinkage 30% → beban 30 jam/hari → FTE dasar 4,6 → disesuaikan 6,6 ≈ **7 L1**.

**Shift** (contoh 8×5):
- Shift-1 08:30–17:30 (4 L1), overlap 30′ untuk *handover*.
- On‑call P1 (L2) 17:30–08:30 bergilir.

## C) Struktur Microsoft Teams & Planner
**Team**: `PT ABC – Helpdesk MS`

**Channels**:
1. **01-ops-daily** (operasional harian)  
2. **02-incidents-p1p2** (war room & *major incident*)  
3. **03-changes-cr**  
4. **04-shift-roster** (jadwal & *handover*)  
5. **05-reports-kpi** (dashboard & laporan)  
6. **06-customer-comms** (komunikasi eksternal/summary)  
7. **07-hypercare** (pasca go‑live)  
8. **admin-private** (perizinan & dokumen sensitif)

**Tabs** per channel (contoh): Planner (Backlog & Sprint), Lists (SLA Cases), OneNote (Runbook), SharePoint (Dokumen), Power BI (KPI).

**Planner Buckets**: *Backlog*, *This Week*, *In Progress*, *Waiting Customer*, *Blocked*, *Done*, *Kaizen*.  
**Label**: Config, Process, Training, Integration, Report, Risk.

## D) KPI Khusus Helpdesk (Target Awal)
- **SLA Kepatuhan per Prioritas (P1–P4)** ≥ 98% / bulan.
- **FCR (First Contact Resolution)** ≥ 65% (untuk tiket standar).
- **ASA (Average Speed of Answer)** ≤ 30 detik (bila ada kanal telepon/Teams Call).
- **AHT (Average Handling Time)**: baseline 12–15 menit; dikalibrasi.
- **Backlog Age (P3/P4)**: 80% < 5 hari kerja.
- **Reopen Rate** ≤ 5%; **Escalation Rate** ≤ 10%.
- **CSAT** ≥ 4,5/5 (survei penutupan tiket).
- **Utilization L1** 75–85%; **Timesheet Compliance** ≥ 95%.

**Dashboard**: KPI per prioritas & pelanggan, tren volume, heatmap jam sibuk, kualitas penyelesaian, *root cause category*.

## E) Cadence & Pelaporan
- **Daily**: *standup* 15′ (ops), review P1/P2, *aging* >3 hari.
- **Weekly Ops**: kapasitas, SLA% per prioritas, *top 5* akar masalah, rencana *Kaizen*.
- **Monthly SteerCo**: SLA kumulatif, CSAT, margin, risiko/aksi.
- **Laporan**: *weekly* (operasional), *monthly* (eksekutif) otomatis dari dashboard.

## F) RACI Spesifik PT. ABC – dengan Project Manager (PM)
Tambahan peran: **ABC Service Owner (ABC‑SO)**, **ABC Service Desk Lead (ABC‑SDL)**.

| Aktivitas | PIMO | HCM | SA | DP | **PM** | Finance | Procurement | CO | Legal | ABC‑SO | ABC‑SDL |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kesepakatan SLA & Prioritas | C | I | R | A | C | I | I | R | C | A/R | C |
| Operasi Harian & Eskalasi | I | I | C | A | **R** | I | I | R | I | C | A/R |
| Laporan KPI Bulanan | C | I | I | A | **R** | C | I | R | I | A/R | C |
| Perubahan Proses (Kaizen) | C | C | R | A | **R** | I | I | C | I | A | C |
| Billing Pack & Verifikasi | I | I | I | R | **R** | A/R | C | C | I | C | I |

## G) Timeline Pilot & Go‑Live (usulan)
- **Minggu 0–1 (22–30 Sep 2025)**: Blueprint & SLA, struktur Teams & Planner.
- **Minggu 2 (1–7 Okt)**: Konfigurasi Horilla (customer, project, SLA counter, timesheet policy), *rate card*.
- **Minggu 3 (8–14 Okt)**: SOP & runbook, roster shift, pelatihan tim.
- **Minggu 4 (15–21 Okt)**: *Pilot* terbatas, dashboard awal.
- **Minggu 5 (22–28 Okt)**: Billing pack siklus‑1, evaluasi, *hardening*.
- **Go‑Live**: **3 Nov 2025**, **Hypercare 3–14 Nov 2025**, **PIR**: 18 Nov 2025.

## H) Risiko Khusus & Mitigasi
- **Fluktuasi volume tiket** → *buffer FTE* & *on‑call*; auto‑forecast dari tren.
- **Disiplin dokumentasi rendah** → *runbook* & *definition of done*; *QA* spot check mingguan.
- **Komunikasi multi‑kanal** → kanal *single source* di Teams & *triage* terpusat.
- **Ketergantungan integrasi** → *phased*, mulai dari **timesheet + laporan** dahulu.

