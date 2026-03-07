import { query } from "@/utils/db";
import { updatePost } from "@/actions/postActions";
import Link from "next/link";

export default async function EditPostPage({ params }) {
  const { id } = await params;

  const result = await query("SELECT * FROM post WHERE id=$1", [id]);
  const post = result.rows[0];

  if (!post) {
    return (
      <div className="form-page">
        <p style={{ color: "var(--text-secondary)" }}>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Edit Post</h1>

        <form action={updatePost}>
          <input type="hidden" name="id" value={id} />

          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              defaultValue={post.title}
              required
              maxLength={300}
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              defaultValue={post.category || "General"}
              required
            >
              <option value="Next.js">Next.js</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="DevOps">DevOps</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="content">Body</label>
            <textarea
              id="content"
              name="content"
              defaultValue={post.content}
              required
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
