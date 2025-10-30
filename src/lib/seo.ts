export function buildTitle(title?: string) {
  return title ? `${title} | SherpApp` : 'SherpApp';
}

export function buildMeta(description?: string) {
  return {
    description: description ?? 'Blog de SherpApp',
  };
}
