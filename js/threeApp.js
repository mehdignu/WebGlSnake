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

var gridHelper = new THREE.GridHelper( size , divisions );
scene.add( gridHelper );


var snake = new Snake(scene);

var uniforms = {
    delta: {value: 0}
};

//custom shader for the speed accelerating cube
var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShaderSpeed').textContent,
    fragmentShader: document.getElementById('fragmentShaderSpeed').textContent
});
//var geometry = new THREE.BoxGeometry(1,1,1);

//var shapeOne = new THREE.Mesh(geometry, material);
//shapeOne.position.y += 0.5;


var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
var meshPoint = new THREE.Mesh(geometry, material);
meshPoint.y += 0.5;
scene.add(meshPoint);



//attribute
var displacement = new Float32Array(geometry.attributes.position.count);

for (var i = 0; i < displacement.length; i ++) {
    displacement[i] = Math.sin(i);
}


geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement,1));


/*
//custom verticies - mesh
var geom = new THREE.Geometry();
var v1 = new THREE.Vector3(0,0,0);
var v2 = new THREE.Vector3(0,50,0);
var v3 = new THREE.Vector3(0,50,50);

geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.computeFaceNormals();

var object = new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );

object.position.z = -100;//move a bit back - size of 500 is a bit big
object.rotation.y = -Math.PI * .5;//triangle is pointing in depth, rotate it -90 degrees on Y

scene.add(object);

*/

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


function moving() {
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 87) { //W
            snake.moveUp();
        } else if (keyCode == 83) { //S
            snake.moveDown();
        } else if (keyCode == 65) { //A
            snake.moveLeft();
        } else if (keyCode == 68) {//D
            snake.moveRight();
           // cube.position.x += xSpeed;
        } else if (keyCode == 32) {

        }
    };
}



moving();

var delta = 0;

requestAnimationFrame(render);
function render() {

    //update point cube
    delta += 0.1;
    meshPoint.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5;
    for (var i = 0; i < displacement.length; i ++) {
        displacement[i] = 0.5 + Math.sin(i + delta) * 0.25;
    }
    meshPoint.geometry.attributes.displacement.needsUpdate = true;
    //end update point cube



    // Update camera position based on the controls
    controls.update();

    // Re-render the scene
    renderer.render(scene, camera);

    // Loop
    requestAnimationFrame(render);
}