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
        // pour switcher entre le formulaire objet et le formulaire service
        document.querySelector('.objects').style.display = 'none';
        document.querySelector('.services').style.display = 'inherit';
        // c'était pour changer la valeur du service type dans le formulaire
        // pour afficher que les categoriesz appartenant au services qu'on veut
        document.querySelector('#service_type').value = '1';
    });

    // même principe mais pour les objets
    document.querySelector("#Objet").addEventListener("click", function () {
        document.querySelector('.objects').style.display = 'inherit';
        document.querySelector('.services').style.display = 'none';
        document.querySelector('#service_type').value = '0';
    });

    // c'était pour afficher le bouton en mode mobile
    // au click sur le bouton menu, affiche le menu si il est caché et le cache si il est affiché.
    document.querySelector('#btn-menu').addEventListener('click', () => {
        let menu = document.querySelector('#menu');
        if (menu.classList.contains('d-none')) {
            menu.classList.remove('d-none')
        } else {
            menu.classList.add('d-none')
        }
    });
});
