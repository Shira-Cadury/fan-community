# Project Task Roadmap (tasks.md)

## Status Legend
- [ ] Not Started
- [/] In Progress
- [x] Completed

---

## Phase 0: Planning & Specification (Spec-Driven Design)
- [x] Repository setup (GitHub, README, .gitignore, License)
- [x] Product Specification (`docs/spec.md`)
- [x] System Architecture (`docs/architecture.md`)
- [x] Database Schema Design (`docs/db-design.md`)
- [x] REST API Specification (`docs/api-spec.md`)
- [x] Roadmap & Task Breakdown (`docs/tasks.md`)

---

## Phase 1: Environment & Project Setup
- [x] Backend setup: Create virtual environment (`venv`) & install dependencies (FastAPI, Uvicorn, SQLAlchemy, Pydantic, Passlib, python-jose).
- [x] Backend structure: Initialize `backend/app` package structure.
- [x] Frontend setup: Scaffold Vite React app (`frontend`).
- [x] Frontend styling: Configure Tailwind CSS and bilingual RTL/LTR directions.
- [x] Git commit & push of initial project scaffolding.

---

## Phase 2: Backend Core & Database
- [x] Database engine & session configuration (`database.py`).
- [x] SQLAlchemy Models implementation (`User`, `Post`, `Comment`, `Like`, `Report`, `Quiz`).
- [x] Pydantic request/response schemas.
- [x] Password hashing & JWT token utility functions.
- [x] Role-based access control (RBAC) route dependencies.

## Phase 3: Backend API Routes
- [ ] Auth Router: Registration, login, profile management (`/auth`, `/users/me`).
- [ ] Posts Router: CRUD operations, filtering by category (News, Events, Gallery).
- [ ] Comments Router: Hierarchical threaded replies (max depth 3), soft deletion.
- [ ] Interactions Router: Like toggling.
- [ ] Quizzes Router: Trivia retrieval and answer validation.
- [ ] Moderation Router: Flagged reports management & user ban controls.

---

## Phase 4: Frontend Development
- [ ] UI Component library (Buttons, Modals, Cards, Navigation Bar).
- [ ] Internationalization (i18n) setup for Hebrew (RTL) & English (LTR).
- [ ] Authentication Context (Login, Logout, Token persistence).
- [ ] Views & Pages:
  - [ ] Home / Feed view (Posts & News)
  - [ ] Gallery view
  - [ ] Events view
  - [ ] Interactive Games / Quiz view
  - [ ] Profile & settings view
  - [ ] Admin / Moderation Dashboard

---

## Phase 5: Verification & Delivery
- [ ] API integration tests & Swagger endpoint verification.
- [ ] Frontend & Backend integration verification.
- [ ] Polishing UI, animations, and responsive mobile behavior.
- [ ] Updating root `README.md` with complete architecture and setup guide.