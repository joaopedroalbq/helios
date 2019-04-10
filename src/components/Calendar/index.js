import React, { useState, useEffect } from 'react'
import { DatePicker } from 'rsuite'

export default (props) => {
  const [date, setDate] = useState(props.defaultDate)

  useEffect( () => {
    localStorage.setItem(props.name, date)
    let event = new CustomEvent(props.name, { detail: new Date(date) })
    window.dispatchEvent(event)
  })

  return (
    <div style={{ padding: 15 }}>
      <label>Date</label>
      <br/>
      <DatePicker 
        defaultValue={props.defaultDate}
        placement='auto'
        onChange={d => setDate(d.toISOString().substr(0, 10))}
      />
    </div>
  )

}