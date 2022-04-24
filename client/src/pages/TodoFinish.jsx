import React from 'react'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { myContext } from '../App'
import Button from '../components/Button'
import Input from '../components/Input'

export default function TodoFinish() {
    const [result, setResult] = useState([])
    const [select, setSelect] = useState("")
    const [search, setSearch] = useState("")
    const {
        token,
        API_URL,
        config
    } = useContext(myContext)
    const fetchData = () => {
        fetch(`${API_URL}/api/finish/todo/?search=${search}${select}`,
        config)
        .then(res => res.json())
        .then(result => setResult(result))
    }
    useEffect(() => {
        fetchData()
    }, [select, search])
  return (
    <div>TodoFinish
        {console.log(select)}
        <button onClick={e => setSelect(e.target.value)} value={"&date=1"}>Oldest</button>
        <button onClick={e => setSelect(e.target.value)} value={"&date=-1"}>Latest</button>
        <button onClick={e => setSelect(e.target.value)} value={"&content=1"}>Sortera bokstavsordning</button>
        <button onClick={e => setSelect(e.target.value)} value={"&content=-1"}>Sortera bokstavsordning</button>
        <Input value={search} setValue={setSearch} label="search" type="text"/>
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
