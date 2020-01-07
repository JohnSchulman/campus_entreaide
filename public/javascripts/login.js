window.addEventListener('load', function () {
    // sert a encapsuler les requètes
    function login(form) {
        let action = form.getAttribute('action');
        let method = form.getAttribute('method');

        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;

        // faire une http de la même manière que Ajax mais plus proprement.
        fetch(action, {
            method: method,
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
            // pour executer une fonction après une autre
            // c'est le callback de la requête
            // equivalent du .done en ajax
        }).then(r => r.json())
            .then(function (json) {
                // si status renvoit true on affiche ok
                if(json.status === true) {
                    console.log('ok');
                    window.location.href = '/';
                    // je suis connecté
                } else if (json.status === false) {
                    console.log('ko');
                    if(json.message !== undefined) {
                        let message = document.querySelector('.message');
                        message.innerHTML = json.message;
                        message.classList.remove('d-none');
                    }
                    // je suis pas connecté
                }
        });
    }

    // pour catcher l'evenement et ici pour lorsqu'on click sur submit a garde la page
    // valable que pour le submit
    is_connected().then(json => {
        if(json.status) {
            window.location.href = '/';
        }
    });
    let form = document.querySelector('#login-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        login(form);
    })
});