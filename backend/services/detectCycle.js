export function hasCycle(graph, start) {

    const visited = new Set();
    const path = new Set();

    function dfs(node) {

        if (path.has(node)) {
            return true;
        }

        if (visited.has(node)) {
            return false;
        }

        visited.add(node);
        path.add(node);

        for (const child of graph[node]) {
            if (dfs(child)) {
                return true;
            }
        }

        path.delete(node);

        return false;
    }

    return dfs(start);
}