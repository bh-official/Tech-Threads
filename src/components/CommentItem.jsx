"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteComment } from "@/actions/commentActions";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentItem({ comment, comments, postId }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const replies = comments.filter((c) => c.parent_comment_id === comment.id);
  const isTopLevel = comment.parent_comment_id === null;

  function handleLike() {
    if (liked) {
      setLikes((l) => l - 1);
      setLiked(false);
    } else {
      setLikes((l) => l + 1);
      setLiked(true);
    }
  }

  return (
    <div className={`comment-item${collapsed ? " comment-collapsed" : ""}`}>
      <div className="comment-thread-line">
        {/* Collapse line — click to collapse/expand */}
        <div
          className="comment-collapse-line"
          onClick={() => setCollapsed((v) => !v)}
          title={collapsed ? "Expand" : "Collapse"}
          role="button"
          aria-label={collapsed ? "Expand comment" : "Collapse comment"}
        />

        <div className="comment-body">
          {/* Header */}
          <div className="comment-header">
            <span className="comment-author">{comment.username}</span>
            <span className="comment-time">
              {new Date(comment.created_at).toLocaleString("en-GB")}
            </span>
            {collapsed && (
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-meta)",
                  cursor: "pointer",
                }}
                onClick={() => setCollapsed(false)}
              >
                [+]
                {replies.length > 0
                  ? ` ${replies.length} ${replies.length === 1 ? "reply" : "replies"}`
                  : ""}
              </span>
            )}
          </div>

          {/* Comment text */}
          <p className="comment-text">{comment.comment}</p>

          {/* Action bar */}
          <div className="comment-actions">
            {/* Like button */}
            <div className="comment-vote-row">
              <button
                type="button"
                className={`comment-vote-btn${liked ? " active-up" : ""}`}
                onClick={handleLike}
                aria-label="Like comment"
              >
                ▲
              </button>
              {likes > 0 && <span className="comment-vote-count">{likes}</span>}
            </div>

            {/* Reply button — available on all comments */}
            <button
              type="button"
              className="action-btn"
              onClick={() => setShowReplyForm((v) => !v)}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 0 1-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              Reply
            </button>

            {/* Edit button — navigates to dedicated edit route */}
            <Link
              href={`/posts/${postId}/comments/${comment.id}/edit`}
              className="action-btn"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </Link>

            {/* Delete button */}
            <form action={deleteComment} style={{ display: "inline" }}>
              <input type="hidden" name="id" value={comment.id} />
              <input type="hidden" name="postId" value={postId} />
              <button
                type="submit"
                className="action-btn action-btn-danger"
                onClick={(e) => {
                  if (!confirm("Delete this comment?")) e.preventDefault();
                }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 0 0-.894.553L7.382 4H4a1 1 0 0 0 0 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a1 1 0 1 0 0-2h-3.382l-.724-1.447A1 1 0 0 0 11 2H9zM7 8a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V8zm5-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </form>

            {/* Show/hide replies toggle */}
            {isTopLevel && replies.length > 0 && (
              <button
                type="button"
                className="action-btn"
                onClick={() => setShowReplies((v) => !v)}
              >
                {showReplies
                  ? `Hide ${replies.length} ${replies.length === 1 ? "reply" : "replies"}`
                  : `${replies.length} ${replies.length === 1 ? "reply" : "replies"}`}
              </button>
            )}
          </div>

          {/* Inline reply form */}
          {showReplyForm && (
            <CommentForm postId={postId} parentId={comment.id} compact />
          )}

          {/* Nested replies */}
          {(showReplies || !isTopLevel) && replies.length > 0 && (
            <div className="replies-container">
              <CommentList
                comments={comments}
                postId={postId}
                parentId={comment.id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
