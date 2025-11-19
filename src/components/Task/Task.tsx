import React, { FC } from "react";
import { container, description, title } from "./Task.css";
import { Draggable } from "react-beautiful-dnd";

type TTaskProps = {
  id: string;
  index: number;
  taskName: string;
  taskDescription: string;
  boardId: string;
};

const Task: FC<TTaskProps> = ({
  id,
  index,
  taskName,
  boardId,
  taskDescription,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
