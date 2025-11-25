# Sistema de Gestión de Club - Integración con Oracle

## Cambios realizados

Se ha implementado la integración completa entre el frontend y la base de datos Oracle para gestionar futbolistas y cuerpo técnico.

## Backend

### Servicios creados:
- `futbolistaService.js` - CRUD para futbolistas
- `tecnicoService.js` - CRUD para técnicos
- `catalogoService.js` - Obtener catálogos (países, posiciones, clubes)

### Controladores creados:
- `futbolistaController.js`
- `tecnicoController.js`
- `catalogoController.js`

### Rutas disponibles:
- `GET /api/futbolistas` - Listar todos los futbolistas
- `GET /api/futbolistas/:id` - Obtener un futbolista por ID
- `POST /api/futbolistas` - Crear futbolista
- `PUT /api/futbolistas/:id` - Actualizar futbolista
- `DELETE /api/futbolistas/:id` - Eliminar futbolista

- `GET /api/tecnicos` - Listar todos los técnicos
- `GET /api/tecnicos/:id` - Obtener un técnico por ID
- `POST /api/tecnicos` - Crear técnico
- `PUT /api/tecnicos/:id` - Actualizar técnico
- `DELETE /api/tecnicos/:id` - Eliminar técnico

- `GET /api/catalogos` - Obtener todos los catálogos (países, posiciones, clubes)
- `GET /api/catalogos/paises` - Obtener países
- `GET /api/catalogos/posiciones` - Obtener posiciones
- `GET /api/catalogos/clubes` - Obtener clubes

## Frontend

### Cambios en DataContext:
- Ahora hace fetch a los endpoints del backend
- Mantiene los catálogos de países, posiciones y clubes
- Provee funciones async para CRUD: `addFutbolista`, `updateFutbolista`, `deleteFutbolista`, `addTecnico`, `updateTecnico`, `deleteTecnico`

### Componentes actualizados:
- `GestionFutbolistas.jsx` - Usa datos de Oracle
- `GestionTecnicos.jsx` - Usa datos de Oracle
- `ModalFutbolista.jsx` - Usa catálogos de Oracle
- `ModalTecnico.jsx` - Usa catálogos de Oracle

## Configuración

### Backend

1. Copia `.env.example` a `.env`:
```bash
cd backend
cp .env.example .env
```

2. Configura las variables en `.env`:
```
DB_USER=tu_usuario_oracle
DB_PASSWORD=tu_password_oracle
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=XE
PORT=3000
```

3. Instala dependencias (si no lo has hecho):
```bash
npm install
```

4. Inicia el servidor:
```bash
npm start
```

### Frontend

1. Instala dependencias (si no lo has hecho):
```bash
cd frontend
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

El frontend se conectará automáticamente al backend a través del proxy configurado en `vite.config.js`.

## Estructura de datos esperada en Oracle

### Tabla FUTBOLISTA:
- ID_FUTBOLISTA (NUMBER, PK)
- NOMBRE (VARCHAR2)
- APELLIDO (VARCHAR2)
- FECHA_NACIMIENTO (DATE)
- VALOR_MERCADO (NUMBER)
- ID_PAIS (NUMBER, FK)
- ID_POSICION (NUMBER, FK)
- ID_CLUB (NUMBER, FK)

### Tabla TECNICO:
- ID_TECNICO (NUMBER, PK)
- NOMBRE (VARCHAR2)
- APELLIDO (VARCHAR2)
- FECHA_NACIMIENTO (DATE)
- ROL (VARCHAR2)
- ID_PAIS (NUMBER, FK)
- ID_CLUB (NUMBER, FK)

### Tablas de catálogo:
- PAIS (ID_PAIS, NOMBRE_PAIS)
- POSICION (ID_POSICION, NOMBRE_POSICION)
- CLUB (ID_CLUB, NOMBRE_CLUB)

## Notas importantes

- El frontend ahora muestra un indicador de "Cargando..." mientras obtiene los datos
- Los datos se cargan automáticamente al iniciar la aplicación
- Todas las operaciones CRUD se reflejan inmediatamente en la base de datos
- Los catálogos se cargan una sola vez al inicio
