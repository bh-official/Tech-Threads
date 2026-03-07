"use client";

import { addComment } from "@/actions/commentActions";

export default function CommentForm({ postId, parentId, compact = false }) {
  return (
    <div className={compact ? "reply-form-wrapper" : "comment-form-wrapper"}>
      <form action={addComment}>
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
          <button type="submit" className="btn-primary">
            {parentId ? "Reply" : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}
