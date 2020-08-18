window.addEventListener('load', function () {
    function register(form) {
        let action = form.getAttribute('action');
        let method = form.getAttribute('method');

        let avatar = document.querySelector('#avatar');
        let firstName = document.querySelector("#firstName");
        let lastName = document.querySelector("#lastName");
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        let address = document.querySelector("#address");

        // on met tout les valeurs l'une après l'autres dans formData
        // y compris l'avatar
        // pour que dans le fetch o à qu'a mettre formData
        let formData = new FormData();
        formData.append('avatar', avatar.files[0]);
        formData.append('firstName', firstName.value);
        formData.append('lastName', lastName.value);
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('address', address.value);

        fetch(action, {
            method: method,
            body: formData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => r.json())
            .then(function (json) {
                if(json.status) {
                    alert('success')
                }
                else {
                    alert('error');
                }
            });
    }

    is_connected().then(json => {
        if(json.status) {
            window.location.href = '/';
        }
    });
    let form = document.querySelector('#register-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        register(form);
    })
});
