
# :material-database-cog: Admin — Django Backend (Ops Guide)

> Panduan untuk **System Administrator/DevOps** yang mengelola backend Django Horilla: instalasi, konfigurasi, deployment, keamanan, backup, dan monitoring.  
> Terakhir diperbarui: 2025-09-17.

---

## :material-lan: Arsitektur Ringkas

### Arsitektur Ringkas

```mermaid
flowchart LR
  A[Client/Browser] --> B[Nginx/Reverse Proxy]
  B --> C[App Server]
  C -->|ASGI| D[Django App]
  D --> E[(PostgreSQL)]
  D --> F[(Redis)]
  D --> G[Object Storage (S3 or MinIO)]
  F <--> H[Celery Worker & Beat]
  B --> I[Static & Media (CDN/Proxy)]
```

**Komponen**
- **Nginx/Reverse Proxy**: TLS termination, cache statis.
- **Gunicorn/Uvicorn (ASGI)** sebagai App Server.
- **Django**: aplikasi inti (collectstatic, migrations).
- **PostgreSQL**: database utama.
- **Redis**: cache & broker Celery.
- **Celery Worker/Beat**: job async & schedule.
- **Object storage** (opsional): media.

---

## :material-cog: Prasyarat & Instalasi

### Sistem
- Linux (Ubuntu/Debian/RHEL family) atau macOS (dev).
- **Python 3.11+**, **PostgreSQL 13+**, **Redis 6+**, **Nginx**.

### Setup cepat (dev)
```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip wheel
pip install -r requirements.txt
cp .env.example .env  # sesuaikan
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py runserver 0.0.0.0:8000
```

**Buat superuser (/admin):**
```bash
python manage.py createsuperuser
```

---

## :material-file-cog: Konfigurasi Lingkungan

Buat `.env` (**jangan commit**; di produksi gunakan secrets manager):

```ini
# Core
DJANGO_SETTINGS_MODULE=config.settings.production
SECRET_KEY=ubah_ke_random_32byte
DEBUG=False
ALLOWED_HOSTS=your.domain,localhost

# Database
DATABASE_URL=postgres://user:pass@127.0.0.1:5432/horilla

# Redis (cache + celery)
REDIS_URL=redis://127.0.0.1:6379/0
CACHE_URL=redis://127.0.0.1:6379/1

# Email
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_HOST_USER=no-reply@yourdomain.com
EMAIL_HOST_PASSWORD=yourpass
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL="Horilla <no-reply@yourdomain.com>"

# Storage (opsional S3/minio)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_STORAGE_BUCKET_NAME=horilla-media
AWS_S3_REGION_NAME=ap-southeast-1
AWS_S3_ENDPOINT_URL=https://s3.yourcloud.com
USE_S3_MEDIA=True

# Security
CSRF_COOKIE_SECURE=True
SESSION_COOKIE_SECURE=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
SECURE_SSL_REDIRECT=True

# Misc
TIME_ZONE=Asia/Jakarta
```

> Gunakan **django-environ** / **dj-database-url** untuk parsing.

---

## :material-rocket-launch: Deployment (Nginx + Gunicorn/Uvicorn)

### Gunicorn (ASGI via UvicornWorker)
`/etc/systemd/system/horilla.service`
```ini
[Unit]
Description=Horilla Django App
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/opt/horilla
Environment="DJANGO_SETTINGS_MODULE=config.settings.production"
EnvironmentFile=/opt/horilla/.env
ExecStart=/opt/horilla/.venv/bin/gunicorn config.asgi:application \
  -k uvicorn.workers.UvicornWorker \
  --bind 127.0.0.1:8001 --workers 4 --timeout 120
Restart=always

[Install]
WantedBy=multi-user.target
```

### Nginx reverse proxy
`/etc/nginx/sites-available/horilla.conf`
```nginx
server { listen 80; server_name your.domain; return 301 https://$host$request_uri; }

server {
  listen 443 ssl http2;
  server_name your.domain;

  ssl_certificate     /etc/letsencrypt/live/your.domain/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/your.domain/privkey.pem;

  client_max_body_size 20M;

  location /static/  { alias /opt/horilla/static/;  expires 7d; }
  location /media/   { alias /opt/horilla/media/;   expires 7d; }

  location / {
    proxy_pass         http://127.0.0.1:8001;
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto https;
    proxy_read_timeout 180;
  }

  location /healthz { return 200 "ok\n"; }
}
```

Aktifkan & reload:
```bash
sudo ln -s /etc/nginx/sites-available/horilla.conf /etc/nginx/sites-enabled/horilla.conf
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl enable --now horilla
```

---

## :material-timer-cog: Background Jobs (Celery)

