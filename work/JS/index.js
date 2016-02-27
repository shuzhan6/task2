function init() {
  // renderer
  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas')
  });
  renderer.setClearColor(0x000000); // black
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;

  var scene = new THREE.Scene();

  var camera = new THREE.OrthographicCamera(-7, 7, 7, -7, 0.1, 100);
  camera.position.set(4, 3, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);


  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 1);
  //light.castShadow = true;
  scene.add(light);

  var light2 = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 2, 10);
  light2.position.set(2, 5, 3);
  light2.target.position.set(-3.5, -5, -5);
  //light2.castShadow = true;

  scene.add(light2);



  var H = new THREE.Mesh(new THREE.TextGeometry('H', {
    size: 2.5,
    height: 0.5,
    curveSegments: 100
  }), new THREE.MeshLambertMaterial({
    color: 0xff0000
  }));

  H.position.set(-3.5, 0, 1.5);
  H.rotation.y = H.rotation.y + Math.PI / 5;
  H.castShadow = true;
  scene.add(H);

  var C = new THREE.Mesh(new THREE.TextGeometry('C', {
    size: 2.5,
    height: 0.5,
    curveSegments: 100
  }), new THREE.MeshLambertMaterial({
    color: 0x0000ff
  }));

  C.position.set(-1, 0.2, 0.4);
  C.rotation.y = C.rotation.y + Math.PI / 5;
  C.castShadow = true;
  scene.add(C);

  var I = new THREE.Mesh(new THREE.TextGeometry('I', {
    size: 2.1,
    height: 0.5,
    curveSegments: 25
  }), new THREE.MeshLambertMaterial({
    color: 0x32cd32
  }));

  I.position.set(1, 0, -1.5);
  I.rotation.y = I.rotation.y + Math.PI / 5;
  I.castShadow = true;
  scene.add(I);


  var ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 100, 100),
    new THREE.MeshPhongMaterial({

      color: 0xffa500,
      shininess: 30


    })
  );
  ball.position.y = 5;
  ball.position.z = 3;
  ball.position.x = -5;
  ball.castShadow = true;
  scene.add(ball);

  var light3 = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 50);
  light3.position.set(2, 5, 3);
  light3.target = ball;
  //light3.castShadow = true;
  scene.add(light3);

  var a = -0.02;
  var v = 0;
  var b = 0;
  var c = 1;
  var isMoving = true;
  var k = 2;



  var plane = new THREE.Mesh(new THREE.PlaneGeometry(9, 9),
    new THREE.MeshPhongMaterial({
      color: 0xcccccc
    }));
  plane.rotation.x = -Math.PI / 2;
  plane.position.z = -1;
  plane.position.x = -1;
  //plane.receiveShadow = true;
  scene.add(plane);



  id = setInterval(draw, 10);

  function draw() {

    ball.position.y = ball.position.y + v;
    v = v + a;
    if (b <= 8) {
      ball.position.z = ball.position.z - 0.05;
      b = b + 0.05;
    }
    if (b > 8 && b <= 16) {
      ball.position.x = ball.position.x + 0.05;
      b = b + 0.05;
    }
    if (b > 16 && b <= 24) {
      ball.position.z = ball.position.z + 0.05;
      b = b + 0.05;
    }
    if (b > 24 && b <= 32) {
      ball.position.x = ball.position.x - 0.05;
      b = b + 0.05;
    }

    if (b > 32) {
      if (k >= 1) {
        ball.position.z = 3;
        ball.position.x = -5;
      }
      k = 0;
      ball.position.x = ball.position.x + 0.09;
      ball.position.z = -0.75 * ball.position.x - 0.8;
      if (ball.position.x >= 1.1) {
        clearInterval(id);
      }
    }


    if (ball.position.y <= 0.5) {
      v = -(v - a);

    }


    renderer.render(scene, camera);

  }
}
