function Snake(scene) {

    this.scene = scene;
    this.size = 6; //should to be size +1
    this.cubes = [this.size];
    this.cubesLeft = [this.size];
    this.cubesForward = [this.size];

    this.lock = {direc: "", isLocked: 0};

    this.speed = 0.5;

    this.direction = "forward";

    for (var i = 0; i < this.size - 1; i++) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0xff0051});
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x += 1.0 * i;
        cube.position.y += 0.5;
        this.scene.add(cube);
        this.cubes.push(cube);
    }


    this.moveUp = function up() {

        if ((this.lock.isLocked === 0 || this.lock.direc === "up") && this.direction !== "down") {


            if (this.direction === 'forward') {

                for (var j = 1; j < this.cubes.length; j++) {

                    this.cubes[j].position.x -= this.speed;

                }

            } else {
                this.lock.direc = "up";
                this.lock.isLocked = 1;

                if (!this.scene.getObjectByName('tmpForward')) {


                    var vector = new THREE.Vector3();
                    vector.setFromMatrixPosition(this.cubes[1].matrixWorld);

                    var geometry = new THREE.BoxGeometry(1, 1, 1);
                    var material = new THREE.MeshBasicMaterial({color: 0xff0051});
                    tmpCubeForward = new THREE.Mesh(geometry, material);
                    tmpCubeForward.position.x = vector.x;
                    tmpCubeForward.position.y = vector.y;
                    tmpCubeForward.position.z = vector.z;
                    tmpCubeForward.name = 'tmpForward';

                    this.scene.add(tmpCubeForward);

                    this.cubesForward.push(this.cubes[1]);
                }

                for (var i = 1; i < this.size; i++) {


                    if (this.cubes[i].position.x === tmpCubeForward.position.x && this.cubes[i].position.y === tmpCubeForward.position.y && this.cubes[i].position.z === tmpCubeForward.position.z) {


                        if (this.cubesForward.indexOf(this.cubes[i], this.cubesForward) <= -1) {
                            this.cubesForward.push(this.cubes[i]);
                        }

                        if (i === this.size - 1) {
                            this.direction = 'forward';
                        }
                    }


                    if (this.cubesForward[i] !== undefined) {
                        this.cubesForward[i].position.x -= this.speed;
                    } else {

                        if (this.direction === 'left') {
                            this.cubes[i].position.z += this.speed;

                        } else {
                            this.cubes[i].position.z -= this.speed;
                        }


                    }


                    if (this.direction === 'forward') {
                        var selectedObject = this.scene.getObjectByName(tmpCubeForward.name);
                        this.scene.remove(selectedObject);
                        this.cubesForward = [this.size];
                        this.lock.direc = "";
                        this.lock.isLocked = 0;
                    }

                }

            }

        }
    };


    this.moveRight = function right() {

        if ((this.lock.isLocked === 0 || this.lock.direc === "right")  && this.direction !== "left") {

            if (this.direction === 'right') {

                for (var j = 1; j < this.cubes.length; j++) {
                    this.cubes[j].position.z -= this.speed;
                }


            } else {

                this.lock.direc = "right";
                this.lock.isLocked = 1;


                if (!this.scene.getObjectByName('tmpRight')) {


                    var vector = new THREE.Vector3();
                    vector.setFromMatrixPosition(this.cubes[1].matrixWorld);

                    var geometry = new THREE.BoxGeometry(1, 1, 1);
                    var material = new THREE.MeshBasicMaterial({color: 0xff0051});
                    tmpCubeForward = new THREE.Mesh(geometry, material);
                    tmpCubeForward.position.x = vector.x;
                    tmpCubeForward.position.y = vector.y;
                    tmpCubeForward.position.z = vector.z;
                    tmpCubeForward.name = 'tmpRight';

                    this.scene.add(tmpCubeForward);

                    this.cubesForward.push(this.cubes[1]);
                }

                for (var i = 1; i < this.size; i++) {


                    if (this.cubes[i].position.x === tmpCubeForward.position.x && this.cubes[i].position.y === tmpCubeForward.position.y && this.cubes[i].position.z === tmpCubeForward.position.z) {


                        if (this.cubesForward.indexOf(this.cubes[i], this.cubesForward) <= -1) {
                            this.cubesForward.push(this.cubes[i]);
                        }

                        if (i === this.size - 1) {
                            this.direction = 'right';
                        }
                    }


                    if (this.cubesForward[i] !== undefined) {
                        this.cubesForward[i].position.z -= this.speed;
                    } else {

                        if (this.direction === 'down') {
                            this.cubes[i].position.x += this.speed;

                        } else {
                            this.cubes[i].position.x -= this.speed;
                        }

                    }


                    if (this.direction === 'right') {
                        var selectedObject = this.scene.getObjectByName(tmpCubeForward.name);
                        this.scene.remove(selectedObject);
                        this.cubesForward = [this.size];
                        this.lock.direc = "";
                        this.lock.isLocked = 0;

                    }

                }

            }

        }
    };


    this.moveLeft = function left() {

        if ((this.lock.isLocked === 0 || this.lock.direc === "left") && this.direction !== "right") {

            if (this.direction === 'left') {

                for (var j = 1; j < this.cubes.length; j++)
                    this.cubes[j].position.z += this.speed;
            } else {

                this.lock.direc = "left";
                this.lock.isLocked = 1;

                if (!this.scene.getObjectByName('tmpLeft')) {

                    var vector = new THREE.Vector3();
                    vector.setFromMatrixPosition(this.cubes[1].matrixWorld);

                    var geometry = new THREE.BoxGeometry(1, 1, 1);
                    var material = new THREE.MeshBasicMaterial({color: 0xff0051});
                    tmpCube = new THREE.Mesh(geometry, material);
                    tmpCube.position.x = this.cubes[1].position.x;
                    tmpCube.position.y = this.cubes[1].position.y;
                    tmpCube.position.z = vector.z;
                    tmpCube.name = 'tmpLeft';
                    this.scene.add(tmpCube);

                    this.cubesLeft.push(this.cubes[1]);
                }


                for (var i = 1; i < this.size; i++) {

                    if (this.cubes[i].position.x === tmpCube.position.x && this.cubes[i].position.y === tmpCube.position.y && this.cubes[i].position.z === tmpCube.position.z) {

                        if (this.cubesLeft.indexOf(this.cubes[i], this.cubesLeft) <= -1) {
                            this.cubesLeft.push(this.cubes[i]);
                        }

                        if (i === this.size - 1) { //the hole snake is left
                            this.direction = 'left';
                        }
                    }


                    if (this.cubesLeft[i] !== undefined) {

                        this.cubesLeft[i].position.z += this.speed;

                    } else {

                        if (this.direction === 'down') {
                            this.cubes[i].position.x += this.speed;

                        } else {
                            this.cubes[i].position.x -= this.speed;
                        }

                    }


                    if (this.direction === 'left') {
                        var selectedObject = this.scene.getObjectByName(tmpCube.name);
                        this.scene.remove(selectedObject);
                        this.cubesLeft = [this.size];
                        this.lock.direc = "";
                        this.lock.isLocked = 0;
                    }


                }

            }
        }
    };

    this.moveDown = function down() {

        if ((this.lock.isLocked === 0 || this.lock.direc === "down") && this.direction !== "forward") {

            if (this.direction === 'down') {

                for (var j = 1; j < this.cubes.length; j++) {

                    this.cubes[j].position.x += this.speed;

                }

            } else {
                this.lock.direc = "down";
                this.lock.isLocked = 1;

                if (!this.scene.getObjectByName('tmpDown')) {


                    var vector = new THREE.Vector3();
                    vector.setFromMatrixPosition(this.cubes[1].matrixWorld);

                    var geometry = new THREE.BoxGeometry(1, 1, 1);
                    var material = new THREE.MeshBasicMaterial({color: 0xff0051});
                    tmpCubeForward = new THREE.Mesh(geometry, material);
                    tmpCubeForward.position.x = vector.x;
                    tmpCubeForward.position.y = vector.y;
                    tmpCubeForward.position.z = vector.z;
                    tmpCubeForward.name = 'tmpDown';

                    this.scene.add(tmpCubeForward);

                    this.cubesForward.push(this.cubes[1]);
                }

                for (var i = 1; i < this.size; i++) {


                    if (this.cubes[i].position.x === tmpCubeForward.position.x && this.cubes[i].position.y === tmpCubeForward.position.y && this.cubes[i].position.z === tmpCubeForward.position.z) {


                        if (this.cubesForward.indexOf(this.cubes[i], this.cubesForward) <= -1) {
                            this.cubesForward.push(this.cubes[i]);
                        }

                        if (i === this.size - 1) {
                            this.direction = 'down';
                        }
                    }


                    if (this.cubesForward[i] !== undefined) {
                        this.cubesForward[i].position.x += this.speed;
                    } else {
                        if (this.direction === 'right') {
                            this.cubes[i].position.z -= this.speed;

                        } else {

                            this.cubes[i].position.z += this.speed;

                        }
                    }


                    if (this.direction === 'down') {
                        var selectedObject = this.scene.getObjectByName(tmpCubeForward.name);
                        this.scene.remove(selectedObject);
                        this.cubesForward = [this.size];
                        this.lock.direc = "";
                        this.lock.isLocked = 0;
                    }

                }

            }
        }
    };


    //end of snake
}
