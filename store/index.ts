import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialStoreState } from "./state";

const chatSlice = createSlice({
  name: "chat",
  initialState: initialStoreState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    saveResponse: (state, action) => {
      console.log(action.payload, "actions.payload"); //FIXME: iisue in A non-serializable value was detected in an action, in the path:
      state.savedResponses.push(action.payload);
    },
  },
});

export const { addMessage, saveResponse } = chatSlice.actions;

export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});
