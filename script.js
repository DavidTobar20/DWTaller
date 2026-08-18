window.onload = function () {

    var fichas = document.querySelectorAll(".ficha");

    var zonaControles = document.getElementById("zona-controles") || document.body;

    var boton = document.createElement("button");
    boton.textContent = "Mostrar sólo héroes";
    boton.classList.add("boton-personajes")
    zonaControles.appendChild(boton);



    var mostrandoSoloHeroes = false;

    // Se oculta la columna de Bootstrap y no sólo la ficha, para que no quede un hueco en el Grid
    function columnaDe(ficha) {
        return ficha.closest(".col-12") || ficha;
    }

    boton.addEventListener("click", function () {

        if (mostrandoSoloHeroes === false) {

            for (var ficha of fichas) {

                if (ficha.getAttribute("data-tipo") === "villano") {
                    columnaDe(ficha).style.display = "none";
                } else {
                    ficha.classList.add("resaltado");
                }

            }

            boton.textContent = "Mostrar todos";
            mostrandoSoloHeroes = true;

        } else {

            for (var ficha of fichas) {

                columnaDe(ficha).style.display = "";
                ficha.classList.remove("resaltado");

            }

            boton.textContent = "Mostrar sólo héroes";
            mostrandoSoloHeroes = false;
        }

    });

    for (var ficha of fichas) {

        ficha.addEventListener("mouseover", function () {
            this.style.backgroundColor = "#585b48";
        });

        ficha.addEventListener("mouseout", function () {
            this.style.backgroundColor = "#2a2a2a";
        });

    }

    var imagenes = document.querySelectorAll(".ficha img");

    for (var imagen of imagenes) {
        imagen.classList.add("borde-redondeado");
    }



    function cargarFraseDelDia(callback) {
        fetch("https://catfact.ninja/fact")
            .then(function (respuesta) { return respuesta.json(); })
            .then(function (datos) { callback(datos.fact); })
            .catch(function (error) { console.log("No se pudo cargar la frase:", error); });
    }


    var botonFrase = document.createElement("button");
    botonFrase.textContent = "Frase del día";
    botonFrase.classList.add("boton-frase")
    zonaControles.appendChild(botonFrase);
    botonFrase.addEventListener("click", function () {
        cargarFraseDelDia(function (frase) {
            var p = document.createElement("p");
            p.textContent = frase;
            zonaControles.appendChild(p);
        });
    });



    function guardarFavorito(nombre) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (nombre) {
                    resolve(nombre + " guardado como favorito");
                } else {
                    reject("No se pudo guardar: falta el nombre");
                }
            }, 1000);
        });
    }
    for (var ficha of fichas) {
        var botonFav = document.createElement("button");
        botonFav.textContent = "⭐ Favorito";
        botonFav.classList.add("boton-favorito");
        (ficha.querySelector(".card-body") || ficha).appendChild(botonFav);
        botonFav.addEventListener("click", function () {
            var nombreEl = this.parentElement.querySelector(".nombre");
            guardarFavorito(nombreEl.textContent)
                .then(function (mensaje) { console.log(mensaje); })
                .catch(function (error) { console.log(error); });
        });
    }




};
