document.addEventListener("DOMContentLoaded", () => {
    verficaStareLogin();
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === 'l' && !sessionStorage.getItem("userLogat")) {
            afiseazaInterfataLogin();
        }
    });
});

function verficaStareLogin() {
    const userLogat = sessionStorage.getItem("userLogat");
    const header = document.querySelector("header");

    let statusDiv = document.getElementById("auth-status");
    if (!statusDiv) {
        statusDiv = document.createElement("div");
        statusDiv.id = "auth-status";
        statusDiv.style.cssText = "text-align: right; padding: 10px; font-style: italic; color: lightgoldenrodyellow";
        header.appendChild(statusDiv);
    }

    if (userLogat) {
        statusDiv.innerHTML = `Utilizator: <b>${userLogat}</b> | <button id="btnLogout">Logout</button>`;
        document.getElementById("btnLogout").onclick = logout;
    } else {
        statusDiv.innerHTML = "Apasă tasta 'L' pentru login";
    }
}

function afiseazaInterfataLogin() {
    const USER_CORECT = "admin";
    const PAROLA_CORECTA = "12345";

    const utilizator = prompt("Utilizator:");
    const parola = prompt("Parola:");

    if (utilizator === USER_CORECT && parola === PAROLA_CORECTA) {
        sessionStorage.setItem("userLogat", "Administrator");
        alert("Autentificare reușită!");
        location.reload();
    } else {
        alert("Date incorecte!");
    }
}

function logout() {
    sessionStorage.removeItem("userLogat");
    alert("Te-ai delogat.");
    location.reload();
};

 