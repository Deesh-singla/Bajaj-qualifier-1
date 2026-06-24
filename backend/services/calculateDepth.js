export function calculateDepth(graph, node) {

    if (!graph[node] || graph[node].length === 0) {
        return 1;
    }

    let maxDepth = 0;

    for (const child of graph[node]) {
        maxDepth = Math.max(
            maxDepth,
            calculateDepth(graph, child)
        );
    }

    return maxDepth + 1;
}