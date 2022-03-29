import React from 'react'
import { useState } from 'react'
import Input from '../components/Input'
import { myContext } from '../App'
import { useContext } from 'react'
export default function Home() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {
        API_URL
    } = useContext(myContext)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const payload = {
            username,
            password
        }
        console.log(payload)
        fetch(`${API_URL}/token`,{
            method: "POST",
            headers:{"Content-type": "Application/json"},
            body: JSON.stringify(payload)}
        )
        .then(res => res.json())
        .then(result => {
            localStorage.setItem("key", result.token)
            localStorage.setItem("userId", result.userId)
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
