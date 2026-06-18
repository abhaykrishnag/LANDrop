import { useEffect, useState } from "react";
import API from "../services/api";

interface FileItem {
  name: string;
  size: number;
}

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await API.get("/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        backgroundColor: "#1e293b",
        padding: "1rem",
        borderRadius: "12px",
      }}
    >
      <h2>Available Files</h2>

      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        files.map((file, index) => (
          <div
            key={index}
            style={{
              padding: "12px",
              marginBottom: "10px",
              backgroundColor: "#334155",
              borderRadius: "8px",
            }}
          >
            <div>
              <strong>{file.name}</strong>
            </div>

            <div>
              Size: {(file.size / 1024).toFixed(2)} KB
            </div>
          </div>
        ))
      )}
    </div>
  );
}