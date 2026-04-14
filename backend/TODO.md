# TODO: Implementación Backend Dashboard-Admin (Node/Express/TS + Prisma + PostgreSQL)

Progreso: 8/18 pasos completados (Fase 1 ✅, Fase 2 partial, Fase 3 auth ✅)



### Fase 1: Setup Inicial (pasos 1-4)
- [x] 1. Crear package.json y package-lock.json (instalar deps).
- [x] 2. Crear tsconfig.json y .gitignore.
- [x] 3. Crear .env.example y README.md actualizado.
- [x] 4. Estructura de carpetas src/ y inicializar git si necesario.


### Fase 2: Prisma & DB Models (5-8)
- [x] 5. Crear prisma/schema.prisma con models (User, Product, Order).
- [x] 6. Configurar prisma/seed.ts con datos mock (admin: admin@test.com / admin123).
- [ ] 7. Ejecutar prisma migrate y seed (después de PG setup).
- [ ] 8. Generar Prisma client.


### Fase 3: Server & Middleware (9-11)
- [x] 9. src/server.ts (Express app, CORS, puerto 5000).
- [x] 10. src/middleware/isAdmin.ts (JWT verify + role check).
- [ ] 11. src/utils/config.ts (dotenv, JWT secret).


### Fase 4: Controllers & Routes (12-16)
- [ ] 12. src/controllers/authController.ts (login).
- [ ] 13. src/controllers/productsController.ts (GET list/search/detail).
- [ ] 14. src/controllers/ordersController.ts (GET list, PATCH status).
- [ ] 15. src/controllers/usersController.ts (GET list).
- [ ] 16. src/controllers/dashboardController.ts (GET metrics/charts).

### Fase 5: Routes & Integración (17-18)
- [ ] 17. src/routes/*.ts y mount en server.ts (/api/*).
- [ ] 18. Scripts npm: dev, prisma:* y test endpoints.

**Próximo paso actual: Fase 2 #7 - PG Docker + prisma migrate dev --name init + db seed**



**Follow-up después: Guía PostgreSQL vs Docker para DB local.**

*Última actualización: Inicio del proyecto.*
