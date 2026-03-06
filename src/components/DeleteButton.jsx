"use client";

export default function DeleteButton() {
  function handleClick(e) {
    const confirmDelete = confirm("Are you sure you want to delete?");

    if (!confirmDelete) {
      e.preventDefault(); // stop form submission
    }
  }
  return (
    <button type="submit" onClick={handleClick}>
      Delete
    </button>
  );
}
