import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Message } from "ai";
import { toast } from "sonner";
import { addSavedResponse } from "@/store";
import { requestSaveResponse } from "@/api-helpers/saved-responses";

const useHandleSaveResponse = () => {
  const dispatch = useDispatch();

  const handleSaveResponse = useCallback(
    async (message: Message) => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const response = await requestSaveResponse(message, user._id);

        if (response.success) {
          const messageTimestamp = new Date(message.createdAt!).toISOString();
          dispatch(
            addSavedResponse({
              _id: response.id,
              message: {
                content: message.content,
                createdAt: messageTimestamp,
                id: message.id,
                role: "assistant",
              },
              timestamp: messageTimestamp,
            })
          );
          toast.success("Response saved successfully!");
        } else {
          throw new Error("Failed to save response");
        }
      } catch (error) {
        console.error("Error saving response:", error);
        toast.error("Failed to save response. Please try again.");
      }
    },
    [dispatch]
  );

  return handleSaveResponse;
};

export default useHandleSaveResponse;
