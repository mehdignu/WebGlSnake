// Create a scene which will hold all our meshes to be rendered
var scene = null;
// Create and position a camera
var camera= null;
//poly enemy
var poly = null;

// Create a renderer
var renderer= null;
//size of the grid
var size = 20;
//divisions of the grid
var divisions = 20;
//snake object
var snake= null;
//mouse control object
var controls = null;

//position of the new cube of point
var pointX = null;
var pointZ = null;
var downloadTimer=null;

var gui = new dat.GUI({
    height : 5 * 32 - 1
});

//lock for the levels
var levelUp = 0;

var params = {
    score: 0,
    level: 3,
    time: 30
};

var restart = { restart:function(){
        clearInterval(downloadTimer);

        params.level = 1;
    params.time = 30;
    params.score = 0;
    clearScene();
    init();

}};


gui.add(params, 'score').name('Score').listen();
gui.add(params, 'level').name('Level').listen();
gui.add(params, 'time').name('Time left').listen();
gui.add(restart,'restart');

function init(){




    //set up the scene object
    scene = new THREE.Scene();

    //setting up the camera
    camera = new THREE.PerspectiveCamera(
        100,                                   // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1,                                  // Near clipping pane
        1000                                  // Far clipping pane
    );

    // Reposition the camera
    camera.position.set(12, 12, 0);
    // Point the camera at a given coordinate
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({antialias: true});

    // Size should be the same as the window
        renderer.setSize(window.innerWidth, window.innerHeight);

    // Set a near white clear color (default is black)
        renderer.setClearColor(0xfff6e6);

    // Append to the document
        document.body.appendChild(renderer.domElement);


    var gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

     snake = new Snake(scene);

     //Timer of the Game
     refreshIntervalId = countdown();

    gridGround();

    if(params.level === 3){
        poly = new BadPoly(scene, snake);
    }

    //add light
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);


    // Render the scene/camera combination
    renderer.render(scene, camera);

    // Add an orbit control which allows us to move around the scene.
     controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    params.score = 0;
    params.time = 30;

}
init();




var uniforms = {
    delta: {value: 0}
};

//custom shader for the speed accelerating cube
var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShaderPoint').textContent,
    fragmentShader: document.getElementById('fragmentShaderPoint').textContent
});



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

//end water effect cube


/**
 * fill the grid ground and the borders
 */
function gridGround(){


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
}
//end grid borders cubes



var displacementOfWater = null;
var materialOfWater = null;
var meshOfWater = null;

function fillWater() {

    //custom mesh cube water effect


    uniformsOfWater = {
        delta: {value: 0},
    };



    //custom shader for the speed accelerating cube
    materialOfWater = new THREE.ShaderMaterial({
        uniforms: uniformsOfWater,
        vertexShader: document.getElementById('vertexShaderWater').textContent,
        fragmentShader: document.getElementById('fragmentShaderWater').textContent
    });

    var geometry = new THREE.BoxBufferGeometry(100, 100, 100, 10, 10, 10);
    meshOfWater = new THREE.Mesh(geometry, materialOfWater);
    meshOfWater.position.z = -10;
    meshOfWater.position.x = -10;
    meshOfWater.position.y = -100;
    scene.add(meshOfWater);

    //drawnDaSnake(meshOfWater);

    //attribute
    displacementOfWater = new Float32Array(geometry.attributes.position.count);

    for (var j = 0; j < displacementOfWater.length; j++) {
        displacementOfWater[j] = Math.sin(j);
    }


    geometry.addAttribute('displacementOfWater', new THREE.BufferAttribute(displacementOfWater, 1));



//end water effect cube


}
if(params.level===2) {
    fillWater();
}


/**
 * Controlling the Snake movement
 */
