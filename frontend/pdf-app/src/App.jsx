import { useState } from "react";
import "./App.css";
import HeaderNavAndContent from "./components/HeaderNavAndContent";

function App() {
  const [file, setfile] = useState(null);
  const [parsed, setParsed] = useState([]);

  const handleFileChange = (e) => setfile(e.target.files[0]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/get_pdf", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log("data from the api", data);
    setParsed(data);
  };

  return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}> Post Pdf Data</button>
        <HeaderNavAndContent parsed={parsed}/>

      </div>
  );
}

export default App;
