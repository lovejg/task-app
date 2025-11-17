import { createSlice } from "@reduxjs/toolkit";
import type { ILogItem } from "../../types";

type TloggerState = {
  logArray: ILogItem[];
};

const initialState: TloggerState = {
  logArray: [],
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {},
});

export const loggerReducer = loggerSlice.reducer;
