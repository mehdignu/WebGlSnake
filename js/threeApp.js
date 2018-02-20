// Create a scene which will hold all our meshes to be rendered
var scene = new THREE.Scene();


// Create and position a camera
var camera = new THREE.PerspectiveCamera(
    100,                                   // Field of view
    window.innerWidth/window.innerHeight, // Aspect ratio
    0.1,                                  // Near clipping pane
    1000                                  // Far clipping pane
);

// Reposition the camera
camera.position.set(5,5,0);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0,0,0));

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Size should be the same as the window
renderer.setSize( window.innerWidth, window.innerHeight );

// Set a near white clear color (default is black)
renderer.setClearColor( 0xfff6e6 );

// Append to the document
document.body.appendChild( renderer.domElement );

var size = 10;
var divisions = 10;

var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0xff0051} );
var cube = new THREE.Mesh( geometry, material );
cube.position.y += 0.5;
scene.add( cube );



/*
var geometry = new THREE.OctahedronGeometry(1,1);
var material = new THREE.MeshStandardMaterial( {
    color: 0xff0051,
    shading: THREE.FlatShading, // default is THREE.SmoothShading
    metalness: 0,
    roughness: 1
} );
var shapeOne = new THREE.Mesh(geometry, material);
shapeOne.position.y += 1;

scene.add(shapeOne);*/

//add light
var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
scene.add( ambientLight );


// Render the scene/camera combination
renderer.render(scene, camera);

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } ); // add this only if there is no animation loop (requestAnimationFrame)



requestAnimationFrame(render);
function render() {
    // Update camera position based on the controls
    controls.update();

    // Re-render the scene
    renderer.render(scene, camera);

    // Loop
    requestAnimationFrame(render);
}