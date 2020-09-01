window.addEventListener('load', () => {
    is_connected().then(json => {
        if(json.status) {
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
        }
    })

    // nsoit on met des pparametres sois on mes tout dans un objet
    // pas de typage en javasscript
   function template_card({title, description, link_proposition, link_more}){
        return `<div class="card mt-5">
                <!--<img class="card-img" src="PicDemande.png" alt="Card image cap">-->
                <img src="/images/PicDemande.png" alt="Responsive image" class="card-img mt-5">
                <div class="card-img-overlay">
                    <h5 class="card-title" position align="right">${title}</h5>
                </div>
                <div class="card-body" data-max_length="60">
                    <p class="card-text">${description}</p>
                    <a href="${link_proposition}" class="card-link" >Faire Proposition</a>
                    <!--<a href="${link_more}" class="card-link enabled" >Voir plus</a>-->
                </div>
            </div>`
   }

    fetch("/api/requests", {
        method: "get",
        headers: {
            "Content-Type": 'application/json'
        }
        // r = une reccourcie pour la reponse
    }).then(r => r.json()).then(json => {

        let alert_container = document.querySelector('#show_on_not_result');
        // l'element qui englobe toutes les cardes
        let container = document.querySelector('.card-projects-list');
        container.innerHTML = '';
        if(json.status){
            alert_container.classList.add('d-none');

            for (let elem of json.result){
                container.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4">
                                            ${template_card({title:elem.title, description:elem.description, link_proposition:'/requests/proposition/'+elem.id, link_more:'/requests/'+elem.id})}
                                        </div>`;


            }
        }
        else{
            alert_container.querySelector('.alert').innerHTML = json.message;
            alert_container.classList.remove('d-none');
        }
    })
});
