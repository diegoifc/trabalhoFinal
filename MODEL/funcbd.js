function listarRanking(){
	
	 
    var query = "SELECT * FROM ranking ORDER  by pontos DESC; ";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    
              
						
						var h2 = document.createElement('h2');
							h2.appendChild(document.createTextNode(row['nome']));
						
					var	p = document.createElement('P');
						p.appendChild(document.createTextNode("Pontos: " + row['pontos']));
					
					var	img = document.createElement('img');		
						img.setAttribute('src',row['foto']);
						
						li.appendChild(img);
						li.appendChild(h2);
						li.appendChild(p);
					              
     
					
                    
                    document.getElementById("listagem").appendChild(li);
					$('#listagem').listview('refresh'); 
                }
            }, function(transaction, error){
                alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        alert("Error: SELECT não realizado " + e + ".");
    }
}

function incluirRanking(){
		var nome = document.getElementById('nomeRank').value;
		var pontos = parseInt(pontojogo.getPontos());
		var foto = document.getElementById('fotoRanking').src;
		if (nome =="") {
			alert("Preencha o Nome");
		}
		else {
        var query = "insert into ranking (nome, pontos, foto) VALUES (?, ?,?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nome,pontos,foto], function(transaction, results){
                    if (!results.rowsAffected) {
                        alert("Erro: Inserção não realizada");
                    }
                    else {
                       alert("Dados Salvo com Sucesso!");
					  $("#salvar").dialog('close');
						
                    }
                }, errorHandler);
            });
        } 
	
        catch (e) {
            alert("Erro: Não foi possível Salvar: Erro de Banco de Dados " + e + ".");
        }
    }
}


// Tratando erros

errorHandler = function(transaction, error){
   alert("Erro: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}