from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import Base, engine, SessionLocal
import app.models as models
import app.schemas as schemas
from app.routers import auth, comments, likes, posts, reports

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

# Register routers
app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(likes.router)
app.include_router(reports.router)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Fan Community API is running"}


# --- COLLECTIBLES ROUTES ---

@app.get("/collectibles", response_model=List[schemas.CollectibleOut])
def get_collectibles(category: Optional[str] = None, era: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Collectible)
    
    if category and category != "all":
        query = query.filter(models.Collectible.category == category)
    if era and era != "all":
        query = query.filter(models.Collectible.era == era)
        
    return query.all()

@app.post("/collectibles", response_model=schemas.CollectibleOut)
def create_collectible(item: schemas.CollectibleCreate, db: Session = Depends(get_db)):
    item_data = item.model_dump() if hasattr(item, 'model_dump') else item.dict()
    db_item = models.Collectible(**item_data)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/collectibles/{item_id}")
def delete_collectible(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.Collectible).filter(models.Collectible.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Collectible not found")
    
    db.delete(db_item)
    db.commit()
    return {"message": "Collectible deleted successfully"}