import * as THREE from 'three'
window.THREE = THREE
require('three/examples/js/loaders/GLTFLoader')

export default (scene, resource) => {
    // Instantiate a loader
    let loader = new THREE.GLTFLoader();
    // Load a glTF resource
    loader.load(
      // resource URL
      resource,
      // called when the resource is loaded
      function ( gltf ) {

        let model = gltf.scene

        model.scale.set(.05,.05,.05)
        model.position.set(0,1.5,0)
        
        gltf.scene.traverse( function( node ) {

          if ( node instanceof THREE.Mesh ) { node.castShadow = true; }

        } );

        scene.add(model)

      },
      // called while loading is progressing
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( error );

      }
    );
}