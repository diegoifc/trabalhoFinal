	function objtCamera(){

	var tipoBusca;   
    var destino; 

	this.setTipoBusca=function(nTipo){
			this.tipoBusca= nTipo;
		}
	this.setDestino=function(nDestino){
		this.destino = nDestino;
	}

    this.onPhotoDataSuccess=function(imageData) {
			
      var 	a = document.getElementById('fotoRanking');
			a.setAttribute('class', 'imagens');
			a.setAttribute('style', 'width:80px;height:80px;margin-left:2px;');
			a.src = 'data:image/jpeg;base64,' + imageData;
						

         
    }
	   
    this.onPhotoURISuccess =function(imageURI) {
      
      var 	a = document.createElement('img');
			a.setAttribute('class', 'imagens');
			a.setAttribute('style', 'width:80px;height:80px;margin-left:2px;');
			a.src = imageURI;
			
			document.getElementById('quadrofotos').appendChild(a);

   
    }

    
    this.buscarFoto=function () {
		navigator.camera.getPicture(this.onPhotoDataSuccess,  this.onFail, { quality: 50,
        destinationType: this.destino.DATA_URL });
		
    }

    
    this.capturePhotoEdit=function () {
        navigator.camera.getPicture(this.onPhotoDataSuccess,  this.onFail, { quality: 20, allowEdit: true,
        destinationType: this.destino.DATA_URL });
    }

   
    this.getPhoto=function() {
		tipo = this.tipoBusca.PHOTOLIBRARY;
	    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50, 
        destinationType: this.destino.FILE_URI,
        sourceType: tipo });
    }

    this.onFail=function (message) {
      alert('Falha causada por: ' + message);
    }
}

