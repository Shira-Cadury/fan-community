from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import Base, engine, SessionLocal
import app.models as models
import app.schemas as schemas
from app.routers import auth, comments, likes, posts, reports, collectibles

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fan Community API",
    version="1.0.0",
    description="Backend API for the Fan Community platform",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers (כאן הראוטר של collectibles רשום כחוק)
app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(likes.router)
app.include_router(reports.router)
app.include_router(collectibles.router)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Fan Community API is running"}