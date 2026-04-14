# Backend Dashboard-Admin API

Node.js + Express + TypeScript + Prisma + PostgreSQL

## 🚀 Setup Rápido

1. **Instalar dependencias**:
   ```bash
   cd Dashboard-Admin/backend
   npm install
   ```

2. **PostgreSQL**: Instalar local o Docker (ver guía abajo).
   - Copia `.env.example` → `.env` y configura `DATABASE_URL`.

3. **Prisma DB**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Run dev**:
   ```bash
   npm run dev
   ```
   API en http://localhost:5000.

## 🗝️ Credenciales Admin Mock
- Email: `admin@test.com`
- Password: `admin123`

## Endpoints Principales
| Path | Método | Descripción | Auth |
|------|--------|-------------|------|
| /api/auth/login | POST | Login admin | No |
| /api/dashboard/metrics | GET | KPIs + charts | Sí |
| /api/products | GET | Lista/search | Sí |
| /api/products/:id | GET | Detalle | Sí |
| /api/orders | GET | Lista/search | Sí |
| /api/orders/:id/status | PATCH | Update status | Sí |
| /api/users | GET | Lista | Sí |

## PostgreSQL Setup
**Docker (recomendado - fácil)**:
```bash
docker run --name pg-admin-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=dashboard_admin -p 5432:5432 -d postgres:16
```
DATABASE_URL: `postgresql://postgres:postgres@localhost:5432/dashboard_admin`

**Local Installer**:
- Download: postgresql.org/download/windows/
- Create DB: dashboard_admin

## Comandos Prisma
`npx prisma studio` (UI DB)

