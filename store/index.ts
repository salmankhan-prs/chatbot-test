import { configureStore, createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [] as any,
        savedResponses: [] as any //FIXME:
    },
    reducers: {
        addMessage: (state, action: any) => {
            state.messages.push(action.payload);
        },
        saveResponse: (state, action) => {
            console.log(action.payload, "actions.payload");//FIXME: iisue in A non-serializable value was detected in an action, in the path:
            state.savedResponses.push(action.payload);
        }
    }
});

export const { addMessage, saveResponse } = chatSlice.actions;

export const store = configureStore({
    reducer: {
        chat: chatSlice.reducer
    }
});