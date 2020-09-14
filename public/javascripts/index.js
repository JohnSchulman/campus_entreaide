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
        while ((m = regex.exec(values.creation_date)) !== null) {
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
            let date_id = type === 1 ? 'date_service' : 'date;';
            let error = new Error('Le format de la date n\'est pas correcte.');
            // j'affecte une proprieté code à mon obet erreur et puis j'affecte date_id à error.code
            // pour avoir un id sêcifique pour le recuperer dans le catch
            error.code = date_id;
            throw error;
        }


        fetch(form.getAttribute('action'), {
            method: form.getAttribute('method'),
            body: JSON.stringify({...values, type}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => r.json())
            .then(json => {
                if (!json.status && json.type === "redirect"){
                    window.location.href = '/login';
                }
                else if(json.status){
                    let show_on_demand_sent = document.querySelectorAll('.show_on_demand_sent');
                    for (let elem of show_on_demand_sent) {
                        if (json.status) {
                            elem.classList.remove('d-none');
                        } else {
                            elem.classList.add('d-none');
                        }
                    }
                }
                let _values = {};
                if (type === 0) {
                    _values = {
                        description: document.querySelector('#descriptionObject'),
                        category: document.querySelector('#autocomplete_input'),
                        time: document.querySelector('#duration'),
                        budget: document.querySelector('#budget'),
                        creation_date: document.querySelector('#date'),
                        title: document.querySelector('#title'),
                    };
                } else if (type === 1) {
                    _values = {
                        description: document.querySelector('#desccriptionService'),
                        category: document.querySelector('#autocomplete_input_service'),
                        budget: document.querySelector("#budget_service"),
                        creation_date: document.querySelector('#date_service'),
                        title: document.querySelector('#title'),
                    };
                }
                // un for of
                for(let key of Object.keys(_values)) {
                    let value = _values[key];
                    value.value = "";
                }
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
                time: document.querySelector('#duration').value,
                budget: document.querySelector('#budget').value,
                creation_date: document.querySelector('#date').value,
                title: document.querySelector('#title').value,
            };
        } else if (type === '1') {
            values = {
                description: document.querySelector('#desccriptionService').value,
                category: document.querySelector('#autocomplete_input_service').value,
                budget: document.querySelector("#budget_service").value,
                creation_date: document.querySelector('#date_service').value,
                title: document.querySelector('#title').value,
            };
        }

        try {
            create_demande(type, values);
        }
        catch (e) {
            // interaction html en javascript

            // ici on rajoute dans le .dust ...
            // grace à l'id je me place dans le l'input et puis je creer ma deuxième classe dans l'input
            document.querySelector('#' + e.code).classList.add('is-invalid');
            // je creer le div
            let feedback = document.createElement('div');
            feedback.classList.add('invalid-feedback');
            // l'erreur de la class "invalid-feedback
            // pour ecrire du contenue dans l'html. Mais si tu as déjà du contenue fait attention
            feedback.innerHTML = e.message;
            // on place le div après le span
            document.querySelector('#' + e.code).parentElement.appendChild(feedback);
            console.log(e.message);
        }
    });

    function list_categories_by_type(type) {
        return fetch(`/api/categories/${type}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => r.json());
    }

    function write_buttons(container, categories) {
        if (container) {
            container.innerHTML = '';
        // pour creer les boutons
            let i = 0;
            for (let { id, title, image } of categories) {
                let classe;
                // si tu est sur le premier element
                // pour les contoutrs
                if (i === 0) {
                    classe = 'roundleft';
                } else if (i === categories.length - 1) {
                    classe = 'roundright';
                } else {
                    classe = '_middle';
                }
                container.innerHTML += `<button id="category_${id}" class="col-3 button bouton_${classe}" type="button"><i class="fas fa-${image}"></i> 
                <a href="/demande/${id}" target="_blank">${title}</a>
            </button>`;
                i++;
            }
        }
    }

    function write_error(container, error) {
        if (container) {
            container.innerHTML = error;
        }
    }

    // on liste les demandes en fonction du type de categorie
    list_categories_by_type('services').then(json => {
        if (json.status) {
            write_buttons(document.querySelector('#services_categories_container'), json.result)
        } else {
            write_error(document.querySelector('#services_categories_container'), 'Aucune catégorie disponible');
        }
    });

    list_categories_by_type('objects').then(json => {
        if (json.status) {
            write_buttons(document.querySelector('#objects_categories_container'), json.result)
        } else {
            write_error(document.querySelector('#services_categories_container'), 'Aucune catégorie disponible');
        }
    });
});

