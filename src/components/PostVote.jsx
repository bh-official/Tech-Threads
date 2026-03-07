"use client";

import { useState } from "react";

export default function PostVote({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const [vote, setVote] = useState(null); // "up" | "down" | null

  function handleUp() {
    if (vote === "up") {
      setVote(null);
      setCount((c) => c - 1);
    } else if (vote === "down") {
      setVote("up");
      setCount((c) => c + 2);
    } else {
      setVote("up");
      setCount((c) => c + 1);
    }
  }

  function handleDown() {
    if (vote === "down") {
      setVote(null);
      setCount((c) => c + 1);
    } else if (vote === "up") {
      setVote("down");
      setCount((c) => c - 2);
    } else {
      setVote("down");
      setCount((c) => c - 1);
    }
  }

  return (
    <div className="vote-sidebar">
      <button
        type="button"
        className={`vote-btn${vote === "up" ? " active-up" : ""}`}
        onClick={handleUp}
        aria-label="Upvote"
      >
        ▲
      </button>
      <span className="vote-count">{count}</span>
      <button
        type="button"
        className={`vote-btn downvote${vote === "down" ? " active-down" : ""}`}
        onClick={handleDown}
        aria-label="Downvote"
      >
        ▼
      </button>
    </div>
  );
}
