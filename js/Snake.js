function Snake(scene) {

    this.scene = scene;

    this.size = 2;
    this.cubes = [this.size];
    var d = true;
    for (var i = 0; i < this.size; i++) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0xff0051});
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x += 1.0 * i;
        cube.position.y += 0.5;


        this.scene.add(cube);
        this.cubes.push(cube);
    }

    this.moveForward = function forward() {
        for (var i = 1; i < this.size + 1; i++) {
            this.cubes[i].position.x -= 0.0021;
        }
    };

    this.moveLeft = function left() {

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0xff0051});
        var tmpCube = new THREE.Mesh(geometry, material);
        tmpCube.position.x += this.cubes[1].position.x;
        tmpCube.position.y += this.cubes[1].position.y;
        this.cubes.push(tmpCube);


        this.scene.add(tmpCube);


        for (var i = 1; i < this.size + 1; i++) {


            if (i === 1) {

                this.cubes[i].position.z += 0.5;

            } else {

                if (this.cubes[i].position.x === tmpCube.position.x && this.cubes[i].position.y === tmpCube.position.y && this.cubes[i].position.z === tmpCube.position.z) {

                    d = false;

                }

                if (d === true) {
                    this.cubes[i].position.x -= 0.5;

                } else {


                    //      this.scene.remove(this.scene.getObjectByName(tmpCube));

                    this.cubes[i].position.z += 0.5;

                }
            }
        }
    };
}
