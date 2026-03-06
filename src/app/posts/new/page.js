import { addPost } from "@/actions/postActions";

export default function NewPost() {
  return (
    <form action={addPost}>
      <input name="title" placeholder="Title" required />

      <textarea name="content" placeholder="Content" required />

      <button type="submit">Create Post</button>
    </form>
  );
}
