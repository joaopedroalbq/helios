import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export default props => {
  const [value, setValue] = useState(props.defaultValue)

  useEffect( () => {
    localStorage.setItem(props.name, value)
    let event = new CustomEvent(props.name, { detail: value })
    window.dispatchEvent(event)
  })

  return (
    <div style={{ padding: 15 }}>
          <label>{props.name}</label> <span style={{float: 'right'}}>{value} {props.geographic ? '°': '' }</span>
          <Slider
            defaultValue={props.defaultValue}
            railStyle={{ backgroundColor: '#d9d9d9', height: 5 }}
            trackStyle={{ backgroundColor: '#3250b4', height: 5 }}
            step={1}
            min={props.min}
            max={props.max}
            handleStyle={{
              borderColor: '#3250b4',
              backgroundColor: '#3250b4'
            }}
            onChange={(v) => {
                setValue(v)
              }
            }
          />
    </div>
  )

}