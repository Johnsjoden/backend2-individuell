import React from 'react'

export default function Input(props) {
  const renderInput = (props) => {
    return <label htmlFor={props.label}> {props.label}:
      <input id={props.label} value={props.value} onChange={e => props.setValue(e.target.value)} />
    </label>
  }
  return (
    <div>
      {renderInput(props)}
    </div>
  )
}