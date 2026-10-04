from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter(prefix="/collectibles", tags=["collectibles"])


@router.get("", response_model=List[schemas.CollectibleOut])
def get_collectibles(
    era: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Collectible)
    if era and era != "all":
        query = query.filter(models.Collectible.era == era)
    if category and category != "all":
        query = query.filter(models.Collectible.category == category)
    return query.all()


@router.post("", response_model=schemas.CollectibleOut)
def create_collectible(
    item_in: schemas.CollectibleCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != models.UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="רק מנהלות מורשות להוסיף פריטי אספנות",
        )
    
    db_item = models.Collectible(**item_in.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{item_id}")
def delete_collectible(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != models.UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="רק מנהלות מורשות למחוק פריטי אספנות",
        )
    
    item = db.query(models.Collectible).filter(models.Collectible.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="הפריט לא נמצא",
        )
    
    db_item = item
    db.delete(db_item)
    db.commit()
    return {"message": "הפריט נמחק בהצלחה"}