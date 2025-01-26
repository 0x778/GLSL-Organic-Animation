import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'
import vertexShaders from './shaders/vertexShader.glsl'
import fragmentShadesr from './shaders/fragmentShader.glsl'


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
  new THREE.PlaneGeometry(2,2),
  material
)
material.uniforms.uRadius = {value: 0.5}
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

Debug.add(material.uniforms.uRadius, "value",-1, 1)
const axis = new THREE.AxesHelper(5)
scence.add(axis)


/**
 * The animate
 */
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scence, camera)
  orbit.update()
  
}
animate()