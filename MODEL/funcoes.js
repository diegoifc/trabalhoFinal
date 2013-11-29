function meuDispositivo(){
	var nome;
	var cordova;
	var plataforma;
	var uuid;
	var version;
	var rede;
	
	this.setNome=function(nNome){
		this.nome = nNome;
	}
	
	this.setCordova=function(nCordova){
		this.cordova = nCordova;
	}
	
	this.setPlataforma=function(nPlataforma){
		this.plataforma = nPlataforma;
	}

	this.setUuid=function(nUuid){
		this.uuid = nUuid;
	}
	
	this.setVersion=function(nVersion){
		this.version = nVersion;
	}
	this.setRede=function(nRede){
		this.rede = nRede;
	}
	
	this.listarDados=function(){
			
		var info = document.getElementById('info');
			info.innerHTML = 'Acesso via: '  +  this.rede + " no " + this.plataforma + " " + this.version;
	}
	}
	function load(){
		document.addEventListener("deviceready",onDeviceReady,false);

			function onDeviceReady() {
				dispositivo = new meuDispositivo();
			
				dispositivo.setNome(device.name);
				dispositivo.setCordova(window.device.cordova);
				dispositivo.setPlataforma(window.device.platform);
				dispositivo.setUuid(window.device.uuid);
				dispositivo.setVersion(window.device.version);
		
			var networkState = navigator.network.connection.type;
			var states = {};
					states[Connection.UNKNOWN]  = 'Conexão Desconhecida';
					states[Connection.ETHERNET] = 'Conexão Cabeada (Ethernet)';
					states[Connection.WIFI]     = 'Conexão WIFI';
					states[Connection.CELL_2G]  = 'Celular 2g';
					states[Connection.CELL_3G]  = 'Celular 3g';
					states[Connection.CELL_4G]  = 'Celular 4g';
					states[Connection.NONE]     = 'Sem conexão de internet';
		
					dispositivo.setRede(states[networkState]);
					dispositivo.listarDados();
					
				    appCam = new objtCamera();
					appCam.setTipoBusca(navigator.camera.PictureSourceType);
					appCam.setDestino(navigator.camera.DestinationType);
					
					appGeo = new objtGeo();
					appGeo.getGeo();
					
					
					
	}
	}