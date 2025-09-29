import React from "react";

export default function ResultDisplay({ result }) {
  return (
    <div>
      <h3>Result:</h3>
      <pre>{result}</pre>
    </div>
  );
}
