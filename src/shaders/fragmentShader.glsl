
varying vec3 vPosition ;
varying vec3 vNormal;
flat varying vec2 vUv;
void main(){

    gl_FragColor = vec4(vUv.yxy, 1.);
}
