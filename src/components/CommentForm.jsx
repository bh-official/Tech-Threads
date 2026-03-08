"use client";

import { addComment } from "@/actions/commentActions";
import { useState } from "react";

export default function CommentForm({
  postId,
  parentId,
  compact = false,
  onCancel,
}) {
  const [error, setError] = useState("");

  function handleSubmit(e) {
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString().trim() || "";
    const comment = formData.get("comment")?.toString().trim() || "";

    if (!username) {
      e.preventDefault();
      setError("Username is required");
      return;
    }
    if (!comment) {
      e.preventDefault();
      setError("Comment is required");
      return;
    }
    setError("");
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <div className={compact ? "reply-form-wrapper" : "comment-form-wrapper"}>
      {error && (
        <div className="form-error" style={{ marginBottom: 8, fontSize: 12 }}>
          {error}
        </div>
      )}
      <form action={addComment} onSubmit={handleSubmit}>
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="parentId" value={parentId || ""} />

        <input
          type="text"
          name="username"
          placeholder="Your name"
          required
          maxLength={50}
        />

        <textarea
          name="comment"
          placeholder={
            parentId ? "Write a reply..." : "What are your thoughts?"
          }
          required
          rows={compact ? 3 : 4}
        />

        <div className="form-actions">
          {parentId && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary">
            {parentId ? "Reply" : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}
