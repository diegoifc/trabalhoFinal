//variáveis para definir o tamanho da tag canvas
	
            
		
		
	  var jogo_width = 1000;
           
       var jogo_height = 400;
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
       var firstsx = 30;
       //variável que contém a posição y da primeira carta
       var firstsy = 50;  
       // Define a distancia entre as cartas
       var margin = 30;
       // Define o tamanho da carta
	   var pontos = 0;
       var carta_width = 80;
       var carta_height = 100;   
       var tid;
       var matched;
       var iniciar_time;
       var count = 0;
       // Definimos os pares de imagens
       var pares = [
             ["1.png","1.png"],
             ["2.png","2.png"],
             ["3.png","3.png"],
             ["4.png","4.png"],        
             ["5.png","5.png"]   
       ]
function carta(sx,sy,swidth,sheight, img, info) {
     this.sx = sx;
     this.sy = sy;
     this.swidth = swidth;
     this.sheight = sheight;
     this.info = info; //info será usada no array na formação das cartas
     this.img = img;
     this.draw = desenha_verso;
}
function desenha_verso() {
       contexto.fillStyle = cor_carta;
       contexto.fillRect(this.sx,this.sy,this.swidth,this.sheight);
}


function formar_cartas() {
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
                    //verifica se não queicou duas vezes na mesma carta
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
                                  pontos++;
                                  contexto.fillStyle= cor_tabela;
                                  contexto.fillRect(10,340,900,100);
                                  contexto.fillStyle=cor_carta;
                                  contexto.fillText("Pares encontrados: " + String(pontos), 10, 380);
                                  if (pontos>= .5*deck.length) {
                                               var now = new Date();
                                               var nt = Number(now.getTime());
                                               var seconds = Math.floor(.5+(nt-iniciar_time)/1000);
                                               contexto.fillStyle= cor_tabela;
                                               contexto.fillRect(0,0,900,400);
                                               contexto.fillStyle=cor_carta;
                                               out = "Parabéns, você encontrou as combinações em "  + String(seconds) + " segundos.";
                                               contexto.fillText(out,10,100);
                                               contexto.fillText("Recarregue a página e tente novamente para obter melhor tempo!!!",10,300);
                                               return;
                                    }                
                    }            else {
                                  combinacao = false;
                    }
                    primeira_foto = true;
                    tid = setTimeout(vira_carta,1000);
             }
    }
}

function vira_carta() {
    var card;
    //se a formar uma combinação desenha um
    //retângulo com a cor do fundo, se não formar,
    //vira a carta com a fazer para baixo
    if (!combinacao) {
             deck[primeira_carta].draw();
             deck[segunda_carta].draw();
    } else {
             contexto.fillStyle = cor_tabela;
             contexto.fillRect(deck[segunda_carta].sx,
                          deck[segunda_carta].sy,
                          deck[segunda_carta].swidth,
                          deck[segunda_carta].sheight);
             contexto.fillRect(deck[primeira_carta].sx,
                          deck[primeira_carta].sy,
                          deck[primeira_carta].swidth,
                          deck[primeira_carta].sheight);
             deck[segunda_carta].sx = -1;
             deck[primeira_carta].sx = -1;
    }
}

function carregar(){
        contexto = document.getElementById('jogo').getContext('2d');
        contexto.fillStyle=cor_tabela;
        contexto.fillRect(0, 0, this.jogo_width, this.jogo_height);
        canvas1 = document.getElementById('jogo');
        canvas1.addEventListener('click',escolha,false);
        formar_cartas();
        embaralhar();            contexto.font="bold 20pt sans-serif";
        contexto.fillText("Escolha duas cartas e faça combinações",10,30);
        contexto.fillText("Pares encontrados: 0",10,380); 
        iniciar_time = new Date();
        iniciar_time = Number(iniciar_time.getTime());
    }