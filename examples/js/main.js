var camera, scene, light, renderer;
var mouseX = 0, mouseY = 0;

function addGeometry() {
    for (var i = 0; i < 3000; i++){
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = 300 * ( 2.0 * Math.random() - 1.0 );
        mesh.position.y = 200 * ( 2.0 * Math.random() - 1.0 );
        mesh.position.z = 300 * ( 2.0 * Math.random() - 1.0 );
        var material = new THREE.MeshLambertMaterial( { color : 0xffffff } );
        var geometry = new THREE.SphereGeometry(0.2);
        scene.add( mesh );
    }
}

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, 400 );
    scene = new THREE.Scene();
    light = new THREE.DirectionalLight( 0xffffff );
    scene.add( light );
    addGeometry();
    window.addEventListener( 'click', onWindowClick, false );
    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseover', onDocumentMouseMove, false );
}

function onWindowClick( event ) {
    var needToClose = true;
    var target = event.target;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    mouseX = ( event.clientX - windowHalfX ) * .05 ;
    mouseY = ( event.clientY - windowHalfY ) *.05;
}

function animate() {
    requestAnimationFrame( animate );
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( -mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    light.position.set( camera.position.x, camera.position.y, camera.position.z ).normalize();
    renderer.render( scene, camera );
}

init();
animate();
