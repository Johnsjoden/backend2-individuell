import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { myContext } from '../App'
import { useEffect } from 'react'
import { useState } from 'react'
import Input from '../components/Input'
export default function TodoSpecific() {
    const [result, setResult] = useState({})
    const [todo, setTodo] = useState("")
    const [file, setFile] = useState({
      file: "",
      preview: ""
    })
  const {
      API_URL,
      token
   } = useContext(myContext)
  const id = useParams().id
  const fetchData = () =>  {
    fetch(`${API_URL}/api/todo/${id}`, {
        headers: {"Authorization": "Bearer " + token}
    })
    .then(res => res.json())
    .then(data => {
      setResult(data)
      setTodo(data.content)
    })
  }
  useEffect(()=> {
    fetchData()
  }, [id])
  const handleOnSubmit = (e) => {
    e.preventDefault()
    const payload = {

    }
    fetch(`${API_URL}/api/todo/${id}`, {
      method: "PUT",
      headers: {Authorization: "Bearer " + token},
      body: JSON.stringify(payload)
    })
  }
  const handleFile = (e) => {
    e.preventDefault()
    console.log(e.target.files[0])
    setFile({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0])
    })
  }
  return (
    <div>
      <img src={file.preview}></img>
      <form onSubmit={handleOnSubmit}>
      <Input value={todo} setValue={setTodo} label="todo" type="text"/>
      <input type="file" multiple onChange={handleFile}/>
        <button type="submit">Submit</button>
      </form>
        <p>{result.content}</p>
        <p>{result.date}</p>
    </div>
  )
}
