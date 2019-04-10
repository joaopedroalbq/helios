import {
  Geometry,
  Vector3,
  LineLoop,
  LineDashedMaterial
} from 'three'
import * as SunCalc from 'suncalc'

class Analemma {
  
  constructor(scene, sunPath) {
    this.sceneRef = scene
    this.sunPathRef = sunPath
    this.properties = {
      'Latitude': localStorage.Latitude || 0,
      'Radius': 150,
      'Longitude': localStorage.Longitude || 0,
      'Date': localStorage.Date || new Date().toISOString().substr(0, 10)
    }
    this.analemma = this.drawAnalemma()
  }

  dateFromDay(year, day, hour){
    let date = new Date(year, 0);
    date = new Date(date.setDate(day));
    return new Date(date.setHours(hour)); 
  }

  drawAnalemma() {
    let material = new LineDashedMaterial({ color: 0xff9b75, linewidth: .5 })
    for (let t = 0; t < 24; t++) {
      let previousAnalemma = this.sceneRef.getObjectByName('ANALEMMA'+t)
      this.sceneRef.remove(previousAnalemma)
      let geometry = new Geometry()
      for (let i = 0; i < 365; i++) {
        let date = this.dateFromDay(2018, i, t)
        if(date.getTimezoneOffset() / 60 != 3) date = new Date(date.setHours(t+1))
        let sunPos = SunCalc.getPosition(date, this.properties.Latitude, this.properties.Longitude)
        let x = this.properties.Radius * (Math.cos(sunPos.altitude)) * (Math.cos(sunPos.azimuth))
        let z = this.properties.Radius * (Math.cos(sunPos.altitude)) * (Math.sin(sunPos.azimuth))
        let y = this.properties.Radius * (Math.sin(sunPos.altitude))
        let vector = new Vector3(x, y, z)
        geometry.vertices.push(vector)
      }
      let line = new LineLoop(geometry, material)
      line.computeLineDistances()
      line.name = 'ANALEMMA'+t
      this.sunPathRef.path.add(line)
    }
  }

  updateProperties(newProperties) {
    this.properties = Object.assign(this.properties, newProperties)
		this.drawAnalemma()
  }

  update() {
  }

}

export default Analemma