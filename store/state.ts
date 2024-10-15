export interface ISavedResponse {
  _id: string;
  message: {
    createdAt: string;
    content: string;
    id: string;
    role: string;
  };
  timestamp: string;
  userId?: string;
}

export interface IStoreState {
  savedResponses: ISavedResponse[];
}

export const initialStoreState: IStoreState = {
  savedResponses: [],
};
