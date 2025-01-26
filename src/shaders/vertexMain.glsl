 //Transform => position , rotation , scale
    //modelMatrix => position , rotation , scale for our model
    //viewMatrix => position , orientation of our camera
    //projectionMatrix => projects our object into the screen (sspect ratio & the prepective)
    vPosition = position ;
    vNormal = normal;
    vUv = uv;



    vec3 corrds = normal ;
    corrds.y += uTime;
    vec3 noisePattern = vec3(noise(corrds));
    float pattern = wave(noisePattern);
    vDisplacement = pattern;
    float displacement = vDisplacement;