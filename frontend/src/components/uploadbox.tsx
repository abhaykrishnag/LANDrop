import { useState } from "react";
import API from "../services/api";

interface UploadBoxProps {
  onUploadSuccess: () => void;
}

export default function UploadBox({
  onUploadSuccess,
}: UploadBoxProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully!");

      setSelectedFile(null);

      onUploadSuccess(); // Refresh file list
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "1rem",
        borderRadius: "12px",
        marginTop: "1rem",
      }}
    >
      <h2>Upload File</h2>

      <input
        type="file"
        onChange={(e) =>
          setSelectedFile(
            e.target.files ? e.target.files[0] : null
          )
        }
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}