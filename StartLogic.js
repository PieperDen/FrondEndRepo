function handleEinUndAuszahlen(zahl) {
    const betrag = document.getElementById('Betragsfeld').value;
    const postData = { verwendung: zahl, Betrag: betrag };
    console.log(zahl === "Einzahlung" ? "Dennis hat eingezahlt: " + betrag : "Dennis hat Ausgezahlt: " + betrag);
    return fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.received);
        return data; 
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;  
    });
}

function handleGetKontostand() {
    return fetch('http://localhost:5000/getKontostand')
    .then(response => response.json())
    .then(data => {
        document.getElementById('KontostandAnzeige').innerHTML = `Ihr Kontostand: <strong>${data.kontostand} €</strong>`;
        return data; 
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;  
    });
}

function getDiagramm(){
    const img = document.getElementById('plotImage');
    img.src = 'http://localhost:5000/getImage'
}

document.getElementById('KontostandEinzahlen').addEventListener('click', () => {
    handleEinUndAuszahlen("Einzahlung")
        .then(() => handleGetKontostand()) 
        .catch(error => console.error('Error during transaction:', error));
});

document.getElementById('KontostandAuszahlen').addEventListener('click', () => {
    handleEinUndAuszahlen("Auszahlung")
        .then(() => handleGetKontostand())  // Call handleGetKontostand after handleEinUndAuszahlen is complete
        .catch(error => console.error('Error during transaction:', error));
});

document.getElementById('ZeigeAusgaben').addEventListener('click', getDiagramm)

//document.getElementById('getKontostand').addEventListener('click', handleGetKontostand) weiß noch nicht so brudi