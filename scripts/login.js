window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    console.log("Se cargó la página con éxito");
    const url = "https://todo-api.digitalhouse.com/v1/users/login";
    const form = document.getElementById("formulario");

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
    event.preventDefault(); //evitamos que la página carge por default

    //capturamos los valores del formulario

    const correo = document.getElementById("inputEmail").value;
    console.log(correo);
    const contrasenia = document.getElementById("inputPassword").value;
    console.log(contrasenia);

    // Preparar datos para enviar a la API
    let data = {
        email: correo,
        password: contrasenia,
    };

    let settings = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    };
    realizarLogin(settings);
});


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {

    fetch(url, settings)
    .then(res =>{
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Usuario no encontrado. Verifica tus credenciales.");
            }
            if (res.status === 500) {
                throw new Error("Error en el servidor");
            }
            if (res.status === 400) {
                throw new Error("Contraseña incorrecta");
            }
            throw new Error("Error en la petición HTTP: " + res.status);
        }
        return res.json();
    })
    .then(data =>{
        console.log(data);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            alert(`Bienvenido 👍`)

             // Verificar si el nombre de usuario está disponible en la respuesta
             const nombreUsuario = data.firstName; // Asegúrate de adaptar esto según la estructura de tu respuesta JSON

            if (nombreUsuario) {
                alert(`¡Bienvenido ${nombreUsuario}! 👍`);
            } else {
                 alert("¡Bienvenido! 👍"); // Si no hay nombre de usuario disponible
            }

            setTimeout(()=>{
                location.replace("/mis-tareas.html");

            },3000);
            
            
        } else {
            throw new Error("Respuesta de API inesperada");
        }

    })
    .catch((err)=>{
        console.error("Error", err.message);
        alert(err.message); // Mostrar el mensaje de error al usuario

    });
    };
});