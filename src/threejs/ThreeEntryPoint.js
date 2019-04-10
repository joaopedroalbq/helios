import SceneManager from './SceneManager'

export default containerElement => {
  
	const canvas = createCanvas(document, containerElement)
	const sceneManager = new SceneManager(canvas)
  
	bindEventListeners()
	render()

	function createCanvas() {
		const canvas = document.getElementById('helios')
		return canvas
	}

	function bindEventListeners() {
		window.onresize = resizeCanvas
		resizeCanvas()
	}
  
	function resizeCanvas() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		sceneManager.onWindowResize()
	}

	function render() {
		requestAnimationFrame(render)
		sceneManager.update()
	}

}

