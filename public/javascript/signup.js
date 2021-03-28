async function createAccount(event) {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const email = document.querySelector('#signup-email').value.trim();

    if (username && password && email) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log(`Account has been successfully created for ${username}`);
             document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', createAccount);