import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { myContext } from '../App'
export default function Button(props) {
    const [isDone, setIsDone] = useState(props.done)
    const yo = "hello"
    const {
        client
    } = useContext(myContext)
    const handleOnClick = (e, yo) => {
        e.preventDefault()
        const object = {
            id: props.id,
            done: props.done
        }
        client.current.emit("click", object)
        props.fetchData()
    }
  return (
    <div>
        <button onClick={handleOnClick}>{isDone ? "Ej klart": "klart"}</button>
    </div>
  )
}
