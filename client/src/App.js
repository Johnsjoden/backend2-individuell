import React, { createContext, useEffect, useRef } from "react"
import { Route, Routes, useLinkClickHandler } from "react-router-dom";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {io} from "socket.io-client"
import TodoFinish from "./pages/TodoFinish";
const myContext = createContext()
function App() {
  const API_URL = "http://localhost:9000"
  const token = localStorage.getItem("key")
  const userId = localStorage.getItem("userId")
  const client = useRef()
  useEffect(() => {
    const socket = io("http://localhost:9000")
    client.current = socket
  }, [])
  return (
    <div className="App">
      <myContext.Provider value={{API_URL, token, userId, client}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/finish" element={<TodoFinish />} />
      </Routes>
      </myContext.Provider>
    </div>
  );
}
export {myContext}
export default App;
