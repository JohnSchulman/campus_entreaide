window.addEventListener('load', function() {

    is_connected().then(json => {
        // tableau d'éléments html qui ont cette classe la
        // queryselectorAll equivaut getelement par class name
        // querySelector récupère par contre juste un element de l'id ou de la classe
        let show_on_connected = document.querySelectorAll('.show-on-connected');
        let show_on_disconnected = document.querySelectorAll('.show-on-disconnected');

        for(let elem of show_on_connected) {
            // d-none c'est une classe raccourcie du css display none
            if(json.status) {
                elem.classList.remove('d-none');
            } else {
                elem.classList.add('d-none');
            }
        }

        for(let elem of show_on_disconnected) {
            if(json.status) {
                elem.classList.add('d-none');
            } else {
                elem.classList.remove('d-none');
            }
        }
    });
});