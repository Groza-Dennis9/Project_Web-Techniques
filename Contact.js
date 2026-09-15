document.addEventListener("DOMContentLoaded", () => {
    const formular = document.querySelector("form");
    const sectiunePostari = document.getElementById("postari");

    let colectiePostari = JSON.parse(localStorage.getItem("postari_bujori")) || [];

    function afiseazaPostari() {
        sectiunePostari.innerHTML = ' ';
        colectiePostari.forEach((postare, index) => {
            const div = document.createElement("div");
            div.classList.add("postare-item");
            div.style.border = "1px solid #FFE4E1";
            div.style.margin = "10px 0";
            div.style.padding = "10px";

            div.innerHTML = `
                <p><b>Nume complet:</b> ${postare.nume} ${postare.prenume}</p>
                <p><b>Gen:</b> ${postare.gen}</p>
                <p><b>Nivel experiență:</b> ${postare.nivel}</p>
                <p><b>Mesaj/Recenzie:</b> ${postare.mesaj}</p>
                <small>Postat la: ${postare.data}</small>
                <br>
                <button onclick="stergePostare(${index})">Șterge Postarea</button>
            `;
            sectiunePostari.appendChild(div);
        });
    }

    formular.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!sessionStorage.getItem("userLogat")) {
            alert("Trebuie să fii logat pentru a posta!");
            return;
        }

        const nume = document.getElementById("nume").value;
        const prenume = document.getElementById("prenume").value;
        const nivel = document.getElementById("nivel").value;
        const mesaj = document.getElementById("mesaj").value;

        const genElement = document.querySelector('input[name="Gen"]:checked');
        const gen = genElement ? genElement.nextElementSibling.innerText : "Nespecificat";

        const d = new Date();
        const postareNoua = {
            nume: nume,
            prenume: prenume,
            gen: gen,
            nivel: nivel,
            mesaj: mesaj,
            data: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        };

        colectiePostari.push(postareNoua);
        localStorage.setItem("postari_bujori", JSON.stringify(colectiePostari));

        afiseazaPostari();
        formular.reset();
    });

    window.stergePostare = function(index) {
        if (!sessionStorage.getItem("userLogat")) {
            alert("Trebuie să fii logat pentru a sterge!");
            return;
        }
        colectiePostari.splice(index, 1);
        localStorage.setItem("postari_bujori", JSON.stringify(colectiePostari));
        afiseazaPostari();
    };

    const linkFaq = document.querySelector("#link a");
    linkFaq.addEventListener("click", (e) => {
        const stil = window.getComputedStyle(e.currentTarget);
        alert("Culoarea link-ului este: " + stil.color);
        e.stopPropagation();
    });

    const canvas = document.getElementById("Canvas");
    const ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, 300, 0);
    grd.addColorStop(0, "#3a787cff");
    grd.addColorStop(1, "darkgreen");
    ctx.fillStyle = grd;
    ctx.fillRect(5, 5, 300, 70);
    ctx.font = "40px Caveat, cursive";
    ctx.fillStyle = "white";
    ctx.fillText("Postările mele", 25, 50);

    afiseazaPostari();
});