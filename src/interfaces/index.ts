import { Language } from '@/i18n/utils';

// Interfaz para el Post
export interface Post {
  _id?: string;
  title: string;
  slug: string;
  date: string;
  author?: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

// Interfaz para las tarjetas de categoría
export interface CategoryCard {
  title: string;
  description: string;
  type: 'productivity' | 'study' | 'wellness' | 'technology';
  icon?: string;
  link: string;
}

// Interfaz para elementos de formulario
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'email' | 'date';
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

// Interfaz para secciones de contenido
export interface ContentSection {
  title: string;
  description: string;
  image?: string;
  alt?: string;
  link?: string;
  linkText?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

// Props para componentes con idioma
export interface LanguageProps {
  currentLang: Language;
}

// Props para tarjetas de precio
export interface PriceCardProps {
  title: string;
  price: string;
  interval: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

// Props para componentes de grid
export interface GridProps {
  items: any[];
  columns: number;
  gap?: number;
  className?: string;
}

// Props para componentes con pestañas
export interface TabProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
  defaultTab?: string;
}

// Props para componentes con filtros
export interface FilterProps {
  categories: string[];
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;
}

// Props para la paginación
export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// Props para el estado de carga
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  data?: any;
}