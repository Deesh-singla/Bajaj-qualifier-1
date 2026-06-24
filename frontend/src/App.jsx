import { useState } from "react";

export default function App() {
  const [nodes, setNodes] = useState(`A -> B
A -> C
B -> D`);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");

      const data = nodes
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const res = await fetch("https://bajaj-qualifier-1-1-tntj.onrender.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();

      setResponse(result);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>BFHL Hierarchy Builder</h1>

      <textarea
        rows={10}
        value={nodes}
        onChange={(e) => setNodes(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          resize: "vertical",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "12px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Submit"}
      </button>

      {error && (
        <div
          style={{
            marginTop: "20px",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {/* {response && (
        <div style={{ marginTop: "30px" }}>
          <h2>Summary</h2> */}
      {response && (
        <div style={{ marginTop: "30px" }}>

          <h2>User Information</h2>

          <div
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>User ID:</strong> {response.user_id}
            </p>

            <p>
              <strong>Email:</strong> {response.email_id}
            </p>

            <p>
              <strong>College Roll Number:</strong>{" "}
              {response.college_roll_number}
            </p>
          </div>

          <h2>Summary</h2>

          <div
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>Total Trees:</strong>{" "}
              {response.summary.total_trees}
            </p>

            <p>
              <strong>Total Cycles:</strong>{" "}
              {response.summary.total_cycles}
            </p>

            <p>
              <strong>Largest Tree Root:</strong>{" "}
              {response.summary.largest_tree_root}
            </p>
          </div>

          <h2>Hierarchies</h2>

          {response.hierarchies.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <p>
                <strong>Root:</strong> {item.root}
              </p>

              {item.has_cycle ? (
                <p>Cycle Detected</p>
              ) : (
                <p>
                  <strong>Depth:</strong> {item.depth}
                </p>
              )}

              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  overflowX: "auto",
                }}
              >
                {JSON.stringify(item.tree, null, 2)}
              </pre>
            </div>
          ))}

          <h2>Invalid Entries</h2>

          <ul>
            {response.invalid_entries.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>Duplicate Edges</h2>

          <ul>
            {response.duplicate_edges.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

