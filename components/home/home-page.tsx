import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "ai/react";
import { Button } from "../common/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../common/tabs";
import { Textarea } from "../common/textarea";
import useFetchSavedResponses from "@/hooks/useFetchSavedResponses";
import useHandleSaveResponse from "@/hooks/useHandleSaveResponse";
import withAuth from "@/hoc/withAuth";
import { sGetSavedResponses } from "@/store";
import { cn } from "@/utils/style";

const HomePage = () => {
  const savedResponses = useSelector(sGetSavedResponses);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { handleFetchSavedResponses } = useFetchSavedResponses();
  const handleSaveResponse = useHandleSaveResponse();

  useEffect(() => {
    handleFetchSavedResponses();
  }, [handleFetchSavedResponses]);

  return (
    <div className="flex-1 overflow-y-auto transition-colors">
      <div className="container flex flex-col items-center mx-auto p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Chatbot Interface</h1>
        </div>

        <Tabs defaultValue="chat" className="w-full max-w-lg">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent
            value="chat"
            className="border rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-100 dark:bg-gray-800"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-4",
                  message.role === "user" ? "text-right" : "text-left"
                )}
              >
                <span
                  className={cn(
                    "inline-block p-2 rounded-lg",
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                  )}
                >
                  {message.content}
                </span>
                {message.role === "assistant" && (
                  <Button
                    onClick={() => handleSaveResponse(message)}
                    className="mt-2 text-sm bg-blue-500 dark:text-white"
                  >
                    Save Response
                  </Button>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent
            value="history"
            className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-100 dark:bg-gray-800"
          >
            {savedResponses?.map((response) => (
              <div key={response._id} className="mb-4">
                <span className="inline-block p-2 rounded-lg bg-gray-300 dark:bg-gray-600">
                  {response.message.content}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(response.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <form
          onSubmit={handleSubmit}
          className="flex gap-x-2 items-center w-full max-w-lg"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            className="flex-grow border rounded-l-lg p-2 bg-white dark:bg-gray-700"
            placeholder="Type your message..."
          />
          <Button
            type="submit"
            className="p-2 rounded-r-lg bg-blue-500 text-white"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(HomePage);
