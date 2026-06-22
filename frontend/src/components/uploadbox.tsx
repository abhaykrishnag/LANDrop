import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import API from "../services/api";

interface UploadBoxProps {
  onUploadSuccess: () => void;
}

export default function UploadBox({
  onUploadSuccess,
}: UploadBoxProps) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        setProgress(0);

        await API.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) /
                (progressEvent.total || 1)
            );

            setProgress(percent);
          },
        });

        setProgress(100);

        setTimeout(() => {
          setUploading(false);
          setProgress(0);
        }, 500);

        onUploadSuccess();
      } catch (error) {
        console.error("Upload failed:", error);
        setUploading(false);
        alert("Upload failed");
      }
    },
    [onUploadSuccess]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        marginTop: "1rem",
        padding: "4rem",
        border: "2px dashed #64748b",
        borderRadius: "20px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#1e293b",
        transition: "0.3s",
      }}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p
          style={{
            fontSize: "1.2rem",
          }}
        >
          Drop the file here...
        </p>
      ) : (
        <>
          <h2>📤 Upload Files</h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "0.5rem",
            }}
          >
            Drag & drop a file here, or click to browse
          </p>
        </>
      )}

      {uploading && (
        <div
          style={{
            marginTop: "1.5rem",
          }}
        >
          <p>Uploading... {progress}%</p>

          <div
            style={{
              width: "100%",
              height: "12px",
              backgroundColor: "#334155",
              borderRadius: "999px",
              overflow: "hidden",
              marginTop: "0.5rem",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "#22c55e",
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 