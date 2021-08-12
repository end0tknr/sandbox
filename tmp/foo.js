var world;
var groundMat;
var phyPlane;
var sphereMat;
var sphereMat2;
var sphereMat3;
var holeMat3;
var phySphere;
var phySphere2;
var phySphere3;
var phyHole;
var spherePlaneCM;
var spherePlaneCM2;
var spherePlaneCM3;
var sphereHoleCM;
var scene;
var camera;
var viewPlane;
var viewSphere;
var viewSphere2;
var viewSphere3;
var viewHole;
var renderer;
var controls;

// -10〜10の乱数
var rand = Math.random()*20 - 10;

// テクスチャー
var textureHayachi;

var manifest = [
  { id: 'hayachi', src: 'https://82mou.github.io/img/hayachi-large.jpg'}, // はやち
];

// ロードキューを作成
var loadQueue = new createjs.LoadQueue();

// ロード完了を監視
loadQueue.on('complete', function() {
  // loadQueueからロードした画像データを取得
  var hayachiImg = loadQueue.getResult('hayachi');

  // three.jsで使えるテクスチャーに変換
  textureHayachi = new THREE.Texture(hayachiImg);

  // 【重要】更新を許可
  textureHayachi.needsUpdate = true;
  
  setPhy();
  setView();
  animate();
});

// テクスチャーのロードを開始
loadQueue.loadManifest(manifest);


function setPhy() {
  /*
   * 物理世界の初期設定
   */
  // 物理世界を生成
  world = new CANNON.World();
  // 重力を設定
  world.gravity.set(0, -9.82, 0);
  // ぶつかっている「可能性のある」剛体同士を見つける作業
  world.broadphase = new CANNON.NaiveBroadphase();
  // 反復計算回数
  world.solver.iterations = 5;
  // 許容値
  world.solver.tolerance = 0.1;
  
  /*
   * Materialの物理定義
   */
  // Plane Material（地面）
  groundMat = new CANNON.Material('groundMat');
  // Plane Materialの質量定義
  phyPlane = new CANNON.Body({
    mass: 0,
    material: groundMat
  });
  phyPlane.addShape(new CANNON.Plane());
  // X軸に90度に回転
  phyPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  // 物理世界に追加
  world.add(phyPlane);
  
  // Sphere Material
  sphereMat = new CANNON.Material('sphereMat');
  // Sphereのシェイプの質量定義
  phySphere = new CANNON.Body({
    mass: 1,
    material: sphereMat
  });
  phySphere.addShape(new CANNON.Sphere(1));
  phySphere.position.set(20, 1, 0); // 剛体の位置
  // 角速度設定
  phySphere.velocity.set(0, 0, 0);
  // 減衰率
  phySphere.angularDamping = 0.1;
  // 物理世界に追加
  world.add(phySphere);
  
  // Sphere Material2
  sphereMat2 = new CANNON.Material('sphereMat2');
  // Sphere Material2シェイプの質量定義
  phySphere2 = new CANNON.Body({
    mass: 1,
    material: sphereMat2
  });
  phySphere2.addShape(new CANNON.Sphere(1));
  phySphere2.position.set(10, 1, 0); // 剛体の位置
  // 角速度設定
  phySphere2.velocity.set(0, 0, 0);
  // 減衰率
  phySphere2.angularDamping = 0.1;
  // 物理世界に追加
  world.add(phySphere2);
  
  // はやちボール
  sphereMat3 = new CANNON.Material('sphereMat3');
  // はやちボールの質量定義
  phySphere3 = new CANNON.Body({
    mass: 2,
    material: sphereMat3
  });
  phySphere3.addShape(new CANNON.Sphere(2));
  phySphere3.position.set(-10, 2, rand); // 剛体の位置
  // 角速度設定
  phySphere3.velocity.set(0, 0, 0);
  // 減衰率
  phySphere3.angularDamping = 0.1;
  // 物理世界に追加
  world.add(phySphere3);
  
  // Hole Material3
  // holeMat = new CANNON.Material('holeMat');
  // Sphere2のシェイプの質量定義
  // phyHole = new CANNON.Body({
  //   mass: 0,
  //   material: holeMat
  // });
  // phyHole.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  // phyHole.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
  // phyHole.position.set(0, 0, 0); // 剛体の位置
  // 物理世界に追加
  // world.add(phyHole);
  
  /*
   * Material同士の接触設定
   */
  //SphereとSphere2が接触した際のContactMaterialを生成  
  sphereSphereCM = new CANNON.ContactMaterial(
    sphereMat,  //ひとつ目のマテリアル
    sphereMat2, //ふたつ目のマテリアル
    {
      contactEquationRelaxation: 3, // 接触式の緩和性
      contactEquationStiffness: 10000000, // 接触式の剛性
      friction: 0.3, //摩擦係数
      frictionEquationRelaxation: 3, // 摩擦式の剛性
      frictionEquationStiffness: 10000000, // 摩擦式の緩和性
      restitution: 0.3 // 反発係数
    }
  );
  //生成したContactMaterialをworldに追加
  world.addContactMaterial(sphereSphereCM);
  
  //地面とSphereが接触した際のContactMaterialを生成
  spherePlaneCM = new CANNON.ContactMaterial(
    groundMat,  //ひとつ目のマテリアル
    sphereMat, //ふたつ目のマテリアル
    {
      friction: 0, //friction（摩擦係数）
      restitution: 0 //restitution（反発係数）
    }
  );
  //生成したContactMaterialをworldに追加
  world.addContactMaterial(spherePlaneCM);
  
  //地面とSphereが接触した際のContactMaterialを生成
  spherePlaneCM2 = new CANNON.ContactMaterial(
    groundMat,  //ひとつ目のマテリアル
    sphereMat2, //ふたつ目のマテリアル
    {
      friction: 0, //friction（摩擦係数）
      restitution: 0 //restitution（反発係数）
    }
  );
  //生成したContactMaterialをworldに追加
  world.addContactMaterial(spherePlaneCM2);
  
  //Sphereと穴が接触した際のContactMaterialを生成
  // sphereHoleCM = new CANNON.ContactMaterial(
  //   sphereMat2,  //ひとつ目のマテリアル
  //   holeMat, //ふたつ目のマテリアル
  //   {
  //     contactEquationRelaxation: -3, // 接触式の緩和性
  //     contactEquationStiffness: 10000000, // 接触式の剛性
  //     friction: -1, //摩擦係数
  //     frictionEquationRelaxation: -3, // 摩擦式の剛性
  //     frictionEquationStiffness: 10000000, // 摩擦式の緩和性
  //     restitution: -1 // 反発係数
  //   }
  // );
  //生成したContactMaterialをworldに追加
  // world.addContactMaterial(sphereHoleCM);
  
  world.bsc_dist = new CANNON.Vec3();
}

