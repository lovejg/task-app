import { useState } from "react";
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsConatiner";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";
import { deleteBoard, sort } from "./store/slices/boardSlice";
import { addLog } from "./store/slices/loggerSlice";
import { v4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import type { IBoard, IList, ITask, ILogItem } from "./types";

type DndResult = {
  destination: { droppableId: string; index: number } | null;
  source: { droppableId: string; index: number };
  draggableId: string;
};

function App() {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const { modalActive } = useTypedSelector((state) => state.board);
  const boards: IBoard[] = useTypedSelector((state) => state.board.boardArray);
  const dispatch = useTypedDispatch();
  const getActiveBoard = boards.find(
    (board: IBoard) => board.boardId === activeBoardId
  );
  if (!getActiveBoard) return null;
  const lists: IList[] = getActiveBoard.lists;

  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard.boardId }));
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 삭제하기: ${getActiveBoard.boardName}`,
          logAuthor: "User",
          logTimeStamp: String(Date.now()),
        } as ILogItem)
      );
      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board) => board.boardId === activeBoardId
        );
        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      };

      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert("최소 게시판 갯수는 1개 입니다.");
    }
  };
  const handleDragEnd = (result: DndResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceList = lists.filter(
      (list) => list.listId === source.droppableId
    )[0];

    dispatch(
      sort({
        boardIndex: boards.findIndex(
          (board) => board.boardId === activeBoardId
        ),
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logAuthor: "User",
        logMessage: `리스트"${sourceList?.listName}"에서
      리스트"${
        lists.filter(
          (list: IList) => list.listId === destination.droppableId
        )[0].listName
      }"으로
      ${
        sourceList?.tasks.filter(
          (task: ITask) => task.taskId === draggableId
        )[0].taskName
      }을 옮김.`,
        logTimeStamp: String(Date.now()),
      } as ILogItem)
    );
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
        </DragDropContext>
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          게시판 삭제
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보기"}
        </button>
      </div>
    </div>
  );
}

export default App;
