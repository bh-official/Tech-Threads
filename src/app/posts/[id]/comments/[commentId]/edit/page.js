import { query } from "@/utils/db";
import { updateComment } from "@/actions/commentActions";
import Link from "next/link";

export default async function EditCommentPage({ params }) {
  const { id, commentId } = await params;

  const result = await query("SELECT * FROM comments WHERE id=$1", [commentId]);
  const comment = result.rows[0];

  if (!comment) {
    return (
      <div className="form-page">
        <p style={{ color: "var(--text-secondary)" }}>Comment not found.</p>
        <Link
          href={`/posts/${id}`}
          className="btn-secondary"
          style={{ marginTop: 12 }}
        >
          ← Back to post
        </Link>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Edit Comment</h1>

        {/* Use hidden fields to pass IDs to the action */}
        <form action={updateComment}>
          <input type="hidden" name="id" value={commentId} />
          <input type="hidden" name="postId" value={id} />

          <div className="form-field">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              defaultValue={comment.comment}
              required
              rows={5}
            />
          </div>

          <div className="form-actions">
            <Link href={`/posts/${id}`} className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
