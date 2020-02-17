window.addEventListener('load', function () {
    // lance une promesse si succes le then retourne le resultat de l'api en json
    is_connected().then(json => {
        // tableau d'éléments html qui ont cette classe la
        // queryselectorAll equivaut getelement par class name
        // querySelector récupère par contre juste un element de l'id ou de la classe
        let show_on_connected = document.querySelectorAll('.show-on-connected');
        let show_on_disconnected = document.querySelectorAll('.show-on-disconnected');

        for (let elem of show_on_connected) {
            // d-none c'est une classe raccourcie du css display none
            if (json.status) {
                elem.classList.remove('d-none');
            } else {
                elem.classList.add('d-none');
            }
        }

        for (let elem of show_on_disconnected) {
            if (json.status) {
                elem.classList.add('d-none');
            } else {
                elem.classList.remove('d-none');
            }
        }
    });

    document.querySelector("#Service").addEventListener("click", function () {
        document.querySelector('.objects').style.display = 'none';
        document.querySelector('.services').style.display = 'inherit';
    });

    document.querySelector("#Objet").addEventListener("click", function () {
        document.querySelector('.objects').style.display = 'inherit';
        document.querySelector('.services').style.display = 'none';
    });

    document.querySelector('#btn-menu').addEventListener('click', () => {
        let menu = document.querySelector('#menu');
        if (menu.classList.contains('d-none')) {
            menu.classList.remove('d-none')
        } else {
            menu.classList.add('d-none')
        }
    });

    document.querySelector("#autocompletion").addEventListener("onKeyUp", function () {
    });
});

function autompletion() {

    // faire une http de la même manière que Ajax mais plus proprement.
    fetch(action, {
        method: method,
        body: JSON.stringify({
            title: titleCategory,
            image: imageCategory
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
        .then(function (json) {
            // si status renvoit true on affiche ok
            if (json.status === true) {
                console.log('ok');
                // je suis connecté
            } else if (json.status === false) {
                console.log('ko');
            }

        });
}
