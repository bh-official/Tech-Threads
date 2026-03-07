"use client";

import { useState, useRef, useEffect } from "react";

export default function ShareButton({ postId, postTitle }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null); // null | "copied" | "error"
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function copyLink() {
    const url = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setOpen(false);
        setToast("copied");
        setTimeout(() => setToast(null), 2000);
      })
      .catch(() => {
        setOpen(false);
        setToast("error");
        setTimeout(() => setToast(null), 3000);
      });
  }

  function shareToTwitter() {
    const url = `${window.location.origin}/posts/${postId}`;
    const text = encodeURIComponent(postTitle || "Check this out");
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
    setOpen(false);
  }

  function shareToReddit() {
    const url = `${window.location.origin}/posts/${postId}`;
    const title = encodeURIComponent(postTitle || "");
    window.open(
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${title}`,
      "_blank",
      "noopener,noreferrer",
    );
    setOpen(false);
  }

  function shareToEmail() {
    const url = `${window.location.origin}/posts/${postId}`;
    const subject = encodeURIComponent(
      postTitle ? `Check out: ${postTitle}` : "Check out this post",
    );
    const body = encodeURIComponent(
      `Hey,\n\nI thought you might find this interesting:\n\n${url}\n\nCheers!`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setOpen(false);
  }

  function shareToWhatsApp() {
    const url = `${window.location.origin}/posts/${postId}`;
    const text = postTitle
      ? `Check out: ${postTitle}\n\n${url}`
      : `Check out this post:\n\n${url}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setOpen(false);
  }

  return (
    <>
      <div className="share-dropdown" ref={ref}>
        <button
          type="button"
          className="action-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label="Share post"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M15 8a3 3 0 1 0-2.977-2.63l-4.94 2.47a3 3 0 1 0 0 4.319l4.94 2.47a3 3 0 1 0 .895-1.789l-4.94-2.47a3.027 3.027 0 0 0 0-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Share
        </button>

        {open && (
          <div className="share-menu">
            <button
              type="button"
              className="share-menu-item"
              onClick={copyLink}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M12.586 4.586a2 2 0 1 1 2.828 2.828l-3 3a2 2 0 0 1-2.828 0 1 1 0 0 0-1.414 1.414 4 4 0 0 0 5.656 0l3-3a4 4 0 0 0-5.656-5.656l-1.5 1.5a1 1 0 1 0 1.414 1.414l1.5-1.5zm-5 5a2 2 0 0 1 2.828 0 1 1 0 1 0 1.414-1.414 4 4 0 0 0-5.656 0l-3 3a4 4 0 1 0 5.656 5.656l1.5-1.5a1 1 0 1 0-1.414-1.414l-1.5 1.5a2 2 0 1 1-2.828-2.828l3-3z" />
              </svg>
              Copy Link
            </button>

            <button
              type="button"
              className="share-menu-item"
              onClick={shareToTwitter}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X (Twitter)
            </button>

            <button
              type="button"
              className="share-menu-item"
              onClick={shareToReddit}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="#ff4500" />
                <path
                  d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.08 2.13.45a1 1 0 1 0 .14-.61l-2.38-.5a.15.15 0 0 0-.18.11l-.73 3.44a7.14 7.14 0 0 0-3.89 1.23 1.46 1.46 0 1 0-1.61 2.39 2.87 2.87 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 0 0 0-.44 1.46 1.46 0 0 0 .53-1.2zM7.27 11a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.58 2.65a3.56 3.56 0 0 1-2.85.87 3.56 3.56 0 0 1-2.85-.87.15.15 0 0 1 .21-.21 3.27 3.27 0 0 0 2.64.73 3.27 3.27 0 0 0 2.64-.73.15.15 0 0 1 .21.21zm-.16-1.65a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
                  fill="#fff"
                />
              </svg>
              Share on Reddit
            </button>

            <button
              type="button"
              className="share-menu-item"
              onClick={shareToWhatsApp}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Share on WhatsApp
            </button>

            <button
              type="button"
              className="share-menu-item"
              onClick={shareToEmail}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Share via Email
            </button>
          </div>
        )}
      </div>

      {toast === "copied" && <div className="toast">Link copied!</div>}
      {toast === "error" && (
        <div className="toast toast-error">
          Could not copy link. Please copy it manually.
        </div>
      )}
    </>
  );
}
