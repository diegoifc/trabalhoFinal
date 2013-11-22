//1. Inicialização

var localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            alert("Erro: Seu navegador não permite banco de dados.");
        }
        else {
            initDB();
	        createTables();

        }
    } 
    catch (e) {
        if (e == 2) {
            alert("Erro: Versão de banco de dados inválida.");
        }
        else {
            alert("Erro: Erro desconhecido: " + e + ".");
        }
        return;
    }
}

function initDB(){
    var shortName = 'memobank';
    var version = '1.0';
    var displayName = 'MeuBanco';
    var maxSize = 65536; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function deleteTables(){
    var query = 'DROP TABLE IF EXISTS ranking;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            alert("Tabela 'ranking' status: Deletada.");
        });
    } 
    catch (e) {
        alert("Erro: Data base 'webapp' não criada " + e + ".");
        return;
    }
}
function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS ranking(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR NOT NULL, pontos VARCHAR NOT NULL, foto VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], this.nullDataHandler, this.errorHandler);
          
        });
    } 
    catch (e) {
        alert("Erro: Data base 'ranking' não criada " + e + ".");
        return;
    }
}




