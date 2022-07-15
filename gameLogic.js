//localStorage.setItem('saldo', '10')



function updateCheckbox() {
    updateImpostazioni()
    var numero = document.getElementById('numero').checked
    var pari = document.getElementById('pari').checked
    var dispari = document.getElementById('dispari').checked
    if (numero) {
        document.getElementById('pari').checked = false
        document.getElementById('dispari').checked = false
    }
    if (pari) {
        document.getElementById('numero').checked = false
        document.getElementById('dispari').checked = false
    }
    if (dispari) {
        document.getElementById('numero').checked = false
        document.getElementById('pari').checked = false
    }
}

function punta() {
    var numeroEstratto = estraiNumero();
    var s = localStorage.getItem('saldo')
    var saldo = parseInt(s)
    var importoGiocata = getImportoPuntata()

    if (importoGiocata > saldo) {
        document.getElementById('res').innerText = "Impossibile giocare, l'importo è maggiore del saldo!"
        exit()
    }
    if (importoGiocata <= 0) {
        document.getElementById('res').innerText = "Impossibile giocare, inserisci un'importo positivo!"
        exit()
    }

    var numero = document.getElementById('numero').checked
    var pari = document.getElementById('pari').checked
    var dispari = document.getElementById('dispari').checked

    if (numero) {
        saldo = puntataNumero(numeroEstratto, saldo, importoGiocata)
    }
    if (pari) {
        saldo = puntataPari(numeroEstratto, saldo, importoGiocata)
    }
    if (dispari) {
        saldo = puntataDispari(numeroEstratto, saldo, importoGiocata)
    }

    document.getElementById('estrazione').innerText = numeroEstratto

    //document.getElementById('numero').checked = false
    //document.getElementById('pari').checked = false
    //document.getElementById('dispari').checked = false

    localStorage.setItem('saldo', saldo.toString())
    displaySaldo()

}

function puntataNumero(numeroEstratto, saldo, importoGiocata) {
    saldo = saldo - importoGiocata;
    var numeroScelto = document.getElementById('numeroScelto').value
    document.getElementById('res').innerText = "hai scelto numero singolo " + numeroScelto
    if (checkWinningNumber(numeroScelto, numeroEstratto)) {
        saldo = saldo + (importoGiocata * 5)
        document.getElementById('esito').innerText = "Hai Vinto " + (importoGiocata*5) + "!"
        document.getElementById('esito').style.color = "#4EC815"
    } else {
        document.getElementById('esito').innerText = "Hai Perso " + (importoGiocata) + "!"
        document.getElementById('esito').style.color = "#FF6D6D"
    }
    return saldo
}

function puntataPari(numeroEstratto, saldo, importoGiocata) {
    saldo = saldo - importoGiocata;
    document.getElementById('res').innerText = "hai scelto pari"
    if (checkIfPari(numeroEstratto)) {
        saldo = saldo + (importoGiocata * 2)
        document.getElementById('esito').innerText = "Hai Vinto " + (importoGiocata*2) + "!"
        document.getElementById('esito').style.color = "#4EC815"
    } else {
        document.getElementById('esito').innerText = "Hai Perso " + (importoGiocata) + "!"
        document.getElementById('esito').style.color = "#FF6D6D"
    }
    return saldo
}

function puntataDispari(numeroEstratto, saldo, importoGiocata) {
    saldo = saldo - importoGiocata;
    document.getElementById('res').innerText = "hai scelto dispari"
    if (!checkIfPari(numeroEstratto)) {
        saldo = saldo + (importoGiocata * 2)
        document.getElementById('esito').innerText = "Hai Vinto " + (importoGiocata*2) + "!"
        document.getElementById('esito').style.color = "#4EC815"
    } else {
        document.getElementById('esito').innerText = "Hai Perso " + (importoGiocata) + "!"
        document.getElementById('esito').style.color = "#FF6D6D"
    }
    return saldo
}

function checkIfPari(numero) {
    if (numero % 2 == 0) {
        return true
    } else {
        return false
    }
}


function getRandomInt(min = 1, max) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

function checkWinningNumber(numeroScelto, numeroEstratto) {
    if (numeroScelto == numeroEstratto) {
        return true
    }
}

function displaySaldo() {
    var saldo = localStorage.getItem('saldo')
    document.getElementById('displaySaldo').innerText = "$ " + saldo.toString()
}

function getImportoPuntata() {
    var importo = document.getElementById('importoGiocata').value
    return parseInt(importo)
}

function estraiNumero() {
    var mod = localStorage.getItem('modalitaGioco')
    var modalita = parseInt(mod)
    
    if (modalita == 2) {
        return getRandomInt(1,12)
    }

    return getRandomInt(1,6)

}

function updateImpostazioni() {
    var mod = localStorage.getItem('modalitaGioco')
    var modalita = parseInt(mod)
    
    if (modalita == 2) {
        document.getElementById('titoloPunta').innerText = "Punta su due dadi"
    } else if (modalita == 1) {
        document.getElementById('titoloPunta').innerText = "Punta su un dado"
    }
}






