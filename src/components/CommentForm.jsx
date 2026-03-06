import { addComment } from "@/actions/commentActions";

export default function CommentForm({ postId, parentId }) {
  return (
    <form action={addComment}>
      <input name="username" placeholder="Your name" required />

      <textarea name="comment" placeholder="Write a comment" required />

      <input type="hidden" name="postId" value={postId} />

      <input type="hidden" name="parentId" value={parentId || ""} />

      <button type="submit">Comment</button>
    </form>
  );
}