**Worker**
`/etc/systemd/system/horilla-celery.service`
```ini
[Unit]
Description=Horilla Celery Worker
After=network.target redis.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/opt/horilla
EnvironmentFile=/opt/horilla/.env
ExecStart=/opt/horilla/.venv/bin/celery -A config worker -l INFO
Restart=always

[Install]
WantedBy=multi-user.target
```

**Beat (scheduler)**
`/etc/systemd/system/horilla-celerybeat.service`
```ini
[Unit]
Description=Horilla Celery Beat
After=network.target redis.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/opt/horilla
EnvironmentFile=/opt/horilla/.env
ExecStart=/opt/horilla/.venv/bin/celery -A config beat -l INFO --pidfile=
Restart=always

[Install]
WantedBy=multi-user.target
```

Aktifkan:
```bash
sudo systemctl enable --now horilla-celery horilla-celerybeat
```

---

## :material-database: Database & Migrasi

**Migrasi skema**
```bash
python manage.py migrate
```

**Backup & Restore (PostgreSQL)**
```bash
# backup (opsional enkripsi via gpg)
PGPASSWORD=pass pg_dump -h 127.0.0.1 -U user -d horilla \
  -Fc -f /backups/horilla_$(date +%F).dump

# restore
pg_restore -h 127.0.0.1 -U user -d horilla --clean --no-owner /backups/file.dump
```

**Retensi**: harian 30 hari, mingguan 12 minggu, bulanan 12 bulan.

---

## :material-image-multiple: Static & Media

**Kumpulkan static**
```bash
python manage.py collectstatic --noinput
```

**Media**
- Dev: lokal `MEDIA_ROOT=/opt/horilla/media/`
- Prod: pertimbangkan **S3/minio**

---

## :material-email: Email & Notifikasi
- Isi SMTP di `.env`.
- Uji kirim:
```bash
python manage.py shell -c "from django.core.mail import send_mail; send_mail('Test','Hello','no-reply@x',['you@x'])"
```

---

## :material-shield-lock: Keamanan (Checklist)

- `DEBUG=False`, `SECRET_KEY` rahasia, `ALLOWED_HOSTS` benar.
- Cookies secure/HttpOnly, CSRF aktif.
- **Admin URL** dipindah (mis. `/secure-admin-9b21/`).
- Rate limiting login (Nginx / django-axes).
- Sanitasi upload, AV opsional (clamav).
- Patch rutin `pip list --outdated`.
- Alert untuk login/akses mencurigakan.

---

## :material-account-key: RBAC singkat

| Role     | Create | Read | Update | Delete | Approve |
|----------|:------:|:----:|:------:|:------:|:-------:|
| Admin    | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎ |
| HR       | ✔︎ | ✔︎ | ✔︎ | ⚠︎ | ✔︎ |
| Manager  | ✖︎ | ✔︎(tim) | ✖︎ | ✖︎ | ✔︎ |
| Employee | ✖︎ | ✔︎(pribadi) | ✖︎ | ✖︎ | ✖︎ |

- Kelompokkan role di **Groups**, beri **permissions** add/change/delete/view.
- Object-level perms bila perlu (hanya manager lihat bawahan).
- **Audit log** via signals `post_save`/`post_delete` untuk data sensitif.

---

## :material-chart-line: Logging & Monitoring

**Logging (settings.py contoh)**
```python
LOGGING = {
  "version": 1,
  "disable_existing_loggers": False,
  "handlers": {"console": {"class": "logging.StreamHandler"}},
  "root": {"handlers": ["console"], "level": "INFO"},
}
```

**Health & Metrics**
- `/healthz` via Nginx atau view sederhana.
- **Sentry** (error), **Prometheus** (via `django-prometheus`).

**Alert**
- Lonjakan 5xx, antrean Celery stuck, error DB/Redis.

---

## :material-content-save-cog: CI/CD (GitHub Actions contoh)
`.github/workflows/ci.yml`
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: python manage.py check --deploy
      - run: python -m pytest -q
```

---

## :material-hammer-wrench: Troubleshooting

| Gejala | Langkah |
|---|---|
| 502/504 di Nginx | Cek service `horilla` (gunicorn), timeout, worker >= 2, cek log. |
| 500 di Django | Cek log aplikasi, jalankan `python manage.py check`. |
| Email tidak terkirim | Cek SMTP/env, uji `send_mail`, periksa Celery queue. |
| Lambat saat listing | Tambah index DB, aktifkan cache, pagination. |
| Celery tidak jalan | Redis up? `systemctl status horilla-celery*`, cek `REDIS_URL`. |
| Upload gagal | Cek `client_max_body_size`, izin folder storage. |

---

## :material-clipboard-text-clock: Operasional

- **Harian**: cek log error, status systemd, antrean Celery, disk space.
- **Mingguan**: uji backup-restore, update minor, cek security headers.
- **Bulanan**: audit akses admin, rotasi SECRET/API bila perlu.
