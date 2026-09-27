# Product Specification (spec.md)

## 1. Overview & Vision
- **Project Name:** Fan Community (Temporary / Working Title)
- **Description:** A bilingual fan community website built as an interactive, engaging hub for fans.
- **Target Audience:** Dedicated fans and casual visitors.
- **Languages:** Bilingual support — Hebrew (RTL) & English (LTR).

---

## 2. Roles & Permissions (RBAC)

| Role | Permissions |
| :--- | :--- |
| **Guest** | Read public content, view gallery/news/events, play games/quizzes. No commenting or liking. |
| **User** | All Guest actions + create comments, reply to comments, like posts/items, report content, delete own comments, update credentials, delete own account. |
| **Moderator** | All User actions + hide/delete offending comments, review reports, temporarily/permanently ban users. |
| **Admin** | Full system control: manage roles, manage posts/news/events/gallery/quizzes, edit site settings, ban/unban users. |

---

## 3. Core Features (MVP)

### 3.1 Authentication & Profiles
- **Registration:** Unique username and password (no mandatory email required for MVP).
- **Authentication:** Standard Login and Logout.
- **Profile Self-Service:**
  - Change username (must remain unique across the platform).
  - Change password.
  - Delete account (removes user credentials and anonymizes/cleans references).
- **Guest Access:** Full read-only experience without forced login walls.

### 3.2 Content Modules
- **Posts & News:** Updates, announcements, and featured stories published by Admins.
- **Gallery:** Curated image and media gallery showcasing moments and milestones.
- **Events:** Calendar/list of upcoming events, dates, and live activities.
- **Games & Quizzes:** Interactive trivia and mini-games for community engagement.

### 3.3 Community Interactions & Moderation
- **Likes:** Users can like posts and content items.
- **Comments & Nested Replies:**
  - Threaded replies limited to a fixed depth: `Comment -> Reply -> Nested Reply` (max depth 3).
  - Soft deletion: When a comment is deleted (by the author or moderator), the thread remains intact and displays: *"תגובה זו הוסרה / This comment has been removed"*.
- **Reporting System:** Users can flag/report inappropriate comments or activity for moderator review.
- **User Moderation:** Moderators and Admins have the ability to ban offending users.

---

## 4. Scope Boundaries (Out of Scope for MVP)
To maintain focus and avoid scope creep, the following features are explicitly excluded from the MVP:
- Direct/Private Messaging (DMs).
- General user media uploads (only Admins upload content).
- Public user profile pages / public bios.
- Social follow / unfollow graphs.
- Friends or friend request systems.