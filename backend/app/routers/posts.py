from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status, Header
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session
from deep_translator import GoogleTranslator

from .. import models, schemas
from ..database import get_db
from ..routers.auth import get_current_user, SECRET_KEY, ALGORITHM
import jwt

router = APIRouter(prefix="/posts", tags=["posts"])


class TranslateRequest(BaseModel):
    text: str
    target_lang: str = "he"


def get_current_user_optional(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)) -> Optional[models.User]:
    """פונקציה עזר לבדיקת משתמש מחובר באופן אופציונלי (לא זורקת שגיאה אם אין טוקן)"""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return None
        user = db.query(models.User).filter(models.User.username == username).first()
        return user
    except Exception:
        return None


@router.get("", response_model=List[schemas.PostOut])
def get_posts(
    category: Optional[str] = Query(None),
    limit: int = Query(12, ge=1, le=50),  # מחזיר 12 פוסטים לבקשה לחסכון אדיר ברוחב פס
    skip: int = Query(0, ge=0),           # דילוג לצורך טעינה נוספת (Pagination)
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(get_current_user_optional),
):
    query = db.query(models.Post)
    if category and category != "all":
        query = query.filter(func.lower(models.Post.category) == category.lower())
    
    # שליפת כמות מוגבלת לפי skip ו-limit
    posts = query.order_by(models.Post.created_at.desc()).offset(skip).limit(limit).all()

    for p in posts:
        p.likes_count = len(p.likes)
        if current_user:
            p.is_liked = any(like.user_id == current_user.id for like in p.likes)
        else:
            p.is_liked = False

    return posts


@router.post("", response_model=schemas.PostOut)
def create_post(
    post_in: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != models.UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="רק מנהלות מורשות לפרסם פוסטים באתר",
        )

    safe_title = post_in.title if (post_in.title and post_in.title.strip()) else " "
    safe_content = post_in.content if (post_in.content and post_in.content.strip()) else " "
    safe_category = post_in.category.lower() if post_in.category else "discussions"
    now = datetime.utcnow()

    db_post = models.Post(
        title=safe_title,
        content=safe_content,
        category=safe_category,
        image_url=post_in.image_url,
        created_at=now,
        updated_at=now,
        author_id=current_user.id,
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    db_post.likes_count = 0
    db_post.is_liked = False
    return db_post


@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="הפוסט לא נמצא",
        )

    is_author = post.author_id == current_user.id
    is_admin = current_user.role in [models.UserRole.ADMIN, models.UserRole.MODERATOR]

    if not (is_author or is_admin):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="אין לך הרשאה למחוק פוסט זה",
        )

    db.delete(post)
    db.commit()
    return {"message": "הפוסט נמחק בהצלחה"}


@router.post("/translate")
def translate_post_text(payload: TranslateRequest):
    text_to_translate = payload.text.strip()
    if not text_to_translate:
        return {"translated_text": ""}
    try:
        translated = GoogleTranslator(source="auto", target=payload.target_lang).translate(text_to_translate)
        return {"translated_text": translated}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Translation failed: {str(e)}",
        )