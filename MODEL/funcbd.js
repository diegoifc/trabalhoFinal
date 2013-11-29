function listarRanking(){
	
	  $.mobile.changePage("#ranking", { transition: "slide"});
    var query = "SELECT * FROM ranking order by pontos; ";
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
function alterar(){
    var id = 1;
    var nome = 'AAA';
	var pontos = '10000';
    var foto = 'GUI/img/heart.png';
           var query = "update ranking set nome=?, pontos=?, foto=? where id=?;";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nome, pontos,foto, id], function(transaction, results){
                    if (!results.rowsAffected) {
                        alert("Erro: Update não realizado.");
                    }
                    else {
                   
                   //     alert("Update realizado:" + results.rowsAffected);
                        
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            alert("Erro: UPDATE não realizado " + e + ".");
        }
    
}

function incluirRanking(){
    

        var query = "insert into ranking (nome, pontos, foto) VALUES (?, ?,?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, ['EEE','6000','GUI/img/heart.png'], function(transaction, results){
                    if (!results.rowsAffected) {
                        alert("Erro: Inserção não realizada");
                    }
                    else {
                       alert("Inserção realizada, linha id: " + results.insertId);
						
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            alert("Erro: INSERT não realizado " + e + ".");
        }
    
}

function onDelete(){

    var id = document.getElementById('del').value;
    
    var query = "delete from webapp where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    alert("Erro: Delete não realizado.");
                }
                else {
                   alert("Linhas deletadas:" + results.rowsAffected);
					document.location.reload(true);
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        alert("Erro: DELETE não realizado " + e + ".");
    }

}

function onSelect(htmlAElement){
	var id = htmlAElement.getAttribute("id");

	query = "SELECT * FROM webapp where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['nome'], row['preco'],row['categoria']);
				
                
            }, function(transaction, error){
                alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        alert("Error: SELECT não realizado " + e + ".");
    }
   
}



function updateForm(nome, preco, categoria){
    document.itemForm.nome.value = nome;
    document.itemForm.preco.value = preco;
	var defaultVal = categoria;
	$("#select").find("option").each(function () {

    if ($(this).val() == defaultVal) {

        $(this).prop("selected", "selected");
    }
});
}
// Tratando erros

errorHandler = function(transaction, error){
   alert("Erro: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}