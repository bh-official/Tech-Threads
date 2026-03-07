"use server";

import { query } from "@/utils/db";
import { redirect } from "next/navigation";

export async function addPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const category = formData.get("category") || "General";

  await query(
    "INSERT INTO post (title, content, category) VALUES ($1, $2, $3)",
    [title, content, category],
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

  await query("UPDATE post SET title=$1, content=$2, category=$3 WHERE id=$4", [
    title,
    content,
    category,
    id,
  ]);

  redirect(`/posts/${id}`);
}
