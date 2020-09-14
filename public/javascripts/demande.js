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
    });

    // soit on met des pparametres sois on mes tout dans un objet
    // pas de typage en javasscript
    function template_card({title, description, link_proposition, link_more, id}){
        return `<div class="card mt-5">
                <!--<img class="card-img" src="PicDemande.png" alt="Card image cap">-->
                <img src="/images/PicDemande.png" alt="Responsive image" class="card-img mt-5">
                <div class="card-img-overlay">
                    <h5 class="card-title" position align="right">${title}</h5>
                </div>
                <div class="card-body" data-max_length="60">
                    <p class="card-text">${description}</p>
                    <a href="${link_proposition}" class="card-link" >Faire Proposition</a>
                     <button id="open_modal_${id}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Voir Plus
                    </button>
                </div>
            </div>`
    }

    function modal({title, description}){
        return `
                <!-- Button trigger modal -->
       <!-- Modal -->
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">${title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p>${description}</p>
                   
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>`
            }


    // on écrit l'url en paramètre car on ne passe pas par une formulaire
    // variable qui recupere le hidden
    let category_id = document.querySelector('#category_id');
    let is_me = document.querySelector('#is_me');
    // ternaire pour pouvoir rajouter un id_categories dans l'url de l'API
    // on peut faire attant de condition dans un fetch car on aura en final qu'une seul cas ici
    fetch("/api/requests" + (category_id ? '/' + category_id.value : '') + (is_me ? '/mine'  : ''), {
        method: "get",
        headers: {
            "Content-Type": 'application/json'
        }
        // r = une reccourcie pour la reponse
    }).then(r => r.json()).then(json => {

        let alert_container = document.querySelector('#show_on_not_result');
        // l'element qui englobe toutes les cardes
        let card_container = document.querySelector('.card-projects-list');
        let modal_container = document.querySelector('.modal-projects-list');

        card_container.innerHTML = '';
        if(json.status){
            alert_container.classList.add('d-none');

            for (let elem of json.result){
                card_container.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4">
                                            ${template_card({title:elem.title, description:elem.description, link_proposition:'/requests/proposition/'+elem.id, link_more:'/requests/'+elem.id, id: elem.id})}                                       
                                        </div>`;
            }

            for (let elem of json.result) {
                let bouton = card_container.querySelector(`#open_modal_${elem.id}`);
                if(bouton){
                    bouton.addEventListener('click', function (e) {
                        e.preventDefault();

                        modal_container.innerHTML = `<div class="col-sm-12 col-md-6 col-lg-4">
                                            ${modal({title:elem.title, description:elem.description, id:elem.id})}                                       
                                        </div>`;

                    })
                }
            }
        }
        else{
            alert_container.querySelector('.alert').innerHTML = json.message;
            alert_container.classList.remove('d-none');
        }
    })
});
