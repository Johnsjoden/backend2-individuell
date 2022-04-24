import React, { createContext, useEffect, useRef, useState } from "react"
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {io} from "socket.io-client"
import TodoFinish from "./pages/TodoFinish";
import Register from "./pages/Register";
import TodoSpecific from "./pages/TodoSpecific";
const myContext = createContext()
function App() {
  const API_URL = "http://localhost:9000"
  const token = localStorage.getItem("key")
  const userId = localStorage.getItem("userId")
  const [fetchUrl, setFetchUrl] = useState(`${API_URL}/api/todo/`)
  const [result, setResult] = useState([])
  const client = useRef()
  const fetchData = () => {
    fetch(`${fetchUrl}`,{
        headers:{
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(result => setResult(result))
  }
  useEffect(() => {
    const socket = io("http://localhost:9000")
    client.current = socket
  }, [])
  const handleOnClick = () => {
    window.location.reload(false)
    localStorage.removeItem("key")
  }
  return (
    <div className="App">
      <Link to="/">Home</Link> <br/>
      <Link to="/todo/finish">Completed Todo</Link> <br/>
      <Link to="/register">Register</Link> <br/>
      <Link to="/login">Login</Link> <br/>
      {token? <button onClick={handleOnClick}>Log out</button> :  ""}
      <myContext.Provider value={{API_URL, token, userId, client, setResult, result,  fetchData, fetchUrl, setFetchUrl}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo/finish" element={<TodoFinish />} />
        <Route path="/todo/specific/:id" element={<TodoSpecific />} />
      </Routes>
      </myContext.Provider>
    </div>
  );
}
export {myContext}
export default App;
