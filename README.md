# 🤖 facts-check-platform
Este proyecto consiste en el desarrollo de una plataforma digital basada en inteligencia artificial (IA) orientada a la detección, clasificación y mitigación de noticias falsas (fake news) en entornos digitales, con especial enfoque en la República Dominicana. La solución integra tecnologías avanzadas como procesamiento de lenguaje natural (NLP) y visión por computadora, permitiendo verificar contenidos textuales y multimedia en tiempo real, a fin de reducir la propagación de desinformación en redes sociales y medios digitales.

Además de ofrecer verificación automática accesible a los ciudadanos, el sistema incluirá una API especializada para medios de comunicación, instituciones y entidades gubernamentales, promoviendo una cultura de consumo crítico de información y fortaleciendo la confianza pública en el ecosistema informativo. Este proyecto busca impactar positivamente en áreas como la política, la salud pública y la democracia, ofreciendo una herramienta escalable, transparente y adaptada al contexto sociocultural dominicano.

## 📂 Estructura 
```
/mi-plataforma/
│
├── frontend/                                 # Frontend
│   ├── public/
│   ├── src/
│   │   ├── features/                         # Lógica por módulo (Ejemplo Auth, Articles)
│   │   ├── components/                       # Componentes reutilizables
│   │   ├── pages/                            # Rutas o vistas
│   │   ├── services/                         # HTTP clients (fetch)
│   │   └── app/                              # Configuración global, rutas, store
│   └── package.json
│
├── services/                                 # Servicios
│
│   ├── AuthService/
│   │   ├── AuthService.API/                  # API REST (Controllers, Middlewares)
│   │   ├── AuthService.Data/                 # EF Core, Repositories, DbContext
│   │   ├── AuthService.Business/             # Lógica de negocio (CQRS)
│   │   ├── AuthService.Models/               # DTOs, Requests, Responses
│   │   └── AuthService.sln
│
│   ├── PublicPortalService/
│   │   ├── PublicPortal.API/
│   │   ├── PublicPortal.Data/
│   │   ├── PublicPortal.Business/
│   │   ├── PublicPortal.Models/
│   │   └── PublicPortalService.sln
│
│   ├── InternalService/
│   │   ├── InternalService.API/
│   │   ├── InternalService.Data/
│   │   ├── InternalService.Business/
│   │   ├── InternalService.Models/
│   │   └── InternalService.sln
└── README.md
```
### 💻 `frontend/`
Aplicación cliente desarrollada con React.
- `public/`: Archivos estáticos públicos.
- `src/features/`: Módulos funcionales de la app (ej. autenticación, perfil, publicaciones).
- `src/components/`: Componentes reutilizables entre módulos.
- `src/pages/`: Vistas conectadas a rutas principales.
- `src/services/`: Clientes HTTP (fetch o axios) que se comunican con los microservicios.
- `src/app/`: Configuración global de la aplicación (rutas, contexto, estado global).


### ⚙️ `services/`
Contiene los **servicios** backend en .NET, cada uno organizado como una solución independiente.

#### 🔒 `AuthService/`
Servicio responsable de autenticación, manejo de sesiones y emisión de tokens.
- `AuthService.API/`: Punto de entrada HTTP (controladores, middlewares).
- `AuthService.Data/`: Acceso a datos con Entity Framework (DbContext, repositorios).
- `AuthService.Business/`: Lógica de negocio con patrón CQRS.
- `AuthService.Models/`: Modelos internos (DTOs, Requests, Responses).

#### 🌐 `PublicPortalService/`
Servicio que gestiona el portal público, como navegación abierta, artículos o búsquedas.
- Estructura similar a `AuthService`.

#### 🔍 `InternalService/`
Servicio para funcionalidades internas o administrativas (por ejemplo, dashboards, gestión de usuarios internos).
- Estructura similar a `AuthService`.

## 🧵 Estructura de Braches
- **`main`**: Rama principal y estable. Solo se actualiza con versiones listas para producción. Después de cada pase a producción, `main` debe mantenerse sincronizada con `develop`.
- **`develop`**: Rama de integración donde se combinan todas las funcionalidades y tareas antes de ser fusionadas en `main`. Es la base para el desarrollo de nuevas características.
- **`feature/{nombre}`** o **`task/{nombre}`**: Ramas utilizadas para el desarrollo de nuevas características o tareas individuales.
  - Se crean a partir de `develop`  
  - Ejemplo: `feature/bdinit`
