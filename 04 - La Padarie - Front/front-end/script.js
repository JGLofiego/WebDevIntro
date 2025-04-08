var ppl = 0
var bsld = 0
var cst = 0
var cont = 0
var arrBreads = []

const formBg = document.querySelector('.form-bg').style
const people = document.querySelector('.people-queue')
const breads = document.querySelector('.breads-sold')
const cost = document.querySelector('.cost')
const form = document.querySelector('form')
const queue = document.querySelector('.queue')


function updateNum(element, message) {
    element.innerHTML = ""
    element.innerHTML = message
}

function updateAllNum(money, moneyInt) {
    updateNum(people, `${ppl}`)
    updateNum(breads, `${bsld}`)
    if (bsld % 2 == 0) {
        updateNum(cost, money)
    } else {
        updateNum(cost, moneyInt)
    }
}

function toggle(element, property, value1, value2) {
    if (element.getPropertyValue(property) == "" || element.getPropertyValue('display') == value1) {
        element.setProperty(property, value2)
    } else if (element.getPropertyValue(property) == value2) {
        element.setProperty(property, value1)
    }
}

function toggleForm() {
    toggle(form.style, 'display', 'none', 'flex')
    toggle(formBg, 'display', 'none', 'block')
    form.innerHTML = `
    <div class="title-input">
        <p class="brown-text">Adicionar pessoa a fila</p>
        <div class="input-container">
            <input class="name-input" type="text" placeholder="Nome completo do cliente"></input>
            <input class="breads-input" type="number" placeholder="Total de pães"></input>
            <div class="error-message"></div>
        </div>
    </div>
    <div class="button-container">
        <button class="send-button" onclick="sendForm(event)">Enviar</button>
        <button class="cancel-button" onclick="disappear(event)">Cancelar</button>
    </div>
    `
}



function disappear(e) {
    form.style.setProperty('display', 'none')
    formBg.setProperty('display', 'none')
    e.preventDefault()
}

function sendForm(e) {
    const inputName = document.querySelector('.name-input')
    const breadNum = document.querySelector('.breads-input')
    if (inputName.value != "" && breadNum.value != "" && breadNum.value > 0) {
        ppl++
        bsld += parseInt(breadNum.value)
        cst = Math.floor(bsld / 2)
        arrBreads.push(breadNum.value)
        var total = ``

        updateAllNum(`R$${cst},00`, `R$${cst},50`)
        if (breadNum.value % 2 == 0) {
            total = `${breadNum.value * 0.5},00`
        } else {
            total = `${parseInt(breadNum.value * 0.5)},50`
        }

        queue.innerHTML += `
        <div class="queue-container" id="change">
            <div class="queue-element">
                    <strong>${inputName.value}</strong>
                    <div class="queue-info">
                        <div>
                            <strong class="minor-font">Total de pães:</strong>
                            <span class="minor-font">${breadNum.value} pães</span>
                        </div>
                        <div>
                            <strong class="minor-font">Total a pagar:</strong>
                            <span class="minor-font">R$${total}</span>
                        </div>
                    </div>
            </div>
            <button class="delete-button" onclick="removeQueue(${cont})"><img src="assets/trashIcon.svg"></button>
        </div>
            
        `

        var container = document.querySelector('#change')
        container.setAttribute('id', `queue-${cont}`)

        cont++

        disappear(e)
    } else if (inputName.value != "" && breadNum.value != "" && breadNum.value <= 0) {
        const error = document.querySelector('.error-message')
        error.innerHTML = "Número de pães não pode ser 0 ou negativo"
    } else if (Number.isInteger(breadNum.value) == false && inputName.value != "") {
        const error = document.querySelector('.error-message')
        error.innerHTML = "Campo dos pães é obrigatório e tem que conter um número"
    } else {
        const error = document.querySelector('.error-message')
        error.innerHTML = "Todos os campos são obrigatórios"
    }
    e.preventDefault()
}

function removeQueue(idNum) {
    var queueElmnt = document.querySelector(`#queue-${idNum}`)
    queueElmnt.remove()

    ppl--
    bsld -= arrBreads[idNum]
    cst = Math.floor(bsld / 2)

    updateAllNum(`R$${cst},00`, `R$${cst},50`)
}

updateAllNum(`R$${cst},00`)