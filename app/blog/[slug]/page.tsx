import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = { params: { slug: string } };

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx"));
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export default function PostPage({ params }: Props) {
  const filePath = path.join(POSTS_DIR, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    // Si no existe, devolvemos 404
    // (evitamos importar notFound para mantenerlo simple)
    return <main style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
      <h1>404</h1>
      <p>No existe el post: {params.slug}</p>
    </main>;
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(file);

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>{data.title ?? params.slug}</h1>
      {data.date && (
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 24 }}>
          {new Date(data.date).toLocaleDateString()}
        </div>
      )}
      <article>
        <MDXRemote source={content} />
      </article>
    </main>
  );
}

