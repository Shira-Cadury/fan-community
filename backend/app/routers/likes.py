from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from . import models, schemas
from .database import get_db
from .routers.auth import get_current_user

router = APIRouter(prefix="/posts", tags=["likes"])


@router.post("/{post_id}/like", response_model=schemas.LikeToggleResponse)
def toggle_like(
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

    existing_like = (
        db.query(models.Like)
        .filter(models.Like.post_id == post_id, models.Like.user_id == current_user.id)
        .first()
    )

    if existing_like:
        db.delete(existing_like)
        db.commit()
        liked = False
    else:
        new_like = models.Like(
            post_id=post_id,
            user_id=current_user.id,
        )
        if hasattr(models.Like, "created_at"):
            setattr(new_like, "created_at", datetime.utcnow())

        db.add(new_like)
        db.commit()
        liked = True

    total_likes = db.query(models.Like).filter(models.Like.post_id == post_id).count()
    return schemas.LikeToggleResponse(liked=liked, likes_count=total_likes)