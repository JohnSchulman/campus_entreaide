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

        let formData = new FormData();
        formData.append('avatar', avatar.files[0]);
        formData.append('firstName', firstName.value);
        formData.append('lastName', lastName.value);
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('address', address.value);

        fetch(action, {
            method: method,
            body: formData
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

    let form = document.querySelector('#register-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        register(form);
    })
});