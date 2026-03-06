import { query } from "@/utils/db";
import { updatePost } from "@/actions/postActions";

export default async function EditPostPage({ params }) {
  const { id } = await params;

  const result = await query("SELECT * FROM post WHERE id=$1", [id]);

  const post = result.rows[0];

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <form action={updatePost}>
        <input type="hidden" name="id" value={id} />
        <input name="title" defaultValue={post.title} />
        <textarea name="content" defaultValue={post.content} />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}
