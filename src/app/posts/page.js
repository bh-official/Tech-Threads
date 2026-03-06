import { query } from "@/utils/db";

export default async function PostsPage() {
  const result = await query("SELECT * FROM post ORDER BY created_at DESC");

  const posts = result.rows;

  return (
    <div>
      <h1>Posts</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
