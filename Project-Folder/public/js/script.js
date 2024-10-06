document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (e) {
        const username = form.querySelector('input[name="username"]').value;
        const password = form.querySelector('input[name="password"]').value;

        if (username.trim() === '' || password.trim() === '') {
            e.preventDefault();
            alert('Please fill out both fields.');
        }
    });
});
