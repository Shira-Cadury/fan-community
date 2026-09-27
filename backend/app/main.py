from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
import app.models  # Ensures models are registered with Base metadata

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


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Fan Community API is running"}