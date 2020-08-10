const proffys = [ /*Valor que recebe os dados de cada professor */
    {
        name: "Matheus Rodrigues",
        avatar: "https://avatars1.githubusercontent.com/u/62687874?s=460&u=b314eac8b304df91faa8951196080a48a47f7ebf&v=4",
        whatsapp: "38999999999",
        bio: "Entusiasta das melhores tecnologias de informática avançada. Apaixonado por programação, eletrônica e por mudar a vida das pessoas através da tecnologia. Tentando sempre fazer o melhor que pode para alcançar seus objetivos",
        subject: "Informática",
        cost: "20,00",
        weekday: [ /*ID do dia da semana, "weekday" vai dentro dos fors do proffy nos htmls*/
            0
        ],
        time_from: "720", /*Em segundos*/
        tome_to: "1220"
    },

    {
        name: "Teste Rodrigues",
        avatar: "https://avatars1.githubusercontent.com/u/62687874?s=460&u=b314eac8b304df91faa8951196080a48a47f7ebf&v=4",
        whatsapp: "38999999999",
        bio: "Entusiasta das melhores tecnologias de informática avançada. Apaixonado por programação, eletrônica e por mudar a vida das pessoas através da tecnologia. Tentando sempre fazer o melhor que pode para alcançar seus objetivos",
        subject: "Informática",
        cost: "20,00",
        weekday: [ /*ID do dia da semana*/
            0
        ],
        time_from: "720", /*Em segundos*/
        tome_to: "1220"
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Informática",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]


//FUNCIONALIDADES
function getSubject(subjectNumber) {
    const arrayPosition = subjectNumber -1
    return subjects[arrayPosition]
}

function pageLanding(req, res) {
    return res.sendFile(__dirname + "/views/index.html")

    /*
    Esta função "pageLanding" pode substituir toda esta função na estrutura get, pois tem o mesmo conteúdo
    (req, res) => { 
    return res.sendFile(__dirname + "/views/index.html")
    */
    //Obs.: Trocamos o 'sendFile' por 'render' dentro da estrutura de exibição por rotas get (abaixo)
    /*Também de lá foram retirados os caminhos do tipo (__dirname + "/views/study.html"), 
    e substituídos apenas por "index.html"
    */
}

function pageStudy(req, res) {
    return res.sendFile(__dirname + "/views/study.html")
}

function pageGiveClasses(req, res) {
    return res.sendFile(__dirname + "/views/give-classes.html")
}

//SERVIDOR
/*Retornar a dependência de servidor para o arquivo (no caso, a dependência é o express)*/
const express = require('express')
const server = express()
const nunjucks = require('nunjucks') /*Importando o Nunjucks (Template Engine)*/

//CONFIGURAR NUNJUCKS (TEPLATE ENGINE)
nunjucks.configure('src/views', { /*1- Onde está o que será configurado, 2- Configurações*/
    express: server, //Definindo o servidor usado, que é o express
    noCache: true, //Tirar cache de versões antigas
    /* */
})

//INÍCIO E CONFIGURAÇÃO DO SERVIDOR
server.use(express.static("public"))/*Config dos arquivos estáticos (CSS, scrips, img, etc) para ler os arquivos
na pasta referida, que no caso foi a "public"*/

    //ROTAS
    .get("/", (req, res) => { /*Get devolve algo. Quando o link chamar o "/", ele devolve o que está após a vírgula*/
        return res.render("index.html") /*__dirname é a pasta raíz, e depois, a página exibida */
        /*Retorna a "res" resposta, que é o que está após o ".", no nosso caso, o arquivo HTML*/
    })
    .get("/study", (req, res) => {
        const filters = req.query //Filtros selecionados
        return res.render("study.html", { proffys, filters, subjects, weekdays }) //Manda os filtros (Matéria dia e hora) para continuarem sendo exibidos no local do filtro
        /*{proffys} é o array de professores (criado no topo do projeto), mas que terá seus dados passados
        pelo HTML, quando usarmos o objeto {proffys} no HTML para que ele passe
        a ser cada um dos formulários mandados por lá, que vão ser gerenciados pelo nunjucks e exibidos na tela */
    })
    .get("/give-classes", (req, res) => {
        const data = req.query

        const isNotEmpty = Object.keys(data).length > 0 //condição que verifica se está vazio

        //Se tiver dados
        if (isNotEmpty) {
            data.subject = getSubject(data.subject)
            /*Pega data(dados) (nome, bio, custo, horários, etc) e adiciona ao array de proffys (topo desta pág)*/
            proffys.push(data) //insere no proffys

            return res.redirect("/study")
        }


        

        //Se não tiver dados, mostrar a página
        return res.render("give-classes.html", { subjects, weekdays })
    })

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