// permet d'encapsuler l'evenement sur toute la page
// du coup les selecteurs sont pas null
window.addEventListener('load', function () {
    let autocomplete_input_object = document.querySelector('#autocomplete_input');
    let autocompletion_object = document.querySelector('#autocompletion');

    let autocomplete_input_service = document.querySelector('#autocomplete_input_service');
    let autocompletion_service = document.querySelector('#autocompletion_service');

    // autocomplete_input est l'input de base
    // autocompletion c'est le conteneur sur laquelle se trouve la reponse trouve
    function catcher_autocompletion(autocomplete_input, autocompletion) {
        // lance une promesse si succes le then retourne le resultat de l'api en json
        fetch('/api/categories/autocompletion/' + document.querySelector('#service_type').value + '/' + autocomplete_input.value, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(r => r.json())
            .then(function (json) {
            if(json.status) {
                console.log('success');
                // permet de ne pas afficher mille fois l'element
                // permet de vider du html de l'element
                autocompletion.innerHTML = '';
                // si le catégorie est faux j'affiche aucun resultat
                if(json.categories.length === 0) {
                    autocompletion.innerHTML = `<a class="dropdown-item" href="#">Aucun résultat</a>`;
                }
                for(let c of json.categories) {
                    // concantene en html le petit html qui est dans le chaine de caractere
                    // innerHTML permet d'ajouter du html de l'élément
                    // permet de vider du html de l'element
                    // permet de redifnir du html
                    // tout depend du += / = / = vide
                    // $ pour une variable en html
                    autocompletion.innerHTML += `<a class="dropdown-item autocomplete-link" 
                                                        data-id="${c.id}" 
                                                        data-title="${c.title}" 
                                                        href="#"> <i class="fa fa-${c.image}"></i> ${c.title}</a>`;
                }

                // ajouter l'element click sur le lien
                // cette partie est pour supprimer la liste et l'afficher dans l'input
                for(let autocomplete_link of document.querySelectorAll('.autocomplete-link')) {

                    autocomplete_link.addEventListener('click', e => {
                        // permet d'enlever de ne pas mettre le # a la fin du l'url
                        e.preventDefault();
                        // permet d'afficher le text dans le input
                        // on recupère l'attribut 'data-title' (qui contient le titre) de la class (ou selector) 'autocomplete-link'
                        // et on le récupère la valeur dans l'input (grâce au selector autocomplete_input)
                        autocomplete_input.value = autocomplete_link.getAttribute('data-title');
                        // ca supprime la liste html
                        autocompletion.innerHTML = '';
                        //  supprime la liste en css
                        autocompletion.classList.remove('show');
                    })
                }
                // on boucle sur la liste d'element html
                // ajouter une classe sur l'élément html autocompletion
                // dans un objet html tu as toujours un propriété class donc faut mettre classlist
                autocompletion.classList.add('show');
                console.log(json.categories);
            }
            else {
                console.log('error');
            }
        });
    }

    // supprime la liste quand on arrête de clicker
    // la prmeiere autocomplete_input est l'élément
    autocomplete_input_object.addEventListener('keyup', function () {
        if(autocomplete_input_object.value !== '') {
            catcher_autocompletion(autocomplete_input_object, autocompletion_object);
        } else {
            autocompletion_object.innerHTML = '';
            // supprime l'element de la classList
            // supprime l'element partie front
            autocompletion_object.classList.remove('show');
        }
    });

    // supprime la liste quand on arrête de clicker
    autocomplete_input_service.addEventListener('keyup', function () {
        if(autocomplete_input_service.value !== '') {
            catcher_autocompletion(autocomplete_input_service, autocompletion_service);
        } else {
            autocompletion_service.innerHTML = '';
            // supprime l'element de la classList
            // supprime l'element partie front
            autocompletion_service.classList.remove('show');
        }
    });
});
