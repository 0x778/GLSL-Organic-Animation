uniform float uRadius ;

varying vec3 vPosition ;
varying vec3 vNormal;
smooth varying vec2 vUv;
void main(){
    vec2 uv = vUv ; 
    uv -= vec2(0.5);
    uv *= 2. ;
    // uv corrdinat 
    uv[0] = 0.1;
    // uv[1] = 0.1;
    // vec3(step(uRadius , length(uv)))
    // vec3(step(0.5 ,fract(vUv.x * 10.))) 
    vec3 viewDirector = normalize(cameraPosition - vPosition) ;
    float fresnel = dot(viewDirector , vNormal);

    gl_FragColor = vec4(vec3(fresnel), 1.);
}
