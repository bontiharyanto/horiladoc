# SSO & SCIM (Provisioning)

Terakhir diperbarui: 2025-09-18_

Integrasi autentikasi **SSO (SAML/OIDC)** dan **SCIM** untuk provisioning user otomatis (create/enable/disable).

## Arsitektur

```mermaid

flowchart LR
  A[IdP: Google/Okta/AzureAD] --> B[SSO (SAML/OIDC)]
  A --> C[SCIM: users/groups]
  B --> D[Horilla Auth]
  C --> E[Horilla Directory]
```

## .env

```mermaid
SSO_PROVIDER=oidc              # oidc|saml
OIDC_ISSUER_URL=...
OIDC_CLIENT_ID=...
OIDC_CLIENT_SECRET=...
SCIM_ENABLE=true
SCIM_BEARER_TOKEN=ubah_ini
```

## Endpoint

- `/.well-known/openid-configuration`
- `/sso/login`, `/sso/callback`
- `/scim/v2/Users`, `/scim/v2/Groups`

## RBAC
- Pemetaan group IdP → role Horilla (Admin/HR/Manager/Employee)
