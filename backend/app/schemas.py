from datetime import datetime
from typing import Any, List, Optional
from pydantic import BaseModel, EmailStr, Field
from app.models import PostCategory, ReportStatus, UserRole


# --- User Schemas ---
class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


class UserOut(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[UserRole] = None


# --- Comment Schemas ---
class CommentBase(BaseModel):
    content: str = Field(..., min_length=1)
    parent_id: Optional[int] = None


class CommentCreate(CommentBase):
    pass


class CommentOut(BaseModel):
    id: int
    content: str
    depth: int
    is_deleted: bool
    created_at: datetime
    post_id: int
    author_id: int
    parent_id: Optional[int] = None
    author: Optional[UserOut] = None

    class Config:
        from_attributes = True


# --- Post Schemas ---
class PostBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    content: str = Field(..., min_length=1)
    category: PostCategory = PostCategory.DISCUSSIONS
    image_url: Optional[str] = None


class PostCreate(PostBase):
    pass


class PostOut(PostBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: datetime
    author: Optional[UserOut] = None
    likes_count: int = 0
    comments_count: int = 0

    class Config:
        from_attributes = True


# --- Like Schemas ---
class LikeToggleResponse(BaseModel):
    liked: bool
    likes_count: int


# --- Report Schemas ---
class ReportCreate(BaseModel):
    reason: str = Field(..., min_length=3, max_length=255)
    post_id: Optional[int] = None
    comment_id: Optional[int] = None


class ReportOut(BaseModel):
    id: int
    reason: str
    status: ReportStatus
    created_at: datetime
    reporter_id: int
    post_id: Optional[int] = None
    comment_id: Optional[int] = None

    class Config:
        from_attributes = True


# --- Quiz Schemas ---
class QuizQuestion(BaseModel):
    question: str
    options: List[str]


class QuizCreate(BaseModel):
    title: str
    description: Optional[str] = None
    questions: List[dict]  # Includes correct_index


class QuizOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    questions: List[QuizQuestion]
    created_at: datetime

    class Config:
        from_attributes = True


class QuizSubmitRequest(BaseModel):
    answers: List[int]


class QuizSubmitResponse(BaseModel):
    score: int
    total: int
    percentage: float