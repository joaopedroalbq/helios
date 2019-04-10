import * as THREE from 'three';

export default scene => {
	const geometry = new THREE.BoxBufferGeometry(400, 400, 0);
	const material = new THREE.MeshLambertMaterial({color: 0x5cc54e});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	mesh.rotation.x = - Math.PI / 2;
	mesh.isDraggable = false;
	mesh.name = 'PLANE';
	scene.add(mesh);
  
	function update() {
    
	}

	return {
		update
	};
};
