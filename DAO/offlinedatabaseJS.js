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
    var shortName = 'stuffDB';
    var version = '1.0';
    var displayName = 'MyStuffDB';
    var maxSize = 65536; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function deleteTables(){
    var query = 'DROP TABLE IF EXISTS vilourenco;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            alert("Tabela 'webapp' status: Deletada.");
        });
    } 
    catch (e) {
        alert("Erro: Data base 'webapp' não criada " + e + ".");
        return;
    }
}
function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS webapp(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR NOT NULL, preco VARCHAR NOT NULL, categoria VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
          //  alert("Tabela 'webapp' status: OK.");
        });
    } 
    catch (e) {
        alert("Erro: Data base 'webapp' não criada " + e + ".");
        return;
    }
}





