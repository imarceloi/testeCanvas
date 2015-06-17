var container;
var camera, controls, scene, renderer;
var spheres = [];
var plane;
var start = Date.now();

var Sphere = function( radius, segment, x, y, z) {
	this.sphere = new THREE.Mesh( new THREE.SphereGeometry( radius, segment, segment ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xff0000 } ) );
	this.sphere.position.x = x || 0;
	this.sphere.position.y = y || 0;
	this.sphere.position.z = z || 0;
}

init();
animate();

function init (){

	var width = window.innerWidth;
	var height = window.innerHeight;

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = 'Drag to Change the view';
	container.appendChild( info );

	camera = new THREE.PerspectiveCamera( 90, width / height, 1, 2000 );
	camera.position.y = 150;
	camera.position.z = 500;

	controls = new THREE.TrackballControls( camera );

	scene = new THREE.Scene();

	var light = new THREE.PointLight( 0xffffff );
	light.position.set( 500, 500, 500 );
	scene.add( light );

	var light = new THREE.PointLight( 0xffffff, .25 );
	light.position.set( -500, -500, -500 );
	scene.add( light );

	var light = new THREE.PointLight( 0xffffff);
	light.position.set( -100, -100, -250 );
	scene.add( light );

	for ( var i = 0; i < 3; i++ ) {
		spheres.push( new Sphere( 100, 20, i * 200, 0, 0 ) );
		scene.add( spheres[i].sphere );
	};

	plane = new THREE.Mesh( new THREE.PlaneGeometry( 500, 500 ), new THREE.MeshBasicMaterial( { color: 0x36C0CB } ) );
	plane.position.y = - 200;
	plane.rotation.x = - Math.PI / 2;
	scene.add( plane );

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( width, height );
	container.appendChild( renderer.domElement);

	effect = new THREE.AsciiEffect( renderer );
	effect.setSize( width, height );
	container.appendChild( effect.domElement );
	// renderer.render( scene, camera );

	window.addEventListener('resize', onWindowResize, false );
}
function onWindowResize (){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	effect.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render () {
	var timer = Date.now() - start;

	for ( var i = 0; i < spheres.length; i++ ) {
		spheres[i].sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 250 - 100 ;
		spheres[i].sphere.rotation.x = timer * 0.003 + 200 * 1;
		// spheres[i].sphere.rotation.z = timer * 0.002;
	};

	controls.update();
	renderer.render( scene, camera );
}