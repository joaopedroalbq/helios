import * as THREE from 'three'
import { Plane, Sun, SunPath, Analemma } from './subjects/index'
import OrbitControls from 'orbit-controls-es6'
import Observable from './Observable'
import GLTFLoader from './loaders/GLTF'

export default canvas => {
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }

  const buildScene = function() {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#FFFFFF')
    scene.add(new THREE.AmbientLight(0x505050, 0.75))
    return scene
  }

  const buildRenderer = ({ width, height }) => {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    })
    renderer.setSize(width, height)
    return renderer
  }

  const buildCamera = function({ width, height }) {
    const aspectRatio = width / height
    const frustumSize = 1000
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspectRatio) / -2,
      (frustumSize * aspectRatio) / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      2000
    )
    camera.position.y = 40
    camera.position.x = 40
    camera.zoom = .25
    return camera
  }

  const createObservables = function() {
    return {
      'Latitude': new Observable('Latitude'),
      'Longitude': new Observable('Longitude'),
      'Hour': new Observable('Hour'),
      'Date': new Observable('Date'),
      'Timezone': new Observable('Timezone')
    }
  }

  const createSceneSubjects = function(scene, observables) {
    const sunPath = new SunPath(scene)
    const plane = new Plane(scene)
    const sun = new Sun(scene, sunPath)
    const analemma = new Analemma(scene, sunPath)
    observables.Latitude.subscribe([sunPath, sun, analemma])
    observables.Longitude.subscribe([sunPath, sun, analemma])
    observables.Date.subscribe([sunPath, sun, analemma])
    observables.Timezone.subscribe([sun])
    observables.Hour.subscribe([sun])
    const sceneSubjects = [
      sunPath,
      sun,
      plane,
      analemma
    ]
    return sceneSubjects
  }

  const update = function() {
    sceneSubjects.forEach(s => s.update())
    controls.update()
    renderer.render(scene, camera)
  }

  const onWindowResize = function() {
    const { width, height } = canvas

    screenDimensions.width = width
    screenDimensions.height = height

    camera.left = (-100 * (width / height)) / 2
    camera.right = (100 * (width / height)) / 2
    camera.top = 100 / 2
    camera.bottom = -100 / 2

    camera.updateProjectionMatrix()
    camera.position.z = 50
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    renderer.shadowMapSoft = true
    renderer.setSize(width, height)
  }

  const scene = buildScene()
  const renderer = buildRenderer(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 10, 0)
  controls.mouseButtons.ORBIT = 2
  controls.mouseButtons.PAN = 1
  controls.mouseButtons.ZOOM = null
  const observables = createObservables()
  const sceneSubjects = createSceneSubjects(scene, observables)
  
  const House = GLTFLoader(scene, './src/threejs/models/House.gltf')

  return {
    update,
    onWindowResize
  }
}
