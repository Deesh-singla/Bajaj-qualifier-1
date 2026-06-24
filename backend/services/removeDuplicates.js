export function removeDuplicates(edges) {
  const seen = new Set();

  const uniqueEdges = [];
  const duplicateEdges = [];

  for (const edge of edges) {
    if (seen.has(edge)) {
      if (!duplicateEdges.includes(edge)) {
        duplicateEdges.push(edge);
      }
    } else {
      seen.add(edge);
      uniqueEdges.push(edge);
    }
  }

  return {
    uniqueEdges,
    duplicateEdges,
  };
}
