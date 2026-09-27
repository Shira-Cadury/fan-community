# System Architecture (architecture.md)

## 1. High-Level Architecture Overview
The platform follows a decoupled **Client-Server Architecture**:
- **Client (Frontend):** Single Page Application (SPA) responsible for presentation, user interaction, state management, and i18n/RTL handling.
- **Server (Backend):** Asynchronous RESTful API exposing resources, handling business logic, permission verification (RBAC), and authentication.
- **Database:** Relational database managed through an Object-Relational Mapper (ORM).

Data Flow Diagram:
[ Browser / Client ] 
        │
   HTTP / JSON (REST API)
        ▼
[ FastAPI Backend ]
        │
   SQLAlchemy (ORM)
        ▼
[ SQLite / Relational DB ]

---

## 2. Tech Stack

| Layer | Technology | Details / Role |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Fast build tooling, component-driven UI |
| **Styling** | Tailwind CSS | Utility-first CSS supporting responsive layouts & LTR/RTL switching |
| **Backend** | Python (FastAPI) | High-performance async REST framework with automatic OpenAPI documentation |
| **Validation** | Pydantic | Strict request/response data validation and serialization |
| **ORM** | SQLAlchemy | Object Relational Mapping and database migrations management |
| **Database** | SQLite (Dev) / PostgreSQL (Prod) | Relational persistence for structured community and role data |
| **Authentication** | JWT (JSON Web Tokens) + Passlib/Bcrypt | Secure, stateless authentication with password hashing |

---

## 3. Future Project Directory Structure
Note: Directories will be initialized incrementally as development begins.

fan-community/
├── docs/                      # Project specifications and designs
│   ├── spec.md
│   ├── architecture.md
│   ├── db-design.md
│   ├── api-spec.md
│   └── tasks.md
│
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route views (Home, Gallery, Posts, etc.)
│   │   ├── context/           # Auth and Locale state
│   │   ├── services/          # API client calling backend
│   │   └── locales/           # i18n dictionary files (Hebrew / English)
│   └── package.json
│
├── backend/                   # FastAPI application
│   ├── app/
│   │   ├── routers/           # Endpoint controllers (auth, posts, comments)
│   │   ├── models/            # SQLAlchemy database models
│   │   ├── schemas/           # Pydantic schemas (Request/Response validation)
│   │   ├── core/              # Config, security, JWT helpers
│   │   └── main.py            # Entry point
│   ├── tests/
│   └── requirements.txt
│
├── .gitignore
├── LICENSE
└── README.md

---

## 4. Security & Communication Patterns
- **Stateless Authentication:** Bearer JWT tokens sent in the Authorization header for protected actions.
- **CORS Configuration:** Explicit origin whitelisting allowing only the frontend client to query API resources.
- **Role-Based Access Control (RBAC):** Token payloads carry role claims (Guest, User, Moderator, Admin) validated per-route using FastAPI dependencies.