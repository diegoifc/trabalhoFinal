function meujogo() {
	var pontos;
	
	
	this.getPontos=function(){
        return this.pontos;
    };
	this.setPontos=function(outroPonto){
        this.pontos = outroPonto;
    };


}

//variáveis para definir o tamanho da tag canvas
	 var jogo_width;
	 var jogo_height;
	 $(function() {
	
			
            var sizedWindowWidth = $(window).width() - 20;
			var sizedWindowHeight =  $(window).height();
			
			if (sizedWindowWidth < 1000){ 
         jogo_width =  sizedWindowWidth;
          jogo_height = sizedWindowWidth/1.5;
	}
           else {
			jogo_width =    1000;
			jogo_height =   400;
		   }
		
		});
            
       //variável que receberá o contexto 2d
       var contexto;      
       var primeira_foto = true;
       //variável que armazenará informações sobre a primeira escolha
       var primeira_carta = -1;
       //variável que armazenará informações sobre a segunda escolha
       var segunda_carta;
       // variável que configura a cor da carta
       var cor_carta = "rgb(53,253 ,195)";
       // variável que configura a cor do fundo do jogo
       var cor_tabela = "rgb(51,51,51)";
       var deck = [];
       //variável que contém a posição x da primeira carta
       var firstsx ;
       //variável que contém a posição y da primeira carta
       var firstsy;
       // Define a distancia entre as cartas
       var margin;
       // Define o tamanho da carta
	   var pontos = 0;
	   var fim = 0;
       var carta_width;
	   var carta_height;
	   
       var tid;
       var matched;
       var iniciar_time;
       var count = 0;
       // Definimos os pares de imagens
       var pares = [
             ["GUI/img/1.png","GUI/img/1.png"],
             ["GUI/img/2.png","GUI/img/2.png"],
             ["GUI/img/3.png","GUI/img/3.png"],
             ["GUI/img/4.png","GUI/img/4.png"],        
             ["GUI/img/5.png","GUI/img/5.png"]
       ]
function carta(sx,sy,swidth,sheight, img, info) {
     this.sx = sx;
     this.sy = sy;
     this.swidth = swidth;
     this.sheight = sheight;
     this.info = info; //info será usada no array na formação das cartas
     this.img = img;
     this.draw = desenha_verso;
	 this.removida = false;

}
function desenha_verso() {
	   contexto.fillStyle = cor_carta;
       contexto.fillRect(this.sx,this.sy,this.swidth,this.sheight);

}


function formar_cartas() {
		carta_width = jogo_width*0.15;
		carta_height = jogo_height*0.325;
		firstsx = jogo_width*0.03;
		firstsy = jogo_height*0.125;
		margin = jogo_width*0.03;
		
	          var i; // variável para o for            
              var carta_a; // variável para armazenar a primeira carta
              var carta_b; // variável para armazenar a segunda carta
              var figura_a;       // variável para armazenar a primeira imagem                 
              var figura_b; // variável para armazenar a segunda imagem do par
              var cx = firstsx;
			  
              var cy = firstsy;
              for(i=0;i<pares.length;i++) {
                           figura_a = new Image();
                           figura_a.src = pares[i][0];
                           carta_a = new carta(cx,cy, carta_width, carta_height, figura_a, i);
						  deck.push(carta_a);
						   figura_b = new Image();
                           figura_b.src = pares[i][1];            
						   carta_b= new  carta(cx, cy+carta_height+margin, carta_width, carta_height, figura_b, i);
                           deck.push(carta_b);
                           cx = cx+carta_width+ margin;
                           carta_a.draw();
                           carta_b.draw();
              }     
}

