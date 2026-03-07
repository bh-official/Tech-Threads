import { query } from "@/utils/db";
import Link from "next/link";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import ShareButton from "@/components/ShareButton";
import PostVote from "@/components/PostVote";
import EditPostButton from "@/components/EditPostButton";
import DeleteButton from "@/components/DeleteButton";
import { deletePost } from "@/actions/postActions";

export default async function PostPage({ params }) {
  const { id } = await params;

  const postResult = await query("SELECT * FROM post WHERE id=$1", [id]);
  const post = postResult.rows[0];

  if (!post) {
    return (
      <div className="page-container">
        <p style={{ color: "var(--text-secondary)" }}>Post not found.</p>
        <Link href="/posts" className="action-btn" style={{ marginTop: 12 }}>
          ← Back to posts
        </Link>
      </div>
    );
  }

  const commentResult = await query(
    `SELECT c.*, COUNT(r.id) AS reply_count
     FROM comments c
     LEFT JOIN comments r ON r.parent_comment_id = c.id
     WHERE c.post_id = $1
     GROUP BY c.id
     ORDER BY c.created_at ASC`,
    [id],
  );

  const comments = commentResult.rows;
  const topLevelCount = comments.filter(
    (c) => c.parent_comment_id === null,
  ).length;

  return (
    <div className="page-container">
      <div style={{ marginBottom: 8 }}>
        <Link href="/posts" className="action-btn" style={{ paddingLeft: 0 }}>
          ← Back to posts
        </Link>
      </div>

      {/* Post card */}
      <div className="post-detail-card">
        <PostVote initialCount={1} />

        <div className="post-detail-content">
          <div className="post-meta">
            <span className="post-category">{post.category || "General"}</span>
            <span>
              Posted {new Date(post.created_at).toLocaleString("en-GB")}
            </span>
          </div>

          <h1 className="post-detail-title">{post.title}</h1>

          {post.content && <p className="post-detail-body">{post.content}</p>}

          <div className="post-actions">
            <span className="action-btn" style={{ cursor: "default" }}>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 0 1-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              {topLevelCount} Comments
            </span>

            <ShareButton postId={post.id} postTitle={post.title} />

            <EditPostButton id={post.id} />

            <form action={deletePost} style={{ display: "inline" }}>
              <input type="hidden" name="id" value={post.id} />
              <DeleteButton />
            </form>
          </div>
        </div>
      </div>

      {/* Comments section */}
      <div className="comments-section">
        <div className="comments-header">
          {topLevelCount} Comment{topLevelCount !== 1 ? "s" : ""}
        </div>

        <CommentForm postId={id} />
        <CommentList comments={comments} postId={id} />
      </div>
    </div>
  );
}
