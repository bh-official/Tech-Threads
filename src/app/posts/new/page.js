"use client";

import { addPost } from "@/actions/postActions";
import Link from "next/link";
import { useState } from "react";

export default function NewPostPage() {
  const [error, setError] = useState("");

  function handleSubmit(e) {
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim() || "";
    const content = formData.get("content")?.toString().trim() || "";

    if (!title) {
      e.preventDefault();
      setError("Title is required");
      return;
    }
    if (!content) {
      e.preventDefault();
      setError("Content is required");
      return;
    }
    setError("");
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Create a Post</h1>

        {error && (
          <div className="form-error" style={{ marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form action={addPost} onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              placeholder="An interesting title..."
              required
              maxLength={300}
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="Next.js">Next.js</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="DevOps">DevOps</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="content">Thoughts</label>
            <textarea
              id="content"
              name="content"
              placeholder="What are your thoughts?"
              required
            />
          </div>

          <div className="form-actions">
            <Link href="/posts" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
