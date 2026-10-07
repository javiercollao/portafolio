export default function rehypeBaseImages({ base = '/' } = {}) {
  const baseName = base.replace(/^\/+|\/+$/g, '');

  return tree => {
    const visit = node => {
      if (node?.tagName === 'img' && typeof node.properties?.src === 'string') {
        const source = node.properties.src;
        const isLocalRootPath = source.startsWith('/') && !source.startsWith('//');
        const normalized = source.replace(/^\/+/, '');
        const alreadyPrefixed = baseName && (normalized === baseName || normalized.startsWith(`${baseName}/`));

        if (isLocalRootPath && !alreadyPrefixed) node.properties.src = `${base}${normalized}`;
      }
      if (Array.isArray(node?.children)) node.children.forEach(visit);
    };

    visit(tree);
  };
}
