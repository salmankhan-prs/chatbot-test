import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { Button } from "../common/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../common/tabs";
import { Textarea } from "../common/textarea";
import useFetchSavedResponses from "@/hooks/useFetchSavedResponses";
import useHandleSaveResponse from "@/hooks/useHandleSaveResponse";
import { cn } from "@/utils/style";
import useAuth from "@/hooks/useAuth";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // For theme icons

const HomePage = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { handleFetchSavedResponses, savedResponses } = useFetchSavedResponses();
  const { userId } = useAuth();
  const handleSaveResponse = useHandleSaveResponse();

  // const [theme, setTheme] = useState("light"); // State for theme toggling

  useEffect(() => {
    if (savedResponses?.length === 0) {
      handleFetchSavedResponses();
    }
  }, [handleFetchSavedResponses, savedResponses]);

  // Handle theme toggle
  // const toggleTheme = () => {
  //   setTheme((prev) => (prev === "light" ? "dark" : "light"));
  //   document.documentElement.classList.toggle("dark");
  // };

  return (
    <div className={cn("min-h-screen transition-colors")}>
      <div className="container flex flex-col items-center mx-auto p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Chatbot Interface</h1>
          {/* <Button onClick={toggleTheme} className="p-2 rounded-full border">
            {theme === "dark" ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-800" />}
          </Button> */}
        </div>

        <Tabs defaultValue="chat" className="w-full max-w-lg">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="border rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-100 dark:bg-gray-800">
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
                    message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                  )}
                >
                  {message.content}
                </span>
                {message.role === "assistant" && (
                  <Button onClick={() => handleSaveResponse(message, userId)} className="mt-2 text-sm">
                    Save Response
                  </Button>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="history" className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-100 dark:bg-gray-800">
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

        <form onSubmit={handleSubmit} className="flex gap-x-2 items-center w-full max-w-lg">
          <Textarea
            value={input}
            onChange={handleInputChange}
            className="flex-grow border rounded-l-lg p-2 bg-white dark:bg-gray-700"
            placeholder="Type your message..."
          />
          <Button type="submit" className="p-2 rounded-r-lg bg-blue-500 text-white">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
