import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db/mongodb';
import { Post } from '../../../lib/db/models/Post';

const samplePosts = [
  {
    title: 'Las mejores rutas de senderismo en los Pirineos',
    content: `# Las mejores rutas de senderismo en los Pirineos

Los Pirineos ofrecen algunas de las rutas más espectaculares de Europa. En esta guía, exploraremos las mejores rutas para todos los niveles, desde principiantes hasta expertos.

## Ruta del Lago de Gaube
Una ruta clásica que te llevará a uno de los lagos más hermosos de los Pirineos. Perfecta para familias y principiantes.

## Circo de Gavarnie
Un impresionante anfiteatro natural declarado Patrimonio de la Humanidad por la UNESCO. La ruta circular ofrece vistas espectaculares.

## Monte Perdido
Para los más aventureros, la ascensión al Monte Perdido es una experiencia única que requiere preparación y experiencia en alta montaña.`,
    excerpt: 'Descubre las rutas más impresionantes para hacer senderismo en los Pirineos, desde senderos fáciles hasta desafiantes travesías de alta montaña.',
    slug: 'mejores-rutas-pirineos',
    date: new Date('2025-10-15'),
    author: 'María Montaña',
    tags: ['senderismo', 'Pirineos', 'aventura', 'naturaleza'],
    isPublished: true
  },
  {
    title: 'Técnicas avanzadas de fotografía nocturna',
    content: `# Técnicas avanzadas de fotografía nocturna

La fotografía nocturna puede ser uno de los géneros más gratificantes. Aquí te explicamos cómo dominar este arte.

## Equipo necesario
- Cámara con modo manual
- Trípode robusto
- Objetivos luminosos
- Control remoto o temporizador

## Configuración básica
La clave está en encontrar el equilibrio perfecto entre:
- ISO bajo para reducir el ruido
- Apertura amplia para captar más luz
- Velocidad de obturación lenta para exposiciones largas`,
    excerpt: 'Aprende a capturar impresionantes fotografías nocturnas con estas técnicas profesionales de larga exposición y composición.',
    slug: 'fotografia-nocturna',
    date: new Date('2025-10-20'),
    author: 'Carlos Luz',
    tags: ['fotografía', 'nocturna', 'técnica', 'arte'],
    isPublished: true
  },
  {
    title: 'Recetas vegetarianas para deportistas',
    content: `# Recetas vegetarianas para deportistas

Contrario a la creencia popular, una dieta vegetariana puede proporcionar todos los nutrientes necesarios para un rendimiento deportivo óptimo.

## Bowl de proteína post-entrenamiento
Ingredientes:
- Quinoa cocida
- Garbanzos asados
- Espinacas frescas
- Aguacate
- Semillas de chía
- Tofu marinado

## Batido energético pre-entrenamiento
Una combinación perfecta de:
- Plátano
- Mantequilla de cacahuete
- Bebida de avena
- Proteína de guisante
- Dátiles`,
    excerpt: 'Descubre deliciosas recetas vegetarianas especialmente diseñadas para atletas y deportistas que buscan mantener un alto rendimiento.',
    slug: 'recetas-vegetarianas-deportistas',
    date: new Date('2025-10-25'),
    author: 'Ana Verde',
    tags: ['nutrición', 'vegetariano', 'deporte', 'recetas'],
    isPublished: true
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Insertar nuevos posts solo si no existen
    const createdPosts = await Promise.all(
      samplePosts.map(async (post) => {
        // Buscar si ya existe un post con ese slug
        const existingPost = await Post.findOne({ slug: post.slug });
        if (!existingPost) {
          // Si no existe, lo creamos
          return await Post.create(post);
        }
        return existingPost;
      })
    );
    
    return NextResponse.json({
      message: 'Posts de ejemplo creados correctamente',
      count: createdPosts.length,
      posts: createdPosts
    });
  } catch (error) {
    console.error('Error al crear posts de ejemplo:', error);
    return NextResponse.json(
      { error: 'Error al crear los posts de ejemplo' },
      { status: 500 }
    );
  }
}