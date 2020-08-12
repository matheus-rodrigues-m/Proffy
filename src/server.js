//SERVIDOR
/*Retornar a dependência de servidor para o arquivo (no caso, a dependência é o express)*/
const express = require('express')
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')


const nunjucks = require('nunjucks') /*Importando o Nunjucks (Template Engine)*/
//CONFIGURAR NUNJUCKS (TEPLATE ENGINE)
nunjucks.configure('src/views', { /*1- Onde está o que será configurado, 2- Configurações*/
    express: server, //Definindo o servidor usado, que é o express
    noCache: true, //Tirar cache de versões antigas
    /* */
})

//INÍCIO E CONFIGURAÇÃO DO SERVIDOR
server
//Receber os dados do req.body da function pageGiveClasses
.use(express.urlencoded({ extended: true }))

.use(express.static("public"))/*Config dos arquivos estáticos (CSS, scrips, img, etc) para ler os arquivos
na pasta referida, que no caso foi a "public"*/

    //ROTAS
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    //START DO SERVIDOR
    .listen(3000) /*Função para rodar o servidor na porta 3000*/








//Como usar funções:

//Definição da função
/*function express() {
    return {
        name = "Teste",
        age = "15"
    }
}*/

//Chamada (execução) da função. Retorna a parte referida.
/*express().name*/


/*npm init -y
  npm install nodemon -D
  npm install express
*/

/*Se quiser iniciar o server
pelo terminarl Git Bash ao invés
De usar o "npm start", basta
abrir o Bash na pasta do projeto
E dar o comando "node src/server.js"*/

/*Usar template engine NunJucks com:
"npm install nunjucks" para que possamos
enviar os arquivos do backend para
o front*/