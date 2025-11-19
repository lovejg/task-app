import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ILogItem } from "../../types";

type TLoggerState = { logArray: ILogItem[] };

const initialState: TLoggerState = {
  logArray: [],
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {
    addLog: (state, { payload }: PayloadAction<ILogItem>) => {
      state.logArray.push(payload);
    },
  },
});

export const { addLog } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer;
