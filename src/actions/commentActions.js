"use server";

import { query } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function addComment(formData) {
  const username = formData.get("username");
  const comment = formData.get("comment");
  const postId = formData.get("postId");
  const parentId = formData.get("parentId");

  // Server-side validation
  if (!username || username.trim().length === 0) {
    return { error: "Username is required" };
  }
  if (!comment || comment.trim().length === 0) {
    return { error: "Comment is required" };
  }
  if (username.trim().length > 50) {
    return { error: "Username must be 50 characters or less" };
  }

  await query(
    "INSERT INTO comments (post_id, parent_comment_id, username, comment) VALUES ($1, $2, $3, $4)",
    [postId, parentId || null, username.trim(), comment.trim()],
  );

  revalidatePath(`/posts/${postId}`);
}

export async function deleteComment(formData) {
  const id = formData.get("id");
  const postId = formData.get("postId");

  await query("DELETE FROM comments WHERE id=$1", [id]);

  revalidatePath(`/posts/${postId}`);
}

export async function updateComment(...args) {
  let id, postId, formData;
  let calledWithFormData = false;

  // Handle two calling conventions:
  // 1. updateComment(formData) — form submission from dedicated edit page
  // 2. updateComment(id, postId, formData) — direct call from client component

  if (args.length === 1) {
    // Called with formData only (form action from dedicated edit page)
    calledWithFormData = true;
    formData = args[0];
    id = formData.get("id");
    postId = formData.get("postId");
  } else if (args.length === 3) {
    // Called with separate arguments (direct call from CommentItem)
    id = args[0];
    postId = args[1];
    formData = args[2];
  } else {
    return { error: "Invalid arguments" };
  }

  const comment = formData.get("comment");

  // Server-side validation
  if (!comment || comment.trim().length === 0) {
    return { error: "Comment is required" };
  }

  await query("UPDATE comments SET comment=$1 WHERE id=$2", [
    comment.trim(),
    id,
  ]);

  revalidatePath(`/posts/${postId}`);

  // If called from a form, redirect back to the post
  if (calledWithFormData) {
    const { redirect } = await import("next/navigation");
    redirect(`/posts/${postId}`);
  }
}
