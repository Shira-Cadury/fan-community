from datetime import datetime
import enum
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum, Boolean
from sqlalchemy.orm import relationship
from app.database import Base


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MODERATOR = "moderator"
    MEMBER = "member"


class ReportStatus(str, enum.Enum):
    PENDING = "pending"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.MEMBER, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", back_populates="author", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="author", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="reporter", cascade="all, delete-orphan")


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)
    content = Column(Text, nullable=True)
    category = Column(String, default="discussions", nullable=False)
    image_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    author = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="post", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="post", cascade="all, delete-orphan")


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    depth = Column(Integer, default=0, nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    parent_id = Column(Integer, ForeignKey("comments.id"), nullable=True)

    post = relationship("Post", back_populates="comments")
    author = relationship("User", back_populates="comments")
    reports = relationship("Report", back_populates="comment", cascade="all, delete-orphan")


class Like(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="likes")
    post = relationship("Post", back_populates="likes")


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    reason = Column(String, nullable=False)
    status = Column(Enum(ReportStatus), default=ReportStatus.PENDING, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    reporter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=True)
    comment_id = Column(Integer, ForeignKey("comments.id"), nullable=True)

    reporter = relationship("User", back_populates="reports")
    post = relationship("Post", back_populates="reports")
    comment = relationship("Comment", back_populates="reports")