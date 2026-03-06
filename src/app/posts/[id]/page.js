import { query } from "@/utils/db";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";

export default async function PostPage({ params }) {
  const { id } = await params;

  const postResult = await query("SELECT * FROM post WHERE id=$1", [id]);
  const post = postResult.rows[0];

  if (!post) {
    return <p>Post not found</p>;
  }

  const commentResult = await query(
    `SELECT c.*, COUNT(r.id) AS reply_count
   FROM comments c
   LEFT JOIN comments r
   ON r.parent_comment_id = c.id
   WHERE c.post_id = $1
   GROUP BY c.id
   ORDER BY c.created_at ASC`,
    [id],
  );

  const comments = commentResult.rows;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <h2>Comments</h2>

      <CommentForm postId={id} />
      <CommentList comments={comments} postId={id} />
    </div>
  );
}
