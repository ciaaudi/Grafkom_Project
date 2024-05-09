/*========================= GET WEBGL CONTEXT ========================= */
var GL;

function generateTabung(posx, posy, posz, r, t) {
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

function generateBSpline(controlPoint, m, degree) {
  var curves = [];
  var knotVector = [];

  var n = controlPoint.length / 2;

  // Calculate the knot values based on the degree and number of control points
  for (var i = 0; i < n + degree + 1; i++) {
    if (i < degree + 1) {
      knotVector.push(0);
    } else if (i >= n) {
      knotVector.push(n - degree);
    } else {
      knotVector.push(i - degree);
    }
  }

  var basisFunc = function (i, j, t) {
    if (j == 0) {
      if (knotVector[i] <= t && t < knotVector[i + 1]) {
        return 1;
      } else {
        return 0;
      }
    }

    var den1 = knotVector[i + j] - knotVector[i];
    var den2 = knotVector[i + j + 1] - knotVector[i + 1];

    var term1 = 0;
    var term2 = 0;

    if (den1 != 0 && !isNaN(den1)) {
      term1 = ((t - knotVector[i]) / den1) * basisFunc(i, j - 1, t);
    }

    if (den2 != 0 && !isNaN(den2)) {
      term2 = ((knotVector[i + j + 1] - t) / den2) * basisFunc(i + 1, j - 1, t);
    }

    return term1 + term2;
  };

  for (var t = 0; t < m; t++) {
    var x = 0;
    var y = 0;

    var u =
      (t / m) * (knotVector[controlPoint.length / 2] - knotVector[degree]) +
      knotVector[degree];

    //C(t)
    for (var key = 0; key < n; key++) {
      var C = basisFunc(key, degree, u);
      // console.log(C);
      x += controlPoint[key * 2] * C;
      y += controlPoint[key * 2 + 1] * C;
      // console.log(t + " " + degree + " " + x + " " + y + " " + C);
    }
    curves.push(x);
    curves.push(y);
    curves.push(1);
  }
  // console.log(curves);
  return curves;
}

function generateKotak(curve, r) {
  // vertex
  var vertices = [];
  var posx, posy, posz;

  for (var j = 0; j <= curve / 3; j++) {
    // jumlah circle
    // bikin kotak nya
    // ambil x.y.z
    posx = curve[j * 3];
    posy = curve[j * 3 + 1];
    posz = curve[j * 3 + 2];

    var x = r + posx;
    var y = r + posy;
    var z = posz;

    vertices.push(x); // X Coordinate
    vertices.push(y); // Y Coordinate
    vertices.push(z); // Z Coordinate
    vertices.push(1);
    vertices.push(1);

    var x = posx - r;
    var y = r + posy;
    var z = posz;

    vertices.push(x); // X Coordinate
    vertices.push(y); // Y Coordinate
    vertices.push(z); // Z Coordinate
    vertices.push(1);
    vertices.push(1);

    var x = posx - r;
    var y = posy - r;
    var z = posz;

    vertices.push(x); // X Coordinate
    vertices.push(y); // Y Coordinate
    vertices.push(z); // Z Coordinate
    vertices.push(1);
    vertices.push(1);

    var x = r + posx;
    var y = posy - r;
    var z = posz;

    vertices.push(x); // X Coordinate
    vertices.push(y); // Y Coordinate
    vertices.push(z); // Z Coordinate
    vertices.push(1);
    vertices.push(1);
  }

  // faces
  var faces = [];
  for (var i = 0; i < vertices / 5; i++) {
    var a = i * 5;
    var b = i * 5 + 1;
    var c = i * 5 + 2;

    faces.push(a, c, b); //face one
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

    // this.cube_texture = LIBS.loadTexture("resources/wall.jpg");
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
    LIBS.translateX(this.MOVEMATRIX, z);
    LIBS.translateX(this.MOVEMATRIX, y);
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
  var ctabung = generateTabung(0, 0, 0, 0.1, 1);

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

  // Kumis
  var ctabung2 = generateTabung(0, 0, 0, 0.01, 0.7);

  // ====================================================================

  const control1 = [
    [0.063369397217929, -0.044654939106901326, 1],
    [(0.08809891808346215, -0.0311231393775373, 1)],
    [(0.1282843894899537, -0.025710419485791558, 1)],
    [(0.1808346213292118, -0.020297699594046037, 1)],
    [(0.2364760432766615, -0.012178619756427533, 1)],
  ];

  const control2 = [
    [0.057187017001545604, -0.05548037889039237, 1],
    [(0.09428129829984555, -0.05818673883626513, 1)],
    [(0.14374034003091185, -0.05277401894451961, 1)],
    [(0.22102009273570333, -0.05277401894451961, 1)],
    [(0.2982998454404946, -0.05277401894451961, 1)],
  ];

  const control3 = [
    [-0.007727975270479082, -0.04194857916102834, 1],
    [(-0.054095826893353904, -0.009472259810554773, 1)],
    [(-0.15919629057187012, 0.012178619756427644, 1)],
    [(-0.24265842349304478, 0.014884979702300405, 1)],
  ];

  const control4 = [
    [-0.020092735703245768, -0.05277401894451961, 1],
    [(-0.08191653786707886, -0.05277401894451961, 1)],
    [(-0.1715610510046368, -0.05277401894451961, 1)],
    [(-0.2302936630602782, -0.06359945872801087, 1)],
  ];

  //akan dipanggil di main
  const numberOfPoints = 20;
  const bezierCurve1 = new Curve(control1, numberOfPoints);
  const bezierCurve2 = new Curve(control2, numberOfPoints);
  const bezierCurve3 = new Curve(control3, numberOfPoints);
  const bezierCurve4 = new Curve(control4, numberOfPoints);

  const curve1 = bezierCurve1.getCurvePoints(); //xyz
  const curve2 = bezierCurve2.getCurvePoints(); //xyz
  const curve3 = bezierCurve3.getCurvePoints(); //xyz
  const curve4 = bezierCurve4.getCurvePoints(); //xyz

  const c_arrOfObjects1 = [];
  for (let i = 0; i < curve1.length; i += 3) {
    rr = 0.06;
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
    const temp_object = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    c_arrOfObjects1.push(temp_object);
  }

  const c_arrOfObjects2 = [];
  for (let i = 0; i < curve2.length; i += 3) {
    rr = 0.06;
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
    const temp_object = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    c_arrOfObjects2.push(temp_object);
  }

  const c_arrOfObjects3 = [];
  for (let i = 0; i < curve3.length; i += 3) {
    rr = 0.06;
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
    const temp_object = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    c_arrOfObjects3.push(temp_object);
  }

  const c_arrOfObjects4 = [];
  for (let i = 0; i < curve4.length; i += 3) {
    rr = 0.06;
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
    const temp_object = new MyObject(
      temp[0],
      temp[1],
      shader_vertex_source,
      shader_fragment_source
    );
    c_arrOfObjects4.push(temp_object);
  }

  //=========================================================
  /*---- CREATE OBJECT ---- */
  //Object (vertex,face,shader,fragment)
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
  var ckumis1 = new MyObject(
    ctabung2[0],
    ctabung2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var ckumis2 = new MyObject(
    ctabung2[0],
    ctabung2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var ckumis3 = new MyObject(
    ctabung2[0],
    ctabung2[1],
    shader_vertex_source,
    shader_fragment_source
  );
  var ckumis4 = new MyObject(
    ctabung2[0],
    ctabung2[1],
    shader_vertex_source,
    shader_fragment_source
  );

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
  cbadan.addChild(ckumis1);
  cbadan.addChild(ckumis2);
  cbadan.addChild(ckumis3);
  cbadan.addChild(ckumis4);

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
  cbadan.loadTexturee("grey.png");
  cbadan.child[0].loadTexturee("black.jpg");
  cbadan.child[1].loadTexturee("black.jpg");
  cbadan.child[2].loadTexturee("grey.png");
  cbadan.child[3].loadTexturee("grey.png");
  cbadan.child[4].loadTexturee("grey.png");
  cbadan.child[5].loadTexturee("pink2.jpg");
  cbadan.child[6].loadTexturee("pink2.jpg");
  cbadan.child[7].loadTexturee("grey.png");
  cbadan.child[8].loadTexturee("grey.png");
  cbadan.child[9].loadTexturee("grey.png");
  cbadan.child[10].loadTexturee("grey.png");
  cbadan.child[11].loadTexturee("whitee.png");
  cbadan.child[12].loadTexturee("whitee.png");
  cbadan.child[13].loadTexturee("whitee.png");
  cbadan.child[14].loadTexturee("whitee.png");
  cbadan.child[15].loadTexturee("whitee.png");
  cbadan.child[16].loadTexturee("whitee.png");
  cbadan.child[17].loadTexturee("whitee.png");
  cbadan.child[18].loadTexturee("pink2.jpg");
  cbadan.child[19].loadTexturee("gold.jpg");
  cbadan.child[20].loadTexturee("gold.jpg");
  cbadan.child[21].loadTexturee("black.jpg");
  cbadan.child[22].loadTexturee("black.jpg");
  cbadan.child[23].loadTexturee("black.jpg");
  cbadan.child[24].loadTexturee("black.jpg");
  for (
    let i = 25;
    i <
    c_arrOfObjects1.length +
      c_arrOfObjects2.length +
      c_arrOfObjects3.length +
      c_arrOfObjects4.length +
      25;
    i++
  ) {
    cbadan.child[i].loadTexturee("black.jpg");
  }

  /*========================= MATRIX ========================= */

  var PROJMATRIX = LIBS.get_projection(
    40,
    CANVAS.width / CANVAS.height,
    1,
    100
  );
  var VIEWMATRIX = LIBS.get_I4();

  LIBS.translateZ(VIEWMATRIX, -5); //ubah view
  var THETA = 0,
    PHI = 0;

  /*========================= DRAWING ========================= */
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(1.0, 0.0, 0.0, 0.0);
  GL.clearDepth(1.0);

  // move
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

  var animate = function (time) {
    if (!drag) {
      (dX *= AMORTIZATION), (dY *= AMORTIZATION);
      (THETA += dX), (PHI += dY); //derajat x,y
    }
    cbadan.MOVEMATRIX = glMatrix.mat4.create();

    //rotasi cara libs
    cbadan.setIdentityMove();
    cbadan.setRotateMove(PHI, THETA, 0);
    cbadan.setTranslateMove(0, 0, 0);

    for (let i = 0; i < cbadan.child.length; i++) {
      cbadan.child[i].setIdentityMove();
      cbadan.child[i].setRotateMove(PHI, THETA, 0);
      cbadan.child[i].setTranslateMove(0, 0, 0);
    }

    // TRANSLASI ==============================================================

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

    glMatrix.mat4.translate(
      ckumis1.MOVEMATRIX,
      ckumis1.MOVEMATRIX,
      [0.1, -0.1, 0.82]
    );

    glMatrix.mat4.rotateY(
      cbadan.child[21].MOVEMATRIX,
      cbadan.child[21].MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.translate(
      ckumis2.MOVEMATRIX,
      ckumis2.MOVEMATRIX,
      [-0.1, -0.1, 0.82]
    );
    glMatrix.mat4.rotateY(
      cbadan.child[22].MOVEMATRIX,
      cbadan.child[22].MOVEMATRIX,
      -Math.PI / 2
    );
    glMatrix.mat4.translate(
      ckumis3.MOVEMATRIX,
      ckumis3.MOVEMATRIX,
      [0.1, 0.1, 0.83]
    );
    glMatrix.mat4.rotateY(
      cbadan.child[23].MOVEMATRIX,
      cbadan.child[23].MOVEMATRIX,
      Math.PI / 2
    );
    glMatrix.mat4.rotateX(
      cbadan.child[23].MOVEMATRIX,
      cbadan.child[23].MOVEMATRIX,
      -Math.PI / 5
    );
    glMatrix.mat4.translate(
      ckumis4.MOVEMATRIX,
      ckumis4.MOVEMATRIX,
      [-0.1, 0.1, 0.83]
    );
    glMatrix.mat4.rotateY(
      cbadan.child[24].MOVEMATRIX,
      cbadan.child[24].MOVEMATRIX,
      -Math.PI / 2
    );
    glMatrix.mat4.rotateX(
      cbadan.child[24].MOVEMATRIX,
      cbadan.child[24].MOVEMATRIX,
      -Math.PI / 5
    );

    //=============================== PERGERAKAN ========================
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

    // let rot = glMatrix.quat.fromEuler(glMatrix.quat.create(), PHI, THETA, 0);
    // let trans = glMatrix.vec3.fromValues(0, 0, 0);
    // let scale = glMatrix.vec3.fromValues(1, 1, 1);
    // let ori = glMatrix.vec3.fromValues(-1, -2, -1);
    // glMatrix.mat4.fromRotationTranslationScaleOrigin(
    //   ujung_kaki_kanan.MOVEMATRIX,
    //   rot,
    //   trans,
    //   scale,
    //   ori
    // );

    // rotate badan
    // dX += 0.0005;

    // ======================================================================
    time_prev = time;

    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    cbadan.setuniformmatrix4(PROJMATRIX, VIEWMATRIX); //setUniform trmsk child
    cbadan.draw();

    GL.flush();
    window.requestAnimationFrame(animate);
  };

  animate();
}

window.addEventListener("load", main);
