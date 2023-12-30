import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Paper } from "@mui/material";

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
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full p-6 m-2"
          >
            <li className="word-dnd flex justify-between">
              <b> {count} </b>
              <p>{word} </p>
              <Button variant="contained" onClick={() => deleteThis(word)}>
                {" "}
                Delete{" "}
              </Button>
            </li>
          </Paper>
        )}
      </Draggable>
    </div>
  );
}
