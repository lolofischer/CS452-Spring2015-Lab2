var gl;
var points;
var colors;

var xPos=0;
var yPos=0;

var modelViewMatrix;
var uModelViewMatrix;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	points = [-.5, .5, .5, -.5, -.5, -.5];
	colors = [
	vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 )  // green
	];

	
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
	
	var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    

    uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');
	
	modelViewMatrix = mat4();
	
	document.onkeydown = function(ev){keydown(ev);};
	render();
};
	
	
function keydown(ev){
		
	if(ev.keyCode == 65) //a 
	{
		xPos = xPos - 0.1
	}else
	if(ev.keyCode == 83) //s
	{
		yPos = yPos- 0.1
	}else
	if(ev.keyCode == 68) //d
	{
		xPos = xPos + 0.1
	}else
	if(ev.keyCode == 87) //w
	{
		yPos = yPos + 0.1
	}else
	if(ev.keyCode == 49) //1
	{
		xPos = 0;
		yPos = 0;
	}
			
}
    

	
		 

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	modelViewMatrix = translate(xPos, yPos, 0);
	gl.uniformMatrix4fv(uModelViewMatrix, false, flatten(modelViewMatrix));
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	window.requestAnimFrame(render);

}
