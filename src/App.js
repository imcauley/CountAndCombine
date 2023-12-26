import { useState } from "react";
import { WordRow } from "./WordRow";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { CSVLink, CSVDownload } from "react-csv";

function App() {
  const [rawData, setRawData] = useState("");
  const [processedData, setProcessedData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const commonWords = ["the", "and", "or", "but"];

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
        data[cleaned].count += 1;
      }
    }

    setProcessedData(Object.values(data));
  }

  function processRow(row) {
    let text = row.replace(/[^0-9a-z \n]/gi, "");
    text = text.toLowerCase();
    text = text.trim();
    return text;
  }

  const deleteRow = (word) => {
    setProcessedData(processedData.filter((d) => d.visible !== word));
  };

  function onDragEnd(result) {
    if (result.combine) {
      // super simple: just removing the dragging item
      const items = Array.from(processedData);
      const target = result.combine.draggableId;
      const [removedItem] = items.splice(result.source.index, 1);
      setProcessedData(
        items.map((i) =>
          i.visible === target
            ? { ...i, count: i.count + removedItem.count }
            : i
        )
      );
      return;
    }

    if (!result.destination) return;

    const items = Array.from(processedData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProcessedData(items);
  }

  function createCsvData() {
    setCsvData(processedData.map((i) => [i.visible, i.count]));
  }

  const processedRows = processedData.map((d, index) => (
    <WordRow
      key={d.visible}
      word={d.visible}
      count={d.count}
      index={index}
      deleteThis={deleteRow}
    />
  ));

  return (
    <div className="App w-full">
      <header className="App-header"></header>
      <main>
        <div className="grid container justify-items-center">
          <div className="w-full">
            <h2 className="text-4xl font-bold"> Count and Combine </h2>
          </div>
          <div className="w-full">
            <textarea
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
            ></textarea>
            <button onClick={processData}>Count Content</button>
          </div>
          <CSVLink data={csvData} asyncOnClick={true} onClick={createCsvData}>
            Download me
          </CSVLink>
          ;
        </div>

        <div className="grid justify-items-center w-full">
          <DragDropContext droppableId="word-dnd" onDragEnd={onDragEnd}>
            <Droppable droppableId="word-dnd" isCombineEnabled>
              {(provided) => (
                <ul
                  className="word-dnd"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {processedRows} {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}

export default App;
