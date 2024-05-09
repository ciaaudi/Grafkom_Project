// const { temp } = require("three/examples/jsm/nodes/Nodes.js");

/*========================= GET WEBGL CONTEXT ========================= */
var GL;
function generateTabung2(posx, posy, posz, r, t) {
  //pos x,y,z, r, t, segment
  var tabung_vertex = [];
  numSegments = 362;
  for (var i = 0; i <= numSegments; i++) {
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = 0 + posz;
    tabung_vertex.push(x);
    tabung_vertex.push(y);
    tabung_vertex.push(z);
    tabung_vertex.push((i * 1.0) / numSegments);
    tabung_vertex.push((i * 1.0) / numSegments);
  }
  for (var i = 0; i <= numSegments; i++) {
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = t + posz;
    tabung_vertex.push(x);
    tabung_vertex.push(y);
    tabung_vertex.push(z);
    tabung_vertex.push((i * 1.0) / numSegments);
    tabung_vertex.push((i * 1.0) / numSegments);
  }

  var tabung_face = [];
  //lingkaran bawah
  for (var i = 0; i <= numSegments; i++) {
    tabung_face.push(i);
    tabung_face.push(i + 1);
    tabung_face.push(0);
  }
  //lingkaran atas
  for (var i = 0; i <= numSegments; i++) {
    tabung_face.push(363 + i);
    tabung_face.push(364 + i);
    tabung_face.push(724);
  }
  for (var i = 0; i <= numSegments; i++) {
    tabung_face.push(i);
    tabung_face.push(i + 1);
    tabung_face.push(i + 363);

    tabung_face.push(i + 1);
    tabung_face.push(i + 363);
    tabung_face.push(i + 364);
  }
  return [tabung_vertex, tabung_face];
}
function generateTorus(posx, posy, posz, rxy, rz, minorRadius, majorRadius) {
  //pos xyz,
  //radius torus,
  //radius lingkaran,
  //minorR : ketebalan
  //majorR : lebar
  var vertices = [];
  // x, y, z, xy  -> posisi vertex

  var sector = 30;
  var side = 7; //kyk stack
  var sectorStep = (2 * Math.PI) / sector;
  var sideStep = (2 * Math.PI) / side;

  for (var i = 0; i <= side; ++i) {
    // angle side (u)
    var u = Math.PI - i * sideStep; //dri 180 smpe -180
    var xy = minorRadius * Math.cos(u); // r * cos(u)
    var z = rz * minorRadius * Math.sin(u) + posz; // r * sin(u)

    for (var j = 0; j <= sector; ++j) {
      // angle sector (v)
      var v = j * sectorStep; //dri 0-360
      var x = rxy * xy * Math.cos(v) + posx;
      var y = rxy * xy * Math.sin(v) + posy;

      x += majorRadius * Math.cos(v); // (R + r * cos(u)) * cos(v)
      y += majorRadius * Math.sin(v); // (R + r * cos(u)) * sin(v)
      vertices.push(x);
      vertices.push(y);
      vertices.push(z);
      vertices.push((j * 1.0) / sector); // UV U-coordinate => x
      vertices.push((i * 1.0) / side); // UV V-coordinate => y
    }
  }

  var faces = [];
  for (var i = 0; i < side; ++i) {
    var k1 = i * (sector + 1);
    var k2 = k1 + sector + 1;

    for (var j = 0; j < sector; ++j, ++k1, ++k2) {
      faces.push(k1);
      faces.push(k2);
      faces.push(k1 + 1);
      faces.push(k1 + 1);
      faces.push(k2);
      faces.push(k2 + 1);
    }
  }
  return [vertices, faces];
}
function generateKerah(posx, posy, posz, rx, ry, rz, step, stack) {
  //pos x,yz  rx,ry,rz, step,stack
  // Create a d_sphere object with the given parameters
  var vertices = [];
  for (var i = 20; i <= stack; i++) {
    var u = (i / stack) * Math.PI;

    for (var j = 0; j <= step; j++) {
      var v = (j / step) * 2 * Math.PI;

      var x = Math.cos(v) * Math.sin(u) * rx + posx;
      var y = Math.cos(u) * ry + posy;
      var z = Math.sin(v) * Math.sin(u) * rz + posz;

      vertices.push(x); // X Coordinate
      vertices.push(y); // Y Coordinate
      vertices.push(z); // Z Coordinate
      vertices.push((j * 1.0) / step); // UV U-coordinate => x
      vertices.push((i * 1.0) / stack); // UV V-coordinate => y
    }
  }

  var faces = [];
  for (var i = 27; i < stack / 3; i++) {
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
function generateTopi(posx, posy, posz, rx, ry, rz, step, stack) {
  //pos x,yz  rx,ry,rz, step,stack
  // Create a d_sphere object with the given parameters
  var vertices = [];
  for (var i = 0; i <= stack / 4; i++) {
    var u = (i / stack) * Math.PI;

    for (var j = 0; j <= step; j++) {
      var v = (j / step) * 2 * Math.PI;

      var x = Math.cos(v) * Math.sin(u) * rx + posx;
      var y = Math.cos(u) * ry + posy;
      var z = Math.sin(v) * Math.sin(u) * rz + posz;

      vertices.push(x); // X Coordinate
      vertices.push(y); // Y Coordinate
      vertices.push(z); // Z Coordinate
      vertices.push((j * 1.0) / step); // UV U-coordinate => x
      vertices.push((i * 1.0) / stack); // UV V-coordinate => y
    }
  }

  var faces = [];
  for (var i = 0; i < stack / 4; i++) {
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
function generateBaju(posx, posy, posz, rx, ry, rz, step, stack) {
  //pos x,yz  rx,ry,rz, step,stack
  // Create a d_sphere object with the given parameters
  var vertices = [];
  for (var i = 20; i <= stack; i++) {
    var u = (i / stack) * Math.PI;

    for (var j = 0; j <= step; j++) {
      var v = (j / step) * 2 * Math.PI;

      var x = Math.cos(v) * Math.sin(u) * rx + posx;
      var y = Math.cos(u) * ry + posy;
      var z = Math.sin(v) * Math.sin(u) * rz + posz;

      vertices.push(x); // X Coordinate
      vertices.push(y); // Y Coordinate
      vertices.push(z); // Z Coordinate
      vertices.push((j * 1.0) / step); // UV U-coordinate => x
      vertices.push((i * 1.0) / stack); // UV V-coordinate => y
    }
  }

  var faces = [];
  for (var i = 30; i < stack / 1.7; i++) {
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
function generateHalfSphere(posx, posy, posz, rx, ry, rz, step, stack, div_) {
  //pos x,yz  rx,ry,rz, step,stack
  // Create a sphere object with the given parameters
  var vertices = [];
  for (var i = 0; i <= stack / div_; i++) {
    var u = (i / stack) * Math.PI;

    for (var j = 0; j <= step; j++) {
      var v = (j / step) * 2 * Math.PI;

      var x = Math.cos(v) * Math.sin(u) * rx + posx;
      var y = Math.cos(u) * ry + posy;
      var z = Math.sin(v) * Math.sin(u) * rz + posz;

      vertices.push(x); // X Coordinate
      vertices.push(y); // Y Coordinate
      vertices.push(z); // Z Coordinate
      vertices.push((j * 1.0) / step); // UV U-coordinate => x
      vertices.push((i * 1.0) / stack); // UV V-coordinate => y
    }
  }

  var faces = [];
  for (var i = 0; i < stack / div_; i++) {
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

function generateKerucut(posx, posy, posz, r, numSegments) {
  //pos x,y,z, r,  segment
  var kerucut_vertex = [];
  for (var i = 0; i <= numSegments; i++) {
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = -1 + posz;
    kerucut_vertex.push(x);
    kerucut_vertex.push(y);
    kerucut_vertex.push(z);
    kerucut_vertex.push((i * 1.0) / numSegments);
    kerucut_vertex.push((i * 1.0) / numSegments);
  }
  for (var i = 0; i <= numSegments; i++) {
    kerucut_vertex.push(0);
    kerucut_vertex.push(0);
    kerucut_vertex.push(-2);
    kerucut_vertex.push((i * 1.0) / numSegments);
    kerucut_vertex.push((i * 1.0) / numSegments);
  }

  var kerucut_face = [];
  // alas lingkaran
  for (var i = 0; i <= numSegments; i++) {
    kerucut_face.push(i);
    kerucut_face.push(i + 1);
    kerucut_face.push(0);
  }
  // selimut kerucut
  for (var i = 0; i <= numSegments; i++) {
    kerucut_face.push(i);
    kerucut_face.push(i + 1);
    kerucut_face.push(364);
  }
  return [kerucut_vertex, kerucut_face];
}

function generateLingkaran(posx, posy, posz, r) {
  var circle_vertex = [];
  numSegments = 362;
  for (var i = 0; i <= numSegments; i++) {
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = 0 + posz;
    circle_vertex.push(x);
    circle_vertex.push(y);
    circle_vertex.push(z);
    circle_vertex.push((i * 1.0) / numSegments);
    circle_vertex.push((i * 1.0) / numSegments);
  }
  var circle_face = [];
  for (var i = 0; i <= numSegments; i++) {
    circle_face.push(i);
    circle_face.push(i + 1);
    circle_face.push(0);
  }
  return [circle_vertex, circle_face];
}

function generateTabung(posx, posy, posz, r, t) {
  //pos x,y,z, r, t, segment
  var tabung_vertex = [];
  numSegments = 362;
  for (var i = 0; i <= numSegments; i++) {
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = posz - t / 2;
    tabung_vertex.push(x);
    tabung_vertex.push(y);
    tabung_vertex.push(z);
    tabung_vertex.push((i * 1.0) / numSegments);
    tabung_vertex.push((i * 1.0) / numSegments);
  }
  for (var i = 0; i <= numSegments; i++) {
    var theta = (i / numSegments) * (2 * Math.PI);
    var x = r * Math.cos(theta) + posx;
    var y = r * Math.sin(theta) + posy;
    var z = t / 2 + posz;
    tabung_vertex.push(x);
    tabung_vertex.push(y);
    tabung_vertex.push(z);
    tabung_vertex.push((i * 1.0) / numSegments);
    tabung_vertex.push((i * 1.0) / numSegments);
  }

  var tabung_face = [];
  //lingkaran bawah
  for (var i = 0; i <= numSegments; i++) {
    tabung_face.push(i);
    tabung_face.push(i + 1);
    tabung_face.push(0);
  }
  //lingkaran atas
  for (var i = 0; i <= numSegments; i++) {
    tabung_face.push(363 + i);
    tabung_face.push(364 + i);
    tabung_face.push(724);
  }
  for (var i = 0; i <= numSegments; i++) {
    tabung_face.push(i);
    tabung_face.push(i + 1);
    tabung_face.push(i + 363);

    tabung_face.push(i + 1);
    tabung_face.push(i + 363);
    tabung_face.push(i + 364);
  }
  return [tabung_vertex, tabung_face];
}

function generateHidung(posx, posy, posz, a, t, tb) {
  //pos x,y,z, r, t, segment
  var tabung_vertex = [];
  // titik bawah
  tabung_vertex.push(posx);
  tabung_vertex.push(posy);
  tabung_vertex.push(posz);
  tabung_vertex.push((1 * 1.0) / numSegments);
  tabung_vertex.push((1 * 1.0) / numSegments);

  // titik kanan atas
  tabung_vertex.push(posx + 0.5 * a);
  tabung_vertex.push(posy + t);
  tabung_vertex.push(posz);
  tabung_vertex.push((1 * 1.0) / numSegments);
  tabung_vertex.push((1 * 1.0) / numSegments);

  // titik kiri atas
  tabung_vertex.push(posx - 0.5 * a);
  tabung_vertex.push(posy + t);
  tabung_vertex.push(posz);
  tabung_vertex.push((1 * 1.0) / numSegments);
  tabung_vertex.push((1 * 1.0) / numSegments);

  // titik bawah blkg
  tabung_vertex.push(posx);
  tabung_vertex.push(posy);
  tabung_vertex.push(posz - tb);
  tabung_vertex.push((1 * 1.0) / numSegments);
  tabung_vertex.push((1 * 1.0) / numSegments);

  // titik kanan atas blkg
  tabung_vertex.push(posx + 0.5 * a);
  tabung_vertex.push(posy + t);
  tabung_vertex.push(posz - tb);
  tabung_vertex.push((1 * 1.0) / numSegments);
  tabung_vertex.push((1 * 1.0) / numSegments);

  // titik kiri atas blkg
  tabung_vertex.push(posx - 0.5 * a);
  tabung_vertex.push(posy + t);
  tabung_vertex.push(posz - tb);
  tabung_vertex.push((1 * 1.0) / numSegments);
  tabung_vertex.push((1 * 1.0) / numSegments);

  var tabung_face = [];
  //segi3 atas
  tabung_face.push(0);
  tabung_face.push(1);
  tabung_face.push(2);
  tabung_face.push(3);
  tabung_face.push(4);
  tabung_face.push(5);

  tabung_face.push(5);
  tabung_face.push(4);
  tabung_face.push(3);
  //sisi 1
  tabung_face.push(0);
  tabung_face.push(3);
  tabung_face.push(1);
  tabung_face.push(1);
  tabung_face.push(3);
  tabung_face.push(4);
  // sisi 2
  tabung_face.push(1);
  tabung_face.push(4);
  tabung_face.push(2);
  tabung_face.push(2);
  tabung_face.push(4);
  tabung_face.push(5);
  // sisi 3
  tabung_face.push(2);
  tabung_face.push(5);
  tabung_face.push(0);
  tabung_face.push(0);
  tabung_face.push(5);
  tabung_face.push(3);
  return [tabung_vertex, tabung_face];
}

function generateSphere(posx, posy, posz, rx, ry, rz, step, stack) {
  //pos x,yz  rx,ry,rz, step,stack
  var vertices = [];
  for (var i = 0; i <= stack; i++) {
    var u = (i / stack) * Math.PI;

    for (var j = 0; j <= step; j++) {
      var v = (j / step) * 2 * Math.PI;

      var x = rx * Math.cos(v) * Math.sin(u) + posx;
      var y = ry * Math.cos(u) + posy;
      var z = rz * Math.sin(v) * Math.sin(u) + posz;

      vertices.push(x); // X Coordinate
      vertices.push(y); // Y Coordinate
      vertices.push(z); // Z Coordinate
      vertices.push((j * 1.0) / step); // UV U-coordinate => x
      vertices.push((i * 1.0) / stack); // UV V-coordinate => y
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

function generateEkor(posx, posy, posz, rx, ry, rz, step, stack) {
  //generate titik 1/5 lingkaran
  var titik = [];
  for (var i = 0; i <= stack; i++) {
    var u = (i / stack) * Math.PI;

    for (var j = 0; j <= step; j++) {
      var v = (j / step) * 2 * Math.PI;

      var x = 0;
      var y = ry * Math.cos(u) + posy;
      var z = rz * Math.sin(v) * Math.sin(u) + posz;

      titik.push(x); // X Coordinate
      titik.push(y); // Y Coordinate
      titik.push(z); // Z Coordinate
    }
  }

  //buat lingkaran per titik
  var vertices = [];
  for (var i = 0; i <= stack; i++) {
    var u = (i / stack) * Math.PI;

    for (var j = 0; j <= step; j++) {
      var v = (j / step) * 2 * Math.PI;

      var x = rx * Math.cos(v) * Math.sin(u) + posx;
      var y = ry * Math.cos(u) + posy;
      var z = rz * Math.sin(v) * Math.sin(u) + posz;

      vertices.push(x); // X Coordinate
      vertices.push(y); // Y Coordinate
      vertices.push(z); // Z Coordinate
      vertices.push((j * 1.0) / step); // UV U-coordinate => x
      vertices.push((i * 1.0) / stack); // UV V-coordinate => y
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

class MyObject {
  CANVAS = document.getElementById("mycanvas");
  cube_vertex = [];
  CUBE_VERTEX;
  cube_faces = [];
  CUBE_FACES;
  shader_vertex_source = null;
  shader_fragment_source = null;

  MOVEMATRIX = LIBS.get_I4();

  child = [];

  compile_shader = function (source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert(
        "ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader)
      );
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

  constructor(cube_vertex, cube_faces, shader_vertex, shader_fragment) {
    this.cube_vertex = cube_vertex;
    this.cube_faces = cube_faces;
    this.shader_vertex_source = shader_vertex;
    this.shader_fragment_source = shader_fragment;

    this.shader_vertex = this.compile_shader(
      this.shader_vertex_source,
      GL.VERTEX_SHADER,
      "VERTEX"
    );
    this.shader_fragment = this.compile_shader(
      this.shader_fragment_source,
      GL.FRAGMENT_SHADER,
      "FRAGMENT"
    );

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

    this.CUBE_VERTEX = GL.createBuffer();
    this.CUBE_FACES = GL.createBuffer();

    GL.bindBuffer(GL.ARRAY_BUFFER, this.CUBE_VERTEX);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(this.cube_vertex),
      GL.STATIC_DRAW
    );

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.CUBE_FACES);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.cube_faces),
      GL.STATIC_DRAW
    );

    // this.cube_texture = LIBS.loadTexture("ressource/wall.jpg");
  }
  setuniformmatrix4(PROJMATRIX, VIEWMATRIX) {
    GL.useProgram(this.SHADER_PROGRAM);
    GL.uniformMatrix4fv(this._Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(this._Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(this._Mmatrix, false, this.MOVEMATRIX);
    for (let i = 0; i < this.child.length; i++) {
      this.child[i].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    }
  }
  draw() {
    GL.useProgram(this.SHADER_PROGRAM);
    GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_2D, this.cube_texture);

    GL.bindBuffer(GL.ARRAY_BUFFER, this.CUBE_VERTEX);
    GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 4 * (3 + 2), 0);
    GL.vertexAttribPointer(this._color, 2, GL.FLOAT, false, 4 * (3 + 2), 3 * 4);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.CUBE_FACES);
    GL.drawElements(
      GL.TRIANGLE_STRIP,
      this.cube_faces.length,
      GL.UNSIGNED_SHORT,
      0
    );
    // GL.drawElements(GL.LINE_STRIP, this.cube_faces.length, GL.UNSIGNED_SHORT, 0);

    for (let i = 0; i < this.child.length; i++) {
      this.child[i].draw();
    }
  }
  getMoveMatrix() {
    return this.MOVEMATRIX;
  }

  setRotateMove(phi, theta, r) {
    //kembali ke titik 0,0,0
    LIBS.rotateZ(this.MOVEMATRIX, r);
    LIBS.rotateY(this.MOVEMATRIX, theta);
    LIBS.rotateX(this.MOVEMATRIX, phi);
  }
  setTranslateMove(x, y, z) {
    LIBS.translateZ(this.MOVEMATRIX, z);
    LIBS.translateY(this.MOVEMATRIX, y);
    LIBS.translateX(this.MOVEMATRIX, x);
  }
  setIdentityMove() {
    LIBS.set_I4(this.MOVEMATRIX);
  }
  addChild(child) {
    this.child.push(child);
  }
  loadTexturee(filename) {
    //menerima string
    this.cube_texture = LIBS.loadTexture(filename);
  }
  translateAll(tx, ty, tz) {
    for (let i = 0; i < this.child.length; i++) {
      this.child[i].MOVEMATRIX = glMatrix.mat4.create();
      glMatrix.mat4.translate(
        this.child[i].MOVEMATRIX,
        this.child[i].MOVEMATRIX,
        [tx, ty, tz]
      );
    }
  }

  setRotateX(phi) {
    LIBS.rotateX(this.MOVEMATRIX, phi);
  }

  setRotateY(theta) {
    LIBS.rotateY(this.MOVEMATRIX, theta);
  }

  setRotateZ(r) {
    LIBS.rotateZ(this.MOVEMATRIX, r);
  }

  rotateAll(phi, theta, r) {
    for (let i = 0; i < this.child.length; i++) {
      //ROTASI COBA
      this.child[i].MOVEMATRIX = glMatrix.mat4.create();
      glMatrix.mat4.rotateX(
        this.child[i].MOVEMATRIX,
        this.child[i].MOVEMATRIX,
        phi
      );
      glMatrix.mat4.rotateY(
        this.child[i].MOVEMATRIX,
        this.child[i].MOVEMATRIX,
        theta
      );
      // glMatrix.mat4.rotateZ(this.child[i].MOVEMATRIX, this.child[i].MOVEMATRIX, r);
    }
  }
  scaleAll(node, parentMatrix, scale) {
    // Mengalikan matriks skala objek dengan matriks transformasi induk
    const modelMatrix = mat4.create();
    mat4.multiply(modelMatrix, parentMatrix, node.localMatrix);

    // Menyesuaikan dengan faktor skala
    mat4.scale(modelMatrix, modelMatrix, scale);

    // Menyimpan matriks transformasi yang baru
    node.worldMatrix = modelMatrix;

    // Jika objek memiliki anak-anak, rekursif terapkan perubahan pada anak-anaknya
    if (node.children) {
      node.children.forEach((child) => {
        scaleAll(child, modelMatrix, scale);
      });
    }
  }
}
function main() {
  var CANVAS = document.getElementById("mycanvas");
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
  try {
    GL = CANVAS.getContext("webgl", { antialias: true });
  } catch (e) {
    alert("WebGL context cannot be initialized");
    return false;
  }

  /*========================= CAPTURE MOUSE EVENTS ========================= */

  var AMORTIZATION = 0.95;
  var drag = false;
  var x_prev, y_prev;

  var dX = 0,
    dY = 0;

  var keyboardDown = function (e) {
    if (e.key == "w" || e.key == "W") {
      //UP
      dY -= 0.05;
      w;
      LIBS.translateZ(VIEWMATRIX, dY); //ubah view
    }
    if (e.key == "a" || e.key == "A") {
      //LEFT
      // alert(e.key);
      dX -= 0.05;
    }
    if (e.key == "s" || e.key == "S") {
      //DOWN
      // alert(e.key);
      dY += 0.05;
    }
    if (e.key == "d" || e.key == "D") {
      //RIGHT
      // alert(e.key);
      dX += 0.05;
    }
  };

  var mouseDown = function (e) {
    drag = true;
    (x_prev = e.pageX), (y_prev = e.pageY);
    e.preventDefault();
    return false;
  };

  var mouseUp = function (e) {
    drag = false;
  };

  var mouseMove = function (e) {
    if (!drag) return false;
    (dX = ((e.pageX - x_prev) * 2 * Math.PI) / CANVAS.width),
      (dY = ((e.pageY - y_prev) * 2 * Math.PI) / CANVAS.height);
    THETA += dX;
    PHI += dY;
    (x_prev = e.pageX), (y_prev = e.pageY);
    e.preventDefault();
  };

  window.addEventListener("keydown", keyboardDown, false); //DOWN KEY

  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);

  /*========================= SHADERS ========================= */
  var shader_vertex_source =
    "\n\
  attribute vec3 position;\n\
  uniform mat4 Pmatrix, Vmatrix, Mmatrix;\n\
  attribute vec2 uv;\n\
  varying vec2 vUV;\n\
  \n\
  void main(void) {\n\
  gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.);\n\
  vUV=uv;\n\
  }";

  var shader_fragment_source =
    "\n\
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

  var world = generateSphere(0, 0, 0, 40, 40, 40, 30, 100);
  // badan
  var main_land = generateHalfSphere(0, 0, 0, 12, 12, 12, 30, 100, 2);
  var tutup_main = generateLingkaran(0, 0, 0, 12);
  var sphere_1 = generateSphere(0, 0, 0, 0.3, 0.3, 0.3, 20, 80);
  var sphere_2 = generateSphere(0, 0, 0, 0.7, 0.5, 0.7, 30, 100);
  var sphere_3 = generateSphere(0, 0, 0, 0.5, 0.7, 0.7, 30, 100);
  // pohon_batang pohon
  var pohon_tabung = generateTabung(0, 0, 0, 1, 5);
  // ujung tangan kaki
  var pohon_sphere = generateSphere(0, 0, 0, 1.5, 1.5, 1.5, 30, 100);

  // KEPALA
  var b_head = generateSphere(0, 0, 0, 1, 1, 1, 30, 100);
  // badan
  var b_body = generateSphere(0, 0, 0, 0.7, 0.7, 0.7, 30, 100);
  // mata kiri & kanan
  var b_mata = generateSphere(0, 0, 0, 0.15, 0.2, 0.15, 30, 100);
  // // telinga 1, 2 kanan kiri
  var b_telinga = generateSphere(0, 0, 0, 0.3, 0.5, 0.1, 30, 100);
  // kaki kanan kiri
  var b_kaki = generateTabung(0, 0, 0, 0.3, 1);
  // mulut
  var b_mulut = generateSphere(0, 0, 0, 0.25, 0.2, 0.2, 30, 100);
  // hidung
  var b_nose = generateSphere(0, 0, 0, 0.1, 0.1, 0.1, 30, 100);
  // wortel
  var b_wortel = generateKerucut(0, 0, 0, 0.2, 200);
  var b_tutup_wortel = generateSphere(0, 0, 0, 0.2, 0.2, 0.2, 30, 100);
  var b_daunwortel = generateSphere(0, 0, 0, 0.15, 0.2, 0.08, 30, 100);
  // tangan kiri
  var bunny_depth = 1;
  var bunny_x = 0.5;
  const bunny_controlPoints1 = [
    [-0.0390625 - bunny_x, 0.042735042735042694 - bunny_x, bunny_depth],
    [-0.0234375, 0.0461538461538461, bunny_depth],
    [-0.012499999999999956, 0.06666666666666665, bunny_depth],
    [0, 0.0461538461538461, bunny_depth],
  ];
  const bunny_numberOfPoints = 20;
  const bunny_bezierCurve1 = new Curve(
    bunny_controlPoints1,
    bunny_numberOfPoints
  );
  const bunny_curvePoints1 = bunny_bezierCurve1.getCurvePoints();
  const bunny_arrOfObjects = [];
  for (let i = 0; i < bunny_curvePoints1.length; i += 3) {
    bunny_rr = 0.06;
    temp = generateSphere(
      bunny_curvePoints1[i],
      bunny_curvePoints1[i + 1],
      bunny_curvePoints1[i + 2],
      bunny_rr,
      bunny_rr,
      bunny_rr,
      30,
      100
    );
    const bunny_temp_object = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    bunny_arrOfObjects.push(bunny_temp_object);
  }
  const bunny_controlPoints2 = [
    [0.0390625 - bunny_x, 0.042735042735042694 - bunny_x, bunny_depth],
    [0.0234375, 0.0461538461538461, bunny_depth],
    [0.012499999999999956, 0.06666666666666665, bunny_depth],
    [0, 0.0461538461538461, bunny_depth],
  ];
  const bunny_bezierCurve2 = new Curve(
    bunny_controlPoints2,
    bunny_numberOfPoints
  );
  const bunny_curvePoints2 = bunny_bezierCurve2.getCurvePoints();
  const bunny_arrOfObjects2 = [];
  for (let i = 0; i < bunny_curvePoints2.length; i += 3) {
    bunny_rr2 = 0.06;
    temp2 = generateSphere(
      bunny_curvePoints2[i],
      bunny_curvePoints2[i + 1],
      bunny_curvePoints2[i + 2],
      bunny_rr2,
      bunny_rr2,
      bunny_rr2,
      30,
      100
    );
    const bunny_temp_object = new MyObject(
      temp2[0],
      temp2[1],
      shader_vertex_source,
      shader_fragment_source
    );
    bunny_arrOfObjects2.push(bunny_temp_object);
  }

  var depth = 0.87,
    x = 0.05;
  //mulut atas
  const duck_controlPoints1 = [
    [-0.11354166666666665 - 2 * x, 0.2042328042328042 + x, depth], // P0
    [-0.06458333333333333, 0.22116402116402112 + x, depth], // P1
    [-0.021874999999999978, 0.22962962962962963 + x, depth], // P2
    [0.006250000000000089, 0.22962962962962963 + x, depth], // P3
    [0.05208333333333326, 0.22116402116402112 + x, depth], // P4
    [0.09895833333333326 + 2 * x, 0.2063492063492064 + x, depth], // P5
  ];

  //mulut bawah
  const duck_controlPoints2 = [
    [-0.08229166666666665 - 0.06, 0.19153439153439156, depth], // P0
    [-0.05104166666666665, 0.1788359788359788, depth], // P1
    [-0.019791666666666652, 0.17248677248677247, depth], // P2
    [0.01041666666666674, 0.17248677248677247, depth], // P3
    [0.04166666666666674, 0.1788359788359788, depth], // P4
    [0.07187499999999991 + 0.06, 0.19153439153439156, depth], // P5
  ];

  //akan dipanggil di main
  const duck_numberOfPoints = 20;
  const bezierCurve1 = new Curve(duck_controlPoints1, duck_numberOfPoints);
  const curvePoints1 = bezierCurve1.getCurvePoints(); //xyz
  // console.log(curvePoints1);
  const bezierCurve2 = new Curve(duck_controlPoints2, duck_numberOfPoints);
  const curvePoints2 = bezierCurve2.getCurvePoints(); //xyz

  const duck_arrOfObjects = [];
  for (let i = 0; i < curvePoints1.length; i += 3) {
    rr = 0.06;
    temp = generateSphere(
      curvePoints1[i],
      curvePoints1[i + 1],
      curvePoints1[i + 2], //pos xyz
      rr,
      rr,
      rr, //rx,ry,rz
      30,
      100
    ); //mereturn vertice & face
    const temp_object = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    duck_arrOfObjects.push(temp_object);
  }
  const duck_arrOfObjects2 = [];
  for (let i = 0; i < curvePoints2.length; i += 3) {
    rr = 0.04;
    temp = generateSphere(
      curvePoints2[i],
      curvePoints2[i + 1],
      curvePoints2[i + 2], //pos xyz
      rr,
      rr,
      rr, //rx,ry,rz
      30,
      100
    ); //mereturn vertice & face
    const temp_object = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    duck_arrOfObjects2.push(temp_object);
  }

  // duck_badan
  var d_sphere = generateSphere(
    0,
    0,
    0, //pos x,y,z
    0.909090909090909 - 0.05, //rx
    1 - 0.05, //ry
    0.9 - 0.05, //rz
    30, //step
    100
  ); //stack
  //BAJU
  var d_spherecover = generateBaju(
    0,
    0,
    0, //pos x,y,z
    0.909090909090909, //rx
    1, //ry
    0.9, //rz
    30, //step
    100
  ); //stack
  //TOPI
  var d_spherecover2 = generateTopi(
    0,
    0,
    0, //pos x,y,z
    1, //rx
    1, //ry
    0.9, //rz
    30, //step
    100
  ); //stack
  // var d_tabungalas = generateTabung(0,0,0, //pos x,y,z
  // 0.8, //radius
  // 0.05,); //t
  var d_tabungalas = generateTorus(
    0,
    0,
    0, //pos x,y,z
    0.6, //radius torus
    0.2, //radius lingkaran/tebal
    0.3, //r minor/ tebal
    0.76
  ); //r major/ lebar

  //MATA
  //kiri & kanan
  var d_sphere2 = generateSphere(
    0,
    0,
    0, //pos x,y,z
    0.05833333333, //rx
    0.075, //ry
    0.02916666667, //rz
    30, //step
    100
  ); //stack

  //KERAH BAJU
  var d_spherecover3 = generateKerah(
    0,
    0,
    0, //pos x,y,z
    0.909090909090909 + 0.02, //rx
    1 + 0.02, //ry
    0.9 + 0.02, //rz
    30, //step
    100
  ); //stack

  //KAKI
  var d_sphere4 = generateSphere(
    0,
    0,
    0, //pos x,y,z
    0.2916666667, //rx
    0.5, //ry
    0.3333333333, //rz
    30, //step
    100
  ); //stack

  //TELAPAK JARI
  var d_spheres = generateSphere(
    0,
    0,
    0, //pos x,y,z
    0.09166666667, //rx
    0.06666666667, //ry
    0.375, //rz
    30, //step
    100
  ); //stack

  //TANGAN
  //kiri & kanan
  var d_tabung = generateTabung(
    0,
    0,
    0, //pos x,y,z
    0.208, //radius
    0.5
  ); //t
  var d_halfsphere = generateHalfSphere(
    0,
    0,
    0, //pos x,y,z
    0.2083, //rx
    0.2083, //ry
    0.2083, //rz
    30, //step
    100,
    2
  ); //stack,

  // KEPALA
  var csphere = generateSphere(
    0,
    0,
    0, //pos x,y,z
    1.25, //rx
    0.95, //ry
    0.85, //rz
    30, //step
    100
  ); //stack

  // badan
  var csphere1 = generateSphere(0, 0, 0, 0.6, 0.9, 0.6, 30, 100);

  // mata kiri & kanan
  var csphere2 = generateSphere(0, 0, 0, 0.06, 0.076, 0.03, 30, 100);

  // telinga 1, 2 kanan kiri
  var csphere3 = generateSphere(0, 0, 0, 0.3, 1, 0.1, 30, 100);

  // lengan kanan kiri
  var ctabung = generateTabung2(0, 0, 0, 0.1, 1);

  // ujung tangan kaki
  var csphere4 = generateSphere(0, 0, 0, 0.1, 0.1, 0.1, 30, 100);

  // mulut
  var csphere5 = generateSphere(0, 0, 0, 0.15, 0.15, 0.05, 30, 100);

  // hidung
  var cnose = generateHidung(0, 0, 0, 0.1, 0.1, 1);

  // tubuh ikan
  var csphere6 = generateSphere(0, 0, 0, 0.5, 0.2, 0.1, 30, 100);

  // ekor ikan
  var cnose2 = generateHidung(0, 0, 0, 0.2, 0.2, 0.2);

  var control1 = [
    [0.063369397217929, -0.044654939106901326, 0.9],
    [0.08809891808346215, -0.0311231393775373, 0.9],
    [0.3, -0.05, 0.9],
    [0.45, 0.1, 0.9],
    [0.5, 0.2, 0.9],
  ];

  var control2 = [
    [0.057187017001545604, -0.05548037889039237, 0.9],
    [0.07428129829984555, -0.05818673883626513, 0.9],
    [0.14374034003091185, -0.05277401894451961, 0.9],
    [0.22102009273570333, -0.05277401894451961, 0.9],
    [0.4, -0.1, 0.9],
  ];

  var control3 = [
    [-0.0727975270479082, -0.04194857916102834, 0.9],
    [-0.3, -0.05, 0.9],
    [-0.45, 0.1, 0.9],
    [-0.5, 0.2, 0.9],
  ];

  var control4 = [
    [-0.0720092735703245768, -0.05277401894451961, 0.9],
    [-0.08191653786707886, -0.05277401894451961, 0.9],
    [-0.1715610510046368, -0.05277401894451961, 0.9],
    [-0.4, -0.1, 0.9],
  ];

  //akan dipanggil di main
  const numberOfPoints = 30;
  const cbezierCurve1 = new Curve(control1, numberOfPoints);
  const cbezierCurve2 = new Curve(control2, numberOfPoints);
  const bezierCurve3 = new Curve(control3, numberOfPoints);
  const bezierCurve4 = new Curve(control4, numberOfPoints);

  const curve1 = cbezierCurve1.getCurvePoints(); //xyz
  const curve2 = cbezierCurve2.getCurvePoints(); //xyz
  const curve3 = bezierCurve3.getCurvePoints(); //xyz
  const curve4 = bezierCurve4.getCurvePoints(); //xyz

  const c_arrOfObjects1 = [];
  for (let i = 0; i < curve1.length; i += 3) {
    rr = 0.02;
    temp = generateSphere(
      curve1[i],
      curve1[i + 1],
      curve1[i + 2], //pos xyz
      rr,
      rr,
      rr, //rx,ry,rz
      30,
      100
    ); //mereturn vertice & face
    const temp_object1 = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    c_arrOfObjects1.push(temp_object1);
  }

  const c_arrOfObjects2 = [];
  for (let i = 0; i < curve2.length; i += 3) {
    rr = 0.02;
    temp = generateSphere(
      curve2[i],
      curve2[i + 1],
      curve2[i + 2], //pos xyz
      rr,
      rr,
      rr, //rx,ry,rz
      30,
      100
    ); //mereturn vertice & face
    const temp_object2 = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    c_arrOfObjects2.push(temp_object2);
  }

  const c_arrOfObjects3 = [];
  for (let i = 0; i < curve3.length; i += 3) {
    rr = 0.02;
    temp = generateSphere(
      curve3[i],
      curve3[i + 1],
      curve3[i + 2], //pos xyz
      rr,
      rr,
      rr, //rx,ry,rz
      30,
      100
    ); //mereturn vertice & face
    const temp_object3 = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    c_arrOfObjects3.push(temp_object3);
  }

  const c_arrOfObjects4 = [];
  for (let i = 0; i < curve4.length; i += 3) {
    rr = 0.02;
    temp = generateSphere(
      curve4[i],
      curve4[i + 1],
      curve4[i + 2], //pos xyz
      rr,
      rr,
      rr, //rx,ry,rz
      30,
      100
    ); //mereturn vertice & face
    const temp_object4 = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    c_arrOfObjects4.push(temp_object4);
  }

  /*---- CREATE OBJECT ---- */
  //Object (vertex,face,shader,fragment)
  var land = new MyObject(
    main_land[0],
    main_land[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var tutupMain = new MyObject(
    tutup_main[0],
    tutup_main[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var batu = new MyObject(
    sphere_1[0],
    sphere_1[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var batu2 = new MyObject(
    sphere_2[0],
    sphere_2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var batu3 = new MyObject(
    sphere_1[0],
    sphere_1[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var batu4 = new MyObject(
    sphere_2[0],
    sphere_2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var batu5 = new MyObject(
    sphere_1[0],
    sphere_1[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var batu6 = new MyObject(
    sphere_3[0],
    sphere_3[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bush1 = new MyObject(
    sphere_2[0],
    sphere_2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var apel1 = new MyObject(
    sphere_1[0],
    sphere_1[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var apel2 = new MyObject(
    sphere_1[0],
    sphere_1[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var apel3 = new MyObject(
    sphere_1[0],
    sphere_1[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var apel4 = new MyObject(
    sphere_1[0],
    sphere_1[1],
    shader_vertex_source,
    shader_fragment_source
  );

  var pohon_batang = new MyObject(
    pohon_tabung[0],
    pohon_tabung[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var pohon_daun1 = new MyObject(
    pohon_sphere[0],
    pohon_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var pohon_daun2 = new MyObject(
    pohon_sphere[0],
    pohon_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var pohon_daun3 = new MyObject(
    pohon_sphere[0],
    pohon_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var pohon_daun4 = new MyObject(
    pohon_sphere[0],
    pohon_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var pohon_daun5 = new MyObject(
    pohon_sphere[0],
    pohon_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var pohon_daun6 = new MyObject(
    pohon_sphere[0],
    pohon_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var pohon_daun7 = new MyObject(
    pohon_sphere[0],
    pohon_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var pohon_daun8 = new MyObject(
    pohon_sphere[0],
    pohon_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_badan = new MyObject(
    b_body[0],
    b_body[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_mata_kanan = new MyObject(
    b_mata[0],
    b_mata[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_mata_kiri = new MyObject(
    b_mata[0],
    b_mata[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_head = new MyObject(
    b_head[0],
    b_head[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_telinga_kanan = new MyObject(
    b_telinga[0],
    b_telinga[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_telinga_kiri = new MyObject(
    b_telinga[0],
    b_telinga[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_tangan_kanan = new MyObject(
    b_kaki[0],
    b_kaki[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_tangan_kiri = new MyObject(
    b_kaki[0],
    b_kaki[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_kaki_kanan = new MyObject(
    b_kaki[0],
    b_kaki[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_kaki_kiri = new MyObject(
    b_kaki[0],
    b_kaki[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_mulut_atas = new MyObject(
    b_mulut[0],
    b_mulut[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_hidung = new MyObject(
    b_nose[0],
    b_nose[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_carrot = new MyObject(
    b_wortel[0],
    b_wortel[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_tutup_carrot = new MyObject(
    b_tutup_wortel[0],
    b_tutup_wortel[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var bunny_daun = new MyObject(
    b_daunwortel[0],
    b_daunwortel[1],
    shader_vertex_source,
    shader_fragment_source
  );

  var duck_badan = new MyObject(
    d_sphere[0],
    d_sphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_mata_kanan = new MyObject(
    d_sphere2[0],
    d_sphere2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_mata_kiri = new MyObject(
    d_sphere2[0],
    d_sphere2[1],
    shader_vertex_source,
    shader_fragment_source
  );

  var duck_baju = new MyObject(
    d_spherecover[0],
    d_spherecover[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_topi = new MyObject(
    d_spherecover2[0],
    d_spherecover2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_alastopi = new MyObject(
    d_tabungalas[0],
    d_tabungalas[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_kerah = new MyObject(
    d_spherecover3[0],
    d_spherecover3[1],
    shader_vertex_source,
    shader_fragment_source
  );

  var duck_paha_kanan = new MyObject(
    d_sphere4[0],
    d_sphere4[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_paha_kiri = new MyObject(
    d_sphere4[0],
    d_sphere4[1],
    shader_vertex_source,
    shader_fragment_source
  ); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kanan1 = new MyObject(
    d_spheres[0],
    d_spheres[1],
    shader_vertex_source,
    shader_fragment_source
  ); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kanan2 = new MyObject(
    d_spheres[0],
    d_spheres[1],
    shader_vertex_source,
    shader_fragment_source
  ); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kanan3 = new MyObject(
    d_spheres[0],
    d_spheres[1],
    shader_vertex_source,
    shader_fragment_source
  ); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kiri1 = new MyObject(
    d_spheres[0],
    d_spheres[1],
    shader_vertex_source,
    shader_fragment_source
  ); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kiri2 = new MyObject(
    d_spheres[0],
    d_spheres[1],
    shader_vertex_source,
    shader_fragment_source
  ); //sbnrnya bisa pake 1 objek trs ditranslate
  var duck_jari_kiri3 = new MyObject(
    d_spheres[0],
    d_spheres[1],
    shader_vertex_source,
    shader_fragment_source
  ); //sbnrnya bisa pake 1 objek trs ditranslate

  var duck_lengan_kanan = new MyObject(
    d_tabung[0],
    d_tabung[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_tangan_kanan = new MyObject(
    d_halfsphere[0],
    d_halfsphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_lengan_kiri = new MyObject(
    d_tabung[0],
    d_tabung[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var duck_tangan_kiri = new MyObject(
    d_halfsphere[0],
    d_halfsphere[1],
    shader_vertex_source,
    shader_fragment_source
  );

  var WORLD = new MyObject(
    world[0],
    world[1],
    shader_vertex_source,
    shader_fragment_source
  );

  var cbadan = new MyObject(
    csphere1[0],
    csphere1[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var mata_kanan = new MyObject(
    csphere2[0],
    csphere2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var mata_kiri = new MyObject(
    csphere2[0],
    csphere2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var head = new MyObject(
    csphere[0],
    csphere[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var telinga_kanan = new MyObject(
    csphere3[0],
    csphere3[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var telinga_kiri = new MyObject(
    csphere3[0],
    csphere3[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var telinga_kanan2 = new MyObject(
    csphere3[0],
    csphere3[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var telinga_kiri2 = new MyObject(
    csphere3[0],
    csphere3[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var lengan_kanan = new MyObject(
    ctabung[0],
    ctabung[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var lengan_kiri = new MyObject(
    ctabung[0],
    ctabung[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var kaki_kanan = new MyObject(
    ctabung[0],
    ctabung[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var kaki_kiri = new MyObject(
    ctabung[0],
    ctabung[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var ujung_tangan_kanan = new MyObject(
    csphere4[0],
    csphere4[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var ujung_tangan_kiri = new MyObject(
    csphere4[0],
    csphere4[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var ujung_kaki_kanan = new MyObject(
    csphere4[0],
    csphere4[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var ujung_kaki_kiri = new MyObject(
    csphere4[0],
    csphere4[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var mulut_kanan = new MyObject(
    csphere5[0],
    csphere5[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var mulut_kiri = new MyObject(
    csphere5[0],
    csphere5[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var mulut_atas = new MyObject(
    csphere5[0],
    csphere5[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var chidung = new MyObject(
    cnose[0],
    cnose[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var cbadanIkan = new MyObject(
    csphere6[0],
    csphere6[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var cekorIkan = new MyObject(
    cnose2[0],
    cnose2[1],
    shader_vertex_source,
    shader_fragment_source
  );

  //addChild

  pohon_batang.addChild(pohon_daun1);
  pohon_batang.addChild(pohon_daun2);
  pohon_batang.addChild(pohon_daun3);
  pohon_batang.addChild(pohon_daun4);
  pohon_batang.addChild(pohon_daun5);
  pohon_batang.addChild(pohon_daun6);
  pohon_batang.addChild(pohon_daun7);
  pohon_batang.addChild(pohon_daun8);
  pohon_batang.addChild(apel1);
  pohon_batang.addChild(apel2);
  pohon_batang.addChild(apel3);
  pohon_batang.addChild(apel4);

  bunny_badan.addChild(bunny_mata_kanan); //0
  bunny_badan.addChild(bunny_mata_kiri); // 1
  bunny_badan.addChild(bunny_head); // 2
  bunny_badan.addChild(bunny_telinga_kanan); // 3
  bunny_badan.addChild(bunny_telinga_kiri); // 4
  bunny_badan.addChild(bunny_kaki_kanan); // 5
  bunny_badan.addChild(bunny_kaki_kiri); // 6
  bunny_badan.addChild(bunny_tangan_kanan); // 7
  bunny_badan.addChild(bunny_tangan_kiri); // 8
  bunny_badan.addChild(bunny_mulut_atas); // 9
  bunny_badan.addChild(bunny_hidung); // 10
  bunny_badan.addChild(bunny_carrot);
  bunny_carrot.addChild(bunny_tutup_carrot);
  bunny_tutup_carrot.addChild(bunny_daun);

  bunny_arrOfObjects.forEach((obj) => {
    bunny_badan.addChild(obj);
  });
  bunny_arrOfObjects2.forEach((obj2) => {
    bunny_badan.addChild(obj2);
  });

  duck_badan.addChild(duck_mata_kanan);
  duck_badan.addChild(duck_mata_kiri);
  duck_badan.addChild(duck_baju);
  duck_badan.addChild(duck_topi);
  duck_badan.addChild(duck_alastopi);
  duck_badan.addChild(duck_kerah);

  duck_badan.addChild(duck_paha_kanan);
  duck_badan.addChild(duck_paha_kiri);
  duck_badan.addChild(duck_jari_kanan1);
  duck_badan.addChild(duck_jari_kanan2);
  duck_badan.addChild(duck_jari_kanan3);
  duck_badan.addChild(duck_jari_kiri1);
  duck_badan.addChild(duck_jari_kiri2);
  duck_badan.addChild(duck_jari_kiri3);
  duck_badan.addChild(duck_lengan_kanan);
  duck_badan.addChild(duck_lengan_kiri);
  duck_badan.addChild(duck_tangan_kanan);
  duck_badan.addChild(duck_tangan_kiri);

  duck_arrOfObjects.forEach((obj) => {
    duck_badan.addChild(obj);
  });
  duck_arrOfObjects2.forEach((obj) => {
    duck_badan.addChild(obj);
  });

  land.addChild(tutupMain);
  land.addChild(batu);
  land.addChild(batu2);
  land.addChild(batu3);
  land.addChild(batu4);
  land.addChild(batu5);
  land.addChild(batu6);
  land.addChild(bush1);
  land.addChild(pohon_batang);
  land.addChild(bunny_badan);
  land.addChild(duck_badan);

  cbadan.addChild(mata_kanan);
  cbadan.addChild(mata_kiri);
  cbadan.addChild(head);
  cbadan.addChild(telinga_kanan);
  cbadan.addChild(telinga_kiri);
  cbadan.addChild(telinga_kanan2);
  cbadan.addChild(telinga_kiri2);
  cbadan.addChild(lengan_kanan);
  cbadan.addChild(lengan_kiri);
  cbadan.addChild(kaki_kanan);
  cbadan.addChild(kaki_kiri);
  cbadan.addChild(ujung_tangan_kanan);
  cbadan.addChild(ujung_tangan_kiri);
  cbadan.addChild(ujung_kaki_kanan);
  cbadan.addChild(ujung_kaki_kiri);
  cbadan.addChild(mulut_kanan);
  cbadan.addChild(mulut_kiri);
  cbadan.addChild(mulut_atas);
  cbadan.addChild(chidung);
  cbadan.addChild(cbadanIkan);
  cbadan.addChild(cekorIkan);
  c_arrOfObjects1.forEach((obj) => {
    cbadan.addChild(obj);
  });
  c_arrOfObjects2.forEach((obj) => {
    cbadan.addChild(obj);
  });
  c_arrOfObjects3.forEach((obj) => {
    cbadan.addChild(obj);
  });
  c_arrOfObjects4.forEach((obj) => {
    cbadan.addChild(obj);
  });

  //load texture
  for (let i = 12; i < bunny_arrOfObjects.length + 12; i++) {
    bunny_badan.child[i].loadTexturee("ressource/dark_brown.jpg");
  }
  for (let i = 12; i < bunny_arrOfObjects2.length + 12; i++) {
    bunny_badan.child[i].loadTexturee("ressource/dark_brown.jpg");
  }

  land.loadTexturee("ressource/earth.jpg"); // body
  land.child[0].loadTexturee("ressource/green.png");
  land.child[1].loadTexturee("ressource/apel.png");
  land.child[2].loadTexturee("ressource/bush2.png");
  land.child[3].loadTexturee("ressource/apel.png");
  land.child[4].loadTexturee("ressource/bush2.png");
  land.child[5].loadTexturee("ressource/apel.png");
  land.child[6].loadTexturee("ressource/bush2.png");
  land.child[7].loadTexturee("ressource/bush2.png");

  pohon_batang.loadTexturee("ressource/dark_brown.jpg");
  for (let i = 0; i < pohon_batang.child.length - 1; i++) {
    pohon_batang.child[i].loadTexturee("ressource/bush.jpg");
  }
  apel1.loadTexturee("ressource/apel.png");
  apel2.loadTexturee("ressource/apel.png");
  apel3.loadTexturee("ressource/apel.png");
  apel4.loadTexturee("ressource/apel.png");

  bunny_badan.loadTexturee("ressource/gradient_pink.jpg"); // body
  bunny_badan.child[0].loadTexturee("ressource/dark_brown.jpg"); // mata kanan
  bunny_badan.child[1].loadTexturee("ressource/dark_brown.jpg"); // mata kiri
  bunny_badan.child[2].loadTexturee("ressource/gradient_pink.jpg"); // head
  bunny_badan.child[3].loadTexturee("ressource/gradient_pink.jpg"); // telinga kanan
  bunny_badan.child[4].loadTexturee("ressource/gradient_pink.jpg"); // telinga kiri
  bunny_badan.child[5].loadTexturee("ressource/gradient_pink.jpg"); // kaki kanan
  bunny_badan.child[6].loadTexturee("ressource/gradient_pink.jpg"); // kaki kanan
  bunny_badan.child[7].loadTexturee("ressource/gradient_pink.jpg"); // ujung tangan kanan
  bunny_badan.child[8].loadTexturee("ressource/gradient_pink.jpg"); // ujung tangan kiri
  bunny_badan.child[9].loadTexturee("ressource/white.jpg"); // mulut
  bunny_badan.child[10].loadTexturee("ressource/darker_pink.jpg"); // hidung
  bunny_badan.child[11].loadTexturee("ressource/orange.jpg"); // kerucut wortel
  bunny_carrot.child[0].loadTexturee("ressource/orange.jpg"); // tutup wortel
  bunny_tutup_carrot.child[0].loadTexturee("ressource/daun.jpeg"); // daun

  duck_badan.loadTexturee("ressource/duckcolor.png");
  duck_badan.child[0].loadTexturee("ressource/wall.jpg"); //mata
  duck_badan.child[1].loadTexturee("ressource/wall.jpg");
  duck_badan.child[2].loadTexturee("ressource/baju.png"); //duck_baju
  duck_badan.child[3].loadTexturee("ressource/baju.png"); //duck_topi
  duck_badan.child[3].loadTexturee("ressource/topi.png"); //duck_topi
  duck_badan.child[4].loadTexturee("ressource/topi.png"); //alas duck_topi
  duck_badan.child[5].loadTexturee("ressource/bajukerah.png"); //duck_kerah duck_baju
  duck_badan.child[6].loadTexturee("ressource/duckcolor.png"); //paha
  duck_badan.child[7].loadTexturee("ressource/duckcolor.png"); //paha
  duck_badan.child[8].loadTexturee("ressource/kakimulut.png"); //jari
  duck_badan.child[9].loadTexturee("ressource/kakimulut.png"); //jari
  duck_badan.child[10].loadTexturee("ressource/kakimulut.png"); //jari
  duck_badan.child[11].loadTexturee("ressource/kakimulut.png"); //jari
  duck_badan.child[12].loadTexturee("ressource/kakimulut.png"); //jari
  duck_badan.child[13].loadTexturee("ressource/kakimulut.png"); //jari
  duck_badan.child[14].loadTexturee("ressource/baju.png"); //lengan
  duck_badan.child[15].loadTexturee("ressource/baju.png"); //lengan
  duck_badan.child[16].loadTexturee("ressource/kakimulut.png"); //tangan
  duck_badan.child[17].loadTexturee("ressource/kakimulut.png"); //tangan
  for (let i = 18; i < duck_arrOfObjects.length + 18; i++) {
    //mulut atas
    duck_badan.child[i].loadTexturee("ressource/kakimulut.png");
  }
  for (let i = 38; i < duck_arrOfObjects.length + 38; i++) {
    //mulut bawah
    duck_badan.child[i].loadTexturee("ressource/kakimulut.png");
  }

  WORLD.loadTexturee("ressource/langit.png");
  cbadan.loadTexturee("ressource/grey.png");
  cbadan.child[0].loadTexturee("ressource/black.jpg");
  cbadan.child[1].loadTexturee("ressource/black.jpg");
  cbadan.child[2].loadTexturee("ressource/grey.png");
  cbadan.child[3].loadTexturee("ressource/grey.png");
  cbadan.child[4].loadTexturee("ressource/grey.png");
  cbadan.child[5].loadTexturee("ressource/pink2.jpg");
  cbadan.child[6].loadTexturee("ressource/pink2.jpg");
  cbadan.child[7].loadTexturee("ressource/grey.png");
  cbadan.child[8].loadTexturee("ressource/grey.png");
  cbadan.child[9].loadTexturee("ressource/grey.png");
  cbadan.child[10].loadTexturee("ressource/grey.png");
  cbadan.child[11].loadTexturee("ressource/whitee.png");
  cbadan.child[12].loadTexturee("ressource/whitee.png");
  cbadan.child[13].loadTexturee("ressource/whitee.png");
  cbadan.child[14].loadTexturee("ressource/whitee.png");
  cbadan.child[15].loadTexturee("ressource/whitee.png");
  cbadan.child[16].loadTexturee("ressource/whitee.png");
  cbadan.child[17].loadTexturee("ressource/whitee.png");
  cbadan.child[18].loadTexturee("ressource/pink2.jpg");
  cbadan.child[19].loadTexturee("ressource/gold.jpg");
  cbadan.child[20].loadTexturee("ressource/gold.jpg");

  /*========================= MATRIX ========================= */

  var PROJMATRIX = LIBS.get_projection(
    40,
    CANVAS.width / CANVAS.height,
    1,
    100
  );
  var VIEWMATRIX = LIBS.get_I4();

  LIBS.translateZ(VIEWMATRIX, -40); //ubah view
  var THETA = 0,
    PHI = 0;

  /*========================= DRAWING ========================= */
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(1.0, 0.0, 0.0, 0.0);
  GL.clearDepth(1.0);

  var time_prev = 0;
  var bunny_blinkSpeed = 0.001;
  var bunny_blinkScale = 0.3;
  var bunny_handRotateX = 0;
  var bunny_handTranslateZ = 0;
  var bunny_carrotRotateX = 0;

  var sudut = 90;
  var sudut2 = 0;
  var sudut3 = 90;
  var rkaki = 0; //untk kaki putih
  var makan = 0; // untk naik turun makan
  var selesai = false; // selesai tangan naik
  var naik = false; // untk naik turun makan
  var makanIkan = 0; // untk naik turun ikan
  var one = 0,
    two = 0;
  var satu = 0,
    dua = 0,
    tiga = 0;

  var rotationAngleY = 0;
  var blinkSpeed = 0.003;
  var blinkScale = 0.3;
  var idx_body = 0;
  var temp = 0;
  var rotateBody = [0.05, -0.05]; //array derajat rotasi
  var degree = 0;
  let jalan = true;
  let durasiRotate = 550; // Durasi rotasi untuk setiap derajat dalam milidetik
  var rotateObjects = [
    { object: duck_jari_kanan1, rotation: 0.01 },
    { object: duck_jari_kanan2, rotation: 0.01 },
    { object: duck_jari_kanan3, rotation: 0.01 },
    { object: duck_jari_kiri1, rotation: 0.01 },
    { object: duck_jari_kiri2, rotation: 0.01 },
    { object: duck_jari_kiri3, rotation: 0.01 },
  ];

  LIBS.rotateX(VIEWMATRIX, 0.3);
  var animate = function (time) {
    var dt = time - time_prev;
    if (!drag) {
      (dX *= AMORTIZATION), (dY *= AMORTIZATION);
      (THETA += dX), (PHI += dY); //derajat x,y
    }
    dX += 0.001;

    WORLD.setIdentityMove();
    WORLD.setRotateMove(PHI, THETA, 0);
    WORLD.setTranslateMove(0, 0, 0);

    land.MOVEMATRIX = glMatrix.mat4.create();

    //rotasi cara libs
    land.setIdentityMove();
    land.setRotateMove(PHI, THETA, 0);
    land.setTranslateMove(0, 0, 0);

    for (let i = 0; i < land.child.length; i++) {
      land.child[i].setIdentityMove();
      land.child[i].setRotateMove(PHI, THETA, 0);
      land.child[i].setTranslateMove(0, 0, 0);
    }

    // pohon
    pohon_batang.MOVEMATRIX = glMatrix.mat4.create();

    // pohon
    pohon_batang.setIdentityMove();
    pohon_batang.setRotateMove(PHI, THETA, 0);
    pohon_batang.setTranslateMove(0, 2, 0);

    for (let i = 0; i < pohon_batang.child.length; i++) {
      pohon_batang.child[i].setIdentityMove();
      pohon_batang.child[i].setRotateMove(PHI, THETA, 0);
      pohon_batang.child[i].setTranslateMove(0, 2, 0);
    }

    bunny_badan.MOVEMATRIX = glMatrix.mat4.create();

    //rotasi cara libs
    bunny_badan.setIdentityMove();
    bunny_badan.setRotateMove(PHI, THETA, 0);
    bunny_badan.setTranslateMove(6, 2, 2);

    for (let i = 0; i < bunny_badan.child.length; i++) {
      bunny_badan.child[i].setIdentityMove();
      bunny_badan.child[i].setRotateMove(PHI, THETA, 0);
      bunny_badan.child[i].setTranslateMove(6, 2, 2);
    }

    bunny_carrot.child[0].setIdentityMove();
    bunny_carrot.child[0].setRotateMove(PHI, THETA, 0);
    bunny_carrot.child[0].setTranslateMove(6, 2, 2);

    for (let i = 0; i < bunny_tutup_carrot.child.length; i++) {
      bunny_tutup_carrot.child[i].setIdentityMove();
      bunny_tutup_carrot.child[i].setRotateMove(PHI, THETA, 0);
      bunny_tutup_carrot.child[i].setTranslateMove(6, 2, 2);
    }

    duck_badan.MOVEMATRIX = glMatrix.mat4.create();

    //ANIMASI duck_badan DUCK
    let i_currentRotate = Math.floor(time / durasiRotate) % rotateBody.length; //Index currentRotate didapatkan dari jum rotasi dalam wkt yg ada .Lalu % jumlah gerakan derajat yg ada agar dapat berjalan secara circular.
    let progress = (time % durasiRotate) / durasiRotate; //utk menghitung progress durasiRotasi saat ini dalam 1 rentang waktu
    let currentRotation = rotateBody[i_currentRotate]; //derajat rotasi sekarang
    let i_nextRotate = (i_currentRotate + 1) % rotateBody.length; //mengambil derajat rotasi setelahnya
    let nextRotation = rotateBody[i_nextRotate]; //derajat rotasi selanjutnya
    let interpolatedRotation =
      currentRotation + (nextRotation - currentRotation) * progress; //rumus interpolasi (agar dpt lebih smooth)

    //rotasi cara libs
    var tx = 2,
      ty = 1.5,
      tz = 10;
    duck_badan.setIdentityMove();
    duck_badan.setRotateMove(PHI, THETA, 0);
    duck_badan.setTranslateMove(tx, ty, tz);
    for (let i = 0; i < duck_badan.child.length; i++) {
      duck_badan.child[i].setIdentityMove();
      duck_badan.child[i].setRotateMove(
        PHI,
        interpolatedRotation - 70,
        interpolatedRotation
      );
      duck_badan.child[i].setTranslateMove(tx, ty, tz);
    }

    cbadan.MOVEMATRIX = glMatrix.mat4.create();

    //rotasi cara libs
    cbadan.setIdentityMove();
    cbadan.setRotateMove(PHI, THETA, 0);
    cbadan.setTranslateMove(10, 2.5, 2);

    for (let i = 0; i < cbadan.child.length; i++) {
      cbadan.child[i].setIdentityMove();
      cbadan.child[i].setRotateMove(PHI, THETA, 0);
      cbadan.child[i].setTranslateMove(10, 2.5, 2);
    }
    // TRANSLASI, ROTASI===========================================================
    // land
    glMatrix.mat4.rotateZ(land.MOVEMATRIX, land.MOVEMATRIX, Math.PI / -1);
    // tanah
    glMatrix.mat4.rotateX(
      land.child[0].MOVEMATRIX,
      land.child[0].MOVEMATRIX,
      Math.PI / -2
    );
    // batu 1
    glMatrix.mat4.translate(
      land.child[1].MOVEMATRIX,
      land.child[1].MOVEMATRIX,
      [0, 0.15, -4.5]
    );
    // batu 2
    glMatrix.mat4.translate(
      land.child[2].MOVEMATRIX,
      land.child[2].MOVEMATRIX,
      [0.5, 0.15, -4.1]
    );
    // batu 3 (hrsnya jd batu 4)
    glMatrix.mat4.translate(
      land.child[3].MOVEMATRIX,
      land.child[3].MOVEMATRIX,
      [-1, 0.2, -4.5]
    );
    // batu 4
    glMatrix.mat4.translate(
      land.child[4].MOVEMATRIX,
      land.child[4].MOVEMATRIX,
      [-0.5, 0.15, -3.9]
    );
    // batu 5
    glMatrix.mat4.translate(
      land.child[5].MOVEMATRIX,
      land.child[5].MOVEMATRIX,
      [0.9, 0.15, -4.5]
    );
    // batu 6
    glMatrix.mat4.translate(
      land.child[6].MOVEMATRIX,
      land.child[6].MOVEMATRIX,
      [-1.3, 0.15, -3.5]
    );
    // bush 1
    glMatrix.mat4.translate(
      land.child[7].MOVEMATRIX,
      land.child[7].MOVEMATRIX,
      [1.3, 0.15, -3.7]
    );

    glMatrix.mat4.translate(
      pohon_batang.MOVEMATRIX,
      pohon_batang.MOVEMATRIX,
      [0, 0, -2]
    );

    glMatrix.mat4.translate(
      pohon_daun1.MOVEMATRIX,
      pohon_daun1.MOVEMATRIX,
      [-0.8, 2.2, -2.2]
    );
    glMatrix.mat4.translate(
      pohon_daun2.MOVEMATRIX,
      pohon_daun2.MOVEMATRIX,
      [-1.4, 0.4, -0.7]
    );
    glMatrix.mat4.translate(
      pohon_daun3.MOVEMATRIX,
      pohon_daun3.MOVEMATRIX,
      [-1.4, 0.4, -3.5] //////
    );
    glMatrix.mat4.translate(
      pohon_daun4.MOVEMATRIX,
      pohon_daun4.MOVEMATRIX,
      [1.4, 0.4, -0.7]
    );
    glMatrix.mat4.translate(
      pohon_daun5.MOVEMATRIX,
      pohon_daun5.MOVEMATRIX,
      [1.4, 0.4, -3.5]
    );

    glMatrix.mat4.translate(
      pohon_daun6.MOVEMATRIX,
      pohon_daun6.MOVEMATRIX,
      [0.2, 2.2, -3]
    ); ////
    glMatrix.mat4.translate(
      pohon_daun7.MOVEMATRIX,
      pohon_daun7.MOVEMATRIX,
      [0.2, 2.2, -1.4]
    );
    glMatrix.mat4.translate(
      pohon_daun8.MOVEMATRIX,
      pohon_daun8.MOVEMATRIX,
      [1.2, 2.2, -2.2]
    );
    glMatrix.mat4.translate(
      apel1.MOVEMATRIX,
      apel1.MOVEMATRIX,
      [2.8, 2.2, -2.2]
    );
    glMatrix.mat4.translate(
      apel2.MOVEMATRIX,
      apel2.MOVEMATRIX,
      [-2.5, 1.8, -2.2]
    );
    glMatrix.mat4.translate(
      apel3.MOVEMATRIX,
      apel3.MOVEMATRIX,
      [-2.8, 1.5, -2.2]
    );
    glMatrix.mat4.rotateZ(apel3.MOVEMATRIX, apel3.MOVEMATRIX, Math.PI / 1.5);
    glMatrix.mat4.translate(
      apel4.MOVEMATRIX,
      apel4.MOVEMATRIX,
      [-3, 1.8, -2.2]
    );

    glMatrix.mat4.rotateX(
      pohon_batang.MOVEMATRIX,
      pohon_batang.MOVEMATRIX,
      Math.PI / 2
    );

    glMatrix.mat4.rotateX(
      pohon_daun1.MOVEMATRIX,
      pohon_daun1.MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.rotateY(
      pohon_daun4.MOVEMATRIX,
      pohon_daun4.MOVEMATRIX,
      Math.PI / 2
    );

    glMatrix.mat4.rotateY(
      pohon_daun5.MOVEMATRIX,
      pohon_daun5.MOVEMATRIX,
      -Math.PI / 2
    );
    glMatrix.mat4.rotateX(
      pohon_daun7.MOVEMATRIX,
      pohon_daun7.MOVEMATRIX,
      Math.PI
    );

    glMatrix.mat4.translate(
      bunny_mata_kanan.MOVEMATRIX,
      bunny_mata_kanan.MOVEMATRIX,
      [0.3, 0.2, 0.8]
    );
    glMatrix.mat4.translate(
      bunny_mata_kiri.MOVEMATRIX,
      bunny_mata_kiri.MOVEMATRIX,
      [-0.3, 0.2, 0.8]
    );

    glMatrix.mat4.translate(
      bunny_badan.MOVEMATRIX,
      bunny_badan.MOVEMATRIX,
      [0, -1, 0]
    );

    glMatrix.mat4.translate(
      bunny_telinga_kanan.MOVEMATRIX,
      bunny_telinga_kanan.MOVEMATRIX,
      [0.4, 1.3, 0]
    );
    glMatrix.mat4.rotateZ(
      bunny_telinga_kanan.MOVEMATRIX,
      bunny_telinga_kanan.MOVEMATRIX,
      Math.PI / 1.2
    );
    glMatrix.mat4.translate(
      bunny_telinga_kiri.MOVEMATRIX,
      bunny_telinga_kiri.MOVEMATRIX,
      [-0.4, 1.3, 0]
    );
    glMatrix.mat4.rotateZ(
      bunny_telinga_kiri.MOVEMATRIX,
      bunny_telinga_kiri.MOVEMATRIX,
      Math.PI / -1.2
    );

    glMatrix.mat4.translate(
      bunny_tangan_kanan.MOVEMATRIX,
      bunny_tangan_kanan.MOVEMATRIX,
      [0.7, -0.8, 0.2]
    );
    // rotate lengan kanan
    glMatrix.mat4.rotateX(
      bunny_tangan_kanan.MOVEMATRIX,
      bunny_tangan_kanan.MOVEMATRIX,
      Math.PI / 2.5
    );
    glMatrix.mat4.rotateY(
      bunny_tangan_kanan.MOVEMATRIX,
      bunny_tangan_kanan.MOVEMATRIX,
      Math.PI / 3
    );
    // rotate lengan kiri
    glMatrix.mat4.translate(
      bunny_tangan_kiri.MOVEMATRIX,
      bunny_tangan_kiri.MOVEMATRIX,
      [-0.7, -0.8, 0.2]
    );
    glMatrix.mat4.rotateX(
      bunny_tangan_kiri.MOVEMATRIX,
      bunny_tangan_kiri.MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.rotateY(
      bunny_tangan_kiri.MOVEMATRIX,
      bunny_tangan_kiri.MOVEMATRIX,
      Math.PI / -2.5
    );

    glMatrix.mat4.translate(
      bunny_kaki_kanan.MOVEMATRIX,
      bunny_kaki_kanan.MOVEMATRIX,
      [0.4, -1.5, 0.2]
    );
    // rotate kaki kanan
    glMatrix.mat4.rotateX(
      bunny_badan.child[9].MOVEMATRIX,
      bunny_badan.child[9].MOVEMATRIX,
      Math.PI / 2
    );
    // translate kaki kiri
    glMatrix.mat4.translate(
      bunny_kaki_kiri.MOVEMATRIX,
      bunny_kaki_kiri.MOVEMATRIX,
      [-0.4, -1.5, 0.2]
    );
    // rotate kaki kiri
    glMatrix.mat4.rotateX(
      bunny_badan.child[10].MOVEMATRIX,
      bunny_badan.child[10].MOVEMATRIX,
      Math.PI / 2
    );

    glMatrix.mat4.translate(
      bunny_mulut_atas.MOVEMATRIX,
      bunny_mulut_atas.MOVEMATRIX,
      [0, 0.9, -0.03]
    );

    glMatrix.mat4.translate(
      bunny_hidung.MOVEMATRIX,
      bunny_hidung.MOVEMATRIX,
      [0, 1, -0.1]
    );
    glMatrix.mat4.rotateX(
      bunny_hidung.MOVEMATRIX,
      bunny_hidung.MOVEMATRIX,
      Math.PI / 2
    );

    // wortel
    glMatrix.mat4.translate(
      bunny_carrot.MOVEMATRIX,
      bunny_carrot.MOVEMATRIX,
      [-1.55, 0.15, 0.3]
    );
    glMatrix.mat4.rotateX(
      bunny_carrot.MOVEMATRIX,
      bunny_carrot.MOVEMATRIX,
      Math.PI / -2
    );
    glMatrix.mat4.rotateY(
      bunny_carrot.MOVEMATRIX,
      bunny_carrot.MOVEMATRIX,
      Math.PI / -12
    );

    // tutup wortel
    glMatrix.mat4.translate(
      bunny_tutup_carrot.MOVEMATRIX,
      bunny_tutup_carrot.MOVEMATRIX,
      [-1.3, -0.8, 0.3]
    );

    // daun wortel
    glMatrix.mat4.translate(
      bunny_daun.MOVEMATRIX,
      bunny_daun.MOVEMATRIX,
      [-1.3, -0.55, 0.3]
    );
    glMatrix.mat4.rotateX(
      bunny_daun.MOVEMATRIX,
      bunny_daun.MOVEMATRIX,
      Math.PI / 1
    );
    glMatrix.mat4.rotateY(
      bunny_daun.MOVEMATRIX,
      bunny_daun.MOVEMATRIX,
      Math.PI / 9
    );
    // garis mulut kanan
    for (let i = 12; i < bunny_arrOfObjects.length + 12; i++) {
      // badan.child[i].loadTexturee("ressource/pink.jpg");
      glMatrix.mat4.translate(
        bunny_badan.child[i].MOVEMATRIX,
        bunny_badan.child[i].MOVEMATRIX,
        [0, 0.06, 0.045]
      );
      glMatrix.mat4.scale(
        bunny_badan.child[i].MOVEMATRIX,
        bunny_badan.child[i].MOVEMATRIX,
        [0.15, 0.3, 1]
      );
      glMatrix.mat4.rotateZ(
        bunny_badan.child[i].MOVEMATRIX,
        bunny_badan.child[i].MOVEMATRIX,
        Math.PI / 1.5
      );
    }
    // garis mulut kiri
    for (let i = 24; i < bunny_arrOfObjects2.length + 24; i++) {
      // badan.child[i].loadTexturee("ressource/pink.jpg");
      glMatrix.mat4.translate(
        bunny_badan.child[i].MOVEMATRIX,
        bunny_badan.child[i].MOVEMATRIX,
        [0, 0.04, 0.045]
      );
      glMatrix.mat4.scale(
        bunny_badan.child[i].MOVEMATRIX,
        bunny_badan.child[i].MOVEMATRIX,
        [0.15, 0.3, 1]
      );
      glMatrix.mat4.rotateZ(
        bunny_badan.child[i].MOVEMATRIX,
        bunny_badan.child[i].MOVEMATRIX,
        Math.PI / -5.5
      );
    }
    glMatrix.mat4.translate(
      duck_mata_kanan.MOVEMATRIX,
      duck_mata_kanan.MOVEMATRIX,
      [0.2, 0.5, 0.76]
    ); //xyz
    glMatrix.mat4.translate(
      duck_mata_kiri.MOVEMATRIX,
      duck_mata_kiri.MOVEMATRIX,
      [-0.2, 0.5, 0.76]
    ); //xyz

    glMatrix.mat4.rotateX(
      duck_alastopi.MOVEMATRIX,
      duck_alastopi.MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.translate(
      duck_alastopi.MOVEMATRIX,
      duck_alastopi.MOVEMATRIX,
      [0, 0, 0 - 0.75]
    );
    //TANGAN KANAN
    glMatrix.mat4.rotateX(
      duck_lengan_kanan.MOVEMATRIX,
      duck_lengan_kanan.MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.rotateY(
      duck_lengan_kanan.MOVEMATRIX,
      duck_lengan_kanan.MOVEMATRIX,
      Math.PI / 5
    );
    glMatrix.mat4.translate(
      duck_lengan_kanan.MOVEMATRIX,
      duck_lengan_kanan.MOVEMATRIX,
      [0.394 + 0.09, -0.12, -0.001 + 0.718]
    );

    glMatrix.mat4.rotateZ(
      duck_tangan_kanan.MOVEMATRIX,
      duck_tangan_kanan.MOVEMATRIX,
      -Math.PI / 1.2
    );
    glMatrix.mat4.translate(
      duck_tangan_kanan.MOVEMATRIX,
      duck_tangan_kanan.MOVEMATRIX,
      [-0.55, 0.9, -0.1]
    );
    //TANGAN KIRI
    glMatrix.mat4.rotateX(
      duck_lengan_kiri.MOVEMATRIX,
      duck_lengan_kiri.MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.rotateY(
      duck_lengan_kiri.MOVEMATRIX,
      duck_lengan_kiri.MOVEMATRIX,
      -Math.PI / 5
    );
    glMatrix.mat4.translate(
      duck_lengan_kiri.MOVEMATRIX,
      duck_lengan_kiri.MOVEMATRIX,
      [-(0.394 + 0.09), -0.12, -0.001 + 0.718]
    );

    glMatrix.mat4.rotateZ(
      duck_tangan_kiri.MOVEMATRIX,
      duck_tangan_kiri.MOVEMATRIX,
      Math.PI / 1.2
    );
    glMatrix.mat4.translate(
      duck_tangan_kiri.MOVEMATRIX,
      duck_tangan_kiri.MOVEMATRIX,
      [-(-0.55), 0.9, -0.1]
    );

    //KAKI
    glMatrix.mat4.translate(
      duck_paha_kanan.MOVEMATRIX,
      duck_paha_kanan.MOVEMATRIX,
      [0.3833333333, -0.5, 0]
    );
    glMatrix.mat4.translate(
      duck_paha_kiri.MOVEMATRIX,
      duck_paha_kiri.MOVEMATRIX,
      [-0.3833333333, -0.5, 0]
    );
    //JARI KANAN
    glMatrix.mat4.translate(
      duck_jari_kanan1.MOVEMATRIX,
      duck_jari_kanan1.MOVEMATRIX,
      [0.3833333333, -0.96, 0.1666666667]
    );
    glMatrix.mat4.translate(
      duck_jari_kanan2.MOVEMATRIX,
      duck_jari_kanan2.MOVEMATRIX,
      [0.3833333333 + 0.1, -0.96, 0.1666666667]
    );
    glMatrix.mat4.rotateY(
      duck_jari_kanan2.MOVEMATRIX,
      duck_jari_kanan2.MOVEMATRIX,
      Math.PI / 22.5
    );
    glMatrix.mat4.translate(
      duck_jari_kanan3.MOVEMATRIX,
      duck_jari_kanan3.MOVEMATRIX,
      [0.3833333333 - 0.1, -0.96, 0.1666666667]
    );
    glMatrix.mat4.rotateY(
      duck_jari_kanan3.MOVEMATRIX,
      duck_jari_kanan3.MOVEMATRIX,
      -Math.PI / 22.5
    );
    // JARI KIRI
    glMatrix.mat4.translate(
      duck_jari_kiri1.MOVEMATRIX,
      duck_jari_kiri1.MOVEMATRIX,
      [-0.3833333333, -0.96, 0.1666666667]
    );
    glMatrix.mat4.translate(
      duck_jari_kiri2.MOVEMATRIX,
      duck_jari_kiri2.MOVEMATRIX,
      [-0.3833333333 + 0.1, -0.96, 0.1666666667]
    );
    glMatrix.mat4.rotateY(
      duck_jari_kiri2.MOVEMATRIX,
      duck_jari_kiri2.MOVEMATRIX,
      Math.PI / 22.5
    );
    glMatrix.mat4.translate(
      duck_jari_kiri3.MOVEMATRIX,
      duck_jari_kiri3.MOVEMATRIX,
      [-0.3833333333 - 0.1, -0.96, 0.1666666667]
    );
    glMatrix.mat4.rotateY(
      duck_jari_kiri3.MOVEMATRIX,
      duck_jari_kiri3.MOVEMATRIX,
      -Math.PI / 22.5
    );

    glMatrix.mat4.translate(
      mata_kanan.MOVEMATRIX,
      mata_kanan.MOVEMATRIX,
      [0.2, 0.4, 0.77]
    );
    glMatrix.mat4.translate(
      mata_kiri.MOVEMATRIX,
      mata_kiri.MOVEMATRIX,
      [-0.2, 0.4, 0.77]
    );

    glMatrix.mat4.translate(cbadan.MOVEMATRIX, cbadan.MOVEMATRIX, [0, -1, 0]);

    glMatrix.mat4.translate(
      telinga_kanan.MOVEMATRIX,
      telinga_kanan.MOVEMATRIX,
      [0.4, 0.5, 0]
    );
    glMatrix.mat4.translate(
      telinga_kiri.MOVEMATRIX,
      telinga_kiri.MOVEMATRIX,
      [-0.4, 0.5, 0]
    );

    glMatrix.mat4.translate(
      telinga_kanan2.MOVEMATRIX,
      telinga_kanan2.MOVEMATRIX,
      [0.4, 0.4, 0.02]
    );
    glMatrix.mat4.translate(
      telinga_kiri2.MOVEMATRIX,
      telinga_kiri2.MOVEMATRIX,
      [-0.4, 0.4, 0.02]
    );

    glMatrix.mat4.translate(
      lengan_kanan.MOVEMATRIX,
      lengan_kanan.MOVEMATRIX,
      [0.5, -0.9, 0.2]
    );
    // rotate lengan kanan
    glMatrix.mat4.rotateX(
      cbadan.child[7].MOVEMATRIX,
      cbadan.child[7].MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.rotateY(
      cbadan.child[7].MOVEMATRIX,
      cbadan.child[7].MOVEMATRIX,
      Math.PI / 5
    );
    glMatrix.mat4.translate(
      lengan_kiri.MOVEMATRIX,
      lengan_kiri.MOVEMATRIX,
      [-0.5, -0.9, 0.2]
    );
    // rotate lengan kiri
    glMatrix.mat4.rotateX(
      cbadan.child[8].MOVEMATRIX,
      cbadan.child[8].MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.rotateY(
      cbadan.child[8].MOVEMATRIX,
      cbadan.child[8].MOVEMATRIX,
      -Math.PI / 5
    );

    glMatrix.mat4.translate(
      kaki_kanan.MOVEMATRIX,
      kaki_kanan.MOVEMATRIX,
      [0.4, -1.4, 0.2]
    );
    // rotate kaki kanan
    glMatrix.mat4.rotateX(
      cbadan.child[9].MOVEMATRIX,
      cbadan.child[9].MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.translate(
      kaki_kiri.MOVEMATRIX,
      kaki_kiri.MOVEMATRIX,
      [-0.4, -1.4, 0.2]
    );
    // rotate kaki kiri
    glMatrix.mat4.rotateX(
      cbadan.child[10].MOVEMATRIX,
      cbadan.child[10].MOVEMATRIX,
      Math.PI / 2
    );

    glMatrix.mat4.translate(
      ujung_tangan_kanan.MOVEMATRIX,
      ujung_tangan_kanan.MOVEMATRIX,
      [-0.37, -0.45, -100]
    );
    glMatrix.mat4.translate(
      ujung_tangan_kiri.MOVEMATRIX,
      ujung_tangan_kiri.MOVEMATRIX,
      [0.37, -0.45, -100]
    );

    glMatrix.mat4.translate(
      ujung_kaki_kanan.MOVEMATRIX,
      ujung_kaki_kanan.MOVEMATRIX,
      [0.4, -2.4, 0.2]
    );
    glMatrix.mat4.translate(
      ujung_kaki_kiri.MOVEMATRIX,
      ujung_kaki_kiri.MOVEMATRIX,
      [-0.4, -2.4, 0.2]
    );

    glMatrix.mat4.translate(
      mulut_kanan.MOVEMATRIX,
      mulut_kanan.MOVEMATRIX,
      [0.1, -0.11, 0.83]
    );
    glMatrix.mat4.translate(
      mulut_kiri.MOVEMATRIX,
      mulut_kiri.MOVEMATRIX,
      [-0.1, -0.11, 0.83]
    );
    glMatrix.mat4.translate(
      mulut_atas.MOVEMATRIX,
      mulut_atas.MOVEMATRIX,
      [0, 0.01, 0.83]
    );

    glMatrix.mat4.translate(
      chidung.MOVEMATRIX,
      chidung.MOVEMATRIX,
      [0, 0.01, 0.9]
    );

    glMatrix.mat4.translate(
      cbadanIkan.MOVEMATRIX,
      cbadanIkan.MOVEMATRIX,
      [0, -0.41, -100]
    );

    glMatrix.mat4.translate(
      cekorIkan.MOVEMATRIX,
      cekorIkan.MOVEMATRIX,
      [0.6, -0.5, -100]
    );
    // rotate ekor ikan
    glMatrix.mat4.rotateZ(
      cbadan.child[20].MOVEMATRIX,
      cbadan.child[20].MOVEMATRIX,
      Math.PI / 4
    );

    // origin point
    // 13
    let rot = glMatrix.quat.fromEuler(
      glMatrix.quat.create(),
      Math.PI / 2,
      0,
      0
    );
    let trans = glMatrix.vec3.fromValues(0.4, -2.4, 0.2);
    let scale = glMatrix.vec3.fromValues(1, 1, 1);
    let ori = glMatrix.vec3.fromValues(-0.4, 2.4, -0.2);
    glMatrix.mat4.fromRotationTranslationScaleOrigin(
      cbadan.child[13].MOVEMATRIX,
      rot,
      trans,
      scale,
      ori
    );

    // 14
    let rot1 = glMatrix.quat.fromEuler(
      glMatrix.quat.create(),
      Math.PI / 2,
      0,
      0
    );
    let trans1 = glMatrix.vec3.fromValues(-0.4, -2.4, 0.2);
    let scale1 = glMatrix.vec3.fromValues(1, 1, 1);
    let ori1 = glMatrix.vec3.fromValues(0.4, 2.4, -0.2);
    glMatrix.mat4.fromRotationTranslationScaleOrigin(
      cbadan.child[14].MOVEMATRIX,
      rot1,
      trans1,
      scale1,
      ori1
    );
    // PERGERAKAN
    // mata kanan
    let blinkValue =
      0.2 +
      Math.abs(Math.sin(time * bunny_blinkSpeed)) * (1 - bunny_blinkScale);
    glMatrix.mat4.scale(
      bunny_mata_kanan.MOVEMATRIX,
      bunny_mata_kanan.MOVEMATRIX,
      [1, blinkValue, 1]
    );

    // mata kiri
    glMatrix.mat4.scale(
      bunny_mata_kiri.MOVEMATRIX,
      bunny_mata_kiri.MOVEMATRIX,
      [1, blinkValue, 1]
    );

    // tangan kanan
    bunny_handRotateX = Math.sin(time * 0.001) * 0.5;
    glMatrix.mat4.rotateX(
      bunny_tangan_kanan.MOVEMATRIX,
      bunny_tangan_kanan.MOVEMATRIX,
      bunny_handRotateX
    );

    // tangan kiri
    bunny_handTranslateZ = Math.sin(time * 0.001) * 0.5;
    var hand = -1 * bunny_handTranslateZ;
    glMatrix.mat4.rotateX(
      bunny_tangan_kiri.MOVEMATRIX,
      bunny_tangan_kiri.MOVEMATRIX,
      bunny_handRotateX
    );

    // carrot
    bunny_carrotRotateX = Math.sin(time * 0.001) * 0.5;
    glMatrix.mat4.rotateX(
      bunny_carrot.MOVEMATRIX,
      bunny_carrot.MOVEMATRIX,
      bunny_carrotRotateX
    );

    // tutup carrot
    glMatrix.mat4.rotateX(
      bunny_tutup_carrot.MOVEMATRIX,
      bunny_tutup_carrot.MOVEMATRIX,
      bunny_handRotateX
    );
    glMatrix.mat4.translate(
      bunny_tutup_carrot.MOVEMATRIX,
      bunny_tutup_carrot.MOVEMATRIX,
      [0, 0, hand]
    );

    // daun
    glMatrix.mat4.rotateX(
      bunny_daun.MOVEMATRIX,
      bunny_daun.MOVEMATRIX,
      bunny_handRotateX
    );
    glMatrix.mat4.translate(bunny_daun.MOVEMATRIX, bunny_daun.MOVEMATRIX, [
      0,
      0,
      bunny_handTranslateZ,
    ]);

    if (Math.sin(time * blinkSpeed) > 0) {
      // mata kanan
      let blinkValue =
        0.2 + Math.abs(Math.sin(time * blinkSpeed)) * (1 - blinkScale);
      glMatrix.mat4.rotateY(
        duck_mata_kanan.MOVEMATRIX,
        duck_mata_kanan.MOVEMATRIX,
        rotationAngleY
      );
      glMatrix.mat4.scale(
        duck_mata_kanan.MOVEMATRIX,
        duck_mata_kanan.MOVEMATRIX,
        [1, blinkValue, 1]
      );

      // mata kiri
      glMatrix.mat4.rotateY(
        duck_mata_kiri.MOVEMATRIX,
        duck_mata_kiri.MOVEMATRIX,
        rotationAngleY
      );
      glMatrix.mat4.scale(
        duck_mata_kiri.MOVEMATRIX,
        duck_mata_kiri.MOVEMATRIX,
        [1, blinkValue, 1]
      );
    }

    if (jalan) {
      glMatrix.mat4.rotateX(
        duck_paha_kanan.MOVEMATRIX,
        duck_paha_kanan.MOVEMATRIX,
        degree
      );
      glMatrix.mat4.rotateX(
        duck_paha_kiri.MOVEMATRIX,
        duck_paha_kiri.MOVEMATRIX,
        degree + 45
      );
      degree += 0.021;
      degree = degree % 90;
      for (let i = 0; i < rotateObjects.length; i++) {
        //rotasi jari kaki
        let obj = rotateObjects[i].object;
        let rotation = rotateObjects[i].rotation;

        // Menghitung interpolasi rotasi untuk objek saat ini
        let interpolatedRotation =
          rotation + (nextRotation - rotation) * progress;
        glMatrix.mat4.rotateX(
          obj.MOVEMATRIX,
          obj.MOVEMATRIX,
          interpolatedRotation
        ); //merotasi objek dengan transformasi matrix
      }
    }

    if (sudut >= 20) {
      // rotate kaki
      sudut -= 0.1;
      satu += 0.00095;
      dua += 0.0014;
    }

    if (sudut2 <= 50) {
      // rotate tangan 1
      sudut2 += 0.1;
    }

    if (sudut3 >= -30) {
      // rotate kaki
      sudut3 -= 0.1;
    } else {
      selesai = true;
    }

    if (rkaki <= 1) {
      // rotate tangan 1
      rkaki += 0.1;
    }

    if (selesai == true) {
      one = 101.09;
      two = 101.19;
      tiga = 101.1;
      // rotate tangan seolah' naik turun
      if (naik) {
        makan += 0.1;
        if (makan >= 10) {
          naik = false;
        }
      } else {
        makan -= 0.1;
        if (makan <= 0) {
          naik = true;
        }
      }

      // translate ikan seolah' naik turun
      if (naik) {
        makanIkan -= 0.001;
      } else {
        makanIkan += 0.001;
      }
    }

    //rotate kaki kanan
    glMatrix.mat4.rotateX(
      cbadan.child[9].MOVEMATRIX,
      cbadan.child[9].MOVEMATRIX,
      (sudut * Math.PI) / 180 - Math.PI / 2
    );
    // rotate kaki kiri
    glMatrix.mat4.rotateX(
      cbadan.child[10].MOVEMATRIX,
      cbadan.child[10].MOVEMATRIX,
      (sudut * Math.PI) / 180 - Math.PI / 2
    );

    // rotate lengan kanan
    glMatrix.mat4.rotateY(
      cbadan.child[7].MOVEMATRIX,
      cbadan.child[7].MOVEMATRIX,
      Math.PI / 5 - (sudut2 * Math.PI) / 180
    );
    glMatrix.mat4.rotateX(
      cbadan.child[7].MOVEMATRIX,
      cbadan.child[7].MOVEMATRIX,
      (makan * Math.PI) / 180 + (sudut3 * Math.PI) / 180 - Math.PI / 2
    );
    // rotate lengan kiri
    glMatrix.mat4.rotateY(
      cbadan.child[8].MOVEMATRIX,
      cbadan.child[8].MOVEMATRIX,
      -Math.PI / 5 + (sudut2 * Math.PI) / 180
    );
    glMatrix.mat4.rotateX(
      cbadan.child[8].MOVEMATRIX,
      cbadan.child[8].MOVEMATRIX,
      (makan * Math.PI) / 180 + (sudut3 * Math.PI) / 180 - Math.PI / 2
    );

    // ikan naik turun
    glMatrix.mat4.translate(cbadanIkan.MOVEMATRIX, cbadanIkan.MOVEMATRIX, [
      0,
      makanIkan,
      one,
    ]);

    glMatrix.mat4.translate(cekorIkan.MOVEMATRIX, cekorIkan.MOVEMATRIX, [
      0,
      makanIkan,
      two,
    ]);

    // translate kaki putih
    glMatrix.mat4.translate(
      ujung_kaki_kanan.MOVEMATRIX,
      ujung_kaki_kanan.MOVEMATRIX,
      [0, satu, dua]
    );
    glMatrix.mat4.translate(
      ujung_kaki_kiri.MOVEMATRIX,
      ujung_kaki_kiri.MOVEMATRIX,
      [0, satu, dua]
    );

    // translate tangan putih
    glMatrix.mat4.translate(
      ujung_tangan_kanan.MOVEMATRIX,
      ujung_tangan_kanan.MOVEMATRIX,
      [0, makanIkan, tiga]
    );
    glMatrix.mat4.translate(
      ujung_tangan_kiri.MOVEMATRIX,
      ujung_tangan_kiri.MOVEMATRIX,
      [0, makanIkan, tiga]
    );

    time_prev = time;

    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    land.setuniformmatrix4(PROJMATRIX, VIEWMATRIX); //setUniform trmsk child
    land.child[0].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    land.child[1].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    land.child[2].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    land.child[3].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    land.child[4].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    land.child[5].setuniformmatrix4(PROJMATRIX, VIEWMATRIX);

    pohon_batang.setuniformmatrix4(PROJMATRIX, VIEWMATRIX); //setUniform trmsk child
    pohon_batang.draw();
    bunny_badan.setuniformmatrix4(PROJMATRIX, VIEWMATRIX); //setUniform trmsk child
    bunny_badan.draw();
    duck_badan.setuniformmatrix4(PROJMATRIX, VIEWMATRIX); //setUniform trmsk child
    duck_badan.draw();
    WORLD.setuniformmatrix4(PROJMATRIX, VIEWMATRIX);
    WORLD.draw();

    cbadan.setuniformmatrix4(PROJMATRIX, VIEWMATRIX); //setUniform trmsk child
    cbadan.draw();

    land.draw();

    GL.flush();
    window.requestAnimationFrame(animate);
  };
  animate();
}

window.addEventListener("load", main);
