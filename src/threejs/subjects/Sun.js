import {
	PointLight,
	SphereBufferGeometry,
	MeshLambertMaterial,
	Mesh
} from 'three';

class Sun {

	constructor(scene, sunPath) {
		this.sceneRef = scene
		this.sunPathRef = sunPath
		this.properties = {
			'Hour': localStorage.Hour || 12,
			'Timezone': localStorage.Timezone || 0
		}
		this.light = new PointLight(0xFDB813, 2)
		this.geometry = new SphereBufferGeometry(6, 32, 32)
		this.material = new MeshLambertMaterial({
			color: 0xFDB813, 
			emissive: 0xFDB813
		})
		this.mesh = new Mesh(this.geometry, this.material);
		this.light.add(this.mesh)
		this.light.castShadow = true
	}

	drawSun() {
		let hour = (parseInt(this.properties.Hour) - 3) - parseInt(this.properties.Timezone)
		if(hour < 0) {
			hour = Math.abs(hour + 24)
		}
		let x = this.sunPathRef.geometry.vertices[hour].x
		let y = this.sunPathRef.geometry.vertices[hour].y
		let z = this.sunPathRef.geometry.vertices[hour].z
		// Insert sun direction here
		this.light.position.set(x, y, z)
	}

	updateProperties(newProperties) {
		this.properties = Object.assign(this.properties, newProperties)
		this.drawSun()
	}

	update() {
		this.sceneRef.add(this.light)
	}

}

export default Sun