import React from "react";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendMessageAPI, getHistoryAPI, getSessionsAPI } from "../services/api";
import { getSessionId } from "../utils/session";
import Sidebar from "./Sidebar";
import { FiSend } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState(getSessionId());
  const [active,setActive]=useState(false);
  // load history
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await getHistoryAPI(sessionId);
    setMessages(res.data);
  };
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const res = await getSessionsAPI();
    console.log("sessions response:", res.data);
    setSessions(res.data);
  };
  const selectSession = async (id) => {
    setSessionId(id);
    const res = await getHistoryAPI(id);
    setMessages(res.data);
  };
  const newChat = () => {
    const id = crypto.randomUUID();
    setSessionId(id);
    setMessages([]);
  };

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await sendMessageAPI(input, sessionId);

    const aiMsg = { role: "ai", text: res.data.reply };
    setMessages((prev) => [...prev, aiMsg]);

    setLoading(false);
  };

  return (
    <div className=" sm:flex block h-screen  w-screen text-white ">
      <RxHamburgerMenu className="
      sm:hidden block fixed top-5 left-5 bg-transparent backdrop-blur-md shadow-sm shadow-yellow-50 text-gray-200 rounded-full p-1 h-8 w-8" onClick={()=>setActive((prev)=>!prev)} />
      <Sidebar
        sessions={sessions}
        onSelect={selectSession}
        onNewChat={newChat}
        Active={active}
      />
      <div className="sm:flex-1  mx-auto h-screen flex flex-col items-center  sm:w-full py-2 w-screen overflow-hidden ">
        {/* Header */}
        <div className="p-4  text-center text-xl font-semibold  shadow border-b border-gray-400 w-full">
          AI Chat
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden sm:w-10/12 w-full  px-3 p-2 space-y-4 ">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                max-w-[85%] px-4 py-3 rounded-2xl 
                ${
                  m.role === "user"
                    ? "bg-primary  rounded-br-md shadow"
                    : ""
                }
              `}
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm animate-pulse w-full">
              AI is typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Area */}

        <div className="p-2 bg-primary shadow-sm flex gap-3 rounded-3xl w-10/12 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1  rounded-xl px-4 py-2 focus:outline-none text-gray-300"
          />

          <button className="bg-white rounded-full p-2 overflow-hidden flex justify-center items-center h-10 w-10 text-gray-700">
            <FiSend
              onClick={sendMessage}
              disabled={loading}
              className="bg-white   cursor-pointer text-6xl  disabled:opacity-50"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
