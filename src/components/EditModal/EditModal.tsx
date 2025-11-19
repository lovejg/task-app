import React, { ChangeEvent, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import {
  deleteTask,
  setModalActive,
  updateTask,
} from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import {
  buttons,
  closeButton,
  deleteButton,
  header,
  input,
  modalWindow,
  title,
  updateButton,
  wrapper,
} from "./EditModal.css";

const EditModal = () => {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(editingState);

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };

  const handleEditInput = (e: ChangeEvent<HTMLInputElement>) => {
    const taskName =
      e.target.name === "title" ? e.target.value : data.task.taskName;
    const taskDescription =
      e.target.name === "description"
        ? e.target.value
        : data.task.taskDescription;
    const taskOwner =
      e.target.name === "author" ? e.target.value : data.task.taskOwner;

    setData({
      ...data,
      task: {
        ...data.task,
        taskName,
        taskDescription,
        taskOwner,
      },
    });
  };

  // const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setData({
  //     ...data,
  //     task: {
  //       ...data.task,
  //       taskName: e.target.value,
  //     },
  //   });
  // };

  // const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setData({
  //     ...data,
  //     task: {
  //       ...data.task,
  //       taskDescription: e.target.value,
  //     },
  //   });
  // };

  // const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setData({
  //     ...data,
  //     task: {
  //       ...data.task,
  //       taskOwner: e.target.value,
  //     },
  //   });
  // };

  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `일 수정하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `일 삭제하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div>
          <FiX className={closeButton} onClick={handleCloseButton} />
        </div>
        <div className={title}>제목</div>
        <input
          className={input}
          type="text"
          name="title"
          value={data.task.taskName}
          onChange={handleEditInput}
        />
        <div className={title}>설명</div>
        <input
          className={input}
          type="text"
          name="description"
          value={data.task.taskDescription}
          onChange={handleEditInput}
        />
        <div className={title}>생성한 사람</div>
        <input
          className={input}
          type="text"
          name="author"
          value={data.task.taskOwner}
          onChange={handleEditInput}
        />
        <div className={buttons}>
          <button className={updateButton} onClick={handleUpdate}>
            일 수정하기
          </button>
          <button className={deleteButton} onClick={handleDelete}>
            일 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
