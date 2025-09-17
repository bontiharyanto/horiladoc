
---

#### 📂 `02-system-administrator.md`
```markdown
# Panduan System Administrator
```
## Persyaratan
- Python 3.10+
- PostgreSQL 13+
- Docker & Docker Compose
- OS: Ubuntu/Debian (recommended)

## Instalasi
```bash
git clone https://github.com/horilla-opensource/horilla.git
cd horilla
cp .env.dist .env
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```