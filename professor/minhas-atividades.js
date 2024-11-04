// Importando useState e useEffect
const { useState, useEffect } = React;
const body = document.getElementsByTagName("body")[0];

const firebaseConfig = {
    apiKey: "AIzaSyBi7iZJeQzqzXKEEKwzZsL-nKB8qPxrswI",
    authDomain: "educaeco-f6078.firebaseapp.com",
    projectId: "educaeco-f6078",
    storageBucket: "educaeco-f6078.appspot.com",
    messagingSenderId: "12317182780",
    appId: "1:12317182780:web:8ab2b3ec0d8b2e6ea26c39",
    measurementId: "G-08TGRVEGCE",
};
// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
let ultimoModal = null;

const criarModal = (conteudo) => {
    // Remove o modal anterior, se existir
    if (ultimoModal) {
        ultimoModal.remove();
    }

    // Cria um fundo e um card modal
    const fundo = document.createElement("div");
    fundo.style.display = "block";
    fundo.style.position = "fixed";
    fundo.style.height = "100%";
    fundo.style.width = "100%";
    fundo.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Fundo escuro com opacidade
    fundo.style.top = "0";
    fundo.style.left = "0";
    fundo.style.zIndex = "1000"; // Para que fique acima de outros elementos

    const card = document.createElement("div");
    card.style.position = "absolute";
    card.style.top = "50%";
    card.style.left = "50%";
    card.style.transform = "translate(-50%, -50%)"; // Centraliza o card
    card.style.padding = "20px";
    card.style.backgroundColor = "white"; // Cor de fundo do card
    card.style.borderRadius = "8px";
    card.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    card.style.width = "80vw"; // Tamanho máximo do card
    card.style.maxHeight = "90vh"; // Altura máxima do card
    card.style.overflowY = "auto"; // Ativa rolagem vertical se necessário

    fundo.addEventListener("click", () => {
        fundo.remove();
    });

    card.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Adiciona o conteúdo desejado ao card
    card.innerHTML = conteudo;
    fundo.appendChild(card);
    document.body.appendChild(fundo);

    // Atualiza a referência para o último modal criado
    ultimoModal = fundo;
};

// Função para abrir o modal de atividades
const abrirModalAtividade = () => {
    const conteudo = `
    <div class="container mt-2">
      <h2 style="text-align: center;">Criar Atividade</h2>
      <form id="quizForm">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="startDate" class="form-label">Data de Início: </label>
            <input type="date" class="form-control" id="startDate">
          </div>
          <div class="col-md-6">
            <label for="endDate" class="form-label">Data de Fim: </label>
            <input type="date" class="form-control" id="endDate">
          </div>
        </div>
        <div class="mb-3">
          <label for="praticaTitle" class="form-label">Título da Atividade</label>
          <input type="text" class="form-control" id="praticaTitle" required>
        </div>
        
        <button type="submit" class="btn btn-primary" style="background-color: #B5FB7D; border-color: #B5FB7D; color: rgb(72, 100, 50)">Criar Quiz</button>
      </form>
    </div>
  `;
    criarModal(conteudo);
};

// Função para abrir o modal de quiz
const abrirModalQuiz = () => {
    const turmas = localStorage.getItem("turmas")
        ? JSON.parse(localStorage.getItem("turmas"))
        : [];
    const conteudo = `
    <div class="container mt-2">
      <h2 style="text-align: center;">Criar Quiz</h2>
      <form id="quizForm">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="startDate" class="form-label">Data de Início: </label>
            <input type="date" class="form-control" id="startDate">
          </div>
          <div class="col-md-6">
            <label for="endDate" class="form-label">Data de Fim: </label>
            <input type="date" class="form-control" id="endDate">
          </div>
        </div>
        <label for="quizTitle" class="form-label">Tema</label>
        <input type="text" class="form-control mb-3" id="quizTitle" required>
        <label for="questionsContainer" class="form-label">Perguntas</label>
        <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;" class="mb-3" id="questionsContainer">
          
        </div>
        <button type="button" class="btn btn-secondary" id="addQuestionBtn">Adicionar perguntas</button>
        <button type="submit" class="btn btn-primary" style="background-color: #B5FB7D; border-color: #B5FB7D; color: rgb(72, 100, 50)" id="criarQuizBtn" onclick="criarQuiz(event)">Criar Quiz</button>
      </form>
    </div>
  `;
    criarModal(conteudo);
    configurarPerguntasQuiz();
    configurarOpcaoQuiz(0); // Chama a função para configurar opções do quiz
};

