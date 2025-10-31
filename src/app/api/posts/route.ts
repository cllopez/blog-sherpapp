import { NextResponse } from 'next/server';
import { createPost, getAllPosts, updatePost, deletePost } from '../../../lib/db/posts';

// GET /api/posts - Obtener todos los posts
export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Crear un nuevo post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Error al crear el post', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}