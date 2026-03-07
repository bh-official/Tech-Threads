"use client";

export default function DeleteButton() {
  function handleClick(e) {
    if (!confirm("Are you sure you want to delete this post?")) {
      e.preventDefault();
    }
  }

  return (
    <button
      type="submit"
      className="action-btn action-btn-danger"
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 0 0-.894.553L7.382 4H4a1 1 0 0 0 0 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a1 1 0 1 0 0-2h-3.382l-.724-1.447A1 1 0 0 0 11 2H9zM7 8a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V8zm5-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1z"
          clipRule="evenodd"
        />
      </svg>
      Delete
    </button>
  );
}
