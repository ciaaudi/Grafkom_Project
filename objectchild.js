  /*========================= GET WEBGL CONTEXT ========================= */
  var GL; 
function generateHyperboloid1sisi(posx, posy, posz, numSegments){
  var hyper1sisi_vertex = [];
  var i, j;
  i = 0;
  for (var u = -Math.PI; u <= Math.PI; u += Math.PI/90){
    j = 0;
    for (var v = -Math.PI/2; v < Math.PI/2; v +=Math.PI/30){
      hyper1sisi_vertex.push(2 * Math.acos(v) * Math.cos(u));
      hyper1sisi_vertex.push(1.5 * Math.acos(v) * Math.sin(u));
      hyper1sisi_vertex.push(Math.tan(v));
      hyper1sisi_vertex.push(u * 1.0/numSegments);
      hyper1sisi_vertex.push(v * 1.0/numSegments);
      j++;
    }
    i++;
  };
  var hyper1sisi_face = [];
  for (i = 0; i <= hyper1sisi_vertex.length; i++){
    hyper1sisi_face.push(i);
  };
  console.log(hyper1sisi_vertex);
  return [hyper1sisi_vertex, hyper1sisi_face];
}
function generateHalfSphere(posx, posy, posz, rx,ry,rz, stack, step){
  var halfSPhere_vertex = [];
  for(var i=0;i<=stack;i++){
    for(var j=0;j<=step; j++){
        var u = i / stack * Math.PI;
        var v = j/ step *  2*Math.PI;
        var x = Math.cos(v) * Math.sin(u) * rx + posx;
        var y = Math.cos(u) * ry + posy;
        var z = Math.sin(v) * Math.sin(u) * rz + posz;

        halfSPhere_vertex.push(x);   //X Coordinate
        halfSPhere_vertex.push(y);   //Y Coordinate
        halfSPhere_vertex.push(z);   //Z Coordinate
	      halfSPhere_vertex.push(i*1.0/stack);      //UV U-coordinate => x
        halfSPhere_vertex.push(j*1.0/step);     //UV V-coordinate => y
    }
  }

  var halfSphere_face = [];
  for (var i=0 ; i<stack/2 ; i++) {
    for (var j=0 ; j<step/2 ; j++ ) {
       var a = i * step + j;
       var b = a+1;
       var c = a+step;
       var d = a+step+1;

       halfSphere_face.push(a , b , d );//face one
       halfSphere_face.push(a , d , c );//face two
    }
    var a = i*step+step-1;
    var b = i*step;
    var c= i*step+step;
    var d = i*step+(step+1);
    // faces.push(a,b,d);
    // faces.push(d,b,c);

  }
  console.log(halfSPhere_vertex)
  return [halfSPhere_vertex,halfSphere_face];
}  

function generateKerucut(posx, posy, posz, r, numSegments){
  var kerucut_vertex = [];
  for(var i = 0; i <= numSegments; i++){
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = 0 + posz;
    kerucut_vertex.push(x);
    kerucut_vertex.push(y);
    kerucut_vertex.push(z);
    kerucut_vertex.push(i * 1.0/numSegments);
    kerucut_vertex.push(i * 1.0/numSegments);

  }
  for(var i = 0; i <= numSegments; i++){
    kerucut_vertex.push(0);
    kerucut_vertex.push(0);
    kerucut_vertex.push(-2);
    kerucut_vertex.push(i * 1.0/numSegments);
    kerucut_vertex.push(i * 1.0/numSegments);
  }

  var kerucut_face = [];
  // alas lingkaran
  for (var i = 0; i <= numSegments; i++){
    kerucut_face.push(i);
    kerucut_face.push(i + 1);
    kerucut_face.push(0);
  }
  // selimut kerucut
  for (var i = 0; i <= numSegments; i++){
    kerucut_face.push(i);
    kerucut_face.push(i + 1);
    kerucut_face.push(364);
  }
  console.log(kerucut_vertex);
  return [kerucut_vertex, kerucut_face];
}  

