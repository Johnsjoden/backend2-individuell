import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { myContext } from '../App'
import Input from '../components/Input'
export default function Todo() {
  const [todo, setTodo] = useState("")
  const {
    API_URL,
    token,
    userId
  } = useContext(myContext)
  const handleOnSubmit = (e) => {
    e.preventDefault()
    const payload = {
      todo
    }
    fetch(`${API_URL}/api/todo`,{
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(payload)
    })

  }
  return (
    <div>Todo
      <form onSubmit={handleOnSubmit}>
        <Input value={todo} setValue={setTodo} label="todo" type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
