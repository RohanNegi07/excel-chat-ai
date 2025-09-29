// frontend/src/components/QueryInput.js
import React, { useState } from "react";
import axios from "axios";

export default function QueryInput({ fileName, selectedSheet }) {
  const [question, setQuestion] = useState("");
  const [answerRows, setAnswerRows] = useState(null);
  const [summary, setSummary] = useState(null);
  const [clarify, setClarify] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!question) return alert("Please enter a question.");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/query", {
        filename: fileName,
        sheet_name: selectedSheet,
        question: question,
      });
      if (res.data.clarify) {
        setClarify(res.data.question);
        setAnswerRows(null);
        setSummary(null);
      } else if (res.data.result) {
        setAnswerRows(res.data.result);
        setSummary(res.data.summary);
        setClarify(null);
      } else if (res.data.error) {
        alert("Error: " + res.data.error);
      } else {
        setAnswerRows(null);
      }
    } catch (err) {
      console.error(err);
      alert("Query failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Ask a question about this sheet</h3>
      <input
        type="text"
        style={{ width: "70%" }}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="e.g. Show total sales by region for 2024 where sales > 10000"
      />
      <button onClick={handleQuery} disabled={loading} style={{ marginLeft: 10 }}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      {clarify && (
        <div style={{ marginTop: 10, background: "#fffbe6", padding: 10 }}>
          <b>Clarifying question:</b>
          <p>{clarify}</p>
        </div>
      )}

      {summary && (
        <div style={{ marginTop: 10 }}>
          <b>Summary:</b>
          <pre>{JSON.stringify(summary, null, 2)}</pre>
        </div>
      )}

      {answerRows && (
        <div style={{ marginTop: 10 }}>
          <h4>Result (first {answerRows.length} rows)</h4>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                {Object.keys(answerRows[0]).map((c, idx) => <th key={idx}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {answerRows.map((r, i) => (
                <tr key={i}>
                  {Object.values(r).map((v, j) => <td key={j}>{String(v)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