function embaralhar() {
       //variáveis para armazenar referências da carta
       var i;
       var k;
       //variáveis para armazenar informações e imagem da carta (variáveis temporárias para a troca)
       var carta_info;
       var carta_img;
       //variável que armazenará a quantidade de cartas
       var dl = deck.length
       var nt;
              for (nt=0;nt<3*dl;nt++) { 
                   i = Math.floor(Math.random()*dl);
                   k = Math.floor(Math.random()*dl);
                   carta_info = deck[i].info;
                   carta_img = deck[i].img;
                   deck[i].info = deck[k].info;
                   deck[i].img = deck[k].img;
                   deck[k].info = carta_info;
                   deck[k].img = carta_img;
              }
}

function escolha(ev) {
    var out;
    //variáveis que armazenam a localização (x,y) do mouse
    var mx;
    var my;
    var pick1;
    var pick2;
	var botao;
    // verificação para que as funções do mouse funcione
    // bem em vários navegadores
    if ( ev.layerX ||  ev.layerX == 0) { // Firefox
                    mx= ev.layerX;
                    my = ev.layerY;
       } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                    mx = ev.offsetX;
                    my = ev.offsetY;
					
       }
	   
	    var i;
    for (i=0;i<deck.length;i++){
             var carta = deck[i];
             //verifica se o usuário clica em espaços vazios,
        // onde as cartas já foram removidas
       if (carta.sx >=0)
			if ((mx>carta.sx)&&(mx<carta.sx+carta.swidth)
          &&(my>carta.sy)&&(my<carta.sy+carta.sheight)) {
                    //verifica se não clicou duas vezes na mesma carta
                    if ((primeira_foto)|| (i!=primeira_carta)) {
                                  break;
                    }
             }
    }
    if (i<deck.length) { 
             if (primeira_foto) {
                    primeira_carta = i;
                    primeira_foto = false;
                    contexto.drawImage(carta.img, carta.sx, carta.sy, carta.swidth, carta.sheight);
             }      else {
                    segunda_carta = i;
                    contexto.drawImage(carta.img, carta.sx, carta.sy, carta.swidth, carta.sheight);
                    // verifica se elas são pares combinados
                    if (carta.info==deck[primeira_carta].info) {
                                  combinacao = true;
								  fim++;
                                  pontos= pontos + 1000;
                              
                                  if (fim>= .5*deck.length) {
									tid = setTimeout(function(){
                                               var now = new Date();
                                               var nt = Number(now.getTime());
                                               var seconds = Math.floor(.5+(nt-iniciar_time)/1000);
                                              if (seconds <=15) {
												pontos = pontos + 3000;
											  } else if (seconds <= 30) {
												pontos = pontos + 2000;
											  } else if  (seconds <=60){
												pontos = pontos + 1000;
											  }
											  var bg = new Image();
											   bg.src = 'GUI/img/bg01.jpg'; 
											   bg.onload = function() {
                                               contexto.drawImage(bg, 0, 0);
											   contexto.fillStyle=cor_carta;
											   contexto.fillText("Parabéns",jogo_width*0.01,jogo_height*0.075);
                                               out = "Você terminou em "  + String(seconds) + " segundos.";
                                               contexto.fillText(out,jogo_width*0.01,jogo_height*0.15);
											   out2 = "Sua pontuação total foi: " + String(pontos);
											   contexto.fillText(out2,jogo_width*0.01,jogo_height*0.225);
												var botao = new Image();
												botao.src = 'GUI/img/botao2.png';
												botao.onload = function() {
												contexto.drawImage(botao, jogo_width*0.01, jogo_height*0.8, jogo_width*0.30,jogo_height*0.125);
											   }
											   var botao2 = new Image();
												botao2.src = 'GUI/img/botao3.png';
												botao2.onload = function() {
												contexto.drawImage(botao2, jogo_width*0.38, jogo_height*0.8, jogo_width*0.30,jogo_height*0.125);
											   }
											   canvas1.addEventListener('click',salvar,false);
											   canvas1.addEventListener('click',novoJogo,false);
                                               }; 
											    return; 
                                   }, 1100) }                
                    }            else {
                                  combinacao = false;
                    }
                    primeira_foto = true;
					this.removeEventListener('click',arguments.callee,false);
                    tid = setTimeout(vira_carta,1000);
             }
    }
}
function salvar(ev) {
var out;
   
    var mx = 0;
    var my = 0;
	var tx = jogo_width*0.01;
	var ty = jogo_height*0.8;
	var zx = jogo_width*0.30;
	var zy = jogo_height*0.125;
    
  
    if ( ev.layerX ||  ev.layerX == 0) { // Firefox
                    mx= ev.layerX;
                    my = ev.layerY;
       } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                    mx = ev.offsetX;
                    my = ev.offsetY;
       }
	 if ((mx>=tx) && (my>=ty) && (mx <=(tx+zx)) &&  (my <=(ty+zy))) {
	  pontojogo = new meujogo();
	  pontojogo.setPontos(String(pontos));
		$.mobile.changePage('#salvar', {transition: 'pop', role: 'dialog'});
	 }
}
function novoJogo(ev) {
var out;
   
    var mx = 0;
    var my = 0;
	var tx = jogo_width*0.38;
	var ty = jogo_height*0.8;
	var zx = jogo_width*0.30;
	var zy = jogo_height*0.125;
    
  
    if ( ev.layerX ||  ev.layerX == 0) { // Firefox
                    mx= ev.layerX;
                    my = ev.layerY;
       } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                    mx = ev.offsetX;
                    my = ev.offsetY;
       }
	 if ((mx>=tx) && (my>=ty) && (mx <=(tx+zx)) &&  (my <=(ty+zy))) {
	  pontojogo = new meujogo();
	  pontojogo.setPontos(String(pontos));
		$.mobile.changePage('#jogar', {transition: 'pop', role: 'dialog'});
		pontos = 0;
		carregar();
		appGeo.getGeo();
		
	 }
}