const configurarPerguntasQuiz = () => {
    let questionCount = 0; // Contador de perguntas
    const maxQuestions = 10; // Limite de perguntas
    const questionsContainer = document.getElementById("questionsContainer");
    const addQuestionBtn = document.getElementById("addQuestionBtn");

    addQuestionBtn.addEventListener("click", function () {
        if (questionCount < maxQuestions) {
            questionCount++;
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("mb-2");
            questionDiv.setAttribute("data-question-index", questionCount); // Atributo para identificar a pergunta
            questionDiv.innerHTML = `
        <div class="mb-3">
          <label for="questionTitle" class="form-label">Pergunta ${questionCount}</label>
          <input type="text" class="form-control questionTitle" id="questionTitle${questionCount}" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Opções</label>
          <div id="optionsContainer${questionCount}" style="max-height: 200px; overflow-y: auto;"></div>
          <button type="button" class="btn btn-secondary mt-2" id="addOptionBtn${questionCount}" style="background-color: #B5FB7D; border-color: #B5FB7D; color: rgb(72, 100, 50)">Adicionar Opção</button>
        </div>
        <div class="mb-3">
          <label for="correctOption${questionCount}" class="form-label">Opção Correta</label>
          <select class="form-select correctOption" id="correctOption${questionCount}" required>
            <option selected disabled>Escolha a opção correta</option>
          </select>
        </div>
        <button type="button" class="btn btn-danger mt-2" id="removeQuestionBtn${questionCount}" style="background-color: #ff4c4c; border-color: #ff4c4c;">Excluir Pergunta</button>
        <hr>
      `;

            questionsContainer.appendChild(questionDiv);

            // Configura as opções para a nova pergunta
            configurarOpcaoQuiz(questionCount);

            // Evento de clique para remover a pergunta
            const removeQuestionBtn = document.getElementById(
                `removeQuestionBtn${questionCount}`
            );
            removeQuestionBtn.addEventListener("click", () => {
                questionDiv.remove();
                questionCount--;
                atualizarIndicesPerguntas(); // Atualiza os índices após remover uma pergunta

                // Reabilita o botão de adicionar pergunta se o limite não for atingido
                if (questionCount < maxQuestions) {
                    addQuestionBtn.disabled = false;
                }
            });

            // Desabilita o botão de adicionar se o limite for atingido
            if (questionCount === maxQuestions) {
                addQuestionBtn.disabled = true;
            }
        }
    });
};

const atualizarIndicesPerguntas = () => {
    const questionsContainer = document.getElementById("questionsContainer");
    const questions = questionsContainer.children;

    for (let i = 0; i < questions.length; i++) {
        const questionDiv = questions[i];
        const questionIndex = i + 1; // Índice começa em 1
        const questionTitleInput = questionDiv.querySelector(
            'input[id^="questionTitle"]'
        );
        const correctOptionSelect = questionDiv.querySelector(
            'select[id^="correctOption"]'
        );
        const removeQuestionBtn = questionDiv.querySelector(
            'button[id^="removeQuestionBtn"]'
        );

        // Atualiza os IDs e rótulos
        questionTitleInput.id = `questionTitle${questionIndex}`;
        questionTitleInput.previousElementSibling.innerHTML = `Pergunta ${questionIndex}`;
        correctOptionSelect.id = `correctOption${questionIndex}`;
        removeQuestionBtn.id = `removeQuestionBtn${questionIndex}`;

        // Atualiza as opções
        atualizarOpcaoQuiz(questionIndex);
    }
};

