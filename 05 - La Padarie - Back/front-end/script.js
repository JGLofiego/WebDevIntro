var ppl = 0
var bsld = 0
var cst = 0
var newId = 0

const formBg = document.querySelector('.form-bg').style
const people = document.querySelector('.people-queue')
const breads = document.querySelector('.breads-sold')
const cost = document.querySelector('.cost')
const form = document.querySelector('form')
const queue = document.querySelector('.queue')

async function getQueue() {
    const users = await fetch('http://localhost:3000/')
    const data = await users.json()
    return data.response
}

async function makeQueue() {
    const users = await getQueue()
    users.forEach((user) => {
        var dec = 0
        ppl++
        bsld += user.breads
        cst = bsld / 2
        if (user.breads % 2 != 0) { dec = 5 }
        queue.innerHTML += `
        <div class="queue-container" id="change">
            <div class="queue-element">
                    <strong>${user.name}</strong>
                    <div class="queue-info">
                        <div>
                            <strong class="minor-font">Total de pães:</strong>
                            <span class="minor-font">${user.breads} pães</span>
                        </div>
                        <div>
                            <strong class="minor-font">Total a pagar:</strong>
                            <span class="minor-font">R$${parseInt(user.breads/2)},${dec}0</span>
                        </div>
                    </div>
            </div>
            <button class="delete-button" onclick="removeQueue(${user.id})"><img src="assets/trashIcon.svg"></button>
        </div>
        `
        const queueElmnt = document.querySelector('#change')
        queueElmnt.setAttribute('id', `queue-${user.id}`)
    })
    updateAllNum()
}


function updateNum(element, message) {
    element.innerHTML = ""
    element.innerHTML = message
}

function updateAllNum() {
    updateNum(people, ppl)
    updateNum(breads, bsld)
    if (bsld % 2 == 0) {
        updateNum(cost, `R$${bsld / 2},00`)
    } else {
        updateNum(cost, `R$${parseInt(bsld/2)},50`)
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

async function addUser(name, breads) {
    const user = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, breads: breads })
    })
    const response = await user.json()
    dec = 0
    if (breads % 2 != 0) {
        dec = 5
    }
    ppl++
    bsld += parseInt(breads)
    cst = parseInt(breads / 2)
    queue.innerHTML += `
        <div class="queue-container" id="change">
            <div class="queue-element">
                    <strong>${name}</strong>
                    <div class="queue-info">
                        <div>
                            <strong class="minor-font">Total de pães:</strong>
                            <span class="minor-font">${breads} pães</span>
                        </div>
                        <div>
                            <strong class="minor-font">Total a pagar:</strong>
                            <span class="minor-font">R$${cst},${dec}0</span>
                        </div>
                    </div>
            </div>
            <button class="delete-button" onclick="removeQueue(${response.response.insertId})"><img src="assets/trashIcon.svg"></button>
        </div>
        `
    const queueElmnt = document.querySelector('#change')
    queueElmnt.setAttribute('id', `queue-${response.response.insertId}`)

    updateAllNum()
}

function disappear(e) {
    form.style.setProperty('display', 'none')
    formBg.setProperty('display', 'none')
    e.preventDefault()
}

function sendForm(e) {
    const inputName = document.querySelector('.name-input')
    const breadNum = document.querySelector('.breads-input')
    const error = document.querySelector('.error-message')
    if (inputName.value != "" && breadNum.value != "" && breadNum.value > 0) {
        addUser(inputName.value, breadNum.value)
        disappear(e)
    } else if (inputName.value != "" && breadNum.value != "" && breadNum.value <= 0) {
        error.innerHTML = "Número de pães não pode ser 0 ou negativo"
    } else if (Number.isInteger(breadNum.value) == false && inputName.value != "") {
        error.innerHTML = "Campo dos pães é obrigatório e tem que conter um número"
    } else {
        error.innerHTML = "Todos os campos são obrigatórios"
    }
    e.preventDefault()
}

async function removeQueue(idNum) {
    ppl--
    await getBreadsById(idNum).then((res) => {
        bsld -= res;
    })
    removeInDb(idNum)
    var queueElmnt = document.querySelector(`#queue-${idNum}`)
    queueElmnt.remove()
    updateAllNum()
}

async function removeInDb(id) {
    await fetch(`http://localhost:3000/del${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
}

async function getBreadsById(id) {
    const user = await fetch(`http://localhost:3000/${id}`)
    const data = await user.json()
    return data.response[0].breads
}

makeQueue()