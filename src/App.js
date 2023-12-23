import "./App.css";
import { useState } from "react";
import { WordRow } from "./WordRow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [rawData, setRawData] = useState("");
  const [processedData, setProcessedData] = useState([]);
  const commonWords = ["the", "and", "or", "but"];
  const commonWordsRegex = new RegExp(
    "[\b" + commonWords.join("\b|\b") + "\b]",
    "gi"
  );

  function processData() {
    var text = rawData.replace(/[^0-9a-z \n]/gi, "");
    // text = text.replace(commonWordsRegex, '');
    text = text.toLowerCase();

    const lines = text.split("\n");
    let data = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (data[trimmed] === undefined) {
        data[trimmed] = 1;
      } else {
        data[trimmed] += 1;
      }
    }

    setProcessedData(Object.entries(data));
  }

  const processedRows = processedData.map((d) => (
    <WordRow word={d[0]} count={d[1]} />
  ));

  return (
    <div className="App">
      <header className="App-header">
        <DndProvider backend={HTML5Backend}>
          <textarea
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
          ></textarea>
          <button onClick={processData}>Count Content</button>
          <div>{processedRows}</div>
        </DndProvider>
      </header>
    </div>
  );
}

export default App;
