
window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
const form = document.getElementById("formulario");
const url = "https://todo-api.digitalhouse.com/v1/users";


/* -------------------------------------------------------------------------- */
/*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
/* -------------------------------------------------------------------------- */

form.addEventListener('submit', function (event) {
       event.preventDefault(); // Evitar que el formulario se envíe

       // Capturar valores del formulario
    const nombreUsuario = document.getElementById("inputNombre").value.trim();
    const apellidoUsuario = document.getElementById("inputApellido").value.trim();
    const emailUsuario = document.getElementById("inputEmail").value.trim();
    const contraseniaUsuario = document.getElementById("inputPassword").value;
    const repetirContrasenia = document.getElementById("inputPasswordRepetida").value;

       // Validaciones
    let regex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regexSinespacio = /^[^\s]+$/;

    if (!nombreUsuario) {
        alert("El campo del usuario no debe estar vacío!");
        return;
    }

    if (!regexSinespacio.test(nombreUsuario)) {
        alert("El campo del usuario no debe tener espacios");
        return;
    }

    if (!apellidoUsuario || apellidoUsuario.length < 3 || !regexSinespacio.test(apellidoUsuario)) {
        alert("El campo del apellido no debe estar vacío, debe tener al menos tres letras y no debe contener espacios!");
        return;
    }

    if (!emailUsuario) {
        alert("El campo del correo no debe estar vacío!");
        return;
    }

    if (!emailRegex.test(emailUsuario)) {
        alert("Debe ser un email válido");
        return;
    }

    if (!regex.test(contraseniaUsuario)) {
        alert("La contraseña debe tener al menos una mayúscula, un símbolo y un número, y tener una longitud mínima de 8 caracteres");
        return;
    }

    if (contraseniaUsuario !== repetirContrasenia) {
        alert("Las contraseñas deben ser iguales");
        return;
    }

       // Preparar datos para enviar a la API
    let data = {
        firstName: nombreUsuario,
        lastName: apellidoUsuario,
        email: emailUsuario,
        password: contraseniaUsuario,
    };

    let settings = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    };

       // Realizar registro
    realizarRegister(settings);
});

   /* -------------------------------------------------------------------------- */
   /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
   /* -------------------------------------------------------------------------- */

function realizarRegister(settings) {
    fetch(url, settings)
        .then(res => {
            if (!res.ok) {
                throw new Error("Error en la petición HTTP: " + res.status);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            if (data.jwt) {
                localStorage.setItem("jwt", data.jwt);
                alert("Usuario registrado con éxito 😎");
                setTimeout(() => {
                    location.replace("/mis-tareas.html");
                }, 3000);
            } else {
                throw new Error("Respuesta de API inesperada");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un problema con el registro. Por favor, intenta nuevamente.");
        });
}
});