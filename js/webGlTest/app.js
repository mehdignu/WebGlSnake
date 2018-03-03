var vertexShaderText =
    [
        'precision mediump float;',
        '',
        'attribute vec3 vertPosition;',
        'attribute vec3 vertColor;',
        'varying vec3 fragColor;',
        'uniform mat4 mWorld;',
        'uniform mat4 mView;',
        'uniform mat4 mProj;',
        '',
        'void main()',
        '{',
        'fragColor = vertColor;',
        'gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
        '}'
    ].join('\n');

var fragmentShaderText = [
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    'gl_FragColor = vec4(fragColor,1.0);',
    '}'
].join('\n');

var initDemo = function () {
    console.log("ready");

    var canvas = document.getElementById('game-surface');
    var gl = canvas.getContext('webgl');

    if (!gl) {
        gl = canvas.getContext('experimental-webg');
    }

    if (!gl) {
        console.log('your browser doesnt support webgl');
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    //create shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);


    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('error compiling vertex shader' + gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('error compiling fragment shader' + gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program' + gl.getShaderInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program' + gl.getShaderInfoLog(program));
        return;
    }

    //create buffer
    var triangleVertices =
        [ //X, Y , Z              R,G,B
            0.0, 0.5, 0.0,        1.0, 1.0, 0.0,
            -0.5, -0.5, 0.0,      0.7,0.0, 1.0,
            0.5, -0.5, 0.0,       0.1,1.0, 0.6
        ];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');



    gl.vertexAttribPointer(positionAttributeLocation //attribute location
        , 3 //number of elements per attribute
        , gl.FLOAT //type of elements
        , gl.FALSE
        , 6 * Float32Array.BYTES_PER_ELEMENT//  Size of an individual vertex
        , 0  //  offset from the beginning of a single vertex to this attribute

    );


    gl.vertexAttribPointer(colorAttributeLocation //attribute location
        , 3 //number of elements per attribute
        , gl.FLOAT //type of elements
        , gl.FALSE
        , 6 * Float32Array.BYTES_PER_ELEMENT//  Size of an individual vertex
        , 3 * Float32Array.BYTES_PER_ELEMENT  //  offset from the beginning of a single vertex to this attribute

    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);


    //tell openGL state machine which program should be active
    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjectionUniformLocation = gl.getUniformLocation(program, 'mProj');


    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);

    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

    gl.uniformMatrix4fv(matProjectionUniformLocation, gl.FALSE, projMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);



    //main render loop

    var angle = 0;
    var identiyMatrix = new Float32Array(16);
    mat4.identity(identiyMatrix);
    var loop = function(){

        angle = performance.now() / 1000 / 6 * 2 * Math.PI;
        mat4.rotate(worldMatrix, identiyMatrix, angle, [0, 1, 0]);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);


        gl.drawArrays(gl.TRIANGLES, 0, 3);
        requestAnimationFrame(loop);

    };

    requestAnimationFrame(loop);


};