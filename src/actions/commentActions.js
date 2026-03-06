"use server";

import { query } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addComment(formData) {
  const username = formData.get("username");
  const comment = formData.get("comment");
  const postId = formData.get("postId");
  const parentId = formData.get("parentId");

  await query(
    "INSERT INTO comments (post_id,parent_comment_id,username,comment) VALUES ($1,$2,$3,$4)",
    [postId, parentId || null, username, comment],
  );
  revalidatePath(`/posts/${postId}`);
}

export async function deleteComment(formData) {
  const id = formData.get("id");

  await query("DELETE FROM comments WHERE id=$1", [id]);

  revalidatePath("/posts");
}

export async function updateComment(id, formData) {
  const comment = formData.get("comment");

  await query("UPDATE comments SET comment=$1 WHERE id=$2", [comment, id]);
  redirect(`/posts/${postId}`);
}
