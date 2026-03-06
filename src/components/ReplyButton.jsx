"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";

export default function ReplyButton({ postId, parentId }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="reply-container">
      <button type="button" onClick={() => setShowReply(!showReply)}>
        Reply
      </button>

      {showReply && (
        <div className="reply-form">
          <CommentForm postId={postId} parentId={parentId} />

          <button type="button" onClick={() => setShowReply(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
