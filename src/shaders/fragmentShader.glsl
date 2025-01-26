uniform float uRadius ;

varying vec3 vPosition ;
varying vec3 vNormal;
varying vec2 vUv;

// signed distance fields
float drawCircle(vec2 position , vec2 center){
    return step(uRadius , distance(position , center));
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

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
    // vUv[1] = 1.;

    //Line
    // vec3(step(0.99,1. - abs(vUv.x  - 0.5))),

    //circle by call 
    //drawCircle(vUv ,vec2(0.5) )

    // Box by call
    gl_FragColor = vec4(vec3(step(0.9 , 1. -sdBox(vUv - 0.5 , vec2(0.15)))), 1.);
}
