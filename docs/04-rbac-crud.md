# Dokumentasi RBAC & CRUD

## Roles
- Admin
- HR
- Manager
- Employee

## Contoh CRUD
| Modul | Create | Read | Update | Delete |
|-------|--------|------|--------|--------|
| Employee | HR/Admin | Semua (self) | HR/Admin/self | Admin |
| Leave | Employee | Manager/HR/self | Manager/HR | Admin |
| Payroll | HR | Employee | HR/Admin | Admin |
