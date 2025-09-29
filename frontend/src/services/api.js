import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const sendQuery = async (query, sheet, filename) => {
  const formData = new FormData();
  formData.append("query", query);
  formData.append("sheet", sheet);
  formData.append("filename", filename);

  const res = await axios.post(`${API_URL}/query`, formData);
  return res.data;
};
