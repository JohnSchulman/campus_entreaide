function is_connected() {
    // lance une promesse si succes le then retourne le resultat de l'api en json
    return fetch('/api/users/me', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json());
}