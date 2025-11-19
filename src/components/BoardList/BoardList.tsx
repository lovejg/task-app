import React, { type FC, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import type { IBoard } from "../../types";
import SideForm from "./SideForm/SideForm";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase/index";
import { removeUser, setUser } from "../../store/slices/userSlice.ts";
import { useAuth } from "../../hooks/useAuth.ts";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boardArray } = useTypedSelector((state) => state.board);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useTypedDispatch();
  const { isAuth } = useAuth();

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential: unknown) => {
        console.log(userCredential);
        const uc = userCredential as {
          user: { email?: string | null; uid: string };
        };
        dispatch(
          setUser({
            email: uc.user.email ?? "",
            id: uc.user.uid,
          })
        );
        return;
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  };

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {(() => {
        const activeIndex = boardArray.findIndex(
          (b: IBoard) => b.boardId === activeBoardId
        );
        return boardArray.map((board: IBoard, idx: number) => (
          <div
            key={board.boardId}
            onClick={() => setActiveBoardId(board.boardId)}
            className={clsx(idx === activeIndex ? boardItemActive : boardItem)}
          >
            <div>{board.boardName}</div>
          </div>
        ));
      })()}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleLogout} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
