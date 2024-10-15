import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStoreState, ISavedResponse, IStoreState } from "./state";

const chatSlice = createSlice({
  name: "chat",
  initialState: initialStoreState,
  reducers: {
    addSavedResponse: (state, action: PayloadAction<ISavedResponse>) => {
      state.savedResponses.push(action.payload);
    },
    setSavedResponses: (state, action: PayloadAction<ISavedResponse[]>) => {
      state.savedResponses = action.payload;
    },
  },
});

export const { addSavedResponse, setSavedResponses } = chatSlice.actions;

export const sGetSavedResponses = (state: Record<"chat", IStoreState>) => state.chat.savedResponses;

export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});
