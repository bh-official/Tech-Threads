"use server";

import { query } from "@/utils/db";
import { redirect } from "next/navigation";

export async function addPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const category = formData.get("category") || "General";

  // Server-side validation
  if (!title || title.trim().length === 0) {
    throw new Error("Title is required");
  }
  if (!content || content.trim().length === 0) {
    throw new Error("Content is required");
  }
  if (title.trim().length > 300) {
    throw new Error("Title must be 300 characters or less");
  }

  await query(
    "INSERT INTO post (title, content, category) VALUES ($1, $2, $3)",
    [title.trim(), content.trim(), category],
  );

  redirect("/posts");
}

export async function deletePost(formData) {
  const id = formData.get("id");

  await query("DELETE FROM post WHERE id=$1", [Number(id)]);

  redirect("/posts");
}

export async function updatePost(formData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title");
  const content = formData.get("content");
  const category = formData.get("category") || "General";

  // Server-side validation
  if (!title || title.trim().length === 0) {
    throw new Error("Title is required");
  }
  if (!content || content.trim().length === 0) {
    throw new Error("Content is required");
  }
  if (title.trim().length > 300) {
    throw new Error("Title must be 300 characters or less");
  }

  await query("UPDATE post SET title=$1, content=$2, category=$3 WHERE id=$4", [
    title.trim(),
    content.trim(),
    category,
    id,
  ]);

  redirect(`/posts/${id}`);
}
