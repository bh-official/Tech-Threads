"use client";

import CommentItem from "./CommentItem";

export default function CommentList({ comments, postId, parentId = null }) {
  const filtered = comments.filter(
    (comment) => comment.parent_comment_id === parentId,
  );

  return (
    <div>
      {filtered.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          comments={comments}
          postId={postId}
        />
      ))}
    </div>
  );
}
