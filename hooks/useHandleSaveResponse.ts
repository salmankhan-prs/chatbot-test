import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Message } from "ai";
import useFetchSavedResponses from "./useFetchSavedResponses";
import { requestSaveResponse } from "@/api-helpers/saved-responses";
import { saveResponse } from "@/store";

const useHandleSaveResponse = () => {
  const dispatch = useDispatch();
  const { handleFetchSavedResponses } = useFetchSavedResponses();

  const handleSaveResponse = useCallback(
    async (message: Message, userId = "") => {
      try {
        const response = await requestSaveResponse(message, userId);

        if (response.ok) {
          dispatch(saveResponse(message));
          handleFetchSavedResponses();
          alert("Response saved successfully!");
        } else {
          throw new Error("Failed to save response");
        }
      } catch (error) {
        console.error("Error saving response:", error);
        alert("Failed to save response. Please try again.");
      }
    },
    [dispatch, handleFetchSavedResponses]
  );

  return handleSaveResponse;
};

export default useHandleSaveResponse;
