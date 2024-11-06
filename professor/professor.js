const body = document.getElementsByTagName("body")[0];

document.addEventListener("DOMContentLoaded", async function () {
  const imagem = document.getElementById("foto-prof");
  const nome_prof = document.getElementById("nome-prof");

  const email = localStorage.getItem("email");
  console.log(email);

  const professor = await buscarProfessor(email);
  nome_prof.textContent = nome_prof.textContent + " " + professor.nome;

  const turmas = await turmasByProfessorId(professor.id);
  localStorage.setItem("turmas", JSON.stringify(turmas));

  if (!localStorage.getItem("catImage") || !localStorage.getItem("berryName")) {
    fetchCatImage(apiUrl, imagem);
    fetchBerryName(apiUrl2, nome_prof);
  }

  const capaElements = document.querySelectorAll(".capa");
  const conteudoElements = document.querySelectorAll(".conteudo");

  capaElements.forEach((capa) => {
    capa.addEventListener("mouseover", () => {
      capa.classList.add("invisivel");
    });

    capa.addEventListener("mouseout", () => {
      capa.classList.remove("invisivel");
    });
  });

  conteudoElements.forEach((conteudo, index) => {
    conteudo.addEventListener("click", () => {
      if (index === 0) {
        window.location.href = "./ranking.html";
      } else if (index === 1) {
        window.location.href = "./quizzes.html";
      } else if (index === 2) {
        window.location.href = "./atividades.html";
      }
    });
  });
  const foto_professor = document.getElementById("foto-prof");
  foto_professor.src = localStorage.getItem("foto");

  abrirImagem();

});

function abrirImagem() {
  const fileInput = document.getElementById("file-input");
  const uploadBtn = document.getElementById("abrir-imagem");
  const profilePic = document.getElementById("foto-prof");

  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        profilePic.src = e.target.result;
        localStorage.setItem("foto", e.target.result);
      };

      reader.readAsDataURL(file);
    }
  });
}

async function buscarProfessor(email) {
  try {
    const url3 =
      "https://gats-educaeco-api-dev2-pe6e.onrender.com/api/professores/email/" + email;
    const response = await fetch(url3);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar o ID do professor:", error);
    return null;
  }
}

async function turmasByProfessorId(professorId) {
  try {
    const url4 =
      "https://gats-educaeco-api-dev2-pe6e.onrender.com/api/turmas/professor/" +
      professorId;
    const response = await fetch(url4);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar as turmas do professor:", error);
    return null;
  }
}
