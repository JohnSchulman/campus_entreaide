// permet d'encapsuler l'evenement sur toute la page
// du coup les selecteurs sont pas null
window.addEventListener('load', function () {
    let autocomplete_input = document.querySelector('#autocomplete_input');
    let autocompletion = document.querySelector('#autocompletion');

    function catcher_autocompletion() {
        // lance une promesse si succes le then retourne le resultat de l'api en json
        fetch('/api/categories/autocompletion/' + document.querySelector('#service_type').value + '/' + autocomplete_input.value, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(r => r.json())
            .then(function (json) {
                if(json.status) {
                    console.log('success');
                    // permet de ne pas afficher mille fois l'element
                    // permet de vider de html de l'element
                    autocompletion.innerHTML = '';
                    if(json.categories.length === 0) {
                        autocompletion.innerHTML = `<a class="dropdown-item" href="#">Aucun résultat</a>`;
                    }
                    for(let c of json.categories) {
                        // concantene en html le petit html qui est dans le chaine de caractere
                        // innerHTML permet d'ajouter du html de l'élément
                        // permet de vider de html de l'element
                        // permet de redifnir de html
                        // tout depend du += / = / = vide
                        autocompletion.innerHTML += `<a class="dropdown-item autocomplete-link" 
                                                        data-id="${c.id}" 
                                                        data-title="${c.title}" 
                                                        href="#"> <i class="fa fa-${c.image}"></i> ${c.title}</a>`;
                    }

                    // ajouter l'element click sur le lien
                   // cette partie est pour supprimer la liste et l'afficher dans l'input
                    for(let autocomplete_link of document.querySelectorAll('.autocomplete-link')) {

                        autocomplete_link.addEventListener('click', e => {
                           // permet de enlever de ne pas mettre le # a la fin du l'url
                            e.preventDefault();
                            // permet d'afficher le text dans le input
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

    autocomplete_input.addEventListener('keyup', function () {
        if(autocomplete_input.value !== '') {
            catcher_autocompletion()
        } else {
            autocompletion.innerHTML = '';
            // supprime l'element de la classList
            // supprime l'element partie front
            autocompletion.classList.remove('show');
        }
    });
});