function generateTabung(posx,posy,posz, r, numSegments){
  var tabung_vertex = [];
  for(var i = 0; i <= numSegments; i++){
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = 0 + posz;
    tabung_vertex.push(x);
    tabung_vertex.push(y);
    tabung_vertex.push(z);
    tabung_vertex.push(i * 1.0/numSegments);
    tabung_vertex.push(i * 1.0/numSegments);
    
  }
  for (var i = 0; i <= numSegments; i++){
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = 2 + posz;
    tabung_vertex.push(x);
    tabung_vertex.push(y);
    tabung_vertex.push(z);
    tabung_vertex.push(i * 1.0/numSegments);
    tabung_vertex.push(i * 1.0/numSegments);

  }

  var tabung_face = [];
  //lingkaran bawah
  for (var i = 0; i <= numSegments; i++){
    tabung_face.push(i);
    tabung_face.push(i + 1);
    tabung_face.push(0);
  }
  //lingkaran atas
  for (var i = 0; i <= numSegments; i++){
    tabung_face.push(363 + i);
    tabung_face.push(364 + i);
    tabung_face.push(724);
  }
  for (var i = 0; i <= numSegments; i++){
    tabung_face.push(i);
    tabung_face.push(i+1);
    tabung_face.push(i + 363);

    tabung_face.push(i + 1);
    tabung_face.push(i + 363);
    tabung_face.push(i + 364);
  }
  console.log(tabung_vertex);
  return [tabung_vertex, tabung_face];
}  

function generateSphere(posx,posy,posz, rx,ry,rz, step, stack){
  // Create a sphere object with the given parameters
  var vertices = [];
  for(var i=0;i<=stack;i++){
    for(var j=0;j<=step; j++){

        var u = i / stack * Math.PI;
        var v = j/ step *  2*Math.PI;
        var x = Math.cos(v) * Math.sin(u) * rx + posx;
        var y = Math.cos(u) * ry + posy;
        var z = Math.sin(v) * Math.sin(u) * rz + posz;

        vertices.push(x);   //X Coordinate
        vertices.push(y);   //Y Coordinate
        vertices.push(z);   //Z Coordinate
	      vertices.push(i*1.0/stack);      //UV U-coordinate => x
        vertices.push(j*3.0/step);     //UV V-coordinate => y
    }
  }

  var faces = [];
  for (var i=0 ; i<stack ; i++) {
    for (var j=0 ; j<step ; j++ ) {
       var a = i * step + j;
       var b = a+1;
       var c = a+step;
       var d = a+step+1;

       faces.push(a , b , d );//face one
       faces.push(a , d , c );//face two
    }
    var a = i*step+step-1;
    var b = i*step;
    var c= i*step+step;
    var d = i*step+(step+1);
    // faces.push(a,b,d);
    // faces.push(d,b,c);

  }
  console.log(vertices)
  return [vertices,faces];
}


class MyObject{
  CANVAS = document.getElementById("your_canvas");
  cube_vertex = [];
  CUBE_VERTEX;
  cube_faces = [];
  CUBE_FACES;
  shader_vertex_source = null;
  shader_fragment_source = null;

  MOVEMATRIX = LIBS.get_I4();

  child = [];

