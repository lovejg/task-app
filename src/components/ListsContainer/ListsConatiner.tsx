import type { FC } from "react";
import type { IList } from "../../types";
import List from "../List/List";
import ActionButton from "../ActionButton/ActionButton";
import { listsContainer } from "./ListConatiner.css";

type TListContainerProps = {
  boardId: string;
  lists: IList[];
};

const ListsContainer: FC<TListContainerProps> = ({ boardId, lists }) => {
  return (
    <div className={listsContainer}>
      {lists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
      <ActionButton boardId={boardId} listId={""} list />
    </div>
  );
};

export default ListsContainer;
