import { Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

interface ChatMessage {
  role: string;
  text: string;
}

interface ChatHistory {
  role: string;
  parts: { text: string }[];
}

const Chatbot = () => {
  const [chatWindowOpen, setChatWindowOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: "model", text: "Hello there!" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const userMessage = inputRef.current!.value.trim();
    if (!userMessage) return;
    inputRef.current!.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };

  const updateHistory = (text: string) => {
    setChatHistory((previousHistory) => [
      ...previousHistory.filter((msg) => msg.text !== "Thinking..."),
      { role: "model", text: text },
    ]);
  };

  const generateBotResponse = async (history: ChatMessage[]) => {
    const processedHistory: ChatHistory[] = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: processedHistory }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong");
      console.log(data);
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatBodyRef.current!.scrollTo({
      top: chatBodyRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="fixed z-50 right-5 md:right-10 bottom-10">
      <div className="flex flex-col justify-end items-end">
        <div
          className={`${
            !chatWindowOpen ? "hidden" : "flex flex-col"
          } justify-center items-center mb-2`}
        >
          <div className="bg-green-primary h-[4rem] w-[100%] md:w-[45vw] lg:w-[20vw] rounded-t-lg flex justify-between items-center px-4">
            <div className="flex justify-between items-center gap-2">
              <img
                src="./chatbot.svg"
                alt="chatbot photo"
                className="w-[20px]"
              />
              <h1 className="text-xl text-white font-semibold">Chef AI</h1>
            </div>
            <button
              onClick={() => setChatWindowOpen(!chatWindowOpen)}
              className="w-[30px] h-[30px] rounded-full bg-green-primary hover:bg-green-700 cursor-pointer"
            >
              <X color="white" className="mx-auto" />
            </button>
          </div>
          <div className="bg-white h-[50vh] md:w-[45vw] lg:w-[20vw] rounded-b-lg shadow-md">
            <div
              ref={chatBodyRef}
              className="h-[85%] w-[100%] p-4 overflow-y-auto overflow-x-hidden scroll"
            >
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.role === "user" ? "justify-end" : "justify-baseline"
                  } w-full flex mb-2`}
                >
                  <div
                    className={`${
                      message.role === "user"
                        ? "bg-gray-200 text-end ml-4"
                        : "bg-green-primary text-white text-justify mr-6"
                    } p-2 rounded-xl w-fit mb-1`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form className="h-fit w-[100%] flex items-center justify-between px-3 gap-2">
              <input
                ref={inputRef}
                type="text"
                name="message-input"
                id="message-input"
                className="border-[1px] border-gray-400 rounded-full px-4 py-2 w-[100%]"
              />
              <button
                onClick={(e) => handleFormSubmit(e)}
                className="bg-green-primary hover:bg-green-700 p-2 rounded-full flex items-center justify-center cursor-pointer"
              >
                <Send color="white" />
              </button>
            </form>
          </div>
        </div>
        <button
          onClick={() => setChatWindowOpen(!chatWindowOpen)}
          className="bg-green-primary w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full hover:bg-green-700 cursor-pointer shadow-md"
        >
          <div className="flex justify-center items-center md:w-[100%] md:h-[100%]">
            <img src="./chatbot.svg" alt="chatbot icon" className="w-[30px]" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
