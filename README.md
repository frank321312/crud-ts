# Usuario CRUD - Mini Proyecto Backend con TypeORM y Express

Este mini proyecto es una API RESTful desarrollada en Node.js usando TypeScript, Express y TypeORM. Su objetivo es servir como repaso y práctica de conceptos clave de desarrollo backend, incluyendo:

- **Gestión de usuarios**: Registro, autenticación, actualización y eliminación de usuarios.
- **Gestión de proyectos y roles**: Asociación de usuarios a proyectos y asignación de roles.
- **Validaciones**: Uso de Zod para validar datos de entrada.
- **Buenas prácticas**: Separación de controladores, servicios, rutas y entidades.
- **Persistencia**: Conexión a base de datos MySQL mediante TypeORM, con uso de migraciones y repositorios.

Incluye ejemplos de endpoints HTTP para pruebas rápidas y una estructura de carpetas modular para facilitar el mantenimiento y la escalabilidad.

Ideal para quienes buscan repasar o aprender sobre la arquitectura de un backend moderno con TypeScript y TypeORM.

## Importante

No se recomienda usar el comando.

```js
    npm run crate-migration
```

Este hace uso de una variable dinamica propia de la pc, al menos que lo establezca.