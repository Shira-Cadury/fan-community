from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session
from deep_translator import GoogleTranslator

from app import models, schemas
from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/posts", tags=["posts"])


class TranslateRequest(BaseModel):
    text: str
    target_lang: str = "he"


@router.get("", response_model=List[schemas.PostOut])
def get_posts(
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Post)
    if category and category != "all":
        query = query.filter(func.lower(models.Post.category) == category.lower())
    posts = query.order_by(models.Post.created_at.desc()).all()

    for p in posts:
        p.likes_count = len(p.likes)
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