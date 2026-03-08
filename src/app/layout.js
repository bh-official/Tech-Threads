import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  // variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "TechThreads — Where code meets conversation",
  description:
    "A vibrant tech discussion forum. Ask questions, share ideas, and connect with developers.",
  keywords: [
    "tech",
    "forum",
    "discussion",
    "programming",
    "coding",
    "developer",
  ],
  authors: [{ name: "TechThreads" }],
  openGraph: {
    title: "TechThreads — Where code meets conversation",
    description:
      "A vibrant tech discussion forum. Ask questions, share ideas, and connect with developers.",
    url: "https://techthreads.app",
    siteName: "TechThreads",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechThreads — Where code meets conversation",
    description:
      "A vibrant tech discussion forum. Ask questions, share ideas, and connect with developers.",
    creator: "@techthreads",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <nav className="navbar">
          <Link href="/posts" className="navbar-brand">
            {/* TechThreads logo: speech bubble with </> */}
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="2"
                width="36"
                height="28"
                rx="8"
                fill="url(#logo-grad)"
              />
              <path d="M10 30 L6 38 L18 30 Z" fill="url(#logo-grad)" />
              <text
                x="20"
                y="22"
                fontFamily="monospace"
                fontSize="14"
                fontWeight="bold"
                fill="white"
                textAnchor="middle"
              >
                &lt;/&gt;
              </text>
              <defs>
                <linearGradient
                  id="logo-grad"
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#6c3bff" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
            </svg>

            <span className="navbar-brand-text">
              TechThreads
              <span className="navbar-tagline">
                Where code meets conversation
              </span>
            </span>
          </Link>

          <div className="navbar-links">
            <Link href="/posts/new" className="navbar-btn navbar-btn-outline">
              + New Post
            </Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