function moving() {

    document.addEventListener("keydown", onDocumentKeyDown, false);

    function onDocumentKeyDown(event) {

        if(snake.checkPoint(pointX, pointZ)) {
            if (scene.getObjectByName('tmpPoint')) {
              params.score++;
                var selectedObject = scene.getObjectByName('tmpPoint');
                scene.remove(selectedObject);

            }
        }


        var keyCode = event.which;
        if (keyCode == 87) { //W
            snake.moveUp();
        } else if (keyCode == 83) { //S
            snake.moveDown();
        } else if (keyCode == 65) { //A
            snake.moveLeft();
        } else if (keyCode == 68) {//D
            snake.moveRight();
        } else if (keyCode == 32) {
            poly.move();

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
 * custom shaped diamond from custom created vertices
 */
function generatePoints(){

    if (this.scene.getObjectByName('tmpPoint')) {
        var selectedObject = this.scene.getObjectByName('tmpPoint');
        this.scene.remove(selectedObject);
    }

    //diamond shaped custom shader for the points gaining
    var diamond = new THREE.Geometry();

    diamond.vertices = [
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(-1, 0, -1),
        new THREE.Vector3(-1, 0, 1),
        new THREE.Vector3(0, 1, 0)
    ];

    diamond.faces = [
        new THREE.Face3(3, 2, 1),
        new THREE.Face3(3, 1, 0),
        new THREE.Face3(3, 0, 4),
        new THREE.Face3(0, 1, 4),
        new THREE.Face3(1, 2, 4),
        new THREE.Face3(2, 3, 4)
    ];


    diamond.computeFaceNormals();

    var object = new THREE.Mesh(diamond, material);

    object.rotation.x = -Math.PI * 1.0;
    object.position.y = 2.0;

    object.position.x = getRandomInt(-8.0, 8.0);
    object.position.z = getRandomInt(-8.5, 8.5);

    pointX = object.position.x;
    pointZ = object.position.z;

    object.name ='tmpPoint';
    scene.add(object);

//end diamond
}


function countdown(){
    var timeleft = 30;
     downloadTimer = setInterval(function(){
        timeleft--;
        params.time = timeleft;
        if(timeleft <= 0)
            clearInterval(downloadTimer);
    },1000);
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generatorDelay() {


    await sleep(4000);

    generatePoints();
    generatorDelay();

}

//generate the points after some time
generatorDelay();

/**
 * clear the scene and delete old canvas
 */
function clearScene() {
    var to_remove = [];

    scene.traverse ( function( child ) {
        if ( child instanceof THREE.Mesh && !child.userData.keepMe === true ) {
            to_remove.push( child );
        }
    } );

    for (var i = 0; i < to_remove.length; i++)
        scene.remove( to_remove[i] );

    $("canvas").each(function(){
       $(this).remove();
    });
}

moving();

var delta = 0;

requestAnimationFrame(render);

function render() {

   if( snake.checkBorders() || params.time===0) {
       clearInterval(downloadTimer);
       clearScene();
       init();
   }

    //check if the Snake is attacked by the bad poly
    if(poly.checkPoint()){
        clearInterval(downloadTimer);
        clearScene();
        init();
    }

   if(params.score === 4){
       clearInterval(downloadTimer);
       params.score = 0;
       params.time = 30;
       params.level++;
       levelUp++;
   }

    delta += 0.13;

    //when the player comes to level 2 fill with water
   if(params.level===2) {

       if(levelUp===1){
           clearInterval(downloadTimer);
           clearScene();
           init();
           fillWater();
           levelUp=0;
       }

       //update Water movement
       meshOfWater.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5;

       //attribute
       for (var i = 0; i < displacementOfWater.length; i++) {
           displacementOfWater[i] = 0.5 + Math.sin(i + delta) * 0.25;
       }
       meshOfWater.geometry.attributes.displacementOfWater.needsUpdate = true;

        //drawn the Snake in water
       if(meshOfWater.position.y<-86){
           meshOfWater.position.y += 0.005;
       }

       //end update Water movement
   }




    if(params.level===3) {

        if (levelUp === 1) {
            clearInterval(downloadTimer);
            clearScene();
            init();
            levelUp = 0;
        }

    }

    //update point cube
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