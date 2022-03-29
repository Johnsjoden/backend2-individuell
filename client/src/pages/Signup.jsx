import React from 'react'
import { useState } from 'react'
import Input from '../components/Input'
import { myContext } from '../App'
import { useContext } from 'react'
export default function Signup() {
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
        fetch(`${API_URL}/user`,{
            method: "POST",
            headers:{"Content-type": "Application/json"},
            body: JSON.stringify(payload)}
        )
    }
  return (
    <div>Sign up
        <form onSubmit={handleOnSubmit}>
            <Input value={username} setValue={setUsername} label="username" type="text" />
            <Input value={password} setValue={setPassword} label="password" type="password"/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
