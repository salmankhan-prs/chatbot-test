import { Message } from "ai";

export const requestFetchSavedResponses = async () => {
  const userToken = localStorage.getItem("token");
  const response = await fetch("/api/get-responses", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export const requestSaveResponse = async (message: Message, userId = "") => {
  const userToken = localStorage.getItem("token");
  const response = await fetch("/api/save-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ userId, message }),
  });

  const data = await response.json();
  return data;
};
