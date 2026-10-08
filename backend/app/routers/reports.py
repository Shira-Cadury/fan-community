from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from .database import get_db
from .deps import get_current_user
from .models import Comment, Post, Report, ReportStatus, User, UserRole
from .schemas import ReportCreate, ReportOut

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.post("", response_model=ReportOut, status_code=status.HTTP_201_CREATED)
def file_report(
    report_in: ReportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Files a new report against a post or a comment."""
    # Ensure at least one target is provided
    if not report_in.post_id and not report_in.comment_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Must report either a post or a comment",
        )

    # Validate post exists if provided
    if report_in.post_id:
        post = db.query(Post).filter(Post.id == report_in.post_id).first()
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Reported post not found",
            )

    # Validate comment exists if provided
    if report_in.comment_id:
        comment = db.query(Comment).filter(Comment.id == report_in.comment_id).first()
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Reported comment not found",
            )

    new_report = Report(
        reason=report_in.reason,
        status=ReportStatus.PENDING,
        reporter_id=current_user.id,
        post_id=report_in.post_id,
        comment_id=report_in.comment_id,
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report


@router.get("", response_model=List[ReportOut])
def get_reports(
    status_filter: Optional[ReportStatus] = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retrieves all reports. Only accessible to admins and moderators."""
    if current_user.role not in [UserRole.ADMIN, UserRole.MODERATOR]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Moderator or Admin privileges required",
        )

    query = db.query(Report)
    if status_filter:
        query = query.filter(Report.status == status_filter)

    return query.order_by(Report.created_at.desc()).all()


@router.patch("/{report_id}/status", response_model=ReportOut)
def update_report_status(
    report_id: int,
    new_status: ReportStatus,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Updates the status of a report. Only accessible to admins and moderators."""
    if current_user.role not in [UserRole.ADMIN, UserRole.MODERATOR]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Moderator or Admin privileges required",
        )

    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )

    report.status = new_status
    db.commit()
    db.refresh(report)
    return report