  compile_shader = function(source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

  shader_vertex;
  shader_fragment;

  _Pmatrix;
  _Vmatrix;
  _Mmatrix;
  _sampler;
  cube_texture;


  _color;
  _position;

  SHADER_PROGRAM = GL.createProgram();

  constructor(cube_vertex,cube_faces,shader_vertex,shader_fragment){
    this.cube_vertex = cube_vertex;
    this.cube_faces = cube_faces;
    this.shader_vertex_source = shader_vertex;
    this.shader_fragment_source = shader_fragment;
  
    this.shader_vertex = this.compile_shader(this.shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
    this.shader_fragment = this.compile_shader(this.shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

    this.SHADER_PROGRAM = GL.createProgram();

    GL.attachShader(this.SHADER_PROGRAM, this.shader_vertex);
    GL.attachShader(this.SHADER_PROGRAM, this.shader_fragment);
  
    GL.linkProgram(this.SHADER_PROGRAM);

    this._Pmatrix = GL.getUniformLocation(this.SHADER_PROGRAM, "Pmatrix");
    this._Vmatrix = GL.getUniformLocation(this.SHADER_PROGRAM, "Vmatrix");
    this._Mmatrix = GL.getUniformLocation(this.SHADER_PROGRAM, "Mmatrix");

    this._sampler = GL.getUniformLocation(this.SHADER_PROGRAM, "sampler");

    this._color = GL.getAttribLocation(this.SHADER_PROGRAM, "uv");
    this._position = GL.getAttribLocation(this.SHADER_PROGRAM, "position");

    GL.enableVertexAttribArray(this._color);
    GL.enableVertexAttribArray(this._position);
  
    GL.useProgram(this.SHADER_PROGRAM);
    GL.uniform1i(this._sampler, 0);

    this.CUBE_VERTEX= GL.createBuffer();
    this.CUBE_FACES = GL.createBuffer();
    
    GL.bindBuffer(GL.ARRAY_BUFFER, this.CUBE_VERTEX);
    GL.bufferData(GL.ARRAY_BUFFER,new Float32Array(this.cube_vertex),GL.STATIC_DRAW);
    
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.CUBE_FACES);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(this.cube_faces),
    GL.STATIC_DRAW);

    this.cube_texture = LIBS.loadTexture("ressources/wall.jpg");
  }
  setuniformmatrix4(PROJMATRIX,VIEWMATRIX){
    GL.useProgram(this.SHADER_PROGRAM);
    GL.uniformMatrix4fv(this._Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(this._Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(this._Mmatrix, false, this.MOVEMATRIX);
    
  }
  draw(){
    GL.useProgram(this.SHADER_PROGRAM);
    GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_2D, this.cube_texture);
    
    GL.bindBuffer(GL.ARRAY_BUFFER, this.CUBE_VERTEX);
    GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 4*(3+2), 0);
    GL.vertexAttribPointer(this._color, 2, GL.FLOAT, false, 4*(3+2), 3*4);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.CUBE_FACES);
    GL.drawElements(GL.TRIANGLE_STRIP, this.cube_faces.length, GL.UNSIGNED_SHORT, 0);
     //GL.drawArrays(GL.TRIANGLES, 0, this.cube_vertex.length/6);
    for(let i = 0;i<this.child.length;i++){
      this.child[i].draw();
    }
  }
  getMoveMatrix(){
    return this.MOVEMATRIX;
  }
  setRotateMove(phi,theta,r){
    LIBS.rotateZ(this.MOVEMATRIX,r);
    LIBS.rotateY(this.MOVEMATRIX, theta);
    LIBS.rotateX(this.MOVEMATRIX, phi);
  }
  setTranslateMove(x,y,z){
    LIBS.translateX(this.MOVEMATRIX,z);
    LIBS.translateX(this.MOVEMATRIX,y);
    LIBS.translateX(this.MOVEMATRIX,x);
  }
  setIdentityMove(){
    LIBS.set_I4(this.MOVEMATRIX);
  }
  addChild(child){
    this.child.push(child);
  }
}
function main() {
  var CANVAS = document.getElementById("mycanvas");
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
  try {
    GL = CANVAS.getContext("webgl", {antialias: true});
  } catch (e) {
    alert("WebGL context cannot be initialized");
    return false;
  }

  /*========================= CAPTURE MOUSE EVENTS ========================= */

  var AMORTIZATION = 0.95;
  var drag = false;

  var x_prev, y_prev;

  var dX = 0, dY = 0;
  var mouseDown = function(e) {
    drag = true;
    x_prev = e.pageX, y_prev = e.pageY;
    e.preventDefault();
    return false;
  };

  var mouseUp = function(e){
    drag = false;
  };

  var mouseMove = function(e) {
    if (!drag) return false;
    dX = (e.pageX-x_prev) * 2 * Math.PI / CANVAS.width,
      dY = (e.pageY-y_prev) * 2 * Math.PI / CANVAS.height;
    THETA += dX;
    PHI += dY;
    x_prev = e.pageX, y_prev = e.pageY;
    e.preventDefault();
  };

  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);


  /*========================= SHADERS ========================= */

  //   var shader_vertex_source = "\n\
  // attribute vec3 position;\n\
  // uniform mat4 Pmatrix, Vmatrix, Mmatrix;\n\
  // attribute vec3 color; // the color of the point\n\
  // varying vec3 vColor; // color which will be interpolated per pix\n\
  // \n\
  // void main(void) {\n\
  // gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.);\n\
  // vColor = color;\n\
  // }";

  //   var shader_fragment_source = "\n\
  // precision mediump float;\n\
  // varying vec3 vColor;\n\
  // \n\
  // void main(void) {\n\
  // gl_FragColor = vec4(vColor, 1.);\n\
  // }";

  var shader_vertex_source = "\n\
  attribute vec3 position;\n\
  uniform mat4 Pmatrix, Vmatrix, Mmatrix;\n\
  attribute vec2 uv;\n\
  varying vec2 vUV;\n\
  \n\
  void main(void) {\n\
  gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.);\n\
  vUV=uv;\n\
  }";
  
    var shader_fragment_source = "\n\
  precision mediump float;\n\
  uniform sampler2D sampler;\n\
  varying vec2 vUV;\n\
  \n\
  \n\
  void main(void) {\n\
  gl_FragColor = texture2D(sampler, vUV);\n\
  //gl_FragColor = vec4(1.,1.,1.,1.);\n\
  }";

  /*========================= THE CUBE ========================= */
  
  // cube_vertex = [
  //   -1,-1,-1,     1,1,0,
  //   1,-1,-1,     1,1,0,
  //   1, 1,-1,     1,1,0,
  //   -1, 1,-1,     1,1,0,

  //   -1,-1, 1,     0,0,1,
  //   1,-1, 1,     0,0,1,
  //   1, 1, 1,     0,0,1,
  //   -1, 1, 1,     0,0,1,

  //   -1,-1,-1,     0,1,1,
  //   -1, 1,-1,     0,1,1,
  //   -1, 1, 1,     0,1,1,
  //   -1,-1, 1,     0,1,1,

  //   1,-1,-1,     1,0,0,
  //   1, 1,-1,     1,0,0,
  //   1, 1, 1,     1,0,0,
  //   1,-1, 1,     1,0,0,

  //   -1,-1,-1,     1,0,1,
  //   -1,-1, 1,     1,0,1,
  //   1,-1, 1,     1,0,1,
  //   1,-1,-1,     1,0,1,

  //   -1, 1,-1,     0,1,0,
  //   -1, 1, 1,     0,1,0,
  //   1, 1, 1,     0,1,0,
  //   1, 1,-1,     0,1,0

  // ];
  // C U B E  
  var cube_vertex = [
    // kanan atas 1,1
    // kalo lebih dari 1, hasilnya akan ngestrech
    -1,-1,-1,    0,0,
    1,-1,-1,     1,0,
    1, 1,-1,     1,1,
    -1, 1,-1,    0,1,

    -1,-1, 1,    0,0,
    1,-1, 1,     1,0,
    1, 1, 1,     1,1,
    -1, 1, 1,    0,1,

    -1,-1,-1,    0,0,
    -1, 1,-1,    1,0,
    -1, 1, 1,    1,1,
    -1,-1, 1,    0,1,

    1,-1,-1,     0,0,
    1, 1,-1,     3,0,
    1, 1, 1,     3,3,
    1,-1, 1,     0,3,

    -1,-1,-1,    0,0,
    -1,-1, 1,    1,0,
    1,-1, 1,     1,1,
    1,-1,-1,     0,1,

    -1, 1,-1,    0,0,
    -1, 1, 1,    1,0,
    1, 1, 1,     1,1,
    1, 1,-1,     0,1
  ];

  cube_faces = [
    0,1,2,
    0,2,3,

    4,5,6,
    4,6,7,

    8,9,10,
    8,10,11,

    12,13,14,
    12,14,15,

    16,17,18,
    16,18,19,

    20,21,22,
    20,22,23

  ];
  // K E R U C U T
  var kerucut = generateKerucut(0,0,0,0.5, 360);
  // T A B U N G 
  var tabung = generateTabung(0,0,0, 0.5, 362);
  // S P H E R E
  var sphere = generateSphere(0,0,0,1,1,1,20,20);
  // H A L F  S P H E R E
  var halfSphere = generateHalfSphere(0,0,0,1,1,1,20,20);
  // H Y P E R B O L O I D  1  S I S I 
  var hyper1sisi = generateHyperboloid1sisi(0,0,0,Math.PI);

  var object1 = new MyObject(sphere[0],sphere[1],shader_vertex_source,shader_fragment_source);
  var object2 = new MyObject(cube_vertex,cube_faces,shader_vertex_source,shader_fragment_source);
  var object3 = new MyObject(tabung[0],tabung[1],shader_vertex_source,shader_fragment_source);
  var obj_kerucut = new MyObject(kerucut[0], kerucut[1],shader_vertex_source,shader_fragment_source);
  var obj_halfSphere = new MyObject(halfSphere[0], halfSphere[1],shader_vertex_source,shader_fragment_source);
  var obj_hyper1 = new MyObject(hyper1sisi[0], hyper1sisi[1], shader_vertex_source, shader_fragment_source);

  object1.addChild(object2);
  object1.addChild(object3);
  object1.addChild(obj_kerucut);
  object1.addChild(obj_halfSphere);
  object1.addChild(obj_hyper1);

  /*========================= MATRIX ========================= */

  var PROJMATRIX = LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
  var VIEWMATRIX = LIBS.get_I4();

  LIBS.translateZ(VIEWMATRIX, -10);
  var THETA = 0,
      PHI = 0;

  /*========================= DRAWING ========================= */
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(1.0, 0.0, 0.0, 0.0);
  GL.clearDepth(1.0);

  var time_prev = 0;
  var animate = function(time) {
    var dt = time - time_prev;
    if (!drag) {
      dX *= AMORTIZATION, dY *= AMORTIZATION;
      THETA += dX, PHI += dY;
    }
    object1.setIdentityMove();
    object1.setTranslateMove(-1,0,0);
    object1.setRotateMove(PHI,THETA,0);
    object1.setTranslateMove(1,0,0);

    var temp = LIBS.get_I4();

    LIBS.translateX(temp, -2)
    object1.MOVEMATRIX = LIBS.mul(object1.MOVEMATRIX, temp);
    temp = LIBS.get_I4();
    LIBS.rotateY(temp, THETA);
    object1.MOVEMATRIX = LIBS.mul(object1.MOVEMATRIX, temp);
    temp = LIBS.get_I4();
    LIBS.translateX(temp,2);
    object1.MOVEMATRIX = LIBS.mul(object1.MOVEMATRIX, temp);

    // cube
    object1.child[0].setIdentityMove();
    object1.child[0].setRotateMove(PHI,THETA,0);
    object1.child[0].setTranslateMove(-2,0,0);

    // tabung
    object1.child[1].setIdentityMove();
    object1.child[1].setRotateMove(PHI,THETA,0);
    object1.child[1].setTranslateMove(2,0,0);

    // kerucut
    object1.child[2].setIdentityMove();
    object1.child[2].setRotateMove(PHI,THETA,0);
    object1.child[2].setTranslateMove(-2,-3,0);

    // half sphere
    object1.child[3].setIdentityMove();
    object1.child[3].setRotateMove(PHI,THETA,0);
    object1.child[3].setTranslateMove(-2,-4,0);

    // hyperboloid 1 sisi
    object1.child[4].setIdentityMove();
    object1.child[4].setRotateMove(PHI,THETA,0);
    object1.child[4].setTranslateMove(2,3,0);

    time_prev = time;

    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    object1.draw();

    object1.setuniformmatrix4(PROJMATRIX,VIEWMATRIX);

    object1.child[0].setuniformmatrix4(PROJMATRIX,VIEWMATRIX);
    object1.child[1].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    object1.child[2].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    object1.child[3].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    object1.child[4].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
   

    GL.flush();

    window.requestAnimationFrame(animate);
  };
  animate();
}

window.addEventListener('load', main);