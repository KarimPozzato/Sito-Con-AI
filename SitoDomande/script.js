let timeRemaining = 600; // 10 minuti
const timerElement = document.getElementById('timer');

// Timer visibile ma non bloccante
if (timerElement) {
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `Tempo rimasto: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            alert('Tempo scaduto! Puoi continuare a completare il test.');
        }
        timeRemaining--;
    }, 1000);
}

// Funzione per salvare i dati del form
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const results = {};
        formData.forEach((value, key) => {
            results[key] = value;
        });

        // Salvataggio in un file di testo
        const resultsBlob = new Blob([JSON.stringify(results, null, 2)], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(resultsBlob);
        link.download = 'test_results.txt';
        link.click();

        // Redirigi alla prossima pagina
        const nextPage = form.getAttribute('action');
        if (nextPage) {
            window.location.href = nextPage;
        }
    });
});
