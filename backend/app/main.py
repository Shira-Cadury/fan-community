from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from mangum import Mangum

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

# Schema for Daily Song
class DailySongSchema(BaseModel):
    title: str
    album: str
    explanation: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None

# זיכרון זמני לשיר היומי (או שאפשר לשמור במסד הנתונים)
current_daily_song = {
    "title": "Enchanted (Taylor's Version)",
    "album": "Speak Now",
    "explanation": "שיר אגדי שלוכד את רגע ההתאהבות הראשוני והתקווה שהצד השני מרגיש בדיוק אותו דבר.",
    "link": "https://open.spotify.com/search/Enchanted%20Taylor%27s%20Version",
    "image_url": ""
}

@app.get("/daily-song")
def get_daily_song():
    return current_daily_song

@app.post("/daily-song")
def update_daily_song(song: DailySongSchema):
    global current_daily_song
    current_daily_song = song.dict()
    return {"status": "success", "data": current_daily_song}

# Register routers
app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(likes.router)
app.include_router(reports.router)
app.include_router(collectibles.router)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Fan Community API is running"}

# Vercel Serverless Handler
handler = Mangum(app)


