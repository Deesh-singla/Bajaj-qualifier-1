// import express from "express"
// import cors from "cors"
// import { validateInput } from "./services/validateInput.js";
// import { removeDuplicates } from "./services/removeDuplicates.js";
// import { buildGraph } from "./services/buildGraph.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post("/bfhl", (req, res) => {
//     try {
//         const data = req.body.data;
//         console.log(req.body.data)
//         const { validEdges, invalidEntries } = validateInput(data);
//         const { uniqueEdges, duplicateEdges } = removeDuplicates(validEdges);
//         const { graph, indegree } = buildGraph(uniqueEdges);
//         res.status(200).json({
//             userId: "Deesh_05092005",
//             email_id: "deesh1180.be23@chitkarauniversity.edu.in",
//             college_roll_number: "2311981180",
//             invalidEntries,
//             duplicateEdges
//         });

//         // res.send(";sdkfm");

//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "internal server error" })
//     }
// });

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });


import express from "express";
import cors from "cors";
import { validateInput } from "./services/validateInput.js";
import { removeDuplicates } from "./services/removeDuplicates.js";
import { buildGraph } from "./services/buildGraph.js";
import { findRoots } from "./services/findRoots.js";
import { calculateDepth } from "./services/calculateDepth.js";
import { buildTree } from "./services/buildTree.js";
import { generateSummary } from "./services/generateSummary.js";
import { hasCycle } from "./services/detectCycle.js";


const app = express();

app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                message: "data must be an array"
            });
        }

        // Step 1: Validation
        const { validEdges, invalidEntries } = validateInput(data);

        // Step 2: Remove duplicate edges
        const { uniqueEdges, duplicateEdges } =
            removeDuplicates(validEdges);

        // Step 3: Build graph
        const { graph, indegree } =
            buildGraph(uniqueEdges);

        // Step 4: Find roots
        const roots = findRoots(graph, indegree);

        // Pure cycle case
        if (
            roots.length === 0 &&
            Object.keys(graph).length > 0
        ) {
            roots.push(
                Object.keys(graph).sort()[0]
            );
        }

        // Step 5: Build hierarchies
        // const hierarchies = [];

        // for (const root of roots) {

        //     const hasCycl =
        //         hasCycle(graph, root);

        //     if (hasCycl) {

        //         hierarchies.push({
        //             root,
        //             tree: {},
        //             has_cycle: true
        //         });

        //     } else {

        //         const tree = {
        //             [root]: buildTree(graph, root)
        //         };

        //         const depth =
        //             calculateDepth(graph, root);

        //         hierarchies.push({
        //             root,
        //             tree,
        //             depth
        //         });
        //     }
        // }

        // Step 5: Build hierarchies

        const hierarchies = [];
        const processed = new Set();

        function dfsMark(node) {
            if (processed.has(node)) return;

            processed.add(node);

            for (const child of graph[node]) {
                dfsMark(child);
            }
        }

        // First process normal roots
        for (const root of roots) {

            dfsMark(root);

            const hasCycl = hasCycle(graph, root);

            if (hasCycl) {

                hierarchies.push({
                    root,
                    tree: {},
                    has_cycle: true
                });

            } else {

                hierarchies.push({
                    root,
                    tree: {
                        [root]: buildTree(graph, root)
                    },
                    depth: calculateDepth(graph, root)
                });
            }
        }

        // Now process components not reachable from roots
        for (const node in graph) {

            if (processed.has(node)) continue;

            const hasCycl = hasCycle(graph, node);

            if (hasCycl) {

                hierarchies.push({
                    root: node,
                    tree: {},
                    has_cycle: true
                });
            }

            dfsMark(node);
        }



        // Step 6: Summary
        const summary =
            generateSummary(hierarchies);

        // Step 7: Response
        res.status(200).json({
            user_id: "deeshsingla_05092005",
            email_id:
                "deesh1180.be23@chitkarauniversity.edu.in",
            college_roll_number:
                "2311981180",

            hierarchies,

            invalid_entries:
                invalidEntries,

            duplicate_edges:
                duplicateEdges,

            summary
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Internal Server Error"
        });
    }
});

app.listen(3000, () => {
    console.log(
        "Server running on port 3000"
    );
});