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
});
