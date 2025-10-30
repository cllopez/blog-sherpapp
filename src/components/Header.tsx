"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkStyle = (path: string) => ({
    textDecoration: pathname === path ? "underline" : "none",
    fontWeight: pathname === path ? "600" : "400",
    color: pathname === path ? "#000" : "#555",
  });

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Link href="/" style={{ fontWeight: "700", fontSize: "1.2rem" }}>
        🧭 Blog SherpApp
      </Link>

      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/" style={linkStyle("/")}>
          Inicio
        </Link>
        <Link href="/blog" style={linkStyle("/blog")}>
          Blog
        </Link>
        <Link href="/about" style={linkStyle("/about")}>
          Sobre nosotros
        </Link>
      </nav>
    </header>
  );
}
