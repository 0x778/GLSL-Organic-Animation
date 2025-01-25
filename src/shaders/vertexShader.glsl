
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
smooth varying vec2 vUv;
void main(){
    //Transform => position , rotation , scale
    //modelMatrix => position , rotation , scale for our model
    //viewMatrix => position , orientation of our camera
    //projectionMatrix => projects our object into the screen (sspect ratio & the prepective)
    vPosition = position ;
    vNormal = normal;
    vUv = uv;

    // MVP 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position , 1.0);
    
}