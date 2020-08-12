const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

function pageLanding(req, res) { /*Get devolve algo. Quando o link chamar o "/", ele devolve o que está após a vírgula*/
    return res.render("index.html") /*__dirname é a pasta raíz, e depois, a página exibida */
    /*Retorna a "res" resposta, que é o que está após o ".", no nosso caso, o arquivo HTML*/
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

async function pageStudy(req, res) {
    const filters = req.query //Filtros selecionados

    console.log(req.query)

    //se NÃO tiver o subject, weekday OU time, vai entrar no IF
    if(!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays })//Manda os filtros (Matéria dia e hora) para continuarem sendo exibidos no local do filtro
        /*{proffys} é o array de professores (criado no topo do projeto), mas que terá seus dados passados
        pelo HTML, quando usarmos o objeto {proffys} no HTML para que ele passe
        a ser cada um dos formulários mandados por lá, que vão ser gerenciados pelo nunjucks e exibidos na tela */
    }

    //Converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    //Caso haja erro na hora da consulta do Banco de Dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        
        return res.render('study.html', { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {

    //Se não tiver dados, mostrar a página
    return res.render('give-classes.html', { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    console.log(req.body)

    proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map(
    (weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
        
        let queryString = "?subject=" + req.body.subject
        queryString = queryString + "&weekday" + req.body.weekday[0]
        queryString = queryString + "&time" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}