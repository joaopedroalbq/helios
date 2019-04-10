import React, { useState } from 'react'
import { Sidenav, Nav, Icon, Dropdown, Toggle } from 'rsuite'
import PropertySlider from '../PropertySlider/index'
import Calendar from '../Calendar/index'

const styles = {
  width: "25vw",
  position: 'absolute'
}

const logoStyle = {
  display: 'inline',
  position: 'absolute',
  fontSize: 24,
  marginLeft: 5,
  lineHeight: 1.25
}

const headerStyle = {
  padding: 15,
  background: '#3250b4',
  color: '#fff'
}

const Logo = (props) => (
  <div>
    <Icon style={{ color: '#fff', borderRadius: 100, backgroundColor: '#ff9b75'}} icon='sun-o' size="2x"/> <span style={ props.showTitle ? logoStyle : { display: 'none', position: 'absolute' } }>Helios</span>
  </div>
)

export default () => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div style={styles}>
      <Sidenav defaultOpenKeys={['1', '2']} expanded={expanded}>
        <Sidenav.Header style={headerStyle}>
          <Logo showTitle={expanded}/>
          <br/>
          <Toggle size="sm" onChange={() => setExpanded(!expanded)} style={expanded ? { background:'#ff9b75' } : { background: '#d9d9d9' } } defaultChecked/>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Dropdown eventKey='1' title='Location' icon={<Icon icon='globe' />}>
                <PropertySlider name='Latitude' geographic defaultValue={parseInt(localStorage.Latitude) || 0} min={-90} max={90} />
                <PropertySlider name='Longitude' geographic defaultValue={parseInt(localStorage.Longitude) || 0} min={-180} max={180} />
                <div style={{ padding: 15 }}>
                  <span id="timezone">Timezone: GMT{(localStorage.Timezone < 0 ? `${localStorage.Timezone}` : `+${localStorage.Timezone}`) || `+0`}</span>
                </div>
            </Dropdown>
            <Dropdown eventKey='2' title='Date and Time' icon={<Icon icon='calendar' />}>
              <PropertySlider name='Hour' defaultValue={parseInt(localStorage.Hour) || 0} min={0} max={23} />
              <Calendar name='Date' defaultDate={localStorage.Date || new Date().toISOString().substr(0, 10)} />
            </Dropdown>
            <Dropdown eventKey='3' title='Other Settings' icon={<Icon icon='gear' />}>
              
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  )
}