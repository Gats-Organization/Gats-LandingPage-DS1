const botao = document.getElementById("ano-select");
const seta = document.getElementById('seta');

// Inicializa a posição fora da função
let posicao = 1;

botao.addEventListener("click", function() {
    if (posicao === 1) {
        seta.style.transform = "rotate(0deg)";
        posicao = 0; // Altera o estado
    } else {
        seta.style.transform = "rotate(180deg)"; // Corrige a rotação para voltar à posição original
        posicao = 1; // Altera o estado
    }
});
