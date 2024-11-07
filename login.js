const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const form = document.getElementById("form-login");
const togglePassword = document.getElementById("toggle-password");

togglePassword.addEventListener("click", function () {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.innerHTML =
            '<img src="Imagens Login/Olho fechado.png" alt="esconder senha">';
    } else {
        passwordField.type = "password";
        togglePassword.innerHTML =
            '<img src="Imagens Login/Olho aberto.png" alt="mostrar senha">';
    }
});

async function login(email, senha) {
    try {
        const response = await fetch(
            `https://gats-repository-api.onrender.com/api/professores/email/${email}/senha/${senha}`
        );
        const data = await response.json();  // Resolve a promessa e converte para JSON
        return data;  // Retorna o objeto
    } catch (error) {
        console.error(error);
    }
}
async function buscarTurmasPorIdProfessor() {
    
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailField.value;
    const senha = passwordField.value;
    
    // Agora o login retornará um objeto
    const userData = await login(email, senha);

    if (userData) {
        localStorage.setItem("email", email);
        localStorage.setItem("id_professor", userData.id);
        window.location.href = "./professor/professor.html";
    } 
});
