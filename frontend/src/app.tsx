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
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "2rem",
      }}
    >
      <h1>LANDrop</h1>

      <p>Wireless Local File Transfer</p>

      <UploadBox onUploadSuccess={refreshFiles} />

      <FileList refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default App;