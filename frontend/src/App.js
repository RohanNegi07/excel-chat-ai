// src/App.js
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SheetSelector from "./components/SheetSelector";
import QueryInput from "./components/QueryInput";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");

  return (
    <div>
      <h1>Excel Chat AI</h1>
      <FileUpload setSheets={setSheets} setFileName={setFileName} />
      {sheets.length > 0 && (
        <SheetSelector sheets={sheets} setSelectedSheet={setSelectedSheet} />
      )}
      {selectedSheet && (
        <QueryInput
          selectedSheet={selectedSheet}
          fileName={fileName}
          setResult={setResult}
        />
      )}
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

export default App;
