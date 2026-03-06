"use server";

import { query } from "@/utils/db";

export async function addComment(formData) {
  const username = formData.get("username");
  const comment = formData.get("comment");
  const postId = formData.get("postId");
  const parentId = formData.get("parentId");

  await query(
    "INSERT INTO comments (post_id,parent_comment_id,username,comment) VALUES ($1,$2,$3,$4)",
    [postId, parentId || null, username, comment],
  );
}
