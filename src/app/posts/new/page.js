import { addPost } from "@/actions/postActions";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Create a Post</h1>

        <form action={addPost}>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              placeholder="An interesting title..."
              required
              maxLength={300}
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="Next.js">Next.js</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="DevOps">DevOps</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="content">Thoughts</label>
            <textarea
              id="content"
              name="content"
              placeholder="What are your thoughts?"
              required
            />
          </div>

          <div className="form-actions">
            <Link href="/posts" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
