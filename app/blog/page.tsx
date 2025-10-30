import Link from "next/link";
import { getAllPostsMeta } from "../../src/lib/posts";

export const dynamic = "force-static"; // genera estático

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>Blog de SherpApp</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((p) => (
          <li key={p.slug} style={{ marginBottom: 12 }}>
            <Link href={`/blog/${p.slug}`} style={{ fontSize: 18, textDecoration: "underline" }}>
              {p.title}
            </Link>
            {p.date && <div style={{ fontSize: 14, opacity: 0.7 }}>{new Date(p.date).toLocaleDateString()}</div>}
          </li>
        ))}
      </ul>
    </main>
  );
}
