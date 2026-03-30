# LinkStream Premium

Versión más sofisticada de la repo con:

- capa visual más premium
- modo claro/oscuro persistente
- home con hero, métricas y secciones de producto
- marketplace con búsqueda, categoría y ordenamiento
- detalle de listing mejorado
- login, signup, dashboard y seller dashboard rediseñados
- `.env.local.example` ordenado y listo para copiar
- checkout pages más limpias

## Ejecutar

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## Variables de entorno

Configura Supabase y Mercado Pago en `.env.local`.

## Base de datos

Ejecuta primero `sql/schema.sql` y luego `sql/migration_v2.sql` en Supabase.

## Qué mejoraría después

- favoritos y watchlist
- historial de órdenes y tracking
- reputación visible por seller
- analytics para conversión y SLA
- panel admin más completo
