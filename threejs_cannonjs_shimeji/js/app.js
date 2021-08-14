
// refer to http://ozateck.sakura.ne.jp/wordpress

var width  = 480;
var height = 320;
var fov    = 60;
var aspect = width / height;
var near   = 1;
var far    = 1000;

//座標系   Z↑ /Y
//          │/
//         原点─→X

// Scene - 各オブジェクト(円、四角等)を表示
var scene = new THREE.Scene();
 
// Axes - 空間のx, y, zを原点から表す
var axes = new THREE.AxisHelper(20);
scene.add(axes);
 
// Camera - 空間の視点をを決める.
// コンストラクタの引数はそれぞれ、
// 視野角(fov)、縦横幅比率(aspect)、描画領域(近い方)、描画領域(遠い方)
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 100, 200);
camera.lookAt(scene.position);

// Controls - マウスによる操作.
// google chromeで以下のerrorとなる場合、その更に下のurlが参考になります。
// [Intervention] Unable to preventDefault inside passive event listener
// due to target being treated as passive.
// https://note.com/cfbif/n/n92195df174bf
var controls = new THREE.TrackballControls(camera);
controls.rotateSpeed = 5.0; //回転速度
controls.zoomSpeed = 0.5;//ズーム速度
controls.panSpeed = 2.0;//パン速度


// Light - 空間への光の方向を決める
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0.7, 0.7);
scene.add(directionalLight);
 
// Stats - 処理速度やフレームレートを確認する為
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top  = "0px";
document.getElementById("stage").appendChild(stats.domElement);

// Plane

// Three.js のobjectには、Geometry, Material, Mesh を使う。
// Geometryはオブジェクトの形や大きさ. Materialにはオブジェクトの色や質感を表す。
// Meshオブジェクトに、これらの2つのオブジェクトを指定しインスタンス化

var geometry = new THREE.PlaneGeometry(200, 250);
var material = new THREE.MeshBasicMaterial({color: 0x666666});
var plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.set(-90 * Math.PI / 180, 0, 0);
scene.add(plane);


// Particles
var geometry = new THREE.Geometry();
var material = new THREE.PointsMaterial({color: 0xffffff,
					 size: 4,
					 vertexColors: true});
for(var x=0; x<10; x++){
    for(var y=0; y<10; y++){
	var particle = new THREE.Vector3(x*10, y*10, 0);
	geometry.vertices.push(particle);
	geometry.colors.push(new THREE.Color(Math.random() * 0x00ffff));
    }
}
var points = new THREE.Points(geometry, material);
scene.add(points);


// Cube
var geometry = new THREE.BoxGeometry(30, 30, 30);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 50, 0);
scene.add(cube);
 
// Earth
var txLoader = new THREE.TextureLoader();
var earth = null;
txLoader.load(
    "img/earth.jpg", function(texture){
	var geometry = new THREE.SphereGeometry(30, 30, 30);
	var material = new THREE.MeshBasicMaterial({map:texture, overdraw:0.5});
	earth = new THREE.Mesh(geometry, material);
	earth.position.set(-30, 50, 100);
	scene.add(earth);
    });

// Moon
var moon = null;
txLoader.load(
    "img/moon.jpg", function(texture){
	var geometry = new THREE.SphereGeometry(10, 10, 10);
	var material = new THREE.MeshBasicMaterial({map:texture, overdraw:0.5});
	moon = new THREE.Mesh(geometry, material);
	moon.position.set(50, 50, 50);
	//	moon.position.set(100, 50, 0);
	scene.add(moon);
});

// Renderer - 毎フレーム描画
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0xcccccc);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("stage").appendChild(renderer.domElement);
 
// Radian -  360 = 2 * PI  , 180 = PI
var radius = 50;
var degree = 0;

// Loop
loop();
function loop(){
    stats.update();
 
    // Earth, Moon を回転
    degree += 0.5;
    if(360 <= degree) degree = 0;
    
    var radian = degree * Math.PI / 180;
    var x = radius * Math.cos(radian);
    var y = radius * Math.sin(radian);
    if(earth != null){
	earth.rotation.set(0, radian, 0);
    }
    if(moon != null){
	moon.rotation.set(0, radian, 0);
	// 以下の x,y を入れ替えると、逆向きに回転します
	moon.position.set(y-30, 50, x+50);
    }
    // Cube を回転
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;

    controls.update();
    
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop ); //再帰呼び出し
};
