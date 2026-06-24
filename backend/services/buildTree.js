export function buildTree(graph, node) {

    const children = {};

    for (const child of graph[node]) {
        children[child] = buildTree(graph, child);
    }

    return children;
}