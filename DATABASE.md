# Database Schema

This document describes the database tables for the TechThreads application.

## Current Tables

### post

```sql
CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### comments

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

## Vote Feature

The up/down arrows (▲/▼) on each post are for **voting**. Currently, these votes are **only stored in browser memory** and are **not persisted** to the database. Each time you refresh the page, the vote count resets.

### To Enable Persistent Voting

If you want votes to be stored in the database, you would need to add a new table:

```sql
-- Table to store individual votes (prevents duplicate voting)
CREATE TABLE post_vote (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES post(id) ON DELETE CASCADE,
  user_ip VARCHAR(50) NOT NULL,  -- or user_id if you have authentication
  vote_type VARCHAR(3) NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_ip)  -- One vote per post per user
);

-- Optional: Add a computed column to get total vote count
-- This requires a trigger or can be calculated in queries
```

### Query to Get Post with Vote Count

```sql
SELECT
  p.id,
  p.title,
  p.content,
  p.created_at,
  COALESCE(SUM(
    CASE
      WHEN v.vote_type = 'up' THEN 1
      WHEN v.vote_type = 'down' THEN -1
      ELSE 0
    END
  ), 0) AS vote_count
FROM post p
LEFT JOIN post_vote v ON p.id = v.post_id
GROUP BY p.id;
```

### Current Behavior (No Database Storage)

- Votes are stored locally in the browser using React state
- Vote count resets on page refresh
- No way to track who voted

---

## Seed Data (Sample Next.js Topics)

Run these SQL statements to populate your database with sample data:

```sql
-- If you have an existing database, add the category column:
ALTER TABLE post ADD COLUMN category VARCHAR(50) DEFAULT 'General';

