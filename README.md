# Proyecto: Sistema de Gestión de Tareas

## Descripción
Aplicación Next 13+ de gestión de tareas que permite ver, crear, actualizar y eliminar tareas. 

## Demo
Puedes ver la demo de la aplicación en el siguiente enlace:

[Ver la Demo](https://seek-task-owhi4lsqr-hzdelgados-projects.vercel.app/)

## Características

- **Gestión de tareas**: Operaciones CRUD de tareas.
- **JWT**: Autenticación mediante tokens generados con jsonwebtoken.
- **Redux**: Para manejar el estado global de la aplicación.
- **Tailwind CSS**: Para estilizar la interfaz de usuario.
- **Jest**: Para realizar las pruebas unitarias.

## Requisitos
Antes de iniciar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16+)
- [npm](https://www.npmjs.com/)

## Estructura

````/
    └── app/                 # Directorio principal de la aplicación en Next.js
    ├── application/         # Capa de aplicación (casos de uso, servicios, hooks)
    │   ├── hooks/           # Hooks para gestionar la lógica de los casos de uso
    │   ├── services/        # Servicios para la lógica de la aplicación
    │   ├── useCases/        # Casos de uso para la lógica de negocio (autenticación)
    │   ├── utils/           # Funciones utilitarias
    ├── components/          # Componentes compartidos (componentes UI)
    ├── domain/              # Capa de dominio (entidades, puertos)
    ├── infrastructure/      # Capa de infraestructura (implementación de adaptadores de interfaces)
    │   ├── adapters/        # Implementación de interfaces de los repositorios o servicios
        │   ├── redux/       # Redux para gestión global del estado
    └── shared/              # Componentes y módulos compartidos entre capas
````
## Instalación

1. **Clona este repositorio**:

   ```bash
   git clone https://github.com/hzdelgado/seek-task-app.git
   cd seek-task-app
   ```
2. **Instalar dependencias**:

   ```bash
   npm install
   ```
## Despliegue
#### Modo Desarrollo
```env
npm run dev
```
#### Modo Producción
```bash
npm run build
npm run start
```
La API estará disponible en `http://localhost:3000`.

### Pruebas unitarias con Covertura
Es necesario tener configurado la propiedad jsx como `react-jsx` en el archivo `tsconfig.json`.

```bash
npm run test:coverage
```
