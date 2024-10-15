import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { requestFetchSavedResponses } from "@/api-helpers/saved-responses";
import { setSavedResponses } from "@/store";

const useFetchSavedResponses = () => {
  const dispatch = useDispatch();

  const handleFetchSavedResponses = useCallback(async () => {
    try {
      const data = await requestFetchSavedResponses();
      dispatch(setSavedResponses(data.responses));
    } catch (error) {
      console.error("Failed to fetch saved responses:", error);
    }
  }, [dispatch]);

  return { handleFetchSavedResponses };
};

export default useFetchSavedResponses;
