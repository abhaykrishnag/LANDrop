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

  const getFileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();

    switch (ext) {
      case "pdf":
        return "📄";
      case "png":
      case "jpg":
      case "jpeg":
        return "🖼️";
      case "zip":
        return "📦";
      case "mp4":
        return "🎥";
      case "mp3":
        return "🎵";
      default:
        return "📁";
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await API.get("/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  const deleteFile = async (filename: string) => {
  const confirmed = window.confirm(
    `Delete ${filename}?`
  );

  if (!confirmed) return;

  try {
    await API.delete(`/delete/${filename}`);

    fetchFiles();
  } catch (error) {
    console.error(error);
    alert("Delete failed");
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
      <h2>📂 Available Files</h2>

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
              <strong>
                {getFileIcon(file.name)} {file.name}
              </strong>
            </div>

            <div
              style={{
                marginTop: "6px",
                color: "#cbd5e1",
              }}
            >
              Size: {(file.size / 1024).toFixed(2)} KB
            </div>

            <br />

            <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  }}
>
  <button
    onClick={() =>
      window.open(
        `http://localhost:8000/download/${file.name}`,
        "_blank"
      )
    }
    style={{
      padding: "8px 16px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    ⬇ Download
  </button>

  <button
    onClick={() => deleteFile(file.name)}
    style={{
      padding: "8px 16px",
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    🗑 Delete
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
}