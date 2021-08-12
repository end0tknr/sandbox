// refer to https://qiita.com/DAI788/items/1b302ed9840c65e0193c

//迷路の地図データ

// ┌─────┬──────┬───┬─────┐
// │          │            │      │ 【START】│
// │  ┌─┐  │  ───┐  │  │  │  ────┤
// │  │  │  │        │  │  │              │
// │  │  │  │    ┐            │   ──── │
// │  │  │        │        │  │            │
// │      └─┬──┤    ──┘  └────┐  │
// │          │    │                      │  │
// ├───    │    │  │  ───┐        │  │
// │                    │        │  │        │
// │  ────┐        │        │  └────┤
// │          │    │  │  │                  │
// ├─        └──┤  └─┤  ┌─────┐  │
// │                │          │          │  │
// │  ┌───  │  │  ──┐  │        ─┘  │
// │  │        │          │  │              │
// │  └─┐    │          │  │      ────┤
// │      │    │  ───  │                  │
// ├─    │    │          │  ───────  │
// │      │    │          │                  │
// │  ──┴──┴─────┴─────────┘

var mapData = [
    "50_10","49_10","48_10","47_10","46_10","45_10","44_10","43_10","42_10",
    "41_10","40_10","39_10","38_10","37_10","36_10","35_10","34_10","33_10",
    "32_10","31_10","30_10","29_10","28_10","27_10","26_10","25_10","24_10",
    "23_10","22_10","21_10","20_10","19_10","18_10","17_10","16_10","15_10",
    "14_10","13_10","12_10","11_10","10_10","50_11","33_11","25_11","14_11",
    "50_12","33_12","25_12","14_12","50_13","33_13","25_13","14_13","50_14",
    "46_14","45_14","44_14","43_14","42_14","41_14","40_14","39_14","38_14",
    "37_14","33_14","29_14","25_14","21_14","20_14","19_14","18_14","10_14",
    "50_15","46_15","33_15","29_15","21_15","18_15","10_15","50_16","46_16",
    "33_16","29_16","21_16","18_16","10_16","50_17","46_17","45_17","44_17",
    "43_17","42_17","41_17","40_17","39_17","38_17","37_17","33_17","29_17",
    "21_17","18_17","17_17","16_17","15_17","14_17","13_17","12_17","11_17",
    "10_17","50_18","37_18","29_18","21_18","10_18","50_19","37_19","29_19",
    "10_19","50_20","37_20","29_20","10_20","50_21","49_21","48_21","47_21",
    "46_21","45_21","44_21","43_21","42_21","41_21","37_21","36_21","35_21",
    "34_21","33_21","29_21","28_21","27_21","26_21","25_21","10_21","50_22",
    "37_22","25_22","21_22","20_22","19_22","18_22","17_22","16_22","15_22",
    "14_22","13_22","12_22","11_22","10_22","50_23","37_23","25_23","10_23",
    "50_24","37_24","25_24","10_24","50_25","46_25","41_25","37_25","25_25",
    "10_25","50_26","46_26","41_26","40_26","39_26","38_26","37_26","36_26",
    "35_26","34_26","30_26","29_26","28_26","27_26","26_26","25_26","24_26",
    "23_26","22_26","21_26","10_26","50_27","46_27","15_27","10_27","50_28",
    "46_28","15_28","10_28","50_29","46_29","15_29","10_29","50_30","46_30",
    "45_30","44_30","43_30","42_30","38_30","34_30","33_30","32_30","31_30",
    "30_30","29_30","28_30","27_30","21_30","15_30","10_30","50_31","38_31",
    "27_31","21_31","10_31","50_32","38_32","27_32","21_32","10_32","50_33",
    "38_33","27_33","21_33","10_33","50_34","49_34","48_34","47_34","46_34",
    "45_34","41_34","40_34","39_34","38_34","34_34","30_34","29_34","28_34",
    "27_34","26_34","25_34","21_34","20_34","19_34","18_34","17_34","16_34",
    "15_34","14_34","13_34","12_34","11_34","10_34","50_35","34_35","10_35",
    "50_36","34_36","10_36","50_37","34_37","10_37","50_38","46_38","45_38",
    "44_38","43_38","42_38","41_38","40_38","39_38","38_38","34_38","33_38",
    "32_38","31_38","27_38","26_38","25_38","24_38","23_38","22_38","21_38",
    "20_38","19_38","10_38","50_39","38_39","27_39","15_39","10_39","50_40",
    "38_40","27_40","15_40","10_40","50_41","38_41","27_41","15_41","10_41",
    "50_42","49_42","48_42","47_42","46_42","42_42","38_42","34_42","33_42",
    "32_42","31_42","27_42","15_42","10_42","50_43","42_43","38_43","31_43",
    "27_43","23_43","19_43","15_43","10_43","50_44","42_44","38_44","31_44",
    "27_44","23_44","19_44","15_44","10_44","50_45","42_45","38_45","31_45",
    "27_45","23_45","19_45","15_45","10_45","50_46","46_46","42_46","38_46",
    "37_46","36_46","35_46","31_46","27_46","26_46","25_46","24_46","23_46",
    "19_46","15_46","10_46","50_47","46_47","31_47","19_47","10_47","50_48",
    "46_48","31_48","19_48","10_48","50_49","46_49","31_49","19_49","10_49",
    "50_50","49_50","48_50","47_50","46_50","45_50","44_50","43_50","42_50",
    "41_50","40_50","39_50","38_50","37_50","36_50","35_50","34_50","33_50",
    "32_50","31_50","30_50","29_50","28_50","27_50","26_50","25_50","24_50",
    "23_50","22_50","21_50","20_50","19_50","18_50","17_50","16_50","15_50",
    "14_50","13_50","12_50","11_50","10_50"];