const atualizarOpcaoQuiz = (questionNumber) => {
    let optionCount = 0; // Contador de opções
    const optionsContainer = document.getElementById(
        `optionsContainer${questionNumber}`
    );
    const addOptionBtn = document.getElementById(
        `addOptionBtn${questionNumber}`
    );
    const correctOptionSelect = document.getElementById(
        `correctOption${questionNumber}`
    );

    const atualizarSelectOpcoesCorretas = () => {
        // Limpa o select e o reconstrói com as opções atuais
        correctOptionSelect.innerHTML = "";
        const options = optionsContainer.querySelectorAll(
            ".option-container input"
        );
        options.forEach((option, index) => {
            const newOption = document.createElement("option");
            newOption.value = option.value;
            newOption.textContent = option.value || `Opção ${index + 1}`;
            correctOptionSelect.appendChild(newOption);
        });

        // Garantir que o primeiro valor seja selecionado por padrão, se houver opções
        if (correctOptionSelect.options.length > 0) {
            correctOptionSelect.selectedIndex = 0;
        }
    };

    addOptionBtn.addEventListener("click", function () {
        if (optionCount < maxOptions) {
            optionCount++;
            const optionDiv = document.createElement("div");
            optionDiv.classList.add("option-container", "mb-2");
            optionDiv.innerHTML = `
        <input type="text" class="form-control me-2" placeholder="Opção ${optionCount}" required>
        <span class="remove-option" style="display: none; color: red; cursor: pointer;">&times;</span>
      `;
            optionsContainer.appendChild(optionDiv);

            atualizarSelectOpcoesCorretas();

            // Evento para remover a opção
            const removeBtn = optionDiv.querySelector(".remove-option");
            removeBtn.addEventListener("click", function () {
                optionDiv.remove();
                optionCount--;

                atualizarSelectOpcoesCorretas();

                // Reabilita o botão de adicionar se o limite não for atingido
                if (optionCount < maxOptions) {
                    addOptionBtn.disabled = false;
                }
                atualizarIndicesOpcoes(questionNumber); // Atualiza os índices das opções
            });

            optionDiv.addEventListener("mouseenter", () => {
                removeBtn.style.display = "block";
            });
            optionDiv.addEventListener("mouseleave", () => {
                removeBtn.style.display = "none";
            });

            // Atualiza o dropdown quando o conteúdo de uma opção é alterado
            optionDiv
                .querySelector("input")
                .addEventListener("input", atualizarSelectOpcoesCorretas);

            // Desabilita o botão de adicionar se o limite for atingido
            if (optionCount === maxOptions) {
                addOptionBtn.disabled = true;
            }
        }
    });
};

const atualizarIndicesOpcoes = (questionNumber) => {
    const optionsContainer = document.getElementById(
        `optionsContainer${questionNumber}`
    );
    const options = optionsContainer.children;

    for (let i = 0; i < options.length; i++) {
        const optionDiv = options[i];
        const optionInput = optionDiv.querySelector("input");
        const removeBtn = optionDiv.querySelector(".remove-option");

        // Atualiza o placeholder para refletir o novo índice
        optionInput.placeholder = `Opção ${i + 1}`;
    }
};

const configurarOpcaoQuiz = (questionNumber) => {
    let optionCount = 0; // Contador de opções
    const maxOptions = 4; // Limite de opções
    const optionsContainer = document.getElementById(
        `optionsContainer${questionNumber}`
    );
    const addOptionBtn = document.getElementById(
        `addOptionBtn${questionNumber}`
    );
    const correctOptionSelect = document.getElementById(
        `correctOption${questionNumber}`
    );

    const atualizarSelectOpcoesCorretas = () => {
        // Limpa o select e o reconstrói com as opções atuais
        correctOptionSelect.innerHTML = "";
        const options = optionsContainer.querySelectorAll(
            ".option-container input"
        );
        options.forEach((option, index) => {
            const newOption = document.createElement("option");
            newOption.value = option.value;
            newOption.textContent = option.value || `Opção ${index + 1}`;
            correctOptionSelect.appendChild(newOption);
        });

        // Garantir que o primeiro valor seja selecionado por padrão, se houver opções
        if (correctOptionSelect.options.length > 0) {
            correctOptionSelect.selectedIndex = 0;
        }
    };

    addOptionBtn.addEventListener("click", function () {
        if (optionCount < maxOptions) {
            optionCount++;
            const optionDiv = document.createElement("div");
            optionDiv.classList.add("option-container", "mb-2");
            optionDiv.innerHTML = `
        <input type="text" class="form-control me-2" placeholder="" required>
        <span class="remove-option" style="display: none; color: red; cursor: pointer;">&times;</span>
      `;
            optionsContainer.appendChild(optionDiv);

            atualizarSelectOpcoesCorretas();

            // Evento para remover a opção
            const removeBtn = optionDiv.querySelector(".remove-option");
            removeBtn.addEventListener("click", function () {
                optionDiv.remove();
                optionCount--;

                atualizarSelectOpcoesCorretas();

                // Reabilita o botão de adicionar se o limite não for atingido
                if (optionCount < maxOptions) {
                    addOptionBtn.disabled = false;
                }
            });

            optionDiv.addEventListener("mouseenter", () => {
                removeBtn.style.display = "block";
            });
            optionDiv.addEventListener("mouseleave", () => {
                removeBtn.style.display = "none";
            });

            // Atualiza o dropdown quando o conteúdo de uma opção é alterado
            optionDiv
                .querySelector("input")
                .addEventListener("input", atualizarSelectOpcoesCorretas);

            // Desabilita o botão de adicionar se o limite for atingido
            if (optionCount === maxOptions) {
                addOptionBtn.disabled = true;
            }
        }
    });
};

