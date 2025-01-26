import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
//Deubg
import GUI from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'

// import postprocessing passes
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js' 
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader.js'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'

import fragmentShadesr from './shaders/fragmentShader.glsl'
import vertexShaders from './shaders/vertexShader.glsl'


/**
 * Constants
 */
const MOTION_BLUR_AMOUNT = 0.5

/**
 * basic render
 */

const scence = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 2
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.setClearColor(0x8343, 1)


/**
 * 
 * Events
 */
addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

/**
 * Colors
 */
const red = new THREE.Color("red")
const white = new THREE.Color("white")

/**
 * Meshes
 */
const material = new THREE.ShaderMaterial({
  vertexShader:vertexShaders,
  fragmentShader:fragmentShadesr
})

const sphare = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1 , 400),
  material
)
material.uniforms.uTime = { value: 0.5}
scence.add(sphare)


/**
 * Orbit Control
 */

const orbit = new OrbitControls(camera, renderer.domElement)

/**
 * Lights
 */

const spotlight = new THREE.SpotLight(white,2)
spotlight.position.set(2, 2, 2)
scence.add(spotlight)

const directionLight = new THREE.DirectionalLight(white, 1)
directionLight.position.set(5, 6, 4)
scence.add(directionLight)

/**
 * Debug
 */

const Debug = new GUI()
Debug.add(sphare.material, "wireframe")
console.log(sphare.material)
console.log(sphare.geometry)
const shader =  Debug.addFolder("Shader")
const uniforms =  shader.addFolder("Uniform Time")
uniforms.add(material.uniforms.uTime, "value", 0.0, 10.0)
const stats = new Stats()
document.body.appendChild(stats.dom)
const axis = new THREE.AxesHelper(5)
scence.add(axis)


/**
 * The animate
 */



/**
 *  Post Processing Animation
 */



/**
 * Main Animation
 */
function animate(timestamp) {
  requestAnimationFrame(animate)
  renderer.render(scence, camera)
  orbit.update()
  const time = timestamp / 10000
  material.uniforms.uTime.value = time
}

animate()