import { Message } from "ai";

export interface ISavedResponse {
  _id: string;
  message: Message;
  timestamp: string;
}

interface IStoreState {
  messages: Message[];
  savedResponses: ISavedResponse[];
}

export const initialStoreState: IStoreState = {
  messages: [],
  savedResponses: [],
};
