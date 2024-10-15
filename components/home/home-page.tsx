import { useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "../common/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../common/tabs";
import { Textarea } from "../common/textarea";
import useFetchSavedResponses from "@/hooks/useFetchSavedResponses";
import useHandleSaveResponse from "@/hooks/useHandleSaveResponse";
import { cn } from "@/utils/style";

const HomePage = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { handleFetchSavedResponses, savedResponses } =
    useFetchSavedResponses();

  const handleSaveResponse = useHandleSaveResponse();

  useEffect(() => {
    if (savedResponses?.length === 0) {
      handleFetchSavedResponses();
    }
  }, [handleFetchSavedResponses, savedResponses]);

  return (
    <div className="container flex flex-col items-center mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chatbot Interface</h1>
      <Tabs defaultValue="chat" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <div className="border rounded p-4 h-96 overflow-y-auto mb-4">
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
                    "inline-block p-2 rounded",
                    // message.role === "user"
                    //   ? "bg-blue-500 text-white"
                    //   : "bg-gray-200"
                  )}
                >
                  {message.content}
                </span>
                {message.role === "assistant" && (
                  <Button onClick={() => handleSaveResponse(message)}>
                    Save Response
                  </Button>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-x-2 items-center">
            <Textarea
              value={input}
              onChange={handleInputChange}
              className="flex-grow border rounded-l p-2"
              placeholder="Type your message..."
            />
            <Button type="submit">Send</Button>
          </form>
        </TabsContent>
        <TabsContent value="history">
          <div className="border rounded p-4 h-96 overflow-y-auto">
            {savedResponses?.map((response) => (
              <div key={response._id} className="mb-4">
                <span className="inline-block p-2 rounded bg-gray-200">
                  {response.message.content}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(response.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
