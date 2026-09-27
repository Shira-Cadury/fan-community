# Database Design (db-design.md)

## 1. Overview
The database uses a relational model managed via SQLAlchemy ORM. It supports Role-Based Access Control (RBAC), multi-language content metadata, soft-deletion for nested comment threads, and community reactions.

---

## 2. Entity Relationship Diagram (ERD Concept)

[ users ] ───1:N───< [ posts ]
   │                    │
   ├──1:N───< [ comments ] >───N:1───┤
   │             │ (self-ref parent_id)
   ├──1:N───< [ likes ] >──────N:1───┤
   │
   └──1:N───< [ reports ]

---

## 3. Database Schema Specification

### 3.1 users
Stores user authentication credentials, assigned roles, and moderation status.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique user identifier |
| username | VARCHAR(50) | UNIQUE, NOT NULL, INDEX | Display and login handle |
| hashed_password | VARCHAR(255) | NOT NULL | Bcrypt hashed secret |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'user' | Enum: 'guest', 'user', 'moderator', 'admin' |
| is_banned | BOOLEAN | NOT NULL, DEFAULT FALSE | Moderation flag blocking access |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Registration timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Last credential change |

---

### 3.2 posts
Admin-curated content including announcements, news, events, and gallery entries.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique post identifier |
| title | VARCHAR(200) | NOT NULL | Headline/Title |
| content | TEXT | NOT NULL | Main post body |
| category | VARCHAR(50) | NOT NULL, INDEX | 'news', 'event', 'gallery', 'announcement' |
| media_url | VARCHAR(500) | NULLABLE | Path or URL to associated image/video |
| author_id | INTEGER | FOREIGN KEY -> users.id | Admin/Creator who authored the entry |
| event_date | TIMESTAMP | NULLABLE | Specific target date (for event category) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Publication time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Modification time |

---

### 3.3 comments
User comments and nested replies supporting hierarchical threads up to 3 levels.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique comment identifier |
| post_id | INTEGER | FOREIGN KEY -> posts.id, INDEX | Target post |
| user_id | INTEGER | FOREIGN KEY -> users.id | Comment author |
| parent_id | INTEGER | NULLABLE, FOREIGN KEY -> comments.id | Self-referencing link for replies |
| depth | INTEGER | NOT NULL, DEFAULT 1 | Thread depth indicator (max allowed: 3) |
| content | TEXT | NOT NULL | Comment body |
| is_deleted | BOOLEAN | NOT NULL, DEFAULT FALSE | Soft delete flag ("תגובה זו הוסרה") |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Edit time |

---

### 3.4 likes
User likes on posts to prevent duplicate reactions.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique like record identifier |
| user_id | INTEGER | FOREIGN KEY -> users.id | User who liked |
| post_id | INTEGER | FOREIGN KEY -> posts.id | Target post |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Reaction timestamp |

Constraint: UNIQUE(user_id, post_id) to ensure each user can like a post only once.

---

### 3.5 reports
User reports flagged for moderator intervention.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique report identifier |
| reporter_id | INTEGER | FOREIGN KEY -> users.id | Reporting user |
| comment_id | INTEGER | NULLABLE, FOREIGN KEY -> comments.id | Offending comment (if applicable) |
| reason | VARCHAR(255) | NOT NULL | Reason provided for the report |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'pending' | 'pending', 'resolved', 'dismissed' |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Submission timestamp |

---

### 3.6 quizzes & quiz_questions
Trivia questions and game modules.

| Table | Primary Columns | Description |
| :--- | :--- | :--- |
| quizzes | id, title, description, created_at | Quiz meta container |
| quiz_questions | id, quiz_id, question_text, options_json, correct_answer_index | Questions with JSON options |

---

## 4. Integrity and Deletion Rules
- Account Deletion: When a user deletes their account, user credentials are removed, while authored comments retain thread integrity by displaying is_deleted = TRUE or attributing to an anonymized placeholder author.
- Cascading Posts: Deleting a post cascades and removes associated likes and comments.
- Soft Deletion for Comments: To protect thread readability, comments with replies are flagged with is_deleted = TRUE rather than hard-deleted.