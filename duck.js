  /*========================= GET WEBGL CONTEXT ========================= */
  // import Curve from 'bezierCurve.js';
  
  var GL; 
  function generateKerah(posx, posy, posz, rx, ry, rz, step, stack) { //pos x,yz  rx,ry,rz, step,stack
    // Create a d_sphere object with the given parameters
    var vertices = [];
    for (var i = 20; i <= stack; i++) {
      var u = i / stack * Math.PI;
  
      for (var j = 0; j <= step; j++) {
        var v = j / step * 2 * Math.PI;

        var x = Math.cos(v) * Math.sin(u) * rx + posx;
        var y = Math.cos(u) * ry + posy;
        var z = Math.sin(v) * Math.sin(u) * rz + posz;
  
        vertices.push(x); // X Coordinate
        vertices.push(y); // Y Coordinate
        vertices.push(z); // Z Coordinate
        vertices.push(j * 1.0 / step); // UV U-coordinate => x
        vertices.push(i * 1.0 / stack); // UV V-coordinate => y
      }
    }
  
    var faces = [];
    for (var i = 27; i < stack/3; i++) {
      for (var j = 0; j < step; j++) {
        var a = i * (step + 1) + j;
        var b = a + 1;
        var c = (i + 1) * (step + 1) + j;
        var d = c + 1;
  
        faces.push(a, c, b); //face one
        faces.push(b, c, d); //face two
      }
    }
  
    return [vertices, faces];
  }
  function generateTopi(posx, posy, posz, rx, ry, rz, step, stack) { //pos x,yz  rx,ry,rz, step,stack
    // Create a d_sphere object with the given parameters
    var vertices = [];
    for (var i = 0; i <= stack/4; i++) {
      var u = i / stack * Math.PI;
  
      for (var j = 0; j <= step; j++) {
        var v = j / step * 2 * Math.PI;

        var x = Math.cos(v) * Math.sin(u) * rx + posx;
        var y = Math.cos(u) * ry + posy;
        var z = Math.sin(v) * Math.sin(u) * rz + posz;
  
        vertices.push(x); // X Coordinate
        vertices.push(y); // Y Coordinate
        vertices.push(z); // Z Coordinate
        vertices.push(j * 1.0 / step); // UV U-coordinate => x
        vertices.push(i * 1.0 / stack); // UV V-coordinate => y
      }
    }
  
    var faces = [];
    for (var i = 0; i < stack/4; i++) {
      for (var j = 0; j < step; j++) {
        var a = i * (step + 1) + j;
        var b = a + 1;
        var c = (i + 1) * (step + 1) + j;
        var d = c + 1;
  
        faces.push(a, c, b); //face one
        faces.push(b, c, d); //face two
      }
    }
  
    return [vertices, faces];
  }
  function generateBaju(posx, posy, posz, rx, ry, rz, step, stack) { //pos x,yz  rx,ry,rz, step,stack
    // Create a d_sphere object with the given parameters
    var vertices = [];
    for (var i = 20; i <= stack; i++) {
      var u = i / stack * Math.PI;
  
      for (var j = 0; j <= step; j++) {
        var v = j / step * 2 * Math.PI;

        var x = Math.cos(v) * Math.sin(u) * rx + posx;
        var y = Math.cos(u) * ry + posy;
        var z = Math.sin(v) * Math.sin(u) * rz + posz;
  
        vertices.push(x); // X Coordinate
        vertices.push(y); // Y Coordinate
        vertices.push(z); // Z Coordinate
        vertices.push(j * 1.0 / step); // UV U-coordinate => x
        vertices.push(i * 1.0 / stack); // UV V-coordinate => y
      }
    }
  
    var faces = [];
    for (var i = 30; i < stack/1.7; i++) {
      for (var j = 0; j < step; j++) {
        var a = i * (step + 1) + j;
        var b = a + 1;
        var c = (i + 1) * (step + 1) + j;
        var d = c + 1;
  
        faces.push(a, c, b); //face one
        faces.push(b, c, d); //face two
      }
    }
  
    return [vertices, faces];
  }

  function generateHalfSphere(posx, posy, posz, rx, ry, rz, step, stack, div_) { //pos x,yz  rx,ry,rz, step,stack
    // Create a d_sphere object with the given parameters
    var vertices = [];
    for (var i = 0; i <= stack/div_; i++) {
      var u = i / stack * Math.PI;
  
      for (var j = 0; j <= step; j++) {
        var v = j / step * 2 * Math.PI;

        var x = Math.cos(v) * Math.sin(u) * rx + posx;
        var y = Math.cos(u) * ry + posy;
        var z = Math.sin(v) * Math.sin(u) * rz + posz;
  
        vertices.push(x); // X Coordinate
        vertices.push(y); // Y Coordinate
        vertices.push(z); // Z Coordinate
        vertices.push(j * 1.0 / step); // UV U-coordinate => x
        vertices.push(i * 1.0 / stack); // UV V-coordinate => y
      }
    }
  
    var faces = [];
    for (var i = 0; i < stack/div_; i++) {
      for (var j = 0; j < step; j++) {
        var a = i * (step + 1) + j;
        var b = a + 1;
        var c = (i + 1) * (step + 1) + j;
        var d = c + 1;
  
        faces.push(a, c, b); //face one
        faces.push(b, c, d); //face two
      }
    }
  
    return [vertices, faces];
  }

