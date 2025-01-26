void main(){
   

    vec3 nPosition = position + normal * displacement ; 

    // MVP 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(nPosition , 1.0);
    
}