-- Insert 10 posts about Next.js topics
INSERT INTO post (title, content, category, created_at) VALUES
('Getting Started with Next.js 14 App Router', 'Just started learning Next.js 14 and the new App Router. The file-based routing seems intuitive but Im confused about when to use server components vs client components. Any tips for beginners?', 'Next.js', '2024-01-15 10:30:00'),
('Best practices for API routes in Next.js', 'What are the current best practices for creating API routes in Next.js? Should I use the Route Handlers or stick with the Pages directory API routes? Looking for performance and maintainability advice.', 'Next.js', '2024-01-16 14:22:00'),
('Next.js vs React - When to use which?', 'I have been using React for a while and now considering Next.js for a new project. What are the main advantages of Next.js over vanilla React? Is it always better to use Next.js?', 'React', '2024-01-17 09:15:00'),
('How to handle authentication in Next.js 14', 'Looking for recommendations on authentication libraries that work well with Next.js 14. I've heard about NextAuth, Clerk, and Supabase Auth. Which one would you recommend for a production app?', '2024-01-18 16:45:00'),
('Server Actions are they ready for production?', 'Next.js 14 introduced Server Actions and they look promising. Has anyone used them in production? How is the error handling and validation? Worth migrating from API routes?', '2024-01-19 11:30:00'),
('Optimizing images in Next.js with next/image', 'The next/image component is great but I keep getting layout shift errors. What are the best practices for using it correctly? Should I always specify width and height?', '2024-01-20 13:20:00'),
('Next.js middleware examples and use cases', 'Can someone share practical examples of Next.js middleware? I want to implement geo-blocking and A/B testing but not sure where to start.', '2024-01-21 08:00:00'),
('Deploying Next.js to Vercel vs self-hosting', 'What are the pros and cons of deploying Next.js to Vercel versus self-hosting on AWS or Docker? Looking for real-world experiences from production deployments.', 'DevOps', '2024-01-22 15:10:00'),
('State management in Next.js - what to use?', 'With the App Router, how do people handle state management? Redux, Zustand, Jotai, or just React Context? Coming from the Pages router and used to getStaticProps.', 'React', '2024-01-23 10:45:00'),
('Next.js 15 what to expect', 'With Next.js 15 rumored to be in beta soon, what new features are you most excited about? Any changes that might break existing apps?', '2024-01-24 12:00:00');

-- Insert comments for the first post (Getting Started with Next.js 14 App Router)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(1, 'devmaster', 'Great question! Start with server components by default and only add "use client" when you need interactivity like onClick or useState. This gives you better performance out of the box.', '2024-01-15 11:00:00'),
(1, 'reactfan', 'The App Router takes some getting used to. I found the Next.js documentation really helpful - especially the deep dive on rendering.', '2024-01-15 12:30:00'),
(1, 'newbie_coder', 'Thanks! This makes sense. So client components are only for things like forms and interactive UI?', '2024-01-15 13:00:00'),
(1, 'devmaster', 'Exactly! Think of server components as your default and client components as the interactive islands.', '2024-01-15 13:45:00');

-- Insert comments for the second post (Best practices for API routes)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(2, 'backend_dev', 'Route Handlers (App Router) are the way to go. They are simpler and more intuitive. Just create a route.ts file and export your GET, POST, etc. functions.', '2024-01-16 15:00:00'),
(2, 'api_guru', 'Also make sure to validate your request body with Zod. It saves so much headache downstream.', '2024-01-16 16:30:00'),
(2, 'fullstackjs', 'Dont forget caching! Next.js caches Route Handler responses by default. Use dynamic functions or set cache: no-store when needed.', '2024-01-16 17:15:00');

-- Insert comments for the third post (Next.js vs React)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(3, 'perfmatters', 'Next.js is essentially React with extra superpowers. You get SSR, automatic code splitting, and optimized builds out of the box. For most projects, Next.js is the better choice.', '2024-01-17 10:00:00'),
(3, 'simplicity_first', 'It depends on your use case. If you need SEO and fast initial loads, go Next.js. For internal tools or simple SPAs, plain React might be faster to build.', '2024-01-17 11:30:00'),
(3, 'vercel_fan', 'The developer experience with Next.js is unmatched. Hot reload, built-in TypeScript support, and the image optimization component alone are worth it.', '2024-01-17 12:00:00');

-- Insert comments for the fourth post (Authentication)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(4, 'securityfirst', 'NextAuth (now Auth.js) is the most popular and well-maintained. It supports many providers and has great TypeScript support.', '2024-01-18 17:30:00'),
(4, 'clerk_user', 'Clerk is amazing for Next.js. The pre-built components save so much time and the docs are excellent.', '2024-01-18 18:00:00'),
(4, 'supabase_fan', 'If you are already using Supabase for your database, their auth integrates beautifully. Plus you get row-level security.', '2024-01-18 19:00:00'),
(4, 'newbie_coder', 'Which one is easiest to set up for a beginner?', '2024-01-18 20:00:00'),
(4, 'clerk_user', 'Clerk - literally copy-paste their Next.js setup guide and you are done in 10 minutes.', '2024-01-18 20:30:00');

-- Insert comments for the fifth post (Server Actions)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(5, 'early_adopter', 'Been using Server Actions in production for 3 months. They are stable enough for production but documentation could be better.', '2024-01-19 12:00:00'),
(5, 'pragmatic_dev', 'The progressive enhancement is the killer feature. Forms work without JavaScript! Combined with useFormStatus for loading states.', '2024-01-19 13:30:00'),
(5, 'skeptical_dev', 'My concern is debugging. How do you handle errors in production? Any good error tracking tools?', '2024-01-19 14:00:00'),
(5, 'early_adopter', 'Use useFormState for form errors and Sentry works great with Server Actions for error tracking.', '2024-01-19 15:00:00');

-- Insert comments for the sixth post (next/image optimization)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(6, 'image_pro', 'Always use the fill prop with a parent container that has position: relative. Then use object-fit: cover for responsive images.', '2024-01-20 14:00:00'),
(6, 'nextjs_fan', 'Also use the sizes prop! It tells the browser which image size to download based on viewport. Huge performance difference.', '2024-01-20 14:30:00'),
(6, 'css_struggler', 'The layout shift usually happens when you do not have a parent container with defined dimensions. Check your CSS!', '2024-01-20 15:00:00');

-- Insert comments for the seventh post (Middleware)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(7, 'middleware_master', 'Middleware runs before requests hit your pages. Great for authentication checks, redirects, and AB testing. Check the Next.js docs for the matcher config.', '2024-01-21 09:00:00'),
(7, 'geo_dev', 'For geo-blocking, use the cf-ipcountry header (Cloudflare) or aws-request-country (AWS) in your middleware function.', '2024-01-21 10:00:00'),
(7, 'ab_tester', 'Use cookies to store AB test buckets. Set them in middleware and they will persist across requests.', '2024-01-21 11:00:00');

-- Insert comments for the eighth post (Deployment)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(8, 'vercel_user', 'Vercel is the easiest. Zero config deployments, automatic SSL, and edge functions. The DX is unmatched.', '2024-01-22 16:00:00'),
(8, 'aws_admin', 'Self-hosting on AWS ECS gives you more control. Use the standalone output mode to reduce Docker image size significantly.', '2024-01-22 17:00:00'),
(8, 'cost_conscious', 'Vercel can get expensive at scale. For high-traffic sites, self-hosting on DigitalOcean App Platform or Railway is cheaper.', '2024-01-22 18:00:00'),
(8, 'hybrid_approach', 'We use Vercel for production and self-hosting on Render for staging. Best of both worlds!', '2024-01-22 19:00:00');

-- Insert comments for the ninth post (State Management)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(9, 'zustand_fan', 'Zustand is perfect for Next.js App Router. No provider wrapper needed, works with server components when used correctly.', '2024-01-23 11:30:00'),
(9, 'jotai_user', 'Jotai is great if you like atomic state management. Much easier to reason about than Redux.', '2024-01-23 12:00:00'),
(9, 'redux_veteran', 'Redux Toolkit with the new React hooks integration still works fine. But honestly, for most apps, React Context + useState is enough.', '2024-01-23 13:00:00'),
(9, 'simplicityAdvocate', 'Start with React Context for auth/theme state. Only add external state management when you feel the pain.', '2024-01-23 14:00:00');

-- Insert comments for the tenth post (Next.js 15)
INSERT INTO comments (post_id, username, comment, created_at) VALUES
(10, 'rumor_mill', 'Expected improvements include better Turbopack integration, faster server components, and possibly partial prerendering becoming stable.', '2024-01-24 13:00:00'),
(10, 'stable_dev', 'Hope they improve the error messages. Currently debugging server component errors can be cryptic.', '2024-01-24 13:30:00'),
(10, 'upgrade_weary', 'Every major Next.js update seems to break something. Hoping for better backward compatibility!', '2024-01-24 14:00:00');
```

Run the seed data:
