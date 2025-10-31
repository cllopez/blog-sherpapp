import { connectDB } from './mongodb';
import { Post } from './models/Post';
import { Types } from 'mongoose';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: Date;
  author: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getAllPosts(): Promise<BlogPost[]> {
  await connectDB();
  const posts = await Post.find({ isPublished: true })
    .sort({ date: -1 })
    .lean();
  
  return posts.map(formatPost);
}

export async function getPostBySlug(slug: string | null | undefined): Promise<BlogPost | null> {
  try {
    if (!slug) {
      console.warn('No slug provided to getPostBySlug');
      return null;
    }
    
    await connectDB();
    const post = await Post.findOne({ 
      slug, 
      isPublished: true 
    }).lean();
    
    if (!post) {
      console.warn(`No post found for slug: ${slug}`);
      return null;
    }

    return formatPost(post);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  await connectDB();
  const posts = await Post.find({ 
    tags: tag,
    isPublished: true 
  })
    .sort({ date: -1 })
    .lean();
  
  return posts.map(formatPost);
}

export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  await connectDB();
  const posts = await Post.find({ isPublished: true })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
  
  return posts.map(formatPost);
}

export async function getAllTags(): Promise<string[]> {
  await connectDB();
  const tags = await Post.distinct('tags', { isPublished: true });
  return tags;
}

// Función auxiliar para formatear los posts desde MongoDB
function formatPost(post: any): BlogPost {
  const { _id, __v, ...rest } = post;
  return {
    id: _id.toString(),
    ...rest,
  };
}

// Función para crear un nuevo post
export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  await connectDB();
  const newPost = await Post.create(post);
  return formatPost(newPost.toObject());
}

// Función para actualizar un post
export async function updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  await connectDB();
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { $set: post },
    { new: true }
  ).lean();
  
  return updatedPost ? formatPost(updatedPost) : null;
}

// Función para eliminar un post
export async function deletePost(id: string): Promise<boolean> {
  await connectDB();
  const result = await Post.findByIdAndDelete(id);
  return !!result;
}