async function criarQuiz(event) {
    event.preventDefault();

    const quizTitle = document.getElementById("quizTitle").value.trim();
    const startDate = new Date(
        document.getElementById("startDate").value.trim()
    );
    const endDate = new Date(document.getElementById("endDate").value.trim());
    const questionsContainer = document.getElementById("questionsContainer");
    const questions = questionsContainer.children;

    if (!quizTitle) {
        alert("Por favor, preencha o tema do quiz.");
        return;
    }

    if (questions.length < 4) {
        alert("Por favor, adicione pelo menos 4 perguntas ao quiz.");
        return;
    }

    const today = new Date();
    if (startDate && startDate < today) {
        alert("A data de início deve ser maior ou igual a data de hoje.");
        return; // Interrompe a execução da função
    }

    if (endDate && endDate < startDate) {
        alert("A data de fim deve ser maior ou igual à data de início.");
        return; // Interrompe a execução da função
    }

    // Array para armazenar as perguntas e respostas
    const quizData = {
        id_professor: localStorage.getItem("id_professor"),
        perguntasIds: [],
        tema: quizTitle,
    };

    // Obtenha uma referência ao Firestore
    const db = firebase.firestore();

    // Iterar sobre cada pergunta
    for (let i = 0; i < questions.length; i++) {
        const questionDiv = questions[i];
        const questionTitle = questionDiv
            .querySelector(".questionTitle")
            .value.trim();
        const correctOption = questionDiv
            .querySelector(".correctOption")
            .value.trim();

        // Array para armazenar as opções de cada pergunta
        const optionsContainer = questionDiv.querySelector(
            `[id^="optionsContainer"]`
        );
        const optionsInputs = optionsContainer.querySelectorAll("input");
        const options = [];

        optionsInputs.forEach((input) => {
            options.push(input.value.trim());
        });

        // Verifica se a pergunta e a opção correta estão preenchidas
        if (!questionTitle || !correctOption || options.length < 2) {
            alert(
                `Por favor, preencha a pergunta e adicione pelo menos 2 opções para a pergunta ${
                    i + 1
                }.`
            );
            return; // Interrompe a execução da função
        }

        // Criar objeto da pergunta
        const questionData = {
            pergunta: questionTitle,
            opcoes: options,
            opcao_correta: correctOption,
        };

        // Adicionar a pergunta ao array de perguntas
        const questionId = quizTitle.replace(/ /g, "_") + "_" + (i + 1);

        quizData.perguntasIds.push(questionId.toLowerCase());

        // Adicionar a pergunta ao Firestore
        await db
            .collection("perguntas")
            .doc(questionId.toLowerCase())
            .set(questionData);
    }

    // Se precisar usar um ID baseado no tamanho da coleção (não recomendado)
    const snapshot = await db.collection("quiz").get();
    const newQuizId = snapshot.size + 1; // Novo ID baseado no tamanho da coleção

    // Adicionar o quiz com o ID baseado no tamanho da coleção (não recomendado)
    await db.collection("quiz").doc(newQuizId.toString()).set(quizData);

    // Fecha o modal após criar o quiz
    window.location.reload();
}

