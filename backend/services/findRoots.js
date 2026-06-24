export function findRoots(graph, indegree) {
    const roots = [];

    for (const node in graph) {
        if (indegree[node] === 0) {
            roots.push(node);
        }
    }

    return roots;
}