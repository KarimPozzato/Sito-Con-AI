let timeRemaining = 600; // 10 minuti
const timerElement = document.getElementById('timer');

// Timer visibile ma non bloccante
if (timerElement) {
    // Controlla se l'elemento con ID 'timer' esiste
    const timerInterval = setInterval(() => {
        // Calcola i minuti e i secondi rimanenti
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        // Aggiorna il testo dell'elemento 'timer' per mostrare il tempo rimanente
        timerElement.textContent = `Tempo rimasto: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Se il tempo è scaduto (0 secondi), ferma il timer e avvisa l'utente
        if (timeRemaining === 0) {
            clearInterval(timerInterval); // Ferma l'intervallo del timer
            alert('Tempo scaduto! Puoi continuare a completare il test.');
        }

        // Riduce il tempo rimanente di 1 secondo
        timeRemaining--;
    }, 1000); // Aggiornamento ogni 1000 ms (1 secondo)
}

// Funzione per salvare i dati del form
document.querySelectorAll('form').forEach(form => {
    // Aggiunge un listener per l'evento 'submit' a tutti i form presenti
    form.addEventListener('submit', e => {
        e.preventDefault(); // Impedisce il comportamento predefinito di invio del form

        // Crea un oggetto FormData per raccogliere i dati del form
        const formData = new FormData(e.target);
        const results = {}; // Oggetto vuoto per memorizzare i dati del form

        // Popola l'oggetto results con le chiavi e i valori del form
        formData.forEach((value, key) => {
            results[key] = value;
        });

        // Salvataggio in un file di testo
        const resultsBlob = new Blob([JSON.stringify(results, null, 2)], { type: 'text/plain' });
        // Crea un link per scaricare il file con i dati del form
        const link = document.createElement('a');
        link.href = URL.createObjectURL(resultsBlob); // URL per il blob
        link.download = 'test_results.txt'; // Nome del file da scaricare
        link.click(); // Simula un clic sul link per avviare il download

        // Redirige alla prossima pagina (se specificata nel form)
        const nextPage = form.getAttribute('action'); // Recupera l'attributo 'action' del form
        if (nextPage) {
            window.location.href = nextPage; // Cambia pagina
        }
    });
});
