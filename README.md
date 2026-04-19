# Vibe Pulse — E-Commerce Universitario (Panel Admin)

Este repositorio contiene el **Sprint 5** del proyecto "Vibe Pulse", un e-commerce de ropa juvenil universitario. Esta fase se enfoca exclusivamente en el **Panel de Administración**, proporcionando una interfaz profesional para la gestión de productos, pedidos y usuarios.

## 🚀 Inicio Rápido (Docker)

```powershell
# 1. Descargar imagenes y construir contenedores
docker-compose up -d --build

# 2. Esperar a que este todo arriba (bd lista)
docker-compose ps

# 3. Acceder a los servicios
# Frontend:  http://localhost:3000
# Backend:   http://localhost:5000
# Studio:   http://localhost:5555
```

### Primeros pasos al descargar

```powershell
# Verificar que la base de datos este conectada
docker exec dashboard_backend npx prisma migrate status

# Si las migraciones no estan aplicadas:
docker exec dashboard_backend npx prisma migrate dev

# Si necesitas reinstallar dependencias:
docker-compose build --no-cache
```

## 🚀 Tecnologías (Stack Obligatorio)

- **React 19 + Vite 6**
- **TypeScript** (Tipado estricto)
- **Tailwind CSS 4** (Diseño moderno y profesional)
- **React Router v6** (Rutas anidadas y protegidas)
- **Recharts** (Visualización de datos y analítica)
- **Motion** (Animaciones fluidas y transiciones de estado)
- **Lucide React** (Iconografía consistente)

## 📁 Estructura del Proyecto (Frontend)

El código se encuentra organizado bajo los estándares de escalabilidad de React:

```text
frontend/src/
├── components/          # Pantallas principales y sub-componentes (Dashboard, Products, etc.)
│   └── admin/           # Componentes exclusivos del layout administrativo (Sidebar, Header)
├── context/             # Gestión de estado global (Toast Notifications)
├── layouts/             # Layout base compartido entre las vistas administrativas
├── lib/                 # Utilidades compartidas (cn para Tailwind)
├── pages/               # Páginas completas (Login, etc.)
└── App.tsx              # Configuración de rutas y proveedores
```

## 🛠️ Funcionalidades del Sprint 5

### 1. Dashboard de Analítica
- **Tarjetas KPI**: Ventas totales, Pedidos, Usuarios registrados y Stock activo.
- **Gráficas Interactivas**: Ventas mensuales (Área) y distribución de pedidos por estado (Dona).
- **Últimos Pedidos**: Acceso rápido a las transacciones más recientes.

### 2. Gestión de Productos (`/admin/products`)
- **Inventario Completo**: Tabla con búsqueda en tiempo real (nombre, ID, categoría).
- **Detalle de Producto**: Modal/Drawer con información extendida y gestión de stock.
- **Alertas de Stock**: Indicadores visuales para productos con bajo inventario.

### 3. Control de Pedidos (`/admin/orders`)
- **Gestión de Estados**: Actualización inmediata de estados (Pendiente, Enviado, etc.) con feedback visual (badges de colores).
- **Filtros y Búsqueda**: Localización rápida de pedidos por cliente o ID.
- **Vista Detallada**: Información de envío, resumen de compra y métodos de pago.

### 4. Administración de Usuarios (`/admin/users`)
- **Comunidad**: Listado de usuarios registrados con roles (ADMIN/CLIENT).
- **Seguridad**: Diferenciación visual de permisos.

## 🔐 Acceso y Seguridad

El panel cuenta con un **Route Guard** que protege la ruta `/admin/*`. 
- Si el usuario no tiene el rol `ADMIN` en su `localStorage`, será redirigido a `/login`.
- En la pantalla de login, se ha incluido un botón de simulación para facilitar las pruebas del Sprint.

## 📦 Instalación y Uso

1. Navega a la carpeta del frontend:
   ```powershell
   cd frontend
   ```
2. Instala las dependencias:
   ```powershell
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```powershell
   npm run dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🐳 Docker

### Iniciar todos los servicios
```powershell
docker-compose up -d
```

### Ver logs
```powershell
docker-compose logs -f
```

### Detener servicios
```powershell
docker-compose down
```

### Comandos útiles

| Servicio | Comando | Descripción |
|----------|---------|-------------|
| Backend | `docker exec dashboard_backend npx prisma studio` | Abrir GUI de base de datos en http://localhost:5555 |
| Backend | `docker exec dashboard_backend npx prisma generate` | Regenerar cliente Prisma |
| Backend | `docker exec dashboard_backend npx prisma migrate dev` | Ejecutar migraciones |
| Backend | `docker exec dashboard_backend npx prisma migrate status` | Ver estado de migraciones |
| Backend | `docker exec dashboard_backend npx prisma db push` | Sincronizar esquema sin migrar |
| Backend | `docker exec dashboard_backend npm run dev` | Reiniciar servidor backend |

### Puertos

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Prisma Studio**: http://localhost:5555
- **PostgreSQL**: localhost:5432

---
**Nota:** El proyecto utiliza datos simulados (Mock Data) para cumplir con los requerimientos del Sprint 5 sin dependencia directa de un backend real en esta fase.
