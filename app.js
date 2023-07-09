// Construindo um sistema planetário.

import * as THREE from 'three';
import { OrbitControls } from './Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';
import { GUI } from './Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js'

// Post-processing imports
//import { EffectComposer } from "./Assets/scripts/three.js/examples/jsm/postprocessing/EffectComposer.js";
//import { RenderPass } from "./Assets/scripts/three.js/examples/jsm/postprocessing/RenderPass.js";
//import { UnrealBloomPass } from "./Assets/scripts/three.js/examples/jsm/postprocessing/UnrealBloomPass.js";

// importing modules
import { createMeshes } from './createMeshes.js';
import { animate } from './animate.js';

const rendSize = new THREE.Vector2();

var gui = new GUI();

var scene,
	renderer,
	camera,
	cameraControl,
	controls;

// glowing sun variables
var renderPass,
	bloomPass,
	composer;

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {
	// render setup
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	rendSize.x =
		rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;
	renderer.setSize(rendSize.x, rendSize.y);

	// enabling shadows
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	// Camera setup
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.x = 70;
	camera.position.y = 70;
	camera.position.z = 70;
	camera.lookAt(scene.position);

	cameraControl = new OrbitControls(camera, renderer.domElement);
	cameraControl.enablePan = false;

	scene.add(camera);
	// Post-processing setup

	// RenderPass provides the rendered scene as an input for the next post-processing step
	//renderPass = new RenderPass(scene, camera);

	// UnrealBloomPass provides the glowing effect
	// bloomPass = new UnrealBloomPass(
	// 	new THREE.Vector2(window.innerWidth, window.innerHeight),
	// 	1.5,
	// 	0.4,
	// 	0.85
	// );
	// bloomPass.threshold = 0;
	// bloomPass.strength = 2; //intensity of glow
	// bloomPass.radius = 0;

	// // effect composer renderer to render the shining effect
	// composer = new EffectComposer(renderer);
	// composer.setSize(window.innerWidth, window.innerHeight) * 0.8;
	// composer.renderToScreen = true;
	// composer.addPass(renderPass);
	// composer.addPass(bloomPass);

	// GUI setup
	initGUI();

	// Add planets, stars and lights	
	buildScene();

	renderer.clear()
	renderer.render(scene, camera);

	// starting animation
	requestAnimationFrame(() => {
		animate(scene, camera, renderer, controls, cameraControl);
	});
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {
	controls = {
		Pause: false,
		Focus: "Sun"
	};

	gui.add(controls, 'Pause');
	gui.add(controls, 'Focus', ["Sun",
		"Mercury",
		"Venus",
		"Earth",
		"Mars",
		"Jupiter",
		"Saturn",
		"Uranus",
		"Neptune"]).onChange(changeFocus);
	gui.open();
};

function changeFocus() {
	// selecting planet to focus on
	let focusMesh = scene.getObjectByName(controls.Focus);
	if (!focusMesh) {
		return;
	}
	camera.lookAt(focusMesh.position);

	// changing camera parent to the chosen planet
	const parent = camera.parent;
	parent.remove(camera);
	focusMesh.add(camera);

	// changin camera position to face the chosen planet
	const sun = scene.getObjectByName("Sun");
	camera.position.set(
		focusMesh.position.x - sun.position.x,
		focusMesh.position.y - sun.position.y,
		focusMesh.position.z - sun.position.z,
	);

	cameraControl.target = focusMesh.position;
	cameraControl.update();
}


/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {
	// Loading cubemap
	const path = "./Assets/Textures/Cubemap/";
	const cubemap = [
		path + "bkg1_right.png",
		path + "bkg1_left.png",
		path + "bkg1_top.png",
		path + "bkg1_bot.png",
		path + "bkg1_front.png",
		path + "bkg1_back.png",
	];

	const textureCube = new THREE.CubeTextureLoader().load(cubemap);
	scene.background = textureCube;

	// adding ambient light
	scene.add(new THREE.AmbientLight(0x555555));

	// creating planets and sun meshes
	createMeshes(scene);

	// creating sunlight
	const sun_color = 0xFDB813;
	const sunLight = new THREE.PointLight({ color: sun_color, distance: 150 });
	sunLight.name = "sunlight";
	sunLight.position.set(0, 0, 0);
	sunLight.castShadow = true;

	scene.add(sunLight);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

main();
