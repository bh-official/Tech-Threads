"use client";

import { useState } from "react";
import { updateComment } from "@/actions/commentActions";

export default function EditCommentButton({ comment, postId }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form action={(formData) => updateComment(comment.id, postId, formData)}>
        <textarea name="comment" defaultValue={comment.comment} />

        <button type="submit">Save</button>

        <button type="button" onClick={() => setEditing(false)}>
          Cancel
        </button>
      </form>
    );
  }

  return <button onClick={() => setEditing(true)}>Edit</button>;
}
