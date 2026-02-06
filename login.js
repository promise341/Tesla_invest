const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');


const USERS = {
    carolyn: { password: 'carolyn123', name: 'carolyn' }
};


loginBtn.addEventListener('click', login);


function login() {
    const u = username.value.toLowerCase();
    const p = password.value;


    if (USERS[u] && USERS[u].password === p) {
        alert('Login successful! Welcome, ' + USERS[u].name);
        localStorage.setItem('loggedInUser', u);
        window.location.href = 'wallet.html';
    } else {
        alert('Invalid credentials (demo)');
    }
}
