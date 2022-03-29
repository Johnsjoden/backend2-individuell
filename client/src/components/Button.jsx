import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { myContext } from '../App'
export default function Button(props) {
    const [isDone, setIsDone] = useState(props.done)
    const {
        client
    } = useContext(myContext)
    const handleOnClick = (e) => {
        e.preventDefault()
        const object = {
            id: props.id,
        }
        if(isDone === false){
            object.done = false
            client.current.emit("click", object)
        }else {
            object.done = true
            client.current.emit("click", object)
        }
        props.fetchData()
    }
  return (
    <div>
        <button onClick={handleOnClick}>{isDone ? "Ej klart": "klart"}</button>
    </div>
  )
}
