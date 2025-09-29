import React from "react";

export default function SheetSelector({ sheets, setSelectedSheet }) {
  return (
    <div>
      <select onChange={(e) => setSelectedSheet(e.target.value)}>
        <option value="">Select Sheet</option>
        {sheets.map((sheet, idx) => (
          <option key={idx} value={sheet}>{sheet}</option>
        ))}
      </select>
    </div>
  );
}
