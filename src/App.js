import { useState } from "react";
import { WordRow } from "./WordRow";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function App() {
  const [rawData, setRawData] = useState("");
  const [processedData, setProcessedData] = useState([]);
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
    if (!result.destination) return;
    const items = Array.from(processedData);
    console.log(result);
    if (result.combine) {
      // super simple: just removing the dragging item
      items.splice(result.source.index, 1);
      setProcessedData(items);
      return;
    }

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProcessedData(items);
  }

  function addToCount(word, added) {
    // let data = processedData.map((d) => {
    //   if (d.visible === word) {
    //     let newWord = d;
    //     newWord.count += added;
    //     return newWord;
    //   } else {
    //     return d;
    //   }
    // });
    // setProcessedData(data);
  }

  const processedRows = processedData.map((d, index) => (
    <WordRow
      key={d.visible}
      word={d.visible}
      count={d.count}
      index={index}
      deleteThis={deleteRow}
      addToCount={addToCount}
    />
  ));

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <div className="container justify-items-center">
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
        </div>

        <div className="grid justify-items-center">
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
