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
    const position = +subjectNumber -1
    return subjects[position]
}

//Função que converte horas em minutos
function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":")

    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}