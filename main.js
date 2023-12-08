document.addEventListener("DOMContentLoaded", function () {
  // Referencia al formulario
  var loginForm = document.getElementById("loginForm");
  var loginMessage = document.getElementById("loginMessage");

  // Agregar un evento de envío al formulario
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener los valores de los campos de entrada
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Validar los valores del nombre de usuario y la contraseña
    if (username === "jeffer" && password === "12") {
      // Autenticación exitosa para el administrador
      window.location.href = "/admin/admin.html";
      loginMessage.textContent.add('admin');
    } else {
        window.location.href = "/usuario/index.html";
        
      loginMessage.textContent.add('user');
    }
  });
});
