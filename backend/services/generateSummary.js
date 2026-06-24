export function generateSummary(hierarchies) {

    let total_trees = 0;
    let total_cycles = 0;

    let largest_tree_root = "";
    let maxDepth = -1;

    for (const hierarchy of hierarchies) {

        if (hierarchy.has_cycle) {
            total_cycles++;
            continue;
        }

        total_trees++;

        if (
            hierarchy.depth > maxDepth ||
            (
                hierarchy.depth === maxDepth &&
                hierarchy.root < largest_tree_root
            )
        ) {
            maxDepth = hierarchy.depth;
            largest_tree_root = hierarchy.root;
        }
    }

    return {
        total_trees,
        total_cycles,
        largest_tree_root
    };
}