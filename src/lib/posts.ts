import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
};

export function getAllPostsMeta(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(POSTS_DIR, filename);
    const file = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(file);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
    } as PostMeta;
  });

  // Ordena por fecha desc
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSourceBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const file = fs.readFileSync(fullPath, "utf8");
  return matter(file); // { content, data }
}
