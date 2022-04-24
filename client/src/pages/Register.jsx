import React from 'react'
import { useState } from 'react'
import Input from '../components/Input'
import { myContext } from '../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState("")
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
        fetch(`${API_URL}/api/user`,{
            method: "POST",
            headers:{"Content-type": "Application/json"},
            body: JSON.stringify(payload)}
        )
        .then(res => res.json())
        .then(data => {
            if(data.error !== undefined){
                setData(data.error)
            }else {
                navigate("/login")
            }
        })
    }
  return (
    <div>Sign up
        <form onSubmit={handleOnSubmit}>
            <Input value={username} setValue={setUsername} label="username" type="text" />
            <Input value={password} setValue={setPassword} label="password" type="password"/>
            {data ? <p>{data}</p> : ""}
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
