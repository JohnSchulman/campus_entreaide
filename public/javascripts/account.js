window.addEventListener('load', function () {
    // lance une promesse si succes le then retourne le resultat de l'api en json
    is_connected().then(json => {
        if(json.status) {
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

            let first_name = json.me.first_name;
            let last_name = json.me.last_name;
            let address = json.me.address;
            if(address !== '') {
                // transforme une string bizarre en json
                address = JSON.parse(address);
            } else {
                address = {};
            }
            let email = json.me.email;

            document.querySelector('#firstname').value = first_name;
            document.querySelector('#name').value = last_name;
            document.querySelector('#mail').value = email;
            if(address.street !== undefined) {
                document.querySelector('#adresse').value = address.street;
            }
            if(address.zipcode !== undefined) {
                document.querySelector('#zipcode').value = address.zipcode;
            }
            if(address.city !== undefined) {
                document.querySelector('#city').value = address.city;
            }

            console.log(json.me)
        } else {
            window.location.href = '/login';
        }
    })
});