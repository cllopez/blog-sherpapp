// src/lib/notion-posts.ts
// Thin compatibility layer: re-export from MongoDB implementation
import { getAllPosts } from "./db/posts";

export async function getAllPublishedPosts() {
  return getAllPosts();
}
