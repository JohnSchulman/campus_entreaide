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

    // une scope c'est un endroit definie ou on des baerriere
    // fait partie du scope general de l'evenement
    // dans un scope on peut rentrer mais pas sortir
    // une variable peut etre utliser dans une fonction mais pas en dehors du scope
    let form = document.querySelector('#create_demande_form');

    function create_demande(type, values) {
        type = parseInt(type);
        const regex = /[0-9]{2}-[0-9]{2}-[0-9]{4}/gm;
        let m;
        // j'execute la regex avec une valeur dedans
        // code pris sur regex101.com
        let cmp = 0;
        while ((m = regex.exec(values.date)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
                cmp++;
            });
        }
        if (cmp === 0) {
            throw new Error('Le format de la date n\'est pas correcte.');
        }

        fetch(form.getAttribute('action'), {
            method: form.getAttribute('method'),
            body: JSON.stringify({...values, type}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => r.json())
            .then(json => {
                console.log(json);
            })

    }

    form.addEventListener("submit", function(e){
        // evite la propagation d'un comportement par defaut
        // ici "submit" ne l'envoie pas tout suite passe par
        // la fonction et donc par le Fetch
        e.preventDefault();
        let type = document.querySelector('#service_type').value;
        let values = {};
        if (type === '0') {
            values = {
                description: document.querySelector('#descriptionObject').value,
                category: document.querySelector('#autocomplete_input').value,
                duration: document.querySelector('#duration').value,
                budget: document.querySelector('#budget').value,
                date: document.querySelector('#date').value,
            };
        } else if (type === '1') {
            values = {
                description: document.querySelector('#desccriptionService').value,
                category: document.querySelector('#autocomplete_input_service').value,
                budget: document.querySelector("#budget_service").value,
                date: document.querySelector('#date_service').value,
            };
        }
        try {
            create_demande(type, values);
        } catch (e) {
            // interaction html en javascript
            // ici on rajoute dans le .dust une classe dans le .input et puis
            //  on creer un div et puis  on ajoute une classe invalide-feedback  dans le div
            document.querySelector('#date').classList.add('is-invalid');
            let feedback = document.createElement('div');
            feedback.classList.add('invalid-feedback');
            feedback.innerHTML = e.message;
            document.querySelector('#date').parentElement.appendChild(feedback);
            console.log(e.message);
        }
    });

    
});
