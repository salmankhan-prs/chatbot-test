import { useCallback, useState } from "react";
import { Message } from "ai";
import { requestFetchSavedResponses } from "@/api-helpers/saved-responses";

interface ISavedResponse {
  _id: string;
  message: Message;
  timestamp: string;
}

const useFetchSavedResponses = () => {
  const [savedResponses, setSavedResponses] = useState<ISavedResponse[]>([]);

  const handleFetchSavedResponses = useCallback(async () => {
    try {
      const data = await requestFetchSavedResponses();
      setSavedResponses(data.responses);
    } catch (error) {
      console.error("Failed to fetch saved responses:", error);
    }
  }, []);

  return { handleFetchSavedResponses, savedResponses };
};

export default useFetchSavedResponses;
