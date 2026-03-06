"use client";

import { useRouter } from "next/navigation";

export default function EditPostButton({ id }) {
  const router = useRouter();

  return <button onClick={() => router.push(`/posts/${id}/edit`)}>Edit</button>;
}
