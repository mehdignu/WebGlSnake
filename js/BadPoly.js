/*
        Polyhedron that the Snake encounters in Level3
        Copyright (C) 2018  Mehdi Dridi
*/

function BadPoly(scene, snake) {
    this.scene = scene;
    this.size = 4;
    this.snake = snake;

    this.polys = [4];
    var k = [4];

    for (var i = 0; i < this.size; i++) {


        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0, 1, 1 ).normalize();
        this.scene.add(light);

        var material = [
            new THREE.MeshPhongMaterial({ color: "#910CE8", specular: 0x555555, shininess: 30}),     // for the +x face
            new THREE.MeshPhongMaterial({color: "#910CE8", specular: 0x555555,shininess: 30}),    // for the -x face
            new THREE.MeshPhongMaterial({color: "#910CE8", specular: 0x555555,shininess: 30}),   // for the +y face
            new THREE.MeshPhongMaterial({color: "#910CE8", specular: 0x555555,shininess: 30}), // for the -y face
            new THREE.MeshPhongMaterial({color: "#910CE8", specular: 0x555555,shininess: 30}),    // for the +z face
            new THREE.MeshPhongMaterial({color: "#910CE8", specular: 0x555555,shininess: 30})   // for the -z face
        ];

        var verticesOfCube = [
            -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
            -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
        ];

        var indicesOfFaces = [
            2,1,0,    0,3,2,
            0,4,7,    7,3,0,
            0,1,5,    5,4,0,
            1,2,6,    6,5,1,
            2,3,7,    7,6,2,
            4,5,6,    6,7,4
        ];

        var geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 0.9, 1 );
        //   var material = new THREE.MeshBasicMaterial({color: 0xff0051});
        var poly = new THREE.Mesh(geometry, material);

        switch(i) {
            case 0:
                poly.position.x += 7;
                poly.position.z += -5;
                poly.position.y += 0.7;
                break;
            case 1:
                poly.position.x += 7;
                poly.position.z += 5;
                poly.position.y += 0.7;
                break;
            case 2:
                poly.position.x += -7;
                poly.position.z += 5;
                poly.position.y += 0.7;
                break;
            case 3:
                poly.position.x += -7;
                poly.position.z += -5;
                poly.position.y += 0.7;
                break;
        }


        this.scene.add(poly);
        this.polys.push(poly);
        k = this.polys;







    }

    var steps = 0;
    var dir = 1;
    async function generatorDelay() {


        await sleep(100);

        move();
        steps++;


        if(dir===4 && steps===20){
            dir = 1;
            steps = 0;
        } else if(steps===20) {
            dir++;
            steps = 0;
        }
        generatorDelay();

    }
    generatorDelay();

    /**
     * move the snake forward/up
     */
    function move() {

        switch(dir) {
            case 1:
                k[1].position.x -= 0.7;
                k[2].position.z -= 0.5;
                k[3].position.x += 0.7;
                k[4].position.z += 0.5;
                break;
            case 2:
                 k[1].position.z += 0.5;
                 k[2].position.x -= 0.7;
                 k[3].position.z -= 0.5;
                 k[4].position.x += 0.7;
                break;
            case 3:
                k[1].position.x += 0.7;
                k[2].position.z += 0.5;
                k[3].position.x -= 0.7;
                k[4].position.z -= 0.5;
                break;
            case 4:
                k[1].position.z -= 0.5;
                k[2].position.x += 0.7;
                k[3].position.z += 0.5;
                k[4].position.x -= 0.7;
                break;
        }

    }


    /**
     * check if snake ate the diamond
     * @param pointX
     * @param pointZ
     */
    this.checkPoint = function () {


        for(var i =1; i<=4;i++) {

            pointXmax = k[i].position.x + 1;
            pointXmin = k[i].position.x - 1;

            pointZmax = k[i].position.z + 1;
            pointZmin = k[i].position.z - 1;

            if ((this.snake.cubes[1].position.x >= pointXmin && this.snake.cubes[1].position.x <= pointXmax) && (this.snake.cubes[1].position.z >= pointZmin && this.snake.cubes[1].position.z <= pointZmax)) {

                return true;
            }

        }


    };



}
