from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from app.models import UserRole, ReportStatus


# User schemas
class UserCreate(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


# Comment schemas
class CommentBase(BaseModel):
    content: str
    parent_id: Optional[int] = None


class CommentCreate(CommentBase):
    pass


class CommentOut(CommentBase):
    id: int
    post_id: int
    author_id: int
    depth: int = 0
    is_deleted: bool = False
    created_at: datetime
    author: UserOut

    class Config:
        from_attributes = True


# Post schemas
class PostBase(BaseModel):
    title: Optional[str] = " "
    content: Optional[str] = " "
    category: str = "discussions"
    image_url: Optional[str] = None


class PostCreate(PostBase):
    pass


class PostOut(PostBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    author: UserOut
    likes_count: int = 0

    class Config:
        from_attributes = True


# Like schemas
class LikeToggleResponse(BaseModel):
    liked: bool
    likes_count: int


class LikeOut(LikeToggleResponse):
    pass


# Report schemas
class ReportCreate(BaseModel):
    reason: str
    post_id: Optional[int] = None
    comment_id: Optional[int] = None


class ReportOut(BaseModel):
    id: int
    reason: str
    status: ReportStatus
    created_at: datetime
    reporter: UserOut
    post_id: Optional[int] = None
    comment_id: Optional[int] = None

    class Config:
        from_attributes = True


# Collectible schemas
class CollectibleBase(BaseModel):
    title: str
    category: str
    era: str
    image_url: Optional[str] = None
    release_year: Optional[str] = None
    rarity: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    external_link: Optional[str] = None


class CollectibleCreate(CollectibleBase):
    pass


class CollectibleOut(CollectibleBase):
    id: int

    class Config:
        from_attributes = True