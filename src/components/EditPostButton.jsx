"use client";

import { useRouter } from "next/navigation";

export default function EditPostButton({ id }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="action-btn"
      onClick={() => router.push(`/posts/${id}/edit`)}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
      Edit
    </button>
  );
}
