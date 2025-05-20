import { X } from "lucide-react";
import { useState } from "react";

const Chatbot = () => {
  const [chatWindowOpen, setChatWindowOpen] = useState(false);

  return (
    <div className="fixed z-50 right-10 bottom-10">
      <div className="flex flex-col justify-end items-end">
        <div
          className={`${
            !chatWindowOpen ? "hidden" : "flex flex-col"
          } justify-center items-center`}
        >
          <div className="bg-green-primary h-[4rem] w-[20vw] rounded-t-lg flex justify-between items-center px-4">
            <h1 className="text-xl text-white">Ai Chef</h1>
            <button
              onClick={() => setChatWindowOpen(!chatWindowOpen)}
              className="w-[30px] h-[30px] rounded-full bg-green-primary hover:bg-green-700 cursor-pointer"
            >
              <X color="white" className="mx-auto" />
            </button>
          </div>
          <div className="bg-white h-[50vh] w-[20vw] rounded-b-lg"></div>
        </div>
        <button
          onClick={() => setChatWindowOpen(!chatWindowOpen)}
          className="bg-green-primary w-[80px] h-[80px] rounded-full hover:bg-green-700 cursor-pointer"
        >
          <div className="flex justify-center items-center w-[100%] h-[100%]">
            <img src="./chatbot.svg" alt="chatbot icon" className="w-[30px]" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
