const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir dados (Serão inseridos os dados pelo createProffy.js)

    proffyValue = { 
        name: "Teste 123",
        avatar: "https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Man-Person-People-Avatar-User-Happy-512.png",
        whatsapp: "38999999999",
        bio: "Entusiasta das melhores tecnologias de informática avançada. Apaixonado por programação, eletrônica e por mudar a vida das pessoas através da tecnologia. Tentando sempre fazer o melhor que pode para alcançar seus objetivos",        
    }

    classValue = {
        subject: 1,
        cost: "20,00",
        //O proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720, 
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 320,
            time_to: 1220
        }
    ]

    /*try { //Cria o banco de dados inserindo os dados
        await createProffy(db, {proffyValue, classValue, classScheduleValues})
    } 
    
    catch (error) {
        console.error(error)
    }*/
    /*node src/database/test.js*/


    //CONSULTAR DADOS INSERIDOS

    //Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")

    //console.log(selectedProffys)



    //consultar as classes de um determinado professor
    //E trazer junto, os dados deste professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1
    `)

    //console.log(selectedClassesAndProffys)

    //O horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    //Então, time_from (8h) deve ser menor ou igual ao horário solicitado no filtro
    //E o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    console.log(selectClassesSchedules)
})