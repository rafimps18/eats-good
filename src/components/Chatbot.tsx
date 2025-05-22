import { ChevronDown, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { initialPrompt } from "../initialPrompt";

interface ChatMessage {
  hiddenInChat: boolean;
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
    { hiddenInChat: false, role: "model", text: "Hello! How can I help you?" },
    { hiddenInChat: true, role: "model", text: initialPrompt },
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
      { hiddenInChat: false, role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { hiddenInChat: false, role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        {
          hiddenInChat: false,
          role: "user",
          text: `Using the details provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  const updateHistory = (text: string) => {
    setChatHistory((previousHistory) => [
      ...previousHistory.filter((msg) => msg.text !== "Thinking..."),
      { hiddenInChat: false, role: "model", text: text },
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
    <div className="fixed z-50 right-5 md:right-10 bottom-10 ml-5">
      <div className="flex flex-col justify-end items-end">
        <div
          className={`${
            !chatWindowOpen ? "hidden" : "flex flex-col"
          } justify-center items-center mb-2`}
        >
          <div className="bg-green-primary h-[4rem] w-[100%] md:w-[50vw] lg:w-[375px] rounded-t-lg flex justify-between items-center px-4">
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
              <ChevronDown color="white" className="mx-auto mt-0.5" />
            </button>
          </div>
          {/* Chat messages window */}
          <div className="bg-white h-[70vh] md:h-[60vh] md:w-[50vw] lg:w-[375px] rounded-bl-lg rounded-br-sm shadow-md">
            <div
              ref={chatBodyRef}
              className="h-[89%] w-[100%] py-4 pl-4 pr-2 overflow-y-auto overflow-x-hidden scroll border-b-[1px] border-b-gray-400"
            >
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.role === "user" ? "justify-end" : "justify-baseline"
                  } ${
                    message.hiddenInChat === true ? "hidden" : "flex"
                  } w-full mb-2`}
                >
                  <div
                    className={`${
                      message.role === "user"
                        ? "bg-gray-200 text-end ml-4 rounded-br-sm"
                        : `${
                            message.text === "Thinking..."
                              ? "animate-pulse"
                              : ""
                          } bg-green-primary  text-white text-justify mr-6 rounded-bl-sm`
                    } px-4 py-2 w-fit mb-1 rounded-2xl text-sm shadow-md`}
                  >
                    <p className="text-justify">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Message input field and send button */}
            <form className="h-[11%] w-[100%] flex items-center justify-between px-3 gap-2">
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
                <Send color="white" className="mt-0.5 mx-auto" />
              </button>
            </form>
          </div>
        </div>
        <button
          onClick={() => setChatWindowOpen(!chatWindowOpen)}
          className="bg-green-primary w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full hover:bg-green-700 cursor-pointer shadow-md"
        >
          <div className="flex justify-center items-center md:w-[100%] md:h-[100%]">
            <img
              src="./chatbot.svg"
              alt="chatbot icon"
              className="w-[20px] md:w-[30px]"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
