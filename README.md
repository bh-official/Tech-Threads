[![TechThreads Logo](public/logo.svg)](https://tech-threads-nu.vercel.app)

# TechThreads — Where Code Meets Conversation

A modern, full-stack discussion forum built with Next.js for developers to share ideas, ask questions, and engage in meaningful technical conversations.

---

## 🌐 Live Demo

- **Production**: [https://tech-threads-nu.vercel.app](https://tech-threads-nu.vercel.app)
- **GitHub Repository**: [https://github.com/bh-official/Tech-Threads](https://github.com/bh-official/Tech-Threads)

---

## 📋 Table of Contents

1. [Application Overview](#application-overview)
2. [Core Features](#core-features)
3. [Application Architecture](#application-architecture)
4. [The Tech Stack](#the-tech-stack)
5. [Database Schema](#database-schema)
6. [Schema Visualizer](#schema-visualizer)
7. [Security](#security)
8. [API Endpoints](#api-endpoints)
9. [Page Usability \& Flow](#page-usability--flow)
10. [Major Changes \& Polish](#major-changes--polish)
11. [Setup \& Execution](#setup--execution)
12. [Reflection](#reflection)
13. [Requirements Achieved](#requirements-achieved)
14. [Challenges](#challenges)
15. [What Went Well](#what-went-well)
16. [What I Learned](#what-i-learned)
17. [Areas for Improvement](#areas-for-improvement)
18. [Future Enhancements](#future-enhancements)
19. [Summary](#summary)

---

## Application Overview

TechThreads is a vibrant tech discussion forum where developers can:

- **Create Posts**: Share questions, ideas, and insights about programming
- **Categorize**: Organize posts by technology (Next.js, React, JavaScript, TypeScript, DevOps, General)
- **Comment**: Engage in discussions with nested replies
- **Vote**: Show appreciation for quality content (upvote/downvote)
- **Share**: Distribute interesting posts via social platforms
- **Edit/Delete**: Manage your own content

---

## Core Features

### Post Management

- ✅ Create posts with title, content, and category
- ✅ Edit posts on dedicated route (`/posts/[id]/edit`)
- ✅ Delete posts with confirmation
- ✅ View all posts with sorting (newest/oldest)
- ✅ Category-based filtering display
- ✅ Share posts via URL copying, Twitter, Reddit, WhatsApp, Email

### Commenting System

- ✅ Add comments to posts
- ✅ Reply to comments (nested replies up to unlimited depth)
- ✅ Edit comments on dedicated route (`/posts/[id]/comments/[commentId]/edit`)
- ✅ Delete comments with confirmation
- ✅ Collapse/expand comment threads

### User Experience

- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode interface
- ✅ Toast notifications for actions
- ✅ Form validation (client & server-side)
- ✅ Loading states with optimistic UI

### SEO & Metadata

- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card support
- ✅ Semantic HTML structure

---

## Application Architecture

```
tech-threads-comment-form/
├── public/                    # Static assets
│   ├── favicon.svg          # App favicon
│   ├── logo.svg             # Brand logo
│   └── ...
├── src/
│   ├── actions/             # Server Actions (Next.js 14)
│   │   ├── postActions.js  # Post CRUD operations
│   │   └── commentActions.js # Comment CRUD operations
│   ├── app/                # App Router (Next.js 14)
│   │   ├── layout.js       # Root layout with navbar
│   │   ├── page.js         # Home page (redirects to /posts)
│   │   ├── globals.css     # Global styles
│   │   └── posts/
│   │       ├── page.js           # Posts list
│   │       ├── new/page.js       # Create post
│   │       └── [id]/
│   │           ├── page.js       # Post detail
│   │           ├── edit/page.js  # Edit post
│   │           └── comments/
│   │               └── [commentId]/
│   │                   └── edit/page.js # Edit comment
│   ├── components/        # React components
│   │   ├── CommentForm.jsx
│   │   ├── CommentItem.jsx
│   │   ├── CommentList.jsx
│   │   ├── DeleteButton.jsx
│   │   ├── EditPostButton.jsx
│   │   ├── PostVote.jsx
│   │   ├── ShareButton.jsx
│   │   └── ReplyButton.jsx
│   └── utils/
│       └── db.js          # Database connection (Neon/PostgreSQL)
├── DATABASE.md            # Database schema documentation
├── package.json
├── next.config.mjs
└── eslint.config.mjs
```

---

## The Tech Stack

### Frontend

| Technology                   | Purpose                                |
| ---------------------------- | -------------------------------------- |
| **React 19**                 | UI Library                             |
| **Next.js 16**               | Full-stack framework with App Router   |
| **CSS Modules / Global CSS** | Styling with CSS variables for theming |

### Backend

| Technology                 | Purpose                       |
| -------------------------- | ----------------------------- |
| **Next.js Server Actions** | Server-side logic & mutations |
| **PostgreSQL**             | Relational database           |

### Development Tools

| Technology | Purpose             |
| ---------- | ------------------- |
| **ESLint** | Code linting        |
| **Vercel** | Deployment platform |
| **Git**    | Version control     |

---

## Database Schema

### Posts Table

```sql
CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### Comments Table

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES post(id) ON DELETE CASCADE,
  parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

---

## Schema Visualizer

```
┌─────────────────────┐       ┌─────────────────────┐
│       post          │       │     comments         │
├─────────────────────┤       ├─────────────────────┤
│ id (PK)            │◄───────│ post_id (FK)        │
│ title              │       │ id (PK)             │
│ content            │       │ parent_comment_id    │────┐
│ category           │       │ username             │    │
│ created_at        │       │ comment             │    │
└─────────────────────┘       │ created_at          │    │
                             └─────────────────────┘    │
                                                          │
                                                          │ (self-referential)
                                                          ▼
                                                     (null for top-level)
```

---

## Security

### Implemented Measures

1. **Server-Side Validation**: All form inputs validated on server before database operations
2. **Client-Side Validation**: HTML5 `required` attributes + JavaScript validation
3. **SQL Injection Prevention**: Parameterized queries via `pg` library
4. **CASCADE Deletion**: Comments deleted when parent post is deleted
5. **Input Sanitization**: Trim whitespace from user inputs
6. **Error Handling**: Graceful error messages without exposing internals

---

## API Endpoints

### Server Actions (No traditional API routes)

Instead of REST API routes, TechThreads uses **Next.js Server Actions** for data mutations:

| Action         | File                            | Function                  |
| -------------- | ------------------------------- | ------------------------- |
| Create Post    | `src/actions/postActions.js`    | `addPost(formData)`       |
| Update Post    | `src/actions/postActions.js`    | `updatePost(formData)`    |
| Delete Post    | `src/actions/postActions.js`    | `deletePost(formData)`    |
| Create Comment | `src/actions/commentActions.js` | `addComment(formData)`    |
| Update Comment | `src/actions/commentActions.js` | `updateComment(...)`      |
| Delete Comment | `src/actions/commentActions.js` | `deleteComment(formData)` |

### Database Queries

All queries use parameterized statements:

```javascript
await query("INSERT INTO post (title, content) VALUES ($1, $2)", [
  title,
  content,
]);
```

---

## Page Usability & Flow

### Page Routes

| Route                                   | Description                         |
| --------------------------------------- | ----------------------------------- |
| `/`                                     | Redirects to `/posts`               |
| `/posts`                                | Lists all posts with sorting toggle |
| `/posts/new`                            | Create new post form                |
| `/posts/[id]`                           | View post with comments             |
| `/posts/[id]/edit`                      | Edit existing post                  |
| `/posts/[id]/comments/[commentId]/edit` | Edit comment                        |

### User Flows

**Creating a Post:**

1. Click "+ New Post" in navbar
2. Fill in title, select category, write content
3. Click "Post" → Redirected to posts list

**Commenting:**

1. Open a post detail page
2. Fill comment form at bottom
3. Click "Comment" → Comment appears immediately

**Replying to Comments:**

1. Click "Reply" on any comment
2. Inline reply form appears
3. Fill username and reply text
4. Click "Reply" → Nested reply appears

---

## Major Changes & Polish

### Initial Features

1. ✅ Posts CRUD with PostgreSQL
2. ✅ Comments with nested replies
3. ✅ Responsive dark theme UI
4. ✅ Share functionality (multiple platforms)
5. ✅ Edit/Delete for posts and comments

### Enhancements Added

1. **Categories**: Posts can now be categorized (Next.js, React, JavaScript, TypeScript, DevOps, General)
2. **Share Dropdown**: Fixed visibility issue with dropdown menu
3. **Form Validation**: Added client and server-side validation to prevent empty submissions
4. **Cancel Buttons**: Added cancel option for nested reply forms
5. **Styling Polish**: Gradient tagline, aligned form inputs, improved visual hierarchy
6. **SEO**: Added OpenGraph and Twitter Card metadata

---

## Setup & Execution

### Prerequisites

- Node.js 19+
- npm/yarn/pnpm
- PostgreSQL database

### Installation

```bash
# Clone repository
git clone https://github.com/bh-official/Tech-Threads.git
cd Tech-Threads

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# DATABASE_URL=postgresql://user:pass@host/db

# Run development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

### Building for Production

```bash
npm run build
npm start
```

### Database Setup

Run the SQL statements from `DATABASE.md` to create tables and optionally seed data.

---

## Reflection

### Requirements Achieved

| Requirement                      | Status |
| -------------------------------- | ------ |
| Post creation with categories    | ✅     |
| View all posts with sorting      | ✅     |
| SQL schema for posts/comments    | ✅     |
| Delete posts button              | ✅     |
| Comment form on posts            | ✅     |
| Comment on post detail pages     | ✅     |
| Redirect after post creation     | ✅     |
| Edit posts on dedicated route    | ✅     |
| Edit comments on dedicated route | ✅     |
| Share options dropdown           | ✅     |
| Nested replies                   | ✅     |
| Metadata and OpenGraph           | ✅     |

### Challenges

1. **Nested Comment Replies**  
   Implementing nested replies required a recursive structure and careful handling of parent comment IDs to maintain the comment hierarchy.

2. **Real-time Page Updates**  
   After database changes, the page needed to update immediately. This was solved using Next.js server actions with `revalidatePath`.

3. **Client and Server Components**  
   Handling client and server components correctly in Next.js required attention, especially when using `useState` and triggering server actions from forms.

4. **Dropdown Visibility**  
   The share dropdown was clipped due to `overflow: hidden`. This was fixed by changing it to `overflow: visible`.

5. **Empty Submissions**  
   Users could submit whitespace-only comments. Added both client and server validation.

6. **Form Error Handling**  
   Server action errors caused crashes. Fixed by returning error objects instead of throwing exceptions.

### What Went Well

- Built a dynamic blog application using Next.js and PostgreSQL.

- Implemented dynamic routes so each post has its own page displaying the full post and comments.

- Designed a relational database with `posts` and `comments` tables linked through a foreign key.

- Users can add comments on posts and reply through nested comment threads.

- Used Next.js server actions with `revalidatePath` to refresh data after creating, updating, or deleting comments.

- Followed a clean App Router architecture with clear separation of concerns.

- Used CSS variables for consistent theming across the application.

- Reused components such as `CommentForm` for both comments and replies.

- Added a delete post feature to remove posts from the database.

- After creating a post, users are redirected to the posts page to view the updated list.

### What I Learned

- **Building a Full Stack Application**  
  Learned how to build a dynamic blog application using Next.js with a PostgreSQL database.

- **Next.js App Router**  
  Understood how to use the App Router, server components, and server actions in Next.js.

- **Dynamic Routing**  
  Learned how to create dynamic routes so each post has its own page.

- **Database Design**  
  Gained experience designing relational databases using tables connected through foreign keys.

- **Nested Comments**  
  Learned how to implement nested comments using self-referential relationships and recursive rendering.

- **Data Revalidation**  
  Understood how to update the UI after database changes using `revalidatePath`.

- **Component Reusability**  
  Improved skills in structuring applications using reusable components.

- **User Experience**  
  Learned the importance of validation, error handling, and user feedback in web applications.

### Areas for Improvement

1. **Authentication**: Add user login/logout (currently anonymous)
2. **Voting Persistence**: Votes are only client-side (reset on refresh)
3. **Image Uploads**: Allow attachments/media in posts
4. **Rich Text**: Markdown or WYSIWYG(What You See Is What You Get) editor for content
5. **Search**: Full-text search across posts and comments

### Future Enhancements

- [ ] User authentication (NextAuth.js/Clerk)
- [ ] Vote persistence to database
- [ ] Post voting (like/dislike system)
- [ ] Markdown support for posts
- [ ] Image upload capability
- [ ] Search functionality
- [ ] User profiles
- [ ] Bookmarking posts
- [ ] Email notifications

---

## Summary

TechThreads is a fully functional discussion forum built with modern web technologies. It demonstrates core forum features including post creation with categories, threaded comments, and social sharing. The application is deployed on Vercel.

The project showcases:

- **Modern React patterns** with Server Components
- **Full-stack Next.js** capabilities
- **Database design** with relational data
- **UX best practices** with validation and feedback

---
