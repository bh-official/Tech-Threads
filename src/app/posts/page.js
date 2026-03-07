import { query } from "@/utils/db";
import Link from "next/link";
import { deletePost } from "@/actions/postActions";
import DeleteButton from "@/components/DeleteButton";
import EditPostButton from "@/components/EditPostButton";
import ShareButton from "@/components/ShareButton";
import PostVote from "@/components/PostVote";

export default async function PostsPage({ searchParams }) {
  const { sort } = await searchParams;
  const order = sort === "asc" ? "ASC" : "DESC";

  const result = await query(
    `SELECT post.*, COUNT(comments.id) AS comment_count
     FROM post
     LEFT JOIN comments ON post.id = comments.post_id
     GROUP BY post.id
     ORDER BY post.created_at ${order}`,
  );

  const posts = result.rows;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>TechThreads</h1>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href={`/posts?sort=${order === "DESC" ? "asc" : "desc"}`}
            className="btn-secondary"
            title={order === "DESC" ? "Sort oldest first" : "Sort newest first"}
          >
            {order === "DESC" ? "↑ Oldest first" : "↓ Newest first"}
          </Link>
        </div>
      </div>

      {posts.length === 0 && (
        <div className="empty-state">
          <p>No posts yet. Be the first to post!</p>
          <Link href="/posts/new" className="btn-primary">
            Create Post
          </Link>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <PostVote initialCount={1} />

          <div className="post-content">
            <div className="post-meta">
              <span className="post-category">
                {post.category || "General"}
              </span>
              <span>
                Posted {new Date(post.created_at).toLocaleString("en-GB")}
              </span>
            </div>

            <Link href={`/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>

            {post.content && <p className="post-body">{post.content}</p>}

            <div className="post-actions">
              <Link href={`/posts/${post.id}`} className="action-btn">
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 0 1-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                {post.comment_count} Comments
              </Link>

              <ShareButton postId={post.id} postTitle={post.title} />

              <EditPostButton id={post.id} />

              <form action={deletePost} style={{ display: "inline" }}>
                <input type="hidden" name="id" value={post.id} />
                <DeleteButton />
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
