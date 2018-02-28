// Create a scene which will hold all our meshes to be rendered
var scene = new THREE.Scene();
// Create and position a camera
var camera = new THREE.PerspectiveCamera(
    100,                                   // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1,                                  // Near clipping pane
    1000                                  // Far clipping pane
);


// Reposition the camera
camera.position.set(12, 12, 0);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Create a renderer
var renderer = new THREE.WebGLRenderer({antialias: true});

// Size should be the same as the window
renderer.setSize(window.innerWidth, window.innerHeight);

// Set a near white clear color (default is black)
renderer.setClearColor(0xfff6e6);

// Append to the document
document.body.appendChild(renderer.domElement);

var size = 20;
var divisions = 20;

var gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

var snake = new Snake(scene);

var uniforms = {
    delta: {value: 0}
};

//custom shader for the speed accelerating cube
var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShaderPoint').textContent,
    fragmentShader: document.getElementById('fragmentShaderPoint').textContent
});
//var geometry = new THREE.BoxGeometry(1,1,1);

//var shapeOne = new THREE.Mesh(geometry, material);
//shapeOne.position.y += 0.5;


var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
var meshPoint = new THREE.Mesh(geometry, material);
meshPoint.y += 0.5;
//scene.add(meshPoint);


//attribute
var displacement = new Float32Array(geometry.attributes.position.count);

for (var i = 0; i < displacement.length; i++) {
    displacement[i] = Math.sin(i);
}


geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 1));



//grid border cubes

// var cubeGeom = new THREE.BoxGeometry(1, 1, 1);
// var cubeMaterials = [
//     new THREE.MeshPhongMaterial({color: "red"}),     // for the +x face
//     new THREE.MeshPhongMaterial({color: "cyan"}),    // for the -x face
//     new THREE.MeshPhongMaterial({color: "green"}),   // for the +y face
//     new THREE.MeshPhongMaterial({color: "magenta"}), // for the -y face
//     new THREE.MeshPhongMaterial({color: "blue"}),    // for the +z face
//     new THREE.MeshPhongMaterial({color: "yellow"})   // for the -z face
// ];
// var cube = new THREE.Mesh(cubeGeom, cubeMaterials);
// cube.position.x += 9.5;
// cube.position.z -= 9.5;
// cube.position.y -= 0.5;
// scene.add(cube);

var cubeX = 9.5;
var cubeY = 0.5;
var cubez = -9.5;

for (var ii = 0; ii < size; ii++) {
    for (var j = 0; j < size; j++) {
        var cubeGeom = new THREE.BoxGeometry(1, 1, 1);
        var cubeMaterials = [
            new THREE.MeshPhongMaterial({color: "red"}),     // for the +x face
            new THREE.MeshPhongMaterial({color: "cyan"}),    // for the -x face
            new THREE.MeshPhongMaterial({color: "green"}),   // for the +y face
            new THREE.MeshPhongMaterial({color: "magenta"}), // for the -y face
            new THREE.MeshPhongMaterial({color: "blue"}),    // for the +z face
            new THREE.MeshPhongMaterial({color: "yellow"})   // for the -z face
        ];
        var cube = new THREE.Mesh(cubeGeom, cubeMaterials);
        cube.position.x += cubeX - j;

        if(ii===0 || ii===size-1 || j === 0 || j === size-1){
            cube.position.y -= cubeY-1;

        } else {
            cube.position.y -= cubeY;
        }
        cube.position.z += cubez;
        scene.add(cube);
    }
     cubez++;

}

//end grid borders cubes




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
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);


// Render the scene/camera combination
renderer.render(scene, camera);

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera);
}); // add this only if there is no animation loop (requestAnimationFrame)


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

/**
 * generate random numbers
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * generate the points diamonds
 */
function generatePoints(){

    if (this.scene.getObjectByName('tmpPoint')) {
        var selectedObject = this.scene.getObjectByName('tmpPoint');
        this.scene.remove(selectedObject);
    }

    //diamond shaped custom shader for the points gaining
    var pyramid = new THREE.Geometry();

    pyramid.vertices = [
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(-1, 0, -1),
        new THREE.Vector3(-1, 0, 1),
        new THREE.Vector3(0, 1, 0)
    ];

    pyramid.faces = [
        new THREE.Face3(3, 2, 1),
        new THREE.Face3(3, 1, 0),
        new THREE.Face3(3, 0, 4),
        new THREE.Face3(0, 1, 4),
        new THREE.Face3(1, 2, 4),
        new THREE.Face3(2, 3, 4)
    ];


    pyramid.computeFaceNormals();

    var object = new THREE.Mesh(pyramid, material);

    object.rotation.x = -Math.PI * 1.0;
    object.position.y = 2.0;

    object.position.x = getRandomInt(-8.0, 8.0);
    object.position.z = getRandomInt(-8.5, 8.5);




    object.name ='tmpPoint';
    scene.add(object);

//end diamond
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {


    await sleep(5000);

    generatePoints();
    demo();
}

demo();



moving();

var delta = 0;

requestAnimationFrame(render);

function render() {

    snake.checkBorders(); //check if snake out of the borders

    //update point cube
    delta += 0.13;
    meshPoint.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5;
    for (var i = 0; i < displacement.length; i++) {
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