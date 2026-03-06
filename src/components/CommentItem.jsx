"use client";

import { useState } from "react";
import DeleteButton from "./DeleteButton";
import { deleteComment } from "@/actions/commentActions";
import EditCommentButton from "./EditCommentButton";
import ReplyButton from "./ReplyButton";
import CommentList from "./CommentList";

export default function CommentItem({ comment, comments, postId }) {
  const [showReplies, setShowReplies] = useState(false);

  const replyCount = comments.filter(
    (c) => c.parent_comment_id === comment.id,
  ).length;

  return (
    <div
      style={{
        marginLeft: "20px",
        borderLeft: "1px solid gray",
        paddingLeft: "10px",
      }}
    >
      <strong>{comment.username}</strong>

      <p>{comment.comment}</p>

      <p>{new Date(comment.created_at).toLocaleString("en-GB")}</p>

      {comment.parent_comment_id === null && replyCount > 0 && (
        <button type="button" onClick={() => setShowReplies(!showReplies)}>
          {showReplies ? "Hide replies" : `Show replies (${replyCount})`}
        </button>
      )}

      <div className="comment-actions">
        <EditCommentButton comment={comment} postId={postId} />

        <form action={deleteComment}>
          <input type="hidden" name="id" value={comment.id} />
          <input type="hidden" name="postId" value={postId} />
          <DeleteButton />
        </form>

        <ReplyButton postId={postId} parentId={comment.id} />
      </div>

      {(comment.parent_comment_id !== null || showReplies) && (
        <CommentList
          comments={comments}
          postId={postId}
          parentId={comment.id}
        />
      )}
    </div>
  );
}