function generateKerucut(posx, posy, posz, r, numSegments){ //pos x,y,z, r,  segment
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

function generateTabung(posx,posy,posz, r, t){ //pos x,y,z, r, t, segment
  var tabung_vertex = [];
  numSegments = 362;
  for(var i = 0; i <= numSegments; i++){
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = -t/2 + posz;
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
    var z = t/2 + posz;
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

function generateSphere(posx, posy, posz, rx, ry, rz, step, stack) { //pos x,yz  rx,ry,rz, step,stack
    var vertices = [];
    for (var i = 0; i <= stack; i++) {
      var u = i / stack * Math.PI;
  
      for (var j = 0; j <= step; j++) {
        var v = j / step * 2 * Math.PI;

        var x = rx* Math.cos(v) * Math.sin(u) + posx;
        var y = ry* Math.cos(u) + posy;
        var z = rz* Math.sin(v) * Math.sin(u) + posz;
  
        vertices.push(x); // X Coordinate
        vertices.push(y); // Y Coordinate
        vertices.push(z); // Z Coordinate
        vertices.push(j * 1.0 / step); // UV U-coordinate => x
        vertices.push(i * 1.0 / stack); // UV V-coordinate => y
      }
    }
  
    var faces = [];
    for (var i = 0; i < stack; i++) {
      for (var j = 0; j < step; j++) {
        var a = i * (step + 1) + j;
        var b = a + 1;
        var c = (i + 1) * (step + 1) + j;
        var d = c + 1;
  
        faces.push(a, c, b); //face one
        faces.push(b, c, d); //face two
      }
    }
    return [vertices, faces];
  }
  

class MyObject{
  CANVAS = document.getElementById("mycanvas");
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

    this.cube_texture = LIBS.loadTexture("resources/wall.jpg");
  }
  setuniformmatrix4(PROJMATRIX,VIEWMATRIX){
    GL.useProgram(this.SHADER_PROGRAM);
    GL.uniformMatrix4fv(this._Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(this._Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(this._Mmatrix, false, this.MOVEMATRIX);
        for(let i=0; i < this.child.length; i++){
      this.child[i].setuniformmatrix4(PROJMATRIX,VIEWMATRIX);
    }
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
    // GL.drawElements(GL.LINE_STRIP, this.cube_faces.length, GL.UNSIGNED_SHORT, 0);
    
    for(let i = 0;i<this.child.length;i++){
      this.child[i].draw();
    }
  }
  getMoveMatrix(){
    return this.MOVEMATRIX;
  }
  setRotateMove(phi,theta,r){ //kembali ke titik 0,0,0 
    LIBS.rotateZ(this.MOVEMATRIX,r);
    LIBS.rotateY(this.MOVEMATRIX, theta);
    LIBS.rotateX(this.MOVEMATRIX, phi);
  }
  setTranslateMove(x,y,z){
    LIBS.translateZ(this.MOVEMATRIX,z);
    LIBS.translateY(this.MOVEMATRIX,y);
    LIBS.translateX(this.MOVEMATRIX,x);
  }
  setIdentityMove(){
    LIBS.set_I4(this.MOVEMATRIX);
  }
  addChild(child){
    this.child.push(child);
  }
  loadTexturee(filename){ //menerima string 
    this.cube_texture = LIBS.loadTexture(filename); //btk string (nama file "__.jpg")
  }
  scaleAll(scaleX, scaleY, scaleZ) {
    this.MOVEMATRIX = glMatrix.mat4.create(); //memanggil glMatrix
    glMatrix.mat4.scale(this.MOVEMATRIX, this.MOVEMATRIX, [scaleX, scaleY, scaleZ]);

    for (let i = 0; i < this.child.length; i++) {
      this.child[i].MOVEMATRIX = glMatrix.mat4.create();
      glMatrix.mat4.scale(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, [scaleX, scaleY, scaleZ]);
    }
  }
  translateAll(tx,ty,tz){
    this.MOVEMATRIX = glMatrix.mat4.create(); //memanggil glMatrix

    glMatrix.mat4.translate(this.MOVEMATRIX, this.MOVEMATRIX, [tx,ty,tz]);

    for(let i=0; i < this.child.length; i++){
      this.child[i].MOVEMATRIX = glMatrix.mat4.create();
      glMatrix.mat4.translate(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, [tx,ty,tz]); //translasi trmsk anaknya

        // this.child[i].setIdentityMove();//men-set ke posisi fixed yg ditentukan
      // this.child[i].setTranslateMove(0,0,0); //mengatur perpindahan 
      // this.child[i].setRotateMove(phi,theta,r); //rotasi 
      //ROTASI COBA
      // glMatrix.mat4.rotateX(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, phi);
      // glMatrix.mat4.rotateY(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, theta);
      // glMatrix.mat4.rotateZ(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, r);
    }
  }
  rotateAll(phi,theta,r){
    // this.MOVEMATRIX = glMatrix.mat4.create(); //memanggil glMatrix

    // glMatrix.mat4.rotateX(this.MOVEMATRIX, this.MOVEMATRIX, phi);
    // glMatrix.mat4.rotateY(this.MOVEMATRIX, this.MOVEMATRIX, theta);
    // glMatrix.mat4.rotateZ(this.MOVEMATRIX, this.MOVEMATRIX, r);
    for(let i=0; i < this.child.length; i++){
      //ROTASI COBA
      this.child[i].MOVEMATRIX = glMatrix.mat4.create();
      glMatrix.mat4.rotateX(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, phi);
      glMatrix.mat4.rotateY(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, theta);
      // glMatrix.mat4.rotateZ(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, r);
    }
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

  var keyboardDown = function(e){
    if(e.key =="w" || e.key =="W"){ //UP
      dY -= 0.05;
    }
    if(e.key =="a" || e.key =="A"){ //LEFT
      // alert(e.key);
      dX -= 0.05;
    }
    if(e.key =="s" || e.key =="S"){ //DOWN
      // alert(e.key);
      dY += 0.05;
    }
    if(e.key =="d" || e.key =="D"){ //RIGHT
      // alert(e.key);
      dX += 0.05;
    }
  }

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

  window.addEventListener("keydown",keyboardDown,false); //DOWN KEY

  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);


  /*========================= SHADERS ========================= */

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

  /*========================= THE OBJECT ========================= */
  var depth=0.87, x=0.05;
  //mulut atas
  const duck_controlPoints1 = [
    [-0.11354166666666665-2*x, 0.2042328042328042+x, depth], // P0
    [-0.06458333333333333, 0.22116402116402112+x, depth], // P1
    [-0.021874999999999978, 0.22962962962962963+x, depth], // P2
    [0.006250000000000089, 0.22962962962962963+x, depth], // P3
    [0.05208333333333326, 0.22116402116402112+x, depth], // P4
    [0.09895833333333326+2*x, 0.2063492063492064+x, depth] // P5
];

//mulut bawah
const duck_controlPoints2 = [
    [-0.08229166666666665-0.06, 0.19153439153439156, depth], // P0
    [-0.05104166666666665, 0.1788359788359788, depth], // P1
    [-0.019791666666666652, 0.17248677248677247, depth], // P2
    [0.01041666666666674, 0.17248677248677247, depth], // P3
    [0.04166666666666674, 0.1788359788359788, depth], // P4
    [0.07187499999999991+0.06, 0.19153439153439156, depth] // P5
];

//akan dipanggil di main 
const duck_numberOfPoints = 20;
const bezierCurve1 = new Curve(duck_controlPoints1,duck_numberOfPoints);
const curvePoints1 = bezierCurve1.getCurvePoints(); //xyz
// console.log(curvePoints1);
const bezierCurve2 = new Curve(duck_controlPoints2,duck_numberOfPoints);
const curvePoints2 = bezierCurve2.getCurvePoints(); //xyz

const duck_arrOfObjects=[];
for (let i = 0; i < curvePoints1.length; i+=3) {
  rr = 0.06;
    temp = generateSphere(
        curvePoints1[i], curvePoints1[i+1], curvePoints1[i+2], //pos xyz
        rr,rr,rr, //rx,ry,rz
        30, 100
    ); //mereturn vertice & face
    const temp_object = new MyObject(temp[0],temp[1],shader_vertex_source,shader_fragment_source);
    duck_arrOfObjects.push(temp_object);
}
const duck_arrOfObjects2=[];
for (let i = 0; i < curvePoints2.length; i+=3) {
  rr = 0.04;
    temp = generateSphere(
        curvePoints2[i], curvePoints2[i+1], curvePoints2[i+2], //pos xyz
        rr,rr,rr, //rx,ry,rz
        30, 100
    ); //mereturn vertice & face
    const temp_object = new MyObject(temp[0],temp[1],shader_vertex_source,shader_fragment_source);
    duck_arrOfObjects2.push(temp_object);
}

  // duck_badan
  var d_sphere = generateSphere(0,0,0, //pos x,y,z
    0.909090909090909-0.05, //rx
    1-0.05, //ry
    0.9-0.05, //rz
    30,  //step
    100); //stack
    //BAJU
  var d_spherecover = generateBaju(0,0,0, //pos x,y,z
    0.909090909090909, //rx
    1, //ry
    0.9, //rz
    30,  //step
    100); //stack
    //TOPI 
    var d_spherecover2 = generateTopi(0,0,0, //pos x,y,z
    1, //rx
    1, //ry
    0.9, //rz
    30,  //step
    100); //stack  
    var d_tabungalas = generateTabung(0,0,0, //pos x,y,z
    0.8, //radius
    0.05,); //t

  //MATA 
    //kiri & kanan 
    var d_sphere2 = generateSphere(0,0,0, //pos x,y,z
    0.05833333333, //rx
    0.075, //ry
    0.02916666667, //rz
    30,  //step
    100); //stack

  //KERAH BAJU
  var d_spherecover3 = generateKerah(0,0,0, //pos x,y,z
    0.909090909090909+0.02, //rx
    1+0.02, //ry
    0.9+0.02, //rz
    30,  //step
    100); //stack

  //KAKI 
  var d_sphere4 = generateSphere(0,0,0, //pos x,y,z
    0.2916666667, //rx
    0.5, //ry
    0.3333333333, //rz
    30,  //step
    100); //stack

  //TELAPAK JARI  
  var d_spheres = generateSphere(0,0,0, //pos x,y,z
    0.09166666667, //rx
    0.06666666667, //ry
    0.375, //rz
    30,  //step
    100); //stack

  //TANGAN
    //kiri & kanan
    var d_tabung = generateTabung(0,0,0, //pos x,y,z
    0.208, //radius
    0.5,); //t
    var d_halfsphere = generateHalfSphere(0,0,0, //pos x,y,z
    0.2083, //rx
    0.2083, //ry
    0.2083, //rz
    30,  //step
    100,2); //stack,

/*---- CREATE OBJECT ---- */
    //Object (vertex,face,shader,fragment)
  var duck_badan = new MyObject(d_sphere[0],d_sphere[1],shader_vertex_source,shader_fragment_source);
  var duck_mata_kanan = new MyObject(d_sphere2[0],d_sphere2[1],shader_vertex_source,shader_fragment_source);
  var duck_mata_kiri = new MyObject(d_sphere2[0],d_sphere2[1],shader_vertex_source,shader_fragment_source); 
  
  var duck_baju = new MyObject(d_spherecover[0],d_spherecover[1],shader_vertex_source,shader_fragment_source);
  var duck_topi = new MyObject(d_spherecover2[0],d_spherecover2[1],shader_vertex_source,shader_fragment_source);
  var duck_alastopi = new MyObject(d_tabungalas[0],d_tabungalas[1],shader_vertex_source,shader_fragment_source);
  var duck_kerah = new MyObject(d_spherecover3[0],d_spherecover3[1],shader_vertex_source,shader_fragment_source);

  var duck_paha_kanan = new MyObject(d_sphere4[0],d_sphere4[1],shader_vertex_source,shader_fragment_source);
  var duck_paha_kiri = new MyObject(d_sphere4[0],d_sphere4[1],shader_vertex_source,shader_fragment_source); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kanan1 = new MyObject(d_spheres[0],d_spheres[1],shader_vertex_source,shader_fragment_source); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kanan2 = new MyObject(d_spheres[0],d_spheres[1],shader_vertex_source,shader_fragment_source); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kanan3 = new MyObject(d_spheres[0],d_spheres[1],shader_vertex_source,shader_fragment_source); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kiri1 = new MyObject(d_spheres[0],d_spheres[1],shader_vertex_source,shader_fragment_source); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kiri2 = new MyObject(d_spheres[0],d_spheres[1],shader_vertex_source,shader_fragment_source); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kiri3 = new MyObject(d_spheres[0],d_spheres[1],shader_vertex_source,shader_fragment_source); //sbnrnya bisa pake 1 objek trs ditranslate
  
  var duck_lengan_kanan = new MyObject(d_tabung[0],d_tabung[1],shader_vertex_source,shader_fragment_source);
  var duck_tangan_kanan = new MyObject(d_halfsphere[0],d_halfsphere[1],shader_vertex_source,shader_fragment_source);
  var duck_lengan_kiri = new MyObject(d_tabung[0],d_tabung[1],shader_vertex_source,shader_fragment_source);
  var duck_tangan_kiri = new MyObject(d_halfsphere[0],d_halfsphere[1],shader_vertex_source,shader_fragment_source);

  duck_badan.addChild(duck_mata_kanan);
  duck_badan.addChild(duck_mata_kiri);
  duck_badan.addChild(duck_baju);
  duck_badan.addChild(duck_topi); 
  duck_badan.addChild(duck_alastopi); 
  duck_badan.addChild(duck_kerah);

  duck_badan.addChild(duck_paha_kanan);
  duck_badan.addChild(duck_paha_kiri);
  duck_badan.addChild(duck_jari_kanan1); duck_badan.addChild(duck_jari_kanan2); duck_badan.addChild(duck_jari_kanan3);
  duck_badan.addChild(duck_jari_kiri1); duck_badan.addChild(duck_jari_kiri2); duck_badan.addChild(duck_jari_kiri3);
  duck_badan.addChild(duck_lengan_kanan);
  duck_badan.addChild(duck_lengan_kiri);
  duck_badan.addChild(duck_tangan_kanan);
  duck_badan.addChild(duck_tangan_kiri);

  duck_arrOfObjects.forEach(obj => {
    duck_badan.addChild(obj);
  });
  duck_arrOfObjects2.forEach(obj => {
    duck_badan.addChild(obj);
  });

  //load texture 
  duck_badan.loadTexturee("resources/duckcolor.png");
  duck_badan.child[0].loadTexturee("resources/wall.jpg"); //mata
  duck_badan.child[1].loadTexturee("resources/wall.jpg");
  duck_badan.child[2].loadTexturee("resources/baju.png"); //duck_baju 
  duck_badan.child[3].loadTexturee("resources/baju.png"); //duck_topi 
  duck_badan.child[3].loadTexturee("resources/topi.png"); //duck_topi 
  duck_badan.child[4].loadTexturee("resources/topi.png"); //alas duck_topi 
  duck_badan.child[5].loadTexturee("resources/bajukerah.png"); //duck_kerah duck_baju 
  duck_badan.child[6].loadTexturee("resources/duckcolor.png"); //paha  
  duck_badan.child[7].loadTexturee("resources/duckcolor.png"); //paha  
  duck_badan.child[8].loadTexturee("resources/kakimulut.png"); //jari 
  duck_badan.child[9].loadTexturee("resources/kakimulut.png"); //jari 
  duck_badan.child[10].loadTexturee("resources/kakimulut.png"); //jari 
  duck_badan.child[11].loadTexturee("resources/kakimulut.png"); //jari 
  duck_badan.child[12].loadTexturee("resources/kakimulut.png"); //jari 
  duck_badan.child[13].loadTexturee("resources/kakimulut.png"); //jari 
  duck_badan.child[14].loadTexturee("resources/baju.png"); //lengan 
  duck_badan.child[15].loadTexturee("resources/baju.png"); //lengan 
  duck_badan.child[16].loadTexturee("resources/kakimulut.png"); //tangan
  duck_badan.child[17].loadTexturee("resources/kakimulut.png"); //tangan
  for (let i = 18; i < duck_arrOfObjects.length+18; i++) { //mulut atas
    duck_badan.child[i].loadTexturee("resources/kakimulut.png"); 
  }
  for (let i = 38; i < duck_arrOfObjects.length+38; i++) { //mulut bawah
    duck_badan.child[i].loadTexturee("resources/kakimulut.png"); 
  }

  /*========================= MATRIX ========================= */

  var PROJMATRIX = LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
  var VIEWMATRIX = LIBS.get_I4();

  LIBS.translateZ(VIEWMATRIX, -25); //ubah view
  var THETA = 0,
      PHI = 0;

  /*========================= DRAWING ========================= */
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(1.0, 0.0, 0.0, 0.0);
  GL.clearDepth(1.0);

  var time_prev = 0;
  var rotationAngleY = 0;
  var blinkSpeed = 0.003;
  var blinkScale = 0.3;
  var idx_body =0;
  var temp = 0;
  var rotateBody = [0.05,-0.05]; //array derajat rotasi
  var degree = 0;
  let jalan = true;
  let durasiRotate = 550; // Durasi rotasi untuk setiap derajat dalam milidetik
  var rotateObjects = [
    { object: duck_jari_kanan1, rotation: 0.01 },
    { object: duck_jari_kanan2, rotation: 0.01 },
    { object: duck_jari_kanan3, rotation: 0.01 },
    { object: duck_jari_kiri1, rotation: 0.01 },
    { object: duck_jari_kiri2, rotation: 0.01 },
    { object: duck_jari_kiri3, rotation: 0.01 }
];

  var animate = function(time) {
    var dt = time - time_prev;
    if (!drag) {
      dX *= AMORTIZATION, dY *= AMORTIZATION;
      THETA += dX, PHI += dY; //derajat x,y
    }
    duck_badan.MOVEMATRIX = glMatrix.mat4.create();

    //ANIMASI duck_badan DUCK 
    let i_currentRotate = Math.floor(time / durasiRotate) % rotateBody.length;
    let progress = (time % durasiRotate) / durasiRotate;
    let currentRotation = rotateBody[i_currentRotate];
    let i_nextRotate = (i_currentRotate + 1) % rotateBody.length;
    let nextRotation = rotateBody[i_nextRotate];
    let interpolatedRotation = currentRotation + (nextRotation - currentRotation) * progress;

    //rotasi cara libs
    var tx=0 , ty=0, tz=0;
    duck_badan.setIdentityMove();
    duck_badan.setRotateMove(PHI,THETA,0); 
    duck_badan.setTranslateMove(tx,ty,tz);
    for (let i = 0; i < duck_badan.child.length; i++) {
      duck_badan.child[i].setIdentityMove();
      duck_badan.child[i].setRotateMove(PHI,interpolatedRotation-(88*Math.PI/180),interpolatedRotation);
      duck_badan.child[i].setTranslateMove(tx,ty,tz);
    }

  // TRANSLASI, ROTASI===========================================================
  
    glMatrix.mat4.translate(duck_mata_kanan.MOVEMATRIX, duck_mata_kanan.MOVEMATRIX, [0.2,0.5,0.76]); //xyz
    glMatrix.mat4.translate(duck_mata_kiri.MOVEMATRIX, duck_mata_kiri.MOVEMATRIX, [-0.2,0.5,0.76]); //xyz
    
    glMatrix.mat4.rotateX(duck_alastopi.MOVEMATRIX,duck_alastopi.MOVEMATRIX,Math.PI/2);
    glMatrix.mat4.translate(duck_alastopi.MOVEMATRIX, duck_alastopi.MOVEMATRIX, [0,0,0-0.75]);
    //TANGAN KANAN
    glMatrix.mat4.rotateX(duck_lengan_kanan.MOVEMATRIX,duck_lengan_kanan.MOVEMATRIX,Math.PI/2);
    glMatrix.mat4.rotateY(duck_lengan_kanan.MOVEMATRIX,duck_lengan_kanan.MOVEMATRIX,Math.PI/5);
    glMatrix.mat4.translate(duck_lengan_kanan.MOVEMATRIX, duck_lengan_kanan.MOVEMATRIX, [0.394+0.09,-0.12,-0.001+0.718]);

    glMatrix.mat4.rotateZ(duck_tangan_kanan.MOVEMATRIX,duck_tangan_kanan.MOVEMATRIX,-Math.PI/1.20);
    glMatrix.mat4.translate(duck_tangan_kanan.MOVEMATRIX, duck_tangan_kanan.MOVEMATRIX, [-0.55,0.9,-0.1]);
    //TANGAN KIRI
    glMatrix.mat4.rotateX(duck_lengan_kiri.MOVEMATRIX,duck_lengan_kiri.MOVEMATRIX,Math.PI/2);
    glMatrix.mat4.rotateY(duck_lengan_kiri.MOVEMATRIX,duck_lengan_kiri.MOVEMATRIX,-Math.PI/5);
    glMatrix.mat4.translate(duck_lengan_kiri.MOVEMATRIX, duck_lengan_kiri.MOVEMATRIX, [-(0.394+0.09),(-0.12),(-0.001+0.718)]);

    glMatrix.mat4.rotateZ(duck_tangan_kiri.MOVEMATRIX,duck_tangan_kiri.MOVEMATRIX,Math.PI/1.20);
    glMatrix.mat4.translate(duck_tangan_kiri.MOVEMATRIX, duck_tangan_kiri.MOVEMATRIX, [-(-0.55),(0.9),(-0.1)]);
    
    //KAKI
    glMatrix.mat4.translate(duck_paha_kanan.MOVEMATRIX, duck_paha_kanan.MOVEMATRIX, [0.3833333333,-0.5,0]);
    glMatrix.mat4.translate(duck_paha_kiri.MOVEMATRIX, duck_paha_kiri.MOVEMATRIX, [-0.3833333333,-0.5,0]);
    //JARI KANAN
    glMatrix.mat4.translate(duck_jari_kanan1.MOVEMATRIX, duck_jari_kanan1.MOVEMATRIX, [0.3833333333,-0.96,0.1666666667]);
    glMatrix.mat4.translate(duck_jari_kanan2.MOVEMATRIX, duck_jari_kanan2.MOVEMATRIX, [0.3833333333+0.1,-0.96,0.1666666667]);
    glMatrix.mat4.rotateY(duck_jari_kanan2.MOVEMATRIX,duck_jari_kanan2.MOVEMATRIX,Math.PI/22.5);
    glMatrix.mat4.translate(duck_jari_kanan3.MOVEMATRIX, duck_jari_kanan3.MOVEMATRIX, [0.3833333333-0.1,-0.96,0.1666666667]);
    glMatrix.mat4.rotateY(duck_jari_kanan3.MOVEMATRIX,duck_jari_kanan3.MOVEMATRIX,-Math.PI/22.5);
    // JARI KIRI
    glMatrix.mat4.translate(duck_jari_kiri1.MOVEMATRIX, duck_jari_kiri1.MOVEMATRIX, [-0.3833333333,-0.96,0.1666666667]);
    glMatrix.mat4.translate(duck_jari_kiri2.MOVEMATRIX, duck_jari_kiri2.MOVEMATRIX, [-0.3833333333+0.1,-0.96,0.1666666667]);
    glMatrix.mat4.rotateY(duck_jari_kiri2.MOVEMATRIX,duck_jari_kiri2.MOVEMATRIX,Math.PI/22.5);
    glMatrix.mat4.translate(duck_jari_kiri3.MOVEMATRIX, duck_jari_kiri3.MOVEMATRIX, [-0.3833333333-0.1,-0.96,0.1666666667]);
    glMatrix.mat4.rotateY(duck_jari_kiri3.MOVEMATRIX,duck_jari_kiri3.MOVEMATRIX,-Math.PI/22.5);

    // let rot = glMatrix.quat.fromEuler(glMatrix.quat.create(),0, 0, 0);
    // let trans = glMatrix.vec3.fromValues(0,0,0-1); //vektor translasi xyz
    // let scale = glMatrix.vec3.fromValues(1, 1, 1); //vektor scale
    // let ori = glMatrix.vec3.fromValues(0, 0, 1); //titik origin
    // // Membuat matriks transformasi dari rotasi, translasi, penskalaan, dan origin
    // glMatrix.mat4.fromRotationTranslationScaleOrigin(duck_alastopi.MOVEMATRIX, rot, trans, scale, ori);

  // PERGERAKAN ========================
  if(Math.sin(time * blinkSpeed) >0){
    // mata kanan
    let blinkValue = 0.2 + Math.abs(Math.sin(time * blinkSpeed)) * (1 - blinkScale);
    glMatrix.mat4.rotateY(duck_mata_kanan.MOVEMATRIX, duck_mata_kanan.MOVEMATRIX, rotationAngleY);
    glMatrix.mat4.scale(duck_mata_kanan.MOVEMATRIX, duck_mata_kanan.MOVEMATRIX, [1, blinkValue, 1]);

    // mata kiri 
    glMatrix.mat4.rotateY(duck_mata_kiri.MOVEMATRIX, duck_mata_kiri.MOVEMATRIX, rotationAngleY);
    glMatrix.mat4.scale(duck_mata_kiri.MOVEMATRIX, duck_mata_kiri.MOVEMATRIX, [1, blinkValue, 1]);
  }

  if(jalan){
    glMatrix.mat4.rotateX(duck_paha_kanan.MOVEMATRIX, duck_paha_kanan.MOVEMATRIX, degree);
    glMatrix.mat4.rotateX(duck_paha_kiri.MOVEMATRIX, duck_paha_kiri.MOVEMATRIX, degree+45);
    degree += 0.021;
    degree = degree %90;
    for (let i = 0; i < rotateObjects.length; i++) { //rotasi jari kaki 
      let obj = rotateObjects[i].object;
      let rotation = rotateObjects[i].rotation;

      // Menghitung interpolasi rotasi untuk objek saat ini
      let interpolatedRotation = rotation + (nextRotation - rotation) * progress;
      glMatrix.mat4.rotateX(obj.MOVEMATRIX, obj.MOVEMATRIX, interpolatedRotation);//merotasi objek dengan transformasi matrix
    } 
  }

  //   // rotasi objek thdp xyz tsb ??tpi nggeser, dah bisa.. tpi childnya gatau
  //   var x=0.0,y=0.0, z=0;
  //   glMatrix.mat4.translate(duck_badan.MOVEMATRIX, duck_badan.MOVEMATRIX, [x,y,z]); //berlaku buat yg 0,0,0 aja
  //   glMatrix.mat4.rotateX(duck_badan.MOVEMATRIX,duck_badan.MOVEMATRIX,PHI);
  //   glMatrix.mat4.rotateY(duck_badan.MOVEMATRIX,duck_badan.MOVEMATRIX,THETA);
  //   glMatrix.mat4.translate(duck_badan.MOVEMATRIX, duck_badan.MOVEMATRIX, [-x,-y,z]);

  //   // glMatrix.mat4.translate(duck_badan.child[0].MOVEMATRIX, duck_badan.MOVEMATRIX, [x+0.2,y+0.5,z+0.76]);
  //   // glMatrix.mat4.rotateX(duck_badan.child[0].MOVEMATRIX,duck_badan.MOVEMATRIX,PHI);
  //   // glMatrix.mat4.rotateY(duck_badan.child[0].MOVEMATRIX,duck_badan.MOVEMATRIX,THETA);
  //   // glMatrix.mat4.translate(duck_badan.child[0].MOVEMATRIX, duck_badan.MOVEMATRIX, [-x+0.2,-y+0.5,-z+0.76]);

  //   // TRANSLATE SELURUH OBJECT ================================================
    // var tx=1 , ty=0, tz=0;
    // duck_badan.setTranslateMove(tx,ty,tz);
    // for (let i = 0; i < duck_badan.child.length; i++) {
    //   // duck_badan.child[i].setIdentityMove();
    //   duck_badan.child[i].setRotateMove(PHI,THETA,0);
    //   duck_badan.child[i].setTranslateMove(tx,ty,tz);
    // }

    
    
    time_prev = time;

    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    duck_badan.setuniformmatrix4(PROJMATRIX,VIEWMATRIX); //setUniform trmsk child
    duck_badan.draw();

    GL.flush();

    window.requestAnimationFrame(animate);
  };
  animate();
}

window.addEventListener('load', main);