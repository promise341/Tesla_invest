const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');


const USERS = {
    carolyn: { password: 'carolyn123', name: 'Carolyn' }
};

/* =========================
   MODAL FUNCTIONS
========================= */

function showModal(title, message, onClose) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add("show");

    // Store callback for when modal closes
    modal.onCloseCallback = onClose;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("show");

    // Execute callback if exists
    if (modal.onCloseCallback) {
        modal.onCloseCallback();
        modal.onCloseCallback = null;
    }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
}

// Allow Enter key to submit login
username.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
});

password.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
});

loginBtn.addEventListener('click', login);


function login() {
    const u = username.value.toLowerCase();
    const p = password.value;


    if (USERS[u] && USERS[u].password === p) {
        showModal('Login Successful!', `Welcome, ${USERS[u].name}! Redirecting to your wallet...`, () => {
            localStorage.setItem('loggedInUser', u);
            window.location.href = 'wallet.html';
        });

        // Auto redirect after 1.5 seconds
        setTimeout(() => {
            localStorage.setItem('loggedInUser', u);
            window.location.href = 'wallet.html';
        }, 1500);
    } else {
        showModal('Login Failed', 'Invalid username or password. Please try again.');
    }
}
