# REST API Specification (api-spec.md)

## 1. Overview & Conventions
- **Base URL:** `/api/v1`
- **Format:** JSON (`Content-Type: application/json`)
- **Authentication:** Bearer token passed in headers: `Authorization: Bearer <JWT_TOKEN>`

---

## 2. Authentication & User Profile Endpoints

| Method | Endpoint | Access | Request Body | Response / Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | `{ username, password }` | `{ id, username, role }` (Creates account) |
| `POST` | `/auth/login` | Public | `{ username, password }` | `{ access_token, token_type: "bearer" }` |
| `GET` | `/users/me` | Authenticated | None | Returns profile info & current role |
| `PUT` | `/users/me/username` | Authenticated | `{ new_username }` | `{ message, username }` (Must be unique) |
| `PUT` | `/users/me/password` | Authenticated | `{ old_password, new_password }` | `{ message: "Password updated" }` |
| `DELETE` | `/users/me` | Authenticated | None | Soft/Hard removes user account |

---

## 3. Posts & Content Management

| Method | Endpoint | Access | Request Body | Response / Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/posts` | Public | Query params: `category`, `page`, `limit` | Paginated list of posts with author info & like counts |
| `GET` | `/posts/{post_id}` | Public | None | Single post object including full details |
| `POST` | `/posts` | Admin | `{ title, content, category, media_url?, event_date? }` | Created post object |
| `PUT` | `/posts/{post_id}` | Admin | `{ title?, content?, category?, media_url?, event_date? }` | Updated post object |
| `DELETE` | `/posts/{post_id}` | Admin | None | Cascades deletion of related comments & likes |

---

## 4. Comments & Moderation Endpoints

| Method | Endpoint | Access | Request Body | Response / Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/posts/{post_id}/comments` | Public | None | Hierarchical tree of comments (max depth 3) |
| `POST` | `/posts/{post_id}/comments` | Authenticated | `{ content, parent_id? }` | Created comment (validates `depth <= 3`) |
| `DELETE` | `/comments/{comment_id}` | Author / Mod / Admin | None | Flags `is_deleted = TRUE` to preserve thread continuity |
| `POST` | `/comments/{comment_id}/report` | Authenticated | `{ reason }` | Creates moderation report ticket |

---

## 5. Interactions & Games

| Method | Endpoint | Access | Request Body | Response / Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/posts/{post_id}/like` | Authenticated | None | Toggles like status (add or remove) |
| `GET` | `/quizzes` | Public | None | List of available quizzes |
| `GET` | `/quizzes/{quiz_id}` | Public | None | Quiz metadata & question list (without answers) |
| `POST` | `/quizzes/{quiz_id}/submit` | Public / Auth | `{ answers: [{ question_id, selected_index }] }` | Returns calculated score and correct answers |

---

## 6. Admin & Moderation Controls

| Method | Endpoint | Access | Request Body | Response / Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/moderation/reports` | Mod / Admin | Query: `status` ('pending' / 'resolved') | List of flagged reports |
| `PUT` | `/moderation/users/{user_id}/ban` | Mod / Admin | `{ is_banned: boolean, reason? }` | Bans or unbans target user |