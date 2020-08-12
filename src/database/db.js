/*npm install sqlite-async*/

//Importando o SQLite
const Database = require('sqlite-async');

//Criação das tabelas
function execute(db) {
    //Criar as tabelas do  banco de dados, 
    //1- Professores, com os dados de cada professor
    //2- Aulas, com os dados das aulas (matéria e id do professor daquela matéria)
    //3- Dias e horários de aulas (uma tabela somente para isso pois um prof pode dar uma matéria em mais de um dia e horário, então o "class_id" na tabela de dias/horários, é porque uma mesma matéria pode ser dada em diferentes horários, ou seja, mais de um horário por matéria)
    //Mesma lógica dos horários com as matérias, um mesmo professor pode dar mais de uma matéria
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );
        
        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );   
        
        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );   
    `)
}


//Definindo a criação do arquivo "database.sqlite" como banco de dados
module.exports = Database.open(__dirname + '/database.sqlite').then(execute) /*recebe as tabelas criadas*/
/*node src/database/db.js  -->  Para criar o sqlite que é o banco de dados */

//module.exports exporta o dado para que possa ser usado em outros arquivos
//Será exportado para o "test.js" para que lá sejam realizadas as manipulações de dados