//描画sizeは、ブラウザ全体
var wSizeWidth  = window.innerWidth;
var wSizeHeight = window.innerHeight;

//迷路内を移動する自分自身
var selfData = new Object();
selfData.angle  = 270;
selfData.height = 2;
selfData.speed  = 5;

//スタート位置
var startPos = "48_48";
var sPos = startPos.split("_");
selfData.posX   = Number(sPos[0]);
selfData.posY   = Number(sPos[1]);

//地図データ
var boxObjArray = [];

for(var i = 0; i < mapData.length; i++){
    var wall = mapData[i].split("_"); //XとZのデータを分割
    
    boxObjArray[i] = createBoxObject(
        [Number(wall[0]), 1, Number(wall[1]) ]
    );
}

var thrBoxArray = [];
var selfObj;

//Texture---------------------------------------------------------------
var ground_texture = THREE.ImageUtils.loadTexture( 'img/ground.jpg' );
ground_texture.wrapS = ground_texture.wrapT = THREE.RepeatWrapping;
ground_texture.repeat.set( 64, 64 );

var wall_texture = THREE.ImageUtils.loadTexture( 'img/images/wall.jpg' );

var world = setPhysics(); //物理情報設定

var ret_vals = setView();
var renderer = ret_vals[0];
var scene    = ret_vals[1];
var camera   = ret_vals[2];

animate();

