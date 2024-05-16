'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  useEffect(() => {
    // create a socket connection
    const socket = io('http://api.ezyride.co:3002', {
      extraHeaders: {
        "authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMzAwOTE2NC1jNWE1LTQzNTQtOWZmOC02Y2FjODZlODk3ZDUiLCJpYXQiOjE3MTU4NjkzNDcsImV4cCI6MTcxNTk1NTc0NywiYXVkIjoiaHR0cHM6Ly9hcGkuZXp5cmlkZS5jbyIsImlzcyI6Imh0dHBzOi8vYXBpLmV6eXJpZGUuY28ifQ.woWE77nJlh8x2bw1zWTz3u_VTLR2R_afsTPb18leWzo'
      },
    
    });

    // listen to incoming message
    socket.on('join-car', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    });

    // clean up the socket connection and unmount
    return () => {
      socket.disconnect()
    }

  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (currentMessage.length) { // create a socket connection
      const socket = io('https://api.ezyride.co:3002');

      // send the message to the server
      socket.emit('join-car', currentMessage);
      // clear message
      setCurrentMessage('')
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-4 ">
      <h1 className="font-bold text-center text-xl fixed top-0 bg-gray-100 border-b-gray-950 border-b w-full py-4">Ping The World!!!</h1>
      <div className="w-full pb-16 pt-16">
        {
          messages.map((message, index) => (
            <div className="bg-black p-4 rounded text-white  my-4 md:mx-auto lg:w-3/4 w-full" key={index}>{message}</div>
          ))
        }</div>
      <form onSubmit={sendMessage} className="fixed bottom-0 flex space-x-4 left-0 px-4 py-4 w-full bg-white border-t-gray-200 border-t">
        <input className=" w-4/5  px-4 py-2 border-black outline-none border rounded shadow-sm" type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
        <button disabled={!currentMessage.length} className="w-1/5 bg-black disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 text-white shadow-sm rounded" onClick={sendMessage}>Send</button>
      </form>
    </main>
  );
}
