import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Message } from "ai";
import { toast } from "sonner";
import useFetchSavedResponses from "./useFetchSavedResponses";
import { requestSaveResponse } from "@/api-helpers/saved-responses";
import { saveResponse } from "@/store";

const useHandleSaveResponse = () => {
  const dispatch = useDispatch();
  const { handleFetchSavedResponses } = useFetchSavedResponses();

  const handleSaveResponse = useCallback(
    async (message: Message) => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const response = await requestSaveResponse(message, user.id);

        if (response.success) {
          dispatch(saveResponse(message));
          handleFetchSavedResponses();
          toast.success("Response saved successfully!");
        } else {
          throw new Error("Failed to save response");
        }
      } catch (error) {
        console.error("Error saving response:", error);
        toast.error("Failed to save response. Please try again.");
      }
    },
    [dispatch, handleFetchSavedResponses]
  );

  return handleSaveResponse;
};

export default useHandleSaveResponse;
