import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GUI } from 'lil-gui'
import { Vector3 } from 'three';
import { CCDIKSolver } from "three/examples/jsm/animation/CCDIKSolver";
let assets = []
let mixer
const clock = new THREE.Clock();
const GLTFloader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight);
const gui = new GUI();
camera.position.set(4,2,1)
camera.lookAt(new Vector3(0,0,0))

// grid
const size = 10; const divisions = 10; const gridHelper = new THREE.GridHelper( size, divisions ); scene.add( gridHelper );

// create cube 
const geometry = new THREE.BoxGeometry( 1, 4, 0.1,1,20);
const material = new THREE.MeshBasicMaterial( {color: 0x666} );



//rig
let ikSolver
let bones = []



// "bone1", "bone2", "bone3"
for ( let i = 0; i <= 3; i ++ ) {
	const bone = new THREE.Bone();
	bone.position.y = i ;
	bones.push( bone );
	
}
for (let i = 0; i < bones.length; i++) {
	if(bones[i+1]) {
		bones[i].add(bones[i+1])
	}
		

}




//
// skinned mesh
//

const mesh = new THREE.SkinnedMesh( geometry,	material );
const cube = new THREE.Mesh( geometry,	material );

scene.add(cube)
cube.position.set(0,2,2)
mesh.position.set(0,0,0)
const skeleton = new THREE.Skeleton( bones );


mesh.add( bones[ 0 ] ); // "root" bone
mesh.bind( skeleton );
const helper = new THREE.SkeletonHelper( mesh );
scene.add(mesh)
scene.add(helper)
for (let i = 0; i < skeleton.bones.length; i++) {
	gui.addFolder(skeleton.bones[i]).add(skeleton.bones[i].rotation, 'x', -1,1,0.1).name('rotateX'+i).listen()
}





const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
document.body.appendChild( renderer.domElement );

renderer.render(scene, camera)
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
function animate() {
     requestAnimationFrame( animate );
     controls.update();
      renderer.render( scene, camera ); 
    }
animate() 


