from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from mangum import Mangum

from .database import Base, engine, SessionLocal
from . import models as models
from . import schemas as schemas
from .routers import auth, comments, likes, posts, reports, collectibles

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fan Community API",
    version="1.0.0",
    description="Backend API for the Fan Community platform",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DailySongSchema(BaseModel):
    title: str
    album: str
    explanation: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None

current_daily_song = {
    "title": "Enchanted (Taylor's Version)",
    "album": "Speak Now",
    "explanation": "שיר אגדי שלוכד את רגע ההתאהבות הראשוני והתקווה שהצד השני מרגיש בדיוק אותו דבר.",
    "link": "https://open.spotify.com/search/Enchanted%20Taylor%27s%20Version",
    "image_url": ""
}

@app.get("/api/daily-song")
def get_daily_song():
    return current_daily_song

@app.post("/api/daily-song")
def update_daily_song(song: DailySongSchema):
    global current_daily_song
    current_daily_song = song.dict()
    return {"status": "success", "data": current_daily_song}

app.include_router(auth.router, prefix="/api")
app.include_router(posts.router, prefix="/api")
app.include_router(comments.router, prefix="/api")
app.include_router(likes.router, prefix="/api")
app.include_router(reports.router, prefix="/api")
app.include_router(collectibles.router, prefix="/api")

@app.get("/api")
def health_check():
    return {"status": "ok", "message": "Fan Community API is running"}

handler = Mangum(app)