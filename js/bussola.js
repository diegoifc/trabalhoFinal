	function objtBussola(){

 var surface;
 var context;
 var android; 
 var angle = 0;
 var watchID = null;

  this.drawCanvas=function() {
     surface = document.getElementById("myCanvas");

     if (surface.getContext) {
         android = new Image();
         android.onload =  this.loadingComplete;
         android.src = 'bussola.jpg';
		 
      }
	  
 }

  this.loadingComplete=function(e) {
     var surfaceContext = surface.getContext('2d');
     surfaceContext.fillStyle = "rgb(255,255,255)";
     surfaceContext.fillRect(0, 0, surface.width, surface.height);
     surfaceContext.save();
     surfaceContext.translate(android.width * 0.5, android.height * 0.5);
     surfaceContext.rotate(angle* 0.0174532925199432957);
     surfaceContext.translate(-android.width * 0.5, -android.height * 0.5);
     surfaceContext.drawImage(android, 10, 10);
     surfaceContext.restore();
 }


    

    this.bussola=function() {
        var options = { frequency: 300 };
      watchID = navigator.compass.watchHeading(this.onSucess, this.onError);
    }

    this.onSucess = function(heading) {
        var element = document.getElementById('heading');
			element.innerHTML = 'Heading: ' + heading.magneticHeading;
			angle = heading.magneticHeading;
			this.drawCanvas;

    }

    this.onError = function(compassError) {
        alert('Erro de Bússola: ' + compassError.code);
    }
}

function iniciar(){

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {

	appBussola = new objtBussola();
	appBussola.drawCanvas();
	appBussola.bussola();
    }

}
