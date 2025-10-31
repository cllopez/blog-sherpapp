export const STYLE_CLASSES = {
  card: {
    base: "bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300",
    header: "px-6 py-4 border-b border-gray-200",
    content: "p-6",
  },
  post: {
    featured: "p-4 rounded-lg bg-category-productivity-bg hover:bg-category-productivity-bg/80 transition-all duration-300 hover:scale-[1.02] group",
    title: {
      featured: "font-semibold mb-2 text-category-productivity-text group-hover:text-primary-blue transition-colors",
      normal: "text-xl font-semibold text-primary-blue group-hover:text-primary-purple transition-colors line-clamp-2 mb-2",
    },
    excerpt: "text-gray-600 line-clamp-2 mb-3",
    meta: "text-sm text-gray-500 mb-2",
    author: "italic text-primary-purple",
    tags: {
      container: "flex flex-wrap gap-2",
      tag: "text-xs px-3 py-1 rounded-full font-medium bg-category-productivity-bg text-category-productivity-text border border-category-productivity-text/20",
    },
  },
  category: {
    card: "flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 hover:scale-[1.02]",
    icon: "mb-3 text-primary-blue",
    title: "text-lg font-semibold mb-1 text-primary-blue",
    count: "text-sm text-gray-500",
  },
};