// Componente principal
const App = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                width: "50%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    backgroundColor: "#A3D977",
                    height: "120px",
                    width: "320px",
                    borderRadius: "20px",
                    padding: "0 22px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                    cursor: "pointer",
                }}
                onClick={abrirModalAtividade}
            >
                <h3 style={{ color: "#FFF", textAlign: "center", margin: "0" }}>
                    CRIAR ATIVIDADE
                </h3>
                <img src="./assets/criarAtividade.svg" alt="" />
            </div>

            <div
                style={{
                    display: "flex",
                    backgroundColor: "#A3D977",
                    height: "120px",
                    width: "320px",
                    borderRadius: "20px",
                    padding: "0 22px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                    cursor: "pointer",
                }}
                onClick={abrirModalQuiz}
            >
                <h3 style={{ color: "#FFF", textAlign: "center", margin: "0" }}>
                    CRIAR QUIZ
                </h3>
                <img src="./assets/criarQuiz.svg" alt="" />
            </div>
        </div>
    );
};

// Renderizando o componente no elemento com ID 'dropdown-container'
ReactDOM.render(<App />, document.getElementById("criarQuiz"));

async function getQuizzesWithQuestions() {
    const db = firebase.firestore();

    try {
        // 1. Obter todos os quizzes
        const quizzesSnapshot = await db.collection("quiz").get();
        const quizzes = [];

        // 2. Obter todas as perguntas
        const questionsSnapshot = await db.collection("perguntas").get();
        const allQuestions = questionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // 3. Iterar sobre cada quiz e associar as perguntas
        for (const quizDoc of quizzesSnapshot.docs) {
            const quizData = quizDoc.data();
            const quizId = quizDoc.id;

            // Extrair IDs das perguntas do quiz
            const perguntasIds = quizData.perguntasIds || [];

            // Filtrar as perguntas correspondentes ao quiz atual
            const relatedQuestions = allQuestions.filter((question) =>
                perguntasIds.includes(question.id)
            );

            // Criar um objeto contendo o quiz e suas perguntas
            const quizWithQuestions = {
                id: quizId,
                ...quizData,
                questions: relatedQuestions,
            };
            // Adicionar o objeto à lista de quizzes
            quizzes.push(quizWithQuestions);
        }

        // Retorna a lista de quizzes com suas perguntas
        return quizzes;
    } catch (error) {
        console.error("Erro ao buscar quizzes e perguntas:", error);
    }
    // Adicionar o objeto   lista de quizzes
}

async function excluirQuiz(quiz) {
    const db = firebase.firestore();
    try {
        await db.collection("quiz").doc(quiz.id).delete();
        for (const question of quiz.questions) {
            await db.collection("perguntas").doc(question.id).delete();
        }
    } catch (error) {
        console.error("Erro ao excluir o quiz:", error);
    } finally {
        window.location.reload();
    }
}
async function getNextAvailableId(collectionName) {
    const snapshot = await db.collection(collectionName.toString()).get();
    const existingIds = snapshot.docs.map((doc) => parseInt(doc.id, 10));

    // Encontre o menor ID não utilizado
    let newId = 1; // Começando do ID 1
    while (existingIds.includes(newId)) {
        newId++;
    }

    return newId;
}

async function atribuirQuiz(quiz, turmaId) {
    const db = firebase.firestore();

    try {
        const turmasParaAtribuir = Array.isArray(turmaId)
            ? turmaId.map((id) => Number.parseInt(id))
            : [Number.parseInt(turmaId)];

        const atribuicoesQuerySnapshot = await db
            .collection("atribuir_quiz")
            .where("id_quiz", "==", quiz.id)
            .get();

        if (!atribuicoesQuerySnapshot.empty) {
            atribuicoesQuerySnapshot.forEach(async (doc) => {
                const atribuicaoData = doc.data();
                console.log("Atribuição encontrada:", atribuicaoData);

                const novasTurmas = [
                    ...new Set([
                        ...atribuicaoData.id_turmas,
                        ...turmasParaAtribuir,
                    ]),
                ].map((id) => Number.parseInt(id));

                await db
                    .collection("atribuir_quiz")
                    .doc(atribuicaoData.id)
                    .update({
                        id_turmas: novasTurmas,
                    });
            });
            console.log("Quiz atribuído com sucesso!");
        } else {
            const dataInicio = new Date("2024-10-09T12:12:00-03:00");
            const dataEntrega = new Date("2024-11-31T12:12:00-03:00");

            // Obtém o próximo ID disponível para o novo documento
            const newId = await getNextAvailableId("atribuir_quiz");

            await db
                .collection("atribuir_quiz")
                .doc(newId)
                .set({
                    id_quiz: quiz.id,
                    id_turmas: turmasParaAtribuir,
                    dataInicio:
                        firebase.firestore.Timestamp.fromDate(dataInicio),
                    dataEntrega:
                        firebase.firestore.Timestamp.fromDate(dataEntrega),
                });

            console.log(
                "Novo documento criado com o ID disponível e quiz atribuído com sucesso!"
            );
        }
    } catch (error) {
        console.error("Erro ao atribuir o quiz:", error);
    }
}

