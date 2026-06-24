export function buildGraph(edges) {
    const graph = {};
    const indegree = {};

    const childParentMap = new Map();

    for (const edge of edges) {
        const [parent, child] = edge.split("->");

        if (childParentMap.has(child)) {
            continue;
        }

        childParentMap.set(child, parent);

        if (!graph[parent]) graph[parent] = [];
        if (!graph[child]) graph[child] = [];

        graph[parent].push(child);

        indegree[parent] = indegree[parent] || 0;
        indegree[child] = (indegree[child] || 0) + 1;
    }

    return {
        graph,
        indegree
    };
}