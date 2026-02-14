import React from 'react'
export default function Sidebar({ sessions, onSelect, onNewChat ,Active}) {
  return (
    <div className={`w-64 bg-[#181818] ${Active?"-translate-x-full fixed":""} text-white h-full p-4  duration-150`}>

      <button
        onClick={onNewChat}
        className="w-full bg-primary text-white rounded p-2 mb-4 font-semibold"
      >
        + New Chat
      </button>

      {sessions.map(s => (
        <button
          key={s.sessionId}
          onClick={() => onSelect(s.sessionId)}
          className="block w-full text-left p-2 rounded hover:bg-primary/50"
        >
           {s.title?.length > 30
            ? s.title.slice(0, 30) + "..."
            : s.title || "New Chat"}
        </button>
      ))}
    </div>
  );
}
