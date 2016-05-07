var canvasWidth = 500;
var canvasHeight = canvasWidth;
var isMouseDown=false;
var lastLoc={x:0,y:0};
var lastTime=0;
var lastLineWidth=-1;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;
drowGrid();
canvas.onmousedown=function(e){
  e.preventDefault();
  isMouseDown=true;
  lastLoc=WindowToCanvas(e.clientX,e.clientY);
  lastTime=new Date().getTime();
}
canvas.onmouseup=function(e){
  e.preventDefault();
  isMouseDown=false;

}
canvas.onmouseout=function(e){
  e.preventDefault();
  isMouseDown=false;

}
canvas.onmousemove=function(e){
  e.preventDefault();
   
  if(isMouseDown){ console.log("move");
  	var curLoc=WindowToCanvas(e.clientX,e.clientY);
  	var curTime=new Date().getTime();
  	var s= calcDiantance(curLoc,lastLoc);
    var t=curTime-lastTime;
    var lineWidth=calcLineWidth(t,s)
  	//draw
  	  context.beginPath();
  	  	context.moveTo(lastLoc.x,lastLoc.y);
  	  	context.lineTo(curLoc.x,curLoc.y);
  	  	context.strokeStyle="black";
  	  	context.lineWidth=lineWidth;
  	  	context.lineCap="round";
  	  	context.lineJoin="round";

  	  	context.stroke();
  	    lastLoc=curLoc;
  	    lastTime=curTime;
  	    lastLineWidth=lineWidth;
  } 
}
function calcLineWidth(t,s){
	var v=s/t;
	var resultLineWidth;
	if(v<=0.1){
		resultLineWidth=10;
	}
	else if(v>=10){
		resultLineWidth=1;
	}
	else{
		 resultLineWidth=30-(v-0.1)/(10-0.1)*(30-1);
	}
	if(lastLineWidth==-1)
	{return resultLineWidth;}
    else{
      return lastLineWidth*2/3+resultLineWidth*1/3
    }
}
function calcDiantance(loc1,loc2){
	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y))
}
function WindowToCanvas(x,y){
	var bbox=canvas.getBoundingClientRect();
	return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)}
}


























function drowGrid() {
    context.save();
    context.strokeStyle = "rgb(230,11,9)"
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvasWidth - 0, 0);
    context.lineTo(canvasWidth - 0, canvasHeight - 0);
    context.lineTo(0, canvasHeight - 0);
    context.closePath();
    context.lineWidth = 6;
    context.stroke();
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvasWidth, canvasHeight);
    context.moveTo(canvasWidth, 0);
    context.lineTo(0, canvasHeight);
    context.moveTo(canvasHeight / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);
    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);
    context.lineWidth = 1;
    context.stroke();
    context.restore();
}
