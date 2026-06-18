import FileList from "./components/filelist";

function App() {
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

      <FileList />
    </div>
  );
}

export default App;