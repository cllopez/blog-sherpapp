import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx"));
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export default async function PostPage({ params }: Props) {
  const slug = params.slug;
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  try {
    if (!fs.existsSync(filePath)) return notFound();

    const file = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(file);

    return (
      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">{data.title ?? slug}</h1>

        {data.date && (
          <p className="text-sm text-gray-500 mb-6">
            {new Date(data.date).toLocaleDateString()}
          </p>
        )}

        <article className="prose prose-neutral dark:prose-invert">
          <MDXRemote source={content} />
        </article>
      </main>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    return notFound();
  }
}



