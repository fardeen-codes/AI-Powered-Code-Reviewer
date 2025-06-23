import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import axios from "axios";
import "./App.css";

// Use environment variable for backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/review`, { code });
  
      console.log("API Response:", response.data); // Debugging
  
      // Extract meaningful text instead of JSON
      setReview(response.data.response || response.data || "Invalid response");
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error retrieving review.");
    }
  }
  

  return (
    <>
      <main style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <div className="left" style={{ width: "50%" }}>
          <div className="code" style={{ height: "300px", overflowY: "auto" }}>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                border: "1px solid #d1d1d1",
                borderRadius: 5,
                width: "100%",
                height: "300px",
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review"
            style={{
              cursor: "pointer",
              padding: "10px",
              background: "#007bff",
              color: "white",
              textAlign: "center",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Review
          </div>
        </div>
        <div className="right" style={{ width: "50%", border: "1px solidrgb(0, 0, 0)", padding: "10px", borderRadius: "5px" }}>
          <h3>Review Output:</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", fontSize: "14px", fontFamily: "monospace" }}>
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </pre>
        </div>
      </main>
    </>
  );
}

export default App;
