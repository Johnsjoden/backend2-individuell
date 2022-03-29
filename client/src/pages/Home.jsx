import React from 'react'
import { useState } from 'react'
import Input from '../components/Input'
import { myContext } from '../App'
import { useContext } from 'react'
import { useEffect } from 'react'
import Button from '../components/Button'
export default function Home() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState([])
    const {
        API_URL,
        token,
        userId
    } = useContext(myContext)
    const fetchData = () => {
        fetch(`${API_URL}/api/todo`,{
            headers:{
                "Authorization": "Bearer " + token
            }
        })
        .then(res => res.json())
        .then(result => setResult(result))
    }
    useEffect(() => {
        fetchData()
    }, [])
  return (
    <div>
        {result.map((item, index) => {
            return <div key={index}>
                <p>{item.content}</p>
                <p>{item.date}</p>
                <Button id={item._id} done={item.done} fetchData={fetchData}/>
            </div>
        })}
    </div>
  )
}