function vira_carta() {
    var card;
    //se a formar uma combinação redesenha a tabela, se não formar,
    //vira a carta pra baixo
    if (!combinacao) {
			if (pontos >0){
			pontos = pontos - 200;}
			this.background( function(){
			for (i=0;i<deck.length;i++){
			if (deck[i].removida != true){
				
				deck[i].draw();
				
	
            }
			
			}
		}	);	
			 
    } else {
			 this.background( function(){
			for (i=0;i<deck.length;i++){
			if (deck[i].removida != true){
			if (deck[i]!=deck[primeira_carta] && deck[i]!=deck[segunda_carta])
			
			{
				deck[i].draw();
			
			}
			 
			
			} }
			deck[segunda_carta].sx = -1;
            deck[primeira_carta].sx = -1;
			deck[segunda_carta].removida = true;
            deck[primeira_carta].removida = true;
			
	}	);
          
    }
	canvas1.addEventListener('click',escolha,false);   
}

function carregar(){
		
		 canvas1 = document.getElementById('jogo');
		
		canvas1.width = jogo_width;
		canvas1.height= jogo_height;
		this.background(function(){
		
        
		
		
        
       
		canvas1.addEventListener('click',escolha,false);
        formar_cartas();
        embaralhar();            
        iniciar_time = new Date();
        iniciar_time = Number(iniciar_time.getTime());});
    }
function background(callback){
	var bg = new Image();
	contexto = document.getElementById('jogo').getContext('2d');
		bg.src = 'GUI/img/bg01.jpg'; 
		bg.onload = function() {
				contexto.fillStyle=cor_carta;
				contexto.drawImage(bg, 0, 0,jogo_width,jogo_height);
				contexto.font="bold 15pt sans-serif";
				contexto.fillText("Escolha duas cartas",jogo_width*0.03,jogo_height*0.08);
				contexto.fillText("Pares encontrados: " + String(pontos),jogo_width*0.03,jogo_height*0.9); 
				callback && callback();
			}
	
}