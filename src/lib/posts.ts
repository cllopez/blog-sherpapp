import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  tags?: string[];
};

export async function getAllPublishedPosts(): Promise<PostMeta[]> {
  const files = await fs.promises.readdir(POSTS_DIR);
  const mdxFiles = files.filter(f => f.endsWith(".mdx"));
  const posts = await Promise.all(mdxFiles.map(async (filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(POSTS_DIR, filename);
    const file = await fs.promises.readFile(fullPath, "utf8");
    const { data, content } = matter(file);

    const excerptFromFrontmatter = data.excerpt;
    const excerptFromContent = content
      .replace(/[#_*~`>]/g, "") // limpia caracteres markdown
      .split("\n")
      .find(line => line.trim() !== "") // primera línea no vacía
      ?.slice(0, 140) ?? ""; // limita a 140 chars

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: excerptFromFrontmatter ?? excerptFromContent,
      tags: data.tags,
      author: data.author
    } as PostMeta;
  }));

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));

}
export async function getPostSourceBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const file = await fs.promises.readFile(fullPath, "utf8");
  return matter(file); // { content, data }
}

// src/lib/posts.ts

export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  try {
    await fs.promises.access(filePath);
    const file = await fs.promises.readFile(filePath, "utf8");
    const { content, data } = matter(file);
    return { content, data };
  } catch {
    return null;
  }
}
