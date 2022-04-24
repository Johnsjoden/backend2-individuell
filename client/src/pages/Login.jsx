import React from 'react'
import { useState } from 'react'
import Input from '../components/Input'
import { myContext } from '../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {
        API_URL
    } = useContext(myContext)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const payload = {
            username,
            password
        }
        fetch(`${API_URL}/api/token`,{
            method: "POST",
            headers:{"Content-type": "Application/json"},
            body: JSON.stringify(payload)}
        )
        .then(res => res.json())
        .then(result => {
            if(result){
                localStorage.setItem("key", result.token)
                localStorage.setItem("userId", result.userId)
                navigate("/")
                window.location.reload(false)
            }
        })
    }
  return (
    <div>Logga in
        <form onSubmit={handleOnSubmit}>
            <Input value={username} setValue={setUsername} label="username" type="text" />
            <Input value={password} setValue={setPassword} label="password" type="password"/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
