import CommentForm from "./CommentForm";

export default function CommentList({ comments, postId, parentId = null }) {
  const filtered = comments.filter(
    (comment) => comment.parent_comment_id === parentId,
  );

  return (
    <div>
      {filtered.map((comment) => (
        <div
          key={comment.id}
          style={{
            marginLeft: "20px",
            borderLeft: "1px solid gray",
            paddingLeft: "10px",
          }}
        >
          <strong>{comment.username}</strong>

          <p>{comment.comment}</p>
          <p>{new Date(comment.created_at).toLocaleString("en-GB")}</p>

          <CommentForm postId={postId} parentId={comment.id} />

          <CommentList
            comments={comments}
            postId={postId}
            parentId={comment.id}
          />
        </div>
      ))}
    </div>
  );
}
