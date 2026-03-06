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
