import CommentForm from "./CommentForm";
import DeleteButton from "./DeleteButton";
import { deleteComment } from "@/actions/commentActions";
import EditCommentButton from "./EditCommentButton";
import { revalidatePath } from "next/cache";
import ReplyButton from "./ReplyButton";

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

          {comment.parent_comment_id === null && comment.reply_count > 0 && (
            <p>↳ {comment.reply_count} replies</p>
          )}

          <div className="comment-actions">
            {/* Edit comment */}
            <EditCommentButton comment={comment} />
            {/* Delete comment */}
            <form action={deleteComment}>
              <input type="hidden" name="id" value={comment.id} />
              <DeleteButton />
            </form>
            {/* Reply form */}
            <ReplyButton postId={postId} parentId={comment.id} />
          </div>

          {/* Nested replies */}
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
