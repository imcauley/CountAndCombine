import { Draggable, Droppable } from "react-beautiful-dnd";

export function WordRow({
  word,
  original,
  count,
  index,
  addToCount,
  deleteThis,
}) {
  return (
    <div>
      <Draggable key={word} draggableId={word} index={index}>
        {(provided) => (
          <div className="w-full h-20 m-2 bg-slate-50 border-black border-2">
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="word-dnd"
            >
              <p>
                {word} - {count}{" "}
              </p>
              <button onClick={() => deleteThis(word)}> Delete </button>
            </li>
          </div>
        )}
      </Draggable>
    </div>
  );
}
