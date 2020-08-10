//Procurar o botão
document.querySelector("#add-time")

//Quando clicar no botão
.addEventListener('click', cloneField)/* Ouvidor de eventos acontecendo: evento referido, função desejada */


//Executar uma ação
function cloneField() {
    //Duplicar campos 
    //(que campos?)
    const newFieldContainer = 
    document.querySelector('.schedule-item').cloneNode(true)/*true pega tudo dentro do item com esta class*/

    //Limpar os campos antes de duplicar, pra não ir com os mesmos valores
    //1º - Que campos?:
    const fields = newFieldContainer.querySelectorAll('input')
    /*Seleciona os dados 'inputados' no newFieldContainer que será duplicado, ou seja,
    o que o usuário colocou no schedule-item anterior*/

    /*Foi identificado por inspeção do elemento, a partir do console, que ele envia 2 dados
    um com index 0 e outro com index 1, para deixar os campos vazios, basta definir como vazios com:*/
    
    //Para cada campo, limpar
    fields.forEach(function(i) {
        //Pgar o field do momento, cada index (i) ele irá executar a função de limpar:
        //Definindo o valor daquele index como vazio
        i.value = ""
    })

    
    //Duplicar
    //Colocar na página - Coloca dentro do elemento com id #schedule-items
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}



