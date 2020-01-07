function disconnect_myself() {
    fetch("/api/users/logout",  {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json()).then(json => {
        // si le status est true pn lance la page de manière deconnecter
        if(json.status) {
            window.location.href = '/';
        }
    });
}