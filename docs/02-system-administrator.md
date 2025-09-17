
---

## 02-system-administrator.md

```markdown
# :material-shield-crown: Panduan System Administrator

> Untuk admin aplikasi/infra: install, konfigurasi, operasi, keamanan, scaling, backup/restore, dan runbook.
```
---

## :material-account-cog: Peran & Tanggung Jawab

| Area | Tugas |
|---|---|
| Ketersediaan | Menjaga app/DB up, monitoring & alert |
| Keamanan | Patch, hardening, audit akses, rahasiakan secret |
| Data | Backup/restore, enkripsi in-transit & at-rest |
| Rilis | Upgrade terkontrol, migrations |
| Dukungan | Tanggap insiden, RCA |

---

## :material-server: Matriks Lingkungan

| Env | Domain | DB | Mode |
|---|---|---|---|
| Dev | `localhost` | Postgres lokal | DEBUG=True |
| Staging | `staging.domain` | Managed Postgres | DEBUG=False |
| Prod | `app.domain` | Postgres HA/Replica | DEBUG=False |

---

## :material-cog: Instalasi Singkat

```bash
git clone https://github.com/horilla-opensource/horilla.git
cd horilla
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.dist .env   # jika ada; atau buat manual
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```