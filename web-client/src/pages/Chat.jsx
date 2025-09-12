import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/Chat.css";

const Chat = () => {
  const { sendMessage } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;
    const newMsgs = [...messages, { role: "user", text: input }];
    setMessages(newMsgs);
    setInput("");

    const reply = await sendMessage(input);
    setMessages([...newMsgs, { role: "ai", text: reply }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
