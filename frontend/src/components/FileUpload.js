import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function UploadFile() {
  const [sheets, setSheets] = useState([]);
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [currentSheet, setCurrentSheet] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loader = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSheets(res.data.sheets);
      setFileName(res.data.filename);
      setMessage("File uploaded successfully!");
    } catch (err) {
      setMessage("Upload failed: " + (err.response?.data?.detail || err.message));
    }
  };

  const loadSheet = async (sheetName, pageNum = 1, append = false) => {
    try {
      const res = await axios.get("http://localhost:8000/sheet", {
        params: { filename: fileName, sheet_name: sheetName, page: pageNum }
      });

      setPage(res.data.page);
      setTotalPages(res.data.total_pages);
      setCurrentSheet(sheetName);

      if (append) {
        setData(prev => [...prev, ...res.data.data]);
      } else {
        setData(res.data.data);
      }
    } catch (err) {
      setMessage("Failed to load sheet: " + (err.response?.data?.detail || err.message));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          loadSheet(currentSheet, page + 1, true);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader, page, totalPages, currentSheet]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Excel File Upload with Infinite Scrolling</h2>
      <input type="file" onChange={handleUpload} />
      <p>{message}</p>
      {fileName && <p><b>Uploaded File:</b> {fileName}</p>}

      {sheets.length > 0 && (
        <div>
          <h3>Select Sheet:</h3>
          <select
            onChange={(e) => {
              loadSheet(e.target.value, 1, false);
            }}
            value={currentSheet}
          >
            <option value="">--Select Sheet--</option>
            {sheets.map((sheet, index) => (
              <option key={index} value={sheet}>{sheet}</option>
            ))}
          </select>
        </div>
      )}

      {data.length > 0 && (
        <div style={{ overflow: "auto", maxHeight: "500px" }}>
          <h3>Sheet Data</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                {Object.keys(data[0]).map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div ref={loader} style={{ height: "50px", margin: "10px", textAlign: "center" }}>
            {page < totalPages ? "Loading more..." : "End of sheet"}
          </div>
        </div>
      )}
    </div>
  );
}
