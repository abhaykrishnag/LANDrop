import { useEffect, useState } from "react";
import API from "../services/api";

interface FileItem {
  name: string;
  size: number;
}

interface FileListProps {
  refreshTrigger: number;
}

export default function FileList({
  refreshTrigger,
}: FileListProps) {
  const [files, setFiles] = useState<FileItem[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await API.get("/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

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

            <br />

            <button
              onClick={() =>
                window.open(
                  `http://localhost:8000/download/${file.name}`,
                  "_blank"
                )
              }
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Download
            </button>
          </div>
        ))
      )}
    </div>
  );
}