import { query } from "@/utils/db";
import Link from "next/link";
import { deletePost } from "@/actions/postActions";
import DeleteButton from "@/components/DeleteButton";

export default async function PostsPage() {
  const result = await query("SELECT * FROM post ORDER BY created_at DESC");

  const posts = result.rows;

  return (
    <div>
      <h1>Posts</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>

          <p>{post.content}</p>
          <p>{new Date(post.created_at).toLocaleString("en-GB")}</p>

          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <DeleteButton />
          </form>
        </div>
      ))}
    </div>
  );
}
