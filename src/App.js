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
    const lines = rawData.split("\n");
    let data = {};

    for (const line of lines) {
      const cleaned = processRow(line);

      if (data[cleaned] === undefined) {
        data[cleaned] = {
          original: line,
          visible: cleaned,
          count: 1,
        };
      } else {
        // data[cleaned].count += 1;
      }
    }

    console.log(Object.entries(data));
    setProcessedData(Object.values(data));
  }

  function processRow(row) {
    let text = row.replace(/[^0-9a-z \n]/gi, "");
    text = text.toLowerCase();
    text = text.trim();
    return text;
  }

  function deleteRow(word) {
    let data = processedData.filter((d) => d.visible !== word);
    setProcessedData(data);
  }

  const processedRows = processedData.map((d) => (
    <WordRow word={d.visible} count={d.count} deleteThis={deleteRow} />
  ));

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <DndProvider backend={HTML5Backend}>
          <div class="container justify-items-center">
            <div class="">
              <h2 class="text-4xl font-bold"> Count and Combine </h2>
            </div>

            <div class="">
              <textarea
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
              ></textarea>
              <button onClick={processData}>Count Content</button>
            </div>
          </div>

          <div class="">{processedRows}</div>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