function setPhysics() {
    var world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);   //重力設定
    
    //衝突している剛体の判定.
    //物理演算は処理の重いものなので、全てを計算するのではなく、
    //ぶつかっている可能性のあるものをピックアップし、
    //その後実際に計算.
    // https://qiita.com/o_tyazuke/items/3481ef1a31b2a4888f5d
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;     //反復計算回数
    world.solver.tolerance = 0.1;     //許容値
    
    //地面を作成
    var groundMat = new CANNON.Material('groundMat');
    groundMat.friction    = 0.3;  //摩擦係数
    groundMat.restitution = 0.5;  //反発係数
    
    var phyPlane = new CANNON.Body({mass: 0});
    phyPlane.material = groundMat;
    phyPlane.addShape(new CANNON.Plane());
    //回転
    phyPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2 );
    
    world.add(phyPlane); //物理世界に追加
    
    //Cannon Box--------------------------------------------------------------
    //壁オブジェクト
    var canBoxArray = [];
    for( cnt=0; cnt<boxObjArray.length; cnt++){
        canBoxArray[cnt] = makeCannonBox(
            [boxObjArray[cnt].posX,
             boxObjArray[cnt].posY,
             boxObjArray[cnt].posZ],
            
            [boxObjArray[cnt].sizeX,
             boxObjArray[cnt].sizeY,
             boxObjArray[cnt].sizeZ],
            
            [boxObjArray[cnt].velocX,
                   boxObjArray[cnt].velocY,
                   boxObjArray[cnt].velocZ],
                  
                  [boxObjArray[cnt].angVelocX,
                   boxObjArray[cnt].angVelocY,
                   boxObjArray[cnt].angVelocZ],
                  
                  boxObjArray[cnt].mass,
                  boxObjArray[cnt].dampVal);
              
              world.add(canBoxArray[cnt]);
          }
          
          //自分自身を表す球体オブジェクトを作成
          sphereShape = new CANNON.Sphere(1); //半径1の球体を作成
          
          var sphereMat = new CANNON.Material('sphereMat');
          sphereMat.friction = 0.8;       //摩擦係数
          sphereMat.restitution = 0.5;    //反発係数
          
          selfObj = new CANNON.Body({mass: 1});      //ボディを作成
          selfObj.material = sphereMat;              //ボディにマテリアルを設定
          
          
          selfObj.addShape(sphereShape);         //球体を作成
          selfObj.position.x = selfData.posX;    //初期位置を設定
          selfObj.position.y = selfData.height;  //初期位置を設定
          selfObj.position.z = selfData.posY;    //初期位置を設定
          world.add(selfObj); //物理世界に追加

          return world;
      }
      
      function setView() {
          var scene = new THREE.Scene();                //Three.jsの世界（シーン）を作成
          scene.fog = new THREE.Fog(0x000000, 1, 100);  //フォグ（黒色）を作成
          
          //カメラ
          var camera = new THREE.PerspectiveCamera(90, 800 / 600, 0.1, 10000);
          //カメラの位置を設定
          camera.position.set(Math.cos(Math.PI / 5) * 30, 5, Math.sin(Math.PI / 5) * 80);
          changeLookAt( camera );  //カメラの注視点を設定
          
          scene.add(camera);
          
          //ライト
          var light = new THREE.DirectionalLight(0xffffff, 0.5);
          light.position.set(10, 10, -10);      //光源位置
          light.castShadow = true;              //影を作る
          light.shadowMapWidth     = 2024;      //影の精細さ(解像度)
          light.shadowMapHeight    = 2024;
          light.shadowCameraLeft   = -50;       //ライト視点方向の影の表示度合い
          light.shadowCameraRight  = 50;
          light.shadowCameraTop    = 50;
          light.shadowCameraBottom = -50;
          light.shadowCameraFar = 100;      //影の範囲
          light.shadowCameraNear = 0;
          light.shadowDarkness = 0.5;       //影の透明度
          scene.add(light);
          
          var amb   = new THREE.AmbientLight(0xffffff);  //全体に光を当てる光源
          scene.add(amb);
          
          
          //壁オブジェクト作成
          for( cnt2=0; cnt2<boxObjArray.length; cnt2++){

              thrBoxArray[cnt2] = makeThreeBox(
                  [boxObjArray[cnt2].posX,
                   boxObjArray[cnt2].posY,
                   boxObjArray[cnt2].posZ ],
                  [boxObjArray[cnt2].sizeX,
                   boxObjArray[cnt2].sizeY,
                   boxObjArray[cnt2].sizeZ] );
              
              scene.add(thrBoxArray[cnt2]);
          }
          
          
          //地面の形状
          var graMeshGeometry = new THREE.PlaneGeometry(300, 300);
          var graMaterial = new THREE.MeshBasicMaterial({
              map: ground_texture
          });
          
          var viewPlane = new THREE.Mesh(graMeshGeometry, graMaterial);
          viewPlane.rotation.x = -Math.PI / 2;  //地面を回転
          viewPlane.position.y = 1 / 2;         //地面の位置を設定
          viewPlane.receiveShadow = true;       //地面に影を表示する
          scene.add(viewPlane);
          
          //レンダラー
          var renderer = new THREE.WebGLRenderer({antialias: true});
          //描画sizeは、ブラウザ全体
          renderer.setSize(wSizeWidth, wSizeHeight);
          
          renderer.setClearColor(0xffffff, 1);
          renderer.shadowMapEnabled = true;
          document.body.appendChild(renderer.domElement);
          
          renderer.render(scene, camera);
	  return [renderer, scene, camera];
      }
      
      function animate() {
          requestAnimationFrame(animate);
          // 物理エンジンの時間を進行
          world.step(1 / 60);
          
          //カメラ位置の設定
          camera.position.set(selfObj.position.x, selfObj.position.y + 1.6, selfObj.position.z);
          
          // レンダリング
          renderer.render(scene, camera);
      }
      
      //操作ボタン
      changeBtnPos(wSizeWidth,wSizeHeight);  //ボタン位置の変更
      
      $('#forward').click(function(e) { forward(); });
      $('#stop').click(function(e) { stop(); });
      $('#back').click(function(e) { back(); });
      $('#jump').click(function(e) { 
          stop();
          selfObj.velocity.y = 10; //ジャンプ時の上方向加速度
      });
      $('#turn_right').click(function(e) {
          selfData.angle += 5;
          stop();
          changeLookAt(camera);
      });
      $('#turn_left').click(function(e) {
          selfData.angle -= 5;
          stop();
          changeLookAt(camera);
      });
      
      //前進
      function forward(){
          var theta = selfData.angle / 180 * Math.PI;
          selfObj.velocity.x = Math.cos(theta) * selfData.speed;
          selfObj.velocity.z = Math.sin(theta) * selfData.speed;
      }
      
      //停止
      function stop(){
          selfObj.velocity.x = 0;
          selfObj.velocity.z = 0;
      }
      
      //後進
      function back(){
          var theta = selfData.angle / 180 * Math.PI;
          selfObj.velocity.x = -1 * Math.cos(theta);
          selfObj.velocity.z = -1 * Math.sin(theta);
      }
      
      //注視点を設定
      function changeLookAt(camera){
          var theta = selfData.angle / 180 * Math.PI;
          var posX = selfData.posX + Math.cos(theta) * 10000;
          var posY = selfData.posY + Math.sin(theta) * 10000;
          camera.lookAt(new THREE.Vector3(posX, 0, posY));
      }
      
      //ボタン位置の変更
      function changeBtnPos(wSizeWidth,wSizeHeight){
          var btn_size = 100;
          
          //set button position
          $('#turn_right').css('top', wSizeHeight - (btn_size + 5));
          $('#turn_right').css('left', (btn_size + 10));
          $('#turn_left').css('top', wSizeHeight - (btn_size + 5));
          $('#turn_left').css('left', 5);
          $('#back').css('top', (wSizeHeight - btn_size) - 5);
          $('#back').css('left', (wSizeWidth - btn_size) - 5);
          $('#stop').css('top', (wSizeHeight - (btn_size * 2)) - (5 * 2));
          $('#stop').css('left', (wSizeWidth - btn_size) - 5);
          $('#forward').css('top', (wSizeHeight - (btn_size * 3)) - (5 * 3));
          $('#forward').css('left', (wSizeWidth - btn_size) - 5);
          $('#jump').css('top', (wSizeHeight - (btn_size * 4)) - (5 * 4));
          $('#jump').css('left', (wSizeWidth - btn_size) - 5);
      }
      
      // mode==0
      function makeThreeBox( pos_xyz, size_xyz ){
          
          var retObj = null;
          var thrBox = null;
          var canBox = null;
          
          //Three.jsのオブジェクトを作成
          thrBox = new THREE.Mesh(
              new THREE.BoxGeometry(size_xyz[0],size_xyz[1],size_xyz[2], 10, 10),
              new THREE.MeshBasicMaterial( {map: wall_texture,
                                            //color: color
                                           })
          );
          
          thrBox.castShadow = true;
          thrBox.receiveShadow = true;
          thrBox.position.x = pos_xyz[0];
          thrBox.position.y = pos_xyz[1] + ( pos_xyz[1] /2 );
          thrBox.position.z = pos_xyz[2];
          
          return thrBox;
      }
      
      function makeCannonBox(
          pos_xyz,
          size_xyz,
          veloc_xyz,
          angVeloc_xyz,
          mass,
          dampVal){
          
          //cannon.jsのオブジェクトを作成
          var canBox = new CANNON.Body({mass: mass});
          canBox.addShape(
              new CANNON.Box(
                  new CANNON.Vec3(size_xyz[0]/2, size_xyz[1]/2, size_xyz[2]/2)
              )
          );
          
          canBox.position.set(pos_xyz[0],pos_xyz[1],pos_xyz[2]);
          canBox.velocity.set(veloc_xyz[0],veloc_xyz[1],veloc_xyz[2]);
          canBox.angularVelocity.set(
              angVeloc_xyz[0],angVeloc_xyz[1],angVeloc_xyz[2] );
          
          canBox.angularDamping = dampVal;
          return canBox;
      }
      
      function createBoxObject( pos_xyz ){
          
          var box = {};
          box.posX = pos_xyz[0];
          box.posY = pos_xyz[1];
          box.posZ = pos_xyz[2];
          box.sizeX = 1;
          box.sizeY = 3;
          box.sizeZ = 1;
          box.velocX    = box.velocY    = box.velocZ    = 0;
          box.angVelocX = box.angVelocY = box.angVelocZ = 0;
          box.mass    = 0;
          box.dampVal = 0;
          box.color   = 0x000000;
          
          return box;
      }
      
