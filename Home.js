window.onload = function(){
    let imagine = document.querySelector(".container");
    let select = document.getElementById("info");
    
    fetch("flori.json").then(function(response){
        if(response.status == 200){
            return response.json();
        }
        else{
            throw "Eroare " + response.status;
        }
    }).then(function(date){
        let indiceRandom = Math.floor(Math.random()*date.length);
        console.log(indiceRandom);

        let img = document.createElement("img");
        img.src = "Poze/" + date[indiceRandom].sursa;
        imagine.appendChild(img);

        let title = document.createElement("h3");
        title.innerText = date[indiceRandom].nume;
        select.appendChild(title);

        let paragraf = document.createElement("p");
        paragraf.innerText = date[indiceRandom].text;
        select.appendChild(paragraf);

        myInterval = setInterval(setColor, 500);
        function setColor() {
            title.style.color= (title.style.color == "rgb(251, 251, 117)" ? "#ff3b55" : "rgb(251, 251, 117)");
        }

    }).catch(function(err){
        console.error(err);
    })
}
