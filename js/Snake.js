function Snake(scene) {


    this.scene = scene;

    this.size = 5;
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


        if(!this.scene.getObjectByName('tmpLeft')) {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({color: 0xff0051});
             tmpCube = new THREE.Mesh(geometry, material);
            tmpCube.position.x += this.cubes[1].position.x;
            tmpCube.position.y += this.cubes[1].position.y;
            tmpCube.name = 'tmpLeft';
            this.scene.add(tmpCube);
        }

        for (var i = 1; i < this.size + 1; i++) {


            if (i === 1) {

                this.cubes[i].position.z += 0.5;

            } else {

                //TODO : coordinate the movement of the cubes when it turns left



                // if (this.cubes[this.size].position.x === tmpCube.position.x && this.cubes[this.size].position.y === tmpCube.position.y && this.cubes[this.size].position.z === tmpCube.position.z) {
                //
                //     d = false;
                //
                // }
                //
                // if (d === true) {
                //     this.cubes[i].position.x -= 0.5;
                //
                // } else {
                //
                //
                //     this.scene.remove(this.scene.getObjectByName('tmpLeft'));
                //
                //     this.cubes[i].position.z += 0.5;
                //
                // }
            }
        }
    };
}
