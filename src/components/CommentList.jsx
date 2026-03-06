import CommentForm from "./CommentForm";
import DeleteButton from "./DeleteButton";
import { deleteComment } from "@/actions/commentActions";

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

          <form action={deleteComment}>
            <input type="hidden" name="id" value={comment.id} />
            <DeleteButton />
          </form>

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
