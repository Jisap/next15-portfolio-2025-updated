# Solución a Dependencia Circular con `tailwind-merge` en Next.js y Tailwind v4

## Problema

Durante la migración a Next.js 15 y Tailwind CSS v4, nos encontramos con un error de renderizado en el componente `Header`:

```
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
```

Este error se debía a una **dependencia circular**. El flujo era el siguiente:

1.  `Header.tsx` importa y renderiza `<MobileNav />`.
2.  `<MobileNav />` usa componentes de `shadcn/ui` (como `<Sheet />`).
3.  Los componentes de `shadcn/ui` usan la utilidad `cn` de `lib/utils.ts`.
4.  `lib/utils.ts` importa `twMerge` directamente de la librería `tailwind-merge`.
5.  Para que `tailwind-merge` funcione con las clases personalizadas de Tailwind, necesita leer la configuración del tema. En Tailwind v4, esta configuración reside en `app/globals.css`.
6.  El sistema de compilación de Next.js intenta cargar `globals.css`.
7.  `app/globals.css` es importado por `app/layout.tsx`.
8.  `app/layout.tsx` renderiza el componente `<Header />`, cerrando el ciclo.

**Ciclo:** `Header` → `MobileNav` → `utils.ts` → `tailwind-merge` → (necesita leer) `globals.css` → `layout.tsx` → `Header`

React no puede resolver este ciclo, lo que resulta en el error de renderizado.

## Solución

Para romper esta dependencia circular, creamos una instancia aislada y preconfigurada de `tailwind-merge` que no necesita leer `globals.css` para ser importada.

### 1. Crear una instancia personalizada de `twMerge`

Se creó un nuevo archivo `lib/tailwind.ts` para exportar una instancia personalizada de `twMerge` usando la función `extendTailwindMerge`.

```typescript
// lib/tailwind.ts
import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
  // Personaliza aquí si tienes clases en conflicto que tailwind-merge no resuelve bien.
  // Por ahora, la configuración por defecto suele ser suficiente.
})
```

### 2. Actualizar la utilidad `cn`

Se modificó el archivo `lib/utils.ts` para que importara nuestra nueva instancia local en lugar de la librería genérica.

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "./tailwind" // <-- Cambio clave

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Resultado

Este cambio rompe la cadena de dependencias, ya que `lib/utils.ts` ya no depende indirectamente de `globals.css`. Esto permite que el árbol de componentes se construya correctamente sin bucles.

Esta es una solución robusta y escalable. Todos los futuros componentes que necesiten combinar clases de Tailwind deben usar la función `cn` de `lib/utils.ts` para garantizar la consistencia y evitar problemas similares.