const abrirModalAtribuirTurma = (quiz) => {
    console.log("abrirModalAtribuirTurma");

    // Recupera as turmas do localStorage e tenta converter em JSON
    let turmas = localStorage.getItem("turmas");
    try {
        turmas = JSON.parse(turmas) || [];
    } catch (error) {
        console.error("Erro ao parsear turmas:", error);
        turmas = [];
    }
    const dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);
    const conteudo = `
        <form id="form-atribuir-turma">
            <label for="turma">Selecione as turmas:</label>
            <div>
            <br>
                ${turmas
                    .map(
                        (turma) => `
                            <label>
                                <input type="checkbox" name="turma" value="${
                                    turma.id
                                }">
                                ${turma.serie + "° ano " + turma.nomenclatura}
                            </label>
                        `
                    )
                    .join("<br><br>")}
            </div>
            <br>
            <label for="horas">Selecione a data e a hora de atribuição:</label>
            <input type="datetime-local" name="horas" value="${dataAtual.toISOString().slice(0, 16)}" >
            <br>
            <br>
            <label for="horas">Selecione a data e a hora de Encerramento:</label>
            <input type="datetime-local" name="horas" value="${(dataAtual.set).toISOString().slice(0, 16)}" >
            <br>
            <button type="submit">Atribuir</button>
        </form>
    `;

    criarModal(conteudo);

    const form = document.getElementById("form-atribuir-turma");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Coleta todos os IDs das turmas selecionadas
        const turmaIds = Array.from(
            form.querySelectorAll('input[name="turma"]:checked')
        ).map((input) => input.value);

        if (turmaIds.length === 0) {
            alert("Selecione ao menos uma turma.");
            return;
        }

        // Atribui o quiz para cada turma selecionada
        for (const turmaId of turmaIds) {
            await atribuirQuiz(quiz, turmaId);
        }

        window.location.reload();
    });
};

const abrirModalOpcoesQuiz = (quiz) => {
    const conteudo = `<form id="form-escolher">
        <button id="escolher-atribuir">Atribuir Turma</button>
        <button id="escolher-excluir">Excluir Perguntas</button>
    </form>`;

    criarModal(conteudo)
    const atribuir = document.getElementById("escolher-atribuir");
    const excluir = document.getElementById("escolher-excluir");
    atribuir.addEventListener("click", () => {
        abrirModalAtribuirTurma(quiz);
    });
    excluir.addEventListener("click", () => {
        excluirQuiz(quiz);
    });
};

const Atividades = ({ quizzes }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                width: "70%",
                flexWrap: "wrap",
                margin: "40px auto",
                gap: "51.72px",
            }}
        >
            {quizzes.map((quiz, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            backgroundColor: "#A3D977",
                            height: "80px",
                            width: "320px",
                            borderRadius: "20px",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer",
                            position: "relative",
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {hoveredIndex === index && (
                            <div>
                                <img
                                    src="./assets/opcoes.svg"
                                    alt="ícone de 3 pontinhos"
                                    id="tres-pontinhos"
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        height: "24px",
                                        width: "24px",
                                    }}
                                    onClick={() => {
                                        abrirModalOpcoesQuiz(quiz);
                                    }}
                                />
                            </div>
                        )}
                        <h1
                            style={{
                                color: "#FFF",
                                textAlign: "center",
                                margin: "0",
                                fontSize: "20px",
                            }}
                        >
                            {quiz.tema}
                        </h1>
                    </div>
                );
            })}
        </div>
    );
};

// Exemplo de uso
getQuizzesWithQuestions().then((quizzes) => {
    ReactDOM.render(
        <Atividades quizzes={quizzes} />,
        document.getElementById("atividades")
    );
});
