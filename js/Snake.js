function Snake(scene) {


    this.scene = scene;

    this.size = 6; //should to be size +1
    this.cubes = [this.size];
    this.cubes2 = [this.size];

    this.speed = 0.5;


    this.direction = 'forward';
    var d = true;
    for (var i = 0; i < this.size -1; i++) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0xff0051});
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x += 1.0 * i;
        cube.position.y += 0.5;


        this.scene.add(cube);
        this.cubes.push(cube);
    }

    this.moveForward = function forward() {

        for (var i = 1; i < this.size ; i++) {
            this.cubes[i].position.x -= this.speed;
        }


    };


    this.moveLeft = function left() {


        if(this.direction === 'left'){

            for (var j = 1; j < this.cubes.length; j++)
                this.cubes[j].position.z += this.speed;


        } else {


            if (!this.scene.getObjectByName('tmpLeft')) {
                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshBasicMaterial({color: 0xff0051});
                tmpCube = new THREE.Mesh(geometry, material);
                tmpCube.position.x += this.cubes[1].position.x;
                tmpCube.position.y += this.cubes[1].position.y;
                tmpCube.name = 'tmpLeft';
                this.scene.add(tmpCube);

                this.cubes2.push(this.cubes[1]);
            }

            for (var i = 1; i < this.size ; i++) {

                if (this.cubes[i].position.x === tmpCube.position.x && this.cubes[i].position.y === tmpCube.position.y && this.cubes[i].position.z === tmpCube.position.z) {

                    if (this.cubes2.indexOf(this.cubes[i], this.cubes2) <= -1) {
                        this.cubes2.push(this.cubes[i]);
                    }

                    if (i === this.size) {
                        this.direction = 'left';
                     //   this.cubes = this.cubes2;

                    }
                }

                for (var j = 1; j < this.cubes2.length; j++)
                    this.cubes2[j].position.z += 0.09;


                if (i >= this.cubes2.length)
                    this.cubes[i].position.x -= this.speed;

                if(this.direction === 'left'){
                    this.cubes = $.map(this.cubes2, function (obj) {
                        return $.extend(true, {}, obj);
                    });
                }


            }

        }
    };
}