function boundingSphereCheck(bodyA,bodyB){
    world.dist = new CANNON.Vec3();
  // console.log(world.dist.x);
    bodyA.position.vsub(bodyB.position, world.dist);
  // console.log(bodyA.position.vsub);
  // console.log(bodyB.position); 
  // console.log(bodyA.position.vsub(bodyB.position,dist));
  // console.log(bodyA.shapes[0].boundingSphereRadius);
  // console.log(bodyB.shapes[0].boundingSphereRadius);
  // console.log(Math.pow(bodyA.shapes[0].boundingSphereRadius + bodyB.shapes[0].boundingSphereRadius,2));
  // console.log(world.dist.norm2());
    return Math.pow(bodyA.shapes[0].boundingSphereRadius + bodyB.shapes[0].boundingSphereRadius,2) > world.dist.norm2();
};

/*
 * THREE.jsの設定
 */
function setView() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 1, 100);
  camera = new THREE.PerspectiveCamera(40, 650 / 400, 1, 10000);
  camera.position.set(50, 15, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);
  var light = new THREE.DirectionalLight(0xffffff, 2);
  
  light.position.set(5, 10, -10);
  light.castShadow = true;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  light.shadowCameraLeft = -10;
  light.shadowCameraRight = 10;
  light.shadowCameraTop = 10;
  light.shadowCameraBottom = -10;
  light.shadowCameraFar = 100;
  light.shadowCameraNear = 0;
  light.shadowDarkness = 0.5;
  scene.add(light);
  var amb = new THREE.AmbientLight(0x999999);
  scene.add(amb);
  
  
  viewPlane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshPhongMaterial({
    color: 0x333333
  }));
  viewPlane.rotation.x = -Math.PI / 2;
  viewPlane.position.y = 1 / 30;
  viewPlane.receiveShadow = true;
  scene.add(viewPlane);
  
  
  viewSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshLambertMaterial(
      {
        color: 0xffffff
      }
    )
  );
  viewSphere.castShadow = true;
  viewSphere.receiveShadow = true;
  viewSphere.position = phySphere.position;
  scene.add(viewSphere);
  
  
  viewSphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshLambertMaterial(
      {
        color: 0xffffff
      }
    )
  );
  viewSphere2.castShadow = true;
  viewSphere2.receiveShadow = true;
  viewSphere2.position = phySphere2.position;
  scene.add(viewSphere2);
  
  
  viewSphere3 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 50, 50),
    new THREE.MeshLambertMaterial(
      {
        map: textureHayachi,
        side: THREE.DoubleSide // 裏からも見えるようにする
      }
    )
  );
  viewSphere3.castShadow = true;
  viewSphere3.receiveShadow = true;
  viewSphere3.position = phySphere3.position;
  scene.add(viewSphere3);
 
  
  // viewHole = new THREE.Mesh(
  //   new THREE.CircleGeometry(3, 32),
  //   new THREE.MeshBasicMaterial({
  //     color: 0xffff00,
  //     side: THREE.DoubleSide // 裏からも見えるようにする
  //   })
  // );
  // viewHole.position.set(0, 0.1, 0);
  // viewHole.rotation.set(Math.PI/2,0,0); 
  // console.log(viewHole.position);
  // scene.add(viewHole);
  
  
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(650, 400);
  renderer.setClearColor(0x000000, 1);
  renderer.shadowMapEnabled = true;
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  
  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 0;   //近づける距離の最小値
  controls.maxDistance = 9800;   //遠ざかれる距離の最大値
}


function animate() {
  requestAnimationFrame(animate);
  // 物理エンジンの時間を進める
  world.step(1 / 60);
  viewSphere.position.copy(phySphere.position);
  viewSphere.quaternion.copy(phySphere.quaternion);
  viewSphere2.position.copy(phySphere2.position);
  viewSphere2.quaternion.copy(phySphere2.quaternion);
  viewSphere3.position.copy(phySphere3.position);
  viewSphere3.quaternion.copy(phySphere3.quaternion);
  controls.update();
  // レンダリング
  renderer.render(scene, camera);
  // console.log(boundingSphereCheck(phySphere2, phySphere3));
  // if(boundingSphereCheck(phySphere2, phySphere3)) {
  //    console.log('おめでとう！');
  //    }
}


var angle = 0;

$('.js-range').on('change', function(e) {
  e.preventDefault();
  angle = parseInt($(this).val(), 10);
});

$('.js-fire').on('click', function(e) {
  e.preventDefault();
  phySphere.velocity.set(-20, 0, -angle);
});
