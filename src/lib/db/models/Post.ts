import mongoose from 'mongoose';

// Definir el esquema del post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'El slug es obligatorio'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
  },
  excerpt: {
    type: String,
    required: [true, 'El extracto es obligatorio'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: [true, 'El autor es obligatorio'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isPublished: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

// Crear índices
postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ tags: 1 });
postSchema.index({ date: -1 });

// Middleware para asegurarse de que el slug es único
postSchema.pre('save', async function(next) {
  if (this.isModified('slug')) {
    const Post = mongoose.models.Post;
    const slugExists = await Post.findOne({ slug: this.slug });
    if (slugExists && slugExists.id !== this.id) {
      throw new Error('Ya existe un post con este slug');
    }
  }
  next();
});

// Exportar el modelo
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);