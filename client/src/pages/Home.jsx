import React from 'react'
import { useState } from 'react'
import { myContext } from '../App'
import { useContext } from 'react'
import { useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
export default function Home() {
    const [result, setResult] = useState([])
    const [select, setSelect] = useState("&date=-1")
    const [search, setSearch] = useState("")
    const [todo, setTodo] = useState("")
    const {
        API_URL,
        token
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
        fetchData()
    
      }
    const fetchData = () => {
        fetch(`${API_URL}/api/todo/?search=${search}${select}`,{
            headers:{
                "Authorization": "Bearer " + token
            }
        })
        .then(res => res.json())
        .then(result => setResult(result))
    }
    useEffect(() => {
        fetchData()
    }, [select, search, token])
  return ( 
    <div>
        {console.log(token)}
        {/* sort on date
        <select onChange={e => setSelect(e.target.value)}>
          <option value={"-1"}>Date2</option>
            <option value={"1"}>Date</option>
        </select>
        sort on alphabetical order
        <select onChange={e => setSelectTwo(e.target.value)}>
          <option value={"-1"}>Date2 </option>
            <option value={"1"}>Date</option>
        </select>  */}
        <button onClick={e => setSelect(e.target.value)} value={"&date=1"}>Oldest</button>
        <button onClick={e => setSelect(e.target.value)} value={"&date=-1"}>Latest</button>
        <button onClick={e => setSelect(e.target.value)} value={"&content=1"}>Sortera bokstavsordning</button>
        <button onClick={e => setSelect(e.target.value)} value={"&content=-1"}>Sortera bokstavsordning</button>
        <Input value={search} setValue={setSearch} label="search" type="text"/>
        <form onSubmit={handleOnSubmit}>
        <Input value={todo} setValue={setTodo} label="todo" type="text" />
        <button type="submit">Submit</button>
      </form>
        {result.map((item, index) => {
            return <div key={index}>
                <Link to={`/todo/specific/${item._id}`}>Detailj vy</Link>
                <p>{item.content}</p>
                <p>{item.date}</p>
                <Button id={item._id} done={item.done} fetchData={fetchData}/>
            </div>
        })}
    </div>
  )
}
