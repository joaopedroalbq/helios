import {
	LineBasicMaterial, 
	Geometry,
	Vector3,
	LineLoop
} from 'three'
import * as SunCalc from 'suncalc'

class SunPath {

	constructor(scene) {
		this.sceneRef = scene
		this.material = new LineBasicMaterial({
			color: 0x3250b4
		})
		this.geometry = new Geometry()
		this.properties = {
			'Date': new Date(localStorage.Date) || new Date().toISOString().substr(0, 10),
			'Radius': 150,
			'Latitude': localStorage.Latitude || 10,
			'Longitude': localStorage.Longitude || 20,
			'Timezone': localStorage.Timezone || 0
		}
		this.path = this.drawPath()
	}

	checkTimezone() {
		let timezone = Math.floor(Math.floor(this.properties.Longitude) / 15)
		localStorage.setItem('Timezone', timezone)
		let event = new CustomEvent('Timezone', { detail: timezone })
    window.dispatchEvent(event)
		document.getElementById('timezone').innerText = timezone > 0 ? `Timezone: GMT+${timezone}` : `Timezone: GMT${timezone}`
	}

	drawPath() {
		this.checkTimezone()
		this.geometry = new Geometry()
		let date = this.properties.Date
		for(let i=0; i<=24; i++) {
			date = new Date(date.setHours(i, 0))
			if(date.getTimezoneOffset() / 60 !== 3) date = new Date(date.setHours(i+1))
			let sunPos = SunCalc.getPosition(date, this.properties.Latitude, this.properties.Longitude)
			let x = this.properties.Radius * (Math.cos(sunPos.altitude)) * (Math.cos(sunPos.azimuth))
			let z = this.properties.Radius * (Math.cos(sunPos.altitude)) * (Math.sin(sunPos.azimuth))
			let y = this.properties.Radius * (Math.sin(sunPos.altitude))
			let vector = new Vector3(x, y, z)
			this.geometry.vertices.push(vector)
		}
		let path = new LineLoop(this.geometry, this.material)
		path.name = 'SUNPATH'
		return path
	}
	
	updateProperties(newProperties) {
		this.properties = Object.assign(this.properties, newProperties)
		this.path = this.drawPath()
		this.path.name = 'SUNPATH'
		let previousPath = this.sceneRef.getObjectByName('SUNPATH')
		this.sceneRef.remove(previousPath)
		this.sceneRef.add(this.path)
	}

	update() {

	}

}

export default SunPath