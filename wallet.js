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
   AUTH / SESSION
========================= */

function logout() {
    alert("You have been signed out.");
    // redirect example
    window.location.href = "login.html";
}


let currentBalance = 80000; // Initial balance in BTC

function proceedWithPayment() {
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (!paymentMethod) {
        alert("Please select a payment method to proceed.");
        return;
    }

    const methodName = paymentMethod === "bitcoin" ? "Bitcoin" : "Card Payment";
    alert(`Payment Method: ${methodName}\n\nA $500 processing fee is required to continue.\n\nPlease confirm or complete this payment before moving forward.`);
}

function withdrawBtc() {
    const withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);
    const withdrawAddress = document.getElementById("withdrawAddress").value;

    if (!withdrawAmount || withdrawAmount <= 0) {
        alert("Please enter a valid amount to withdraw.");
        return;
    }

    if (withdrawAmount > currentBalance) {
        alert("Insufficient balance. You have " + currentBalance);
        return;
    }

    if (!withdrawAddress) {
        alert("Please enter a recipient address.");
        return;
    }

    currentBalance -= withdrawAmount;
    alert(`To complete this withdrawal, you will need to pay a $5,000 processing fee.`);
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
        alert("Please enter a valid amount.");
        return;
    }

    const recipientAddress = prompt("Enter the recipient's address:");
    if (!recipientAddress) {
        alert("Please enter a recipient address.");
        return;
    }

    // Proceed with sending BTC
    alert(`You are about to send ${sendAmount} BTC to ${recipientAddress}.`);
    // Here, you would normally call a function to send the BTC
    addTransaction("Sent", parseFloat(sendAmount));
}

function receiveBtc() {
    alert("To receive Bitcoin, please share your wallet address with the sender.");
    // Display the wallet address or QR code if applicable
    const walletAddress = "1A2B3C4D5E6F7G8H9I"; // Example address
    alert(`Your wallet address: ${walletAddress}`);
}

function viewQrCode() {
    alert("Displaying QR Code... )");
    // You can integrate a library to generate a QR code from the wallet address
}

// You can also add any additional functions for further enhancements as needed
