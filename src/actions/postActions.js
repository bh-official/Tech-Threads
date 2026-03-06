"use server";

import { query } from "@/utils/db";
import { redirect } from "next/navigation";

export async function addPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  await query("INSERT INTO post (title, content) VALUES ($1,$2)", [
    title,
    content,
  ]);

  redirect("/posts");
}

export async function deletePost(formData) {
  const id = formData.get("id");

  await query("DELETE FROM post WHERE id=$1", [Number(id)]);

  redirect("/posts");
}

export async function updatePost(id, formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  await query("UPDATE post SET title=$1, content=$2 WHERE id=$3", [
    title,
    content,
    id,
  ]);

  redirect(`/posts/${id}`);
}
