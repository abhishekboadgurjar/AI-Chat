import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/Chat.css";

const History = () => {
  const { history, getHistory } = useContext(AppContext);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="chat-container">
      <h2>Chat History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        history.map((msg, i) => (
          <div key={i} className={msg.role}>
            <p>{msg.text}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
