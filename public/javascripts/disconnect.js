function disconnect_myself() {
    // lance une promesse si succes le then retourne le resultat de l'api en json
    fetch("/api/users/logout",  {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json()).then(json => {
        // si le status est true on lance la page de manière deconnecter
        if(json.status) {
            window.location.href = '/';
        }
    });
}

