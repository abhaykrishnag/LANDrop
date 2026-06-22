import { useState } from "react";
import UploadBox from "./components/uploadbox";
import FileList from "./components/filelist";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshFiles = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <div
        style={{
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
          }}
        >
          LANDrop
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Wireless Local File Transfer
        </p>
      </div>

      <UploadBox onUploadSuccess={refreshFiles} />

      <FileList refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default App;