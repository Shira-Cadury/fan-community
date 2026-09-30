import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# אם קיים משתנה סביבה של ענן (PostgreSQL) נשתמש בו, אחרת נשתמש ב-SQLite המקומי
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./fan_community.db")

# התאמה קטנה עבור Render (לפעמים מספקים postgres:// במקום postgresql://)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency that yields a database session per request and closes it after."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()