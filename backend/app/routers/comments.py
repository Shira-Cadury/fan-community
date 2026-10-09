from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..routers.auth import get_current_user

router = APIRouter(prefix="/posts/{post_id}/comments", tags=["comments"])


@router.get("", response_model=List[schemas.CommentOut])
def get_comments(post_id: int, db: Session = Depends(get_db)):
    all_comments = (
        db.query(models.Comment)
        .filter(
            models.Comment.post_id == post_id,
            models.Comment.is_deleted == False,
        )
        .order_by(models.Comment.created_at.asc())
        .all()
    )

    # בניית עץ התגובות ושיטוחו כך שכל תגובת-בת תופיע מיד מתחת לתגובת-האב שלה
    root_comments = [c for c in all_comments if not c.parent_id]
    ordered_list = []

    def flatten(comment_obj):
        ordered_list.append(comment_obj)
        children = [child for child in all_comments if child.parent_id == comment_obj.id]
        for child in children:
            flatten(child)

    for root in root_comments:
        flatten(root)

    return ordered_list


@router.post("", response_model=schemas.CommentOut)
def create_comment(
    post_id: int,
    comment_in: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="הפוסט לא נמצא",
        )

    depth = 0
    if comment_in.parent_id:
        parent_comment = (
            db.query(models.Comment)
            .filter(models.Comment.id == comment_in.parent_id, models.Comment.post_id == post_id)
            .first()
        )
        if not parent_comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="התגובה המקורית לא נמצאה",
            )
        depth = (parent_comment.depth or 0) + 1

    new_comment = models.Comment(
        content=comment_in.content,
        post_id=post_id,
        author_id=current_user.id,
        parent_id=comment_in.parent_id,
        depth=depth,
        is_deleted=False,
        created_at=datetime.utcnow(),
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment


@router.delete("/{comment_id}")
def delete_comment(
    post_id: int,
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    comment = (
        db.query(models.Comment)
        .filter(models.Comment.id == comment_id, models.Comment.post_id == post_id)
        .first()
    )
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="התגובה לא נמצאה",
        )

    is_author = comment.author_id == current_user.id
    is_admin = current_user.role in [models.UserRole.ADMIN, models.UserRole.MODERATOR]

    if not (is_author or is_admin):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="אין לך הרשאה למחוק תגובה זו",
        )

    comment.is_deleted = True
    db.commit()
    return {"message": "התגובה נמחקה בהצלחה"}