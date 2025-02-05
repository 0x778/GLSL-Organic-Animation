/**This project done by 0x778 
 *  https://www.github.com/x0778
 * 
*/
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'
// import vertexShaders from './shaders/vertexShader.glsl'
import vertexShadersPars from './shaders/vertexShaderPars.glsl'
import vertexMain from './shaders/vertexMain.glsl'

import fragmentMain from './shaders/fragmentMain.glsl'
import fragmentPars from './shaders/fragmentPars.glsl'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

/**
 * layers
 */



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
renderer.setClearColor(0x000000, 1)
renderer.shadowMap.enabled = true
// scence.layers.set(0)

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
 * Colorsniform float uRadius ;

 */
const red = new THREE.Color("red")
const white = new THREE.Color("white")

/**
 * Meshes
 */
const material = new THREE.MeshStandardMaterial({
  onBeforeCompile: (shader) => {

    //storing a reference to the shader object
    material.userData.shader = shader
    //uniform
    shader.uniforms.uTime = { value: 0.5}
    
    // console.log(shader.vertexShader)
    const parsVertexString = /* glsl */`#include <displacementmap_pars_vertex>`
    shader.vertexShader = shader.vertexShader.replace(
      parsVertexString ,
    `${parsVertexString}\n${vertexShadersPars}`
    )

    const mainVertexString = /* glsl */ `#include <displacementmap_vertex>`
      shader.vertexShader = shader.vertexShader.replace(
        mainVertexString , 
            `${mainVertexString}\n${vertexMain}\n`
)

      const mainFragmentString = /* glsl */ `#include <normal_fragment_maps>`
      const parsFragmentString = /* glsl */ `#include <bumpmap_pars_fragment>`
      shader.fragmentShader = shader.fragmentShader.replace(
        parsFragmentString,
        `${parsFragmentString}\n${fragmentPars}`
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        mainFragmentString,
        `${mainFragmentString}\n${fragmentMain}`
      )
      console.log(material.userData.shader.fragmentShader)
  }

})
const sphare = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1 , 400),
  material
)
material.side = THREE.DoubleSide
// sphare.layers.set(1)
scence.add(sphare)


/**
 * Orbit Control
 */

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enableDamping = true



/**
 * Lights
 */
// 
// const spotlight = new THREE.SpotLight('#526cff',2)
// spotlight.position.set(2, 2, 2)
// scence.add(spotlight)

const directionLight = new THREE.DirectionalLight("#526cff", 2)
directionLight.position.set(2, 2, 2)
scence.add(directionLight)

const ambientLight = new THREE.AmbientLight("#4255ff", 2)
ambientLight.position.set(2, 2, 2)
scence.add(ambientLight)

/**
 * Debug
 */

const Debug = new GUI()
Debug.add(sphare.material, "wireframe")
console.log(sphare.material)
console.log(sphare.geometry)

// Debug.add(material.uniforms.uRadius, "value",-1, 1)
const shader =  Debug.addFolder("Shader")
const uniforms =  shader.addFolder("Uniform Time")
// uniforms.add(material.userData.shader.uniforms.uTime, "value", 0.0, 10.0)
const stats = new Stats()
document.body.appendChild(stats.dom)
const axis = new THREE.AxesHelper(5)
scence.add(axis)

console.log(material.userData)

/**
 * postprocessing
 */
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scence, camera)
 composer.addPass(renderPass)
 composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.2, 0.1))
 
 /**
 * The animate
 */
function animate(timestamp) {
  requestAnimationFrame(animate)
  renderer.render(scence, camera)
  orbit.update()
  const time = timestamp / 10000
  material.userData.shader.uniforms.uTime = {value: time}
  composer.render()
}
animate()