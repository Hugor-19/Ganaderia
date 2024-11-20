new Vue({
    el: "#app",
    data: {
        full_name: "",
        email: "",
        password: "",
        errorMessage: "",
        apiUrl: "http://127.0.0.1:5000",
    },
    methods: {
        async handleRegister() {
            if (this.full_name.trim() == "" || this.email.trim() == "" || this.password.trim() == "") {
                this.errorMessage = "Faltan datos para el registro";
                return;
            }
            try {
                const response = await axios.post(`${this.apiUrl}/register`, {
                    full_name: this.full_name,
                    email: this.email,
                    password: this.password,
                });

                if (response.data.message === 'Registro exitoso') {
                    errorMessage = "Registro exitoso. Bienvenido!";
                    window.location.href = "login.html"; // Redirigir a la página de inicio de sesión después del registro
                } else {
                    this.errorMessage = response.data.message;
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    this.errorMessage = "El usuario ya está registrado";
                }
                else {
                    this.errorMessage = "Error en el registro. Intente nuevamente.";
                }
                console.error(error);
            }
        },
        // Método de inicio de sesión existente
        async handleLogin() {
            if (this.email.trim() == "" || this.password.trim() == "") {
                this.errorMessage = "Faltan datos para iniciar sesión";
                return;
            }
            try {
                const response = await axios.post(`${this.apiUrl}/login`, {
                    email: this.email,
                    password: this.password,
                });

                if (response.data.message === 'Inicio de sesión exitoso') {
                    window.location.href = "home.html";
                } else {
                    this.errorMessage = "Credenciales incorrectas";
                }

            } catch (error) {
                this.errorMessage = "Usuario o contraseña incorrectos";
                console.error(error);
            }
        }
    }
});
