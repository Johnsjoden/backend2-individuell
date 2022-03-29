import React from 'react'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { myContext } from '../App'
import Button from '../components/Button'

export default function TodoFinish() {
    const [result, setResult] = useState([])
    const {
        token,
        API_URL
    } = useContext(myContext)
    const fetchData = () => {
        fetch(`${API_URL}/api/todo/finish`,{
            headers:{
                "Authorization": "Bearer " + token
            }})
        .then(res => res.json())
        .then(result => setResult(result))
    }
    useEffect(() => {
        fetchData()
    }, [])
  return (
    <div>TodoFinish
        {result.map((item, index) => {
            return <div key={index}>
                <p>{item.content}</p>
                <Button id={item._id} done={item.done} fetchData={fetchData}/>
            </div>
        })}
    </div>
  )
}
