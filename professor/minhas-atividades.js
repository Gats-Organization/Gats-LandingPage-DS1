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
// Função para obter o próximo ID disponível para a atividade
async function getNextAvailableId(collectionName) {
    const db = firebase.firestore();
    const snapshot = await db.collection(collectionName).get(); // Remova o String.toString()
    const existingIds = snapshot.docs.map((doc) => parseInt(doc.id, 10));

    // Encontre o menor ID não utilizado
    let newId = 1; // Começando do ID 1
    while (existingIds.includes(newId)) {
        newId++;
    }

    return newId;
}

// Função para verificar se a proposta já existe
async function isPraticaExistente(praticaTitle) {
    const db = firebase.firestore();
    const snapshot = await db
        .collection("praticas")
        .where("pratica", "==", praticaTitle.trim())
        .get();
    return !snapshot.empty; // Retorna true se a prática já existir
}

// Função para abrir o modal de atividades
const abrirModalAtividade = () => {
    const db = firebase.firestore();
    const conteudo = `
    <div class="container mt-2">
      <h2 style="text-align: center;">Criar Atividade</h2>
      <form id="quizForm">
        <div class="mb-3">
          <label for="praticaTitle" class="form-label">Proposta da Atividade</label>
          <input type="text" class="form-control" id="praticaTitle" required>
        </div>
        
        <button type="submit" class="btn btn-primary" style="background-color: #B5FB7D; border-color: #B5FB7D; color: rgb(72, 100, 50)" id="criarAtividadeBtn">Criar Atividade</button>
      </form>
    </div>
  `;
    criarModal(conteudo);

    const criarAtividadeBtn = document.getElementById("criarAtividadeBtn");
    criarAtividadeBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const praticaTitle = document.getElementById("praticaTitle").value;

        if (praticaTitle) {
            // Verifique se a prática já existe
            const existe = await isPraticaExistente(praticaTitle);
            if (existe) {
                alert(
                    "Já existe uma prática com essa proposta. Por favor, insira uma proposta diferente."
                );
                return;
            }

            const newId = await getNextAvailableId("praticas");
            const pratica = {
                id_professor: localStorage.getItem("id_professor"),
                pratica: praticaTitle.trim(),
            };

            await db.collection("praticas").doc(String(newId)).set(pratica);
            console.log("Atividade criada com ID:", newId);
        } else {
            alert("Preencha todos os campos");
        }
        window.location.reload();
    });
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

    // Obtém os elementos com base no questionNumber
    const optionsContainer = document.getElementById(
        `optionsContainer${questionNumber}`
    );
    const addOptionBtn = document.getElementById(
        `addOptionBtn${questionNumber}`
    );
    const correctOptionSelect = document.getElementById(
        `correctOption${questionNumber}`
    );

    // Verifica se os elementos foram encontrados
    if (!optionsContainer || !addOptionBtn || !correctOptionSelect) {
        console.error(
            "Erro: Não foi possível encontrar um ou mais elementos para a questão",
            questionNumber
        );
        return; // Sai da função caso algum elemento não seja encontrado
    }

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

        // Garante que o primeiro valor seja selecionado por padrão, se houver opções
        if (correctOptionSelect.options.length > 0) {
            correctOptionSelect.selectedIndex = 0;
        }
    };

    addOptionBtn.addEventListener("click", () => {
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

    const newQuizId = await getNextAvailableId("quiz"); // Novo ID baseado no tamanho da coleção

    // Adicionar o quiz com o ID baseado no tamanho da coleção (não recomendado)
    await db.collection("quiz").doc(newQuizId.toString()).set(quizData);

    // Fecha o modal após criar o quiz
    window.location.reload();
}

const App = () => {
    useEffect(() => {
        const btnVisualizarAtribuicao = document.getElementById(
            "btn-visualizar-atribuicao"
        );
        btnVisualizarAtribuicao.addEventListener(
            "click",
            visualizarAtribuicoes
        );
        const btnVisualizarAtribuicaoPratica = document.getElementById(
            "btn-visualizar-atribuicao-pratica"
        );
        btnVisualizarAtribuicaoPratica.addEventListener(
            "click",
            visualizarAtribuicoesPratica
        );
        // Limpa o event listener quando o componente é desmontado
        return () => {
            btnVisualizarAtribuicao.removeEventListener(
                "click",
                visualizarAtribuicoes
            );
            btnVisualizarAtribuicaoPratica.removeEventListener(
                "click",
                visualizarAtribuicoesPratica
            );
        };
    }, []);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <h1 style={{ margin: "0" }}>MINHAS ATIVIDADES</h1>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "#ff9a9a",
                        height: "50px",
                        width: "220px",
                        borderRadius: "20px",
                        padding: "0 22px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                        cursor: "pointer",
                    }}
                    onClick={abrirModalAtividade}
                >
                    <h3
                        style={{
                            color: "#FFF",
                            textAlign: "center",
                            margin: "0",
                            fontSize: "15px",
                        }}
                    >
                        CRIAR ATIVIDADE
                    </h3>
                    <img
                        src="./assets/criarAtividade.svg"
                        alt=""
                        height="45px"
                    />
                </div>
                <button
                    id="btn-visualizar-atribuicao-pratica"
                    style={{ cursor: "pointer" }}
                >
                    Visualizar Atribuições
                </button>
            </div>
            <div
                id="atividades"
                style={{
                    width: "100%",
                }}
            ></div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <h1 style={{ margin: "0" }}>MEUS QUIZZES</h1>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "#277E93",
                        height: "50px",
                        width: "220px",
                        borderRadius: "20px",
                        padding: "0 22px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                        cursor: "pointer",
                    }}
                    onClick={abrirModalQuiz}
                >
                    <h3
                        style={{
                            color: "#FFF",
                            textAlign: "center",
                            margin: "0",
                            fontSize: "15px",
                        }}
                    >
                        CRIAR QUIZ
                    </h3>
                    <img src="./assets/criarQuiz.svg" alt="" height="45px" />
                </div>
                <button
                    id="btn-visualizar-atribuicao"
                    style={{ cursor: "pointer" }}
                >
                    Visualizar Atribuições
                </button>
            </div>
            <div
                id="quizzes"
                style={{
                    width: "100%",
                }}
            ></div>
        </div>
    );
};

// Renderizando o componente no elemento com ID 'dropdown-container'
ReactDOM.render(<App />, document.getElementById("criarQuiz"));

async function getQuizzesWithQuestions() {
    const db = firebase.firestore();
    const idProfessor = localStorage.getItem("id_professor"); // Obtém o id do professor do localStorage

    try {
        // Filtra quizzes pelo id do professor
        const quizzesSnapshot = await db
            .collection("quiz")
            .where("id_professor", "==", idProfessor)
            .get();
        const questionsSnapshot = await db.collection("perguntas").get();

        const allQuestions = questionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const quizzes = quizzesSnapshot.docs.map((quizDoc) => {
            const quizData = quizDoc.data();
            const perguntasIds = quizData.perguntasIds || [];

            const relatedQuestions = allQuestions.filter((question) =>
                perguntasIds.includes(question.id)
            );

            return { id: quizDoc.id, ...quizData, questions: relatedQuestions };
        });

        return quizzes;
    } catch (error) {
        console.error("Erro ao buscar quizzes e perguntas:", error);
    }
}

async function getAtividadesWithQuestions() {
    const db = firebase.firestore();
    const idProfessor = localStorage.getItem("id_professor"); // Obtém o id do professor do localStorage

    try {
        // Filtra práticas pelo id do professor
        const atividadesSnapshot = await db
            .collection("praticas")
            .where("id_professor", "==", idProfessor)
            .get();

        return atividadesSnapshot.docs.map((praticaDoc) => ({
            id: praticaDoc.id,
            ...praticaDoc.data(),
        }));
    } catch (error) {
        console.error("Erro ao buscar práticas:", error);
    }
}

async function getAtividadesWithQuestions() {
    const db = firebase.firestore();
    const idProfessor = localStorage.getItem("id_professor"); // Obtém o id do professor do localStorage

    try {
        // Filtra práticas pelo id do professor
        const atividadesSnapshot = await db
            .collection("praticas")
            .where("id_professor", "==", idProfessor)
            .get();

        return atividadesSnapshot.docs.map((praticaDoc) => ({
            id: praticaDoc.id,
            ...praticaDoc.data(),
        }));
    } catch (error) {
        console.error("Erro ao buscar práticas:", error);
    }
}

async function excluirQuiz(quiz) {
    const db = firebase.firestore();
    const batch = db.batch();

    try {
        const quizRef = db.collection("quiz").doc(quiz.id);
        batch.delete(quizRef);

        // Excluir as perguntas associadas ao quiz
        quiz.questions.forEach((question) => {
            const questionRef = db.collection("perguntas").doc(question.id);
            batch.delete(questionRef);
        });

        // Excluir as atribuições associadas ao quiz
        const atribuicoesSnapshot = await db
            .collection("atribuir_quiz")
            .where("id_quiz", "==", quiz.id)
            .get();

        atribuicoesSnapshot.forEach((doc) => {
            const atribRef = db.collection("atribuir_quiz").doc(doc.id);
            batch.delete(atribRef);
        });

        await batch.commit();
        console.log("Quiz, perguntas e atribuições excluídos com sucesso!");
        window.location.reload();
    } catch (error) {
        console.error("Erro ao excluir o quiz:", error);
    }
}

async function excluirPratica(pratica) {
    const db = firebase.firestore();
    try {
        // 1. Excluir todos os documentos em controle_pratica com o id_pratica correspondente
        const controlePraticaSnapshot = await db
            .collection("controle_pratica")
            .where("id_pratica", "==", Number.parseInt(pratica.id))
            .get();

        // 2. Excluir cada documento encontrado em controle_pratica
        const deleteControlePraticaPromises = controlePraticaSnapshot.docs.map(
            (doc) => {
                return doc.ref.delete();
            }
        );

        // 3. Esperar que todas as exclusões em controle_pratica sejam concluídas
        await Promise.all(deleteControlePraticaPromises);

        // 4. Excluir todos os documentos em atribuir_pratica com o id_pratica correspondente
        const atribuirPraticaSnapshot = await db
            .collection("atribuir_pratica")
            .where("id_pratica", "==", Number.parseInt(pratica.id))
            .get();

        // 5. Excluir cada documento encontrado em atribuir_pratica
        const deleteAtribuirPraticaPromises = atribuirPraticaSnapshot.docs.map(
            (doc) => {
                return doc.ref.delete();
            }
        );

        // 6. Esperar que todas as exclusões em atribuir_pratica sejam concluídas
        await Promise.all(deleteAtribuirPraticaPromises);

        // 7. Excluir a prática principal da coleção praticas
        const praticaRef = db.collection("praticas").doc(pratica.id);
        await praticaRef.delete();

        // 8. Recarregar a página ou atualizar a UI como necessário
        window.location.reload();
    } catch (error) {
        console.error("Erro ao excluir a prática:", error);
    }
}

async function atribuirQuiz(quiz, turmaIds, dataInicio, dataEntrega) {
    const db = firebase.firestore();
    try {
        // Passo 1: Criar a atribuição na coleção "atribuir_quiz"
        const newId = await getNextAvailableId("atribuir_quiz");
        await db
            .collection("atribuir_quiz")
            .doc(newId.toString())
            .set({
                id_quiz: quiz.id,
                id_turmas: turmaIds.map((id) => Number.parseInt(id)),
                dataInicio,
                dataEntrega,
            });

        // Passo 2: Buscar alunos de todas as turmas selecionadas
        const atribPromises = turmaIds.map(async (turmaId) => {
            // Busca todos os alunos da turma
            const response = await fetch(
                `https://gats-repository-api.onrender.com/api/alunos/turma/${turmaId}`
            );
            const alunos = await response.json();

            if (alunos && alunos.length > 0) {
                const alunoPromises = alunos.map(async (alunoData) => {
                    const alunoId = alunoData.id; // Supondo que cada aluno possui um campo 'id'

                    const docId = `${quiz.id}_${alunoId}`; // Formato do ID: iddoquiz_iddoaluno
                    await db
                        .collection("controle_quiz")
                        .doc(docId)
                        .set({
                            dataConclusao: null,
                            duracao: null,
                            id_aluno: Number.parseInt(alunoId),
                            id_quiz: quiz.id,
                            nota: 0,
                            quantAcertos: 0,
                            totalPerguntas: 0, // Define o status inicial do quiz
                        });
                });

                // Espera que todas as operações de criação de documentos para alunos sejam concluídas
                await Promise.all(alunoPromises);
            }
        });

        // Espera que todas as operações de atribuição sejam concluídas
        await Promise.all(atribPromises);

        alert(
            "Quiz atribuído com sucesso a todos os alunos das turmas selecionadas!"
        );
    } catch (error) {
        console.error("Erro ao atribuir o quiz:", error);
    }
}

async function atribuirPratica(pratica, turmaIds, dataInicio, dataEntrega) {
    const db = firebase.firestore();
    try {
        // Passo 1: Criar a atribuição na coleção "atribuir_pratica"
        const newId = await getNextAvailableId("atribuir_pratica");
        await db
            .collection("atribuir_pratica")
            .doc(newId.toString())
            .set({
                id_pratica: Number.parseInt(pratica.id),
                id_turmas: turmaIds.map((id) => Number.parseInt(id)),
                dataInicio,
                dataEntrega,
            });

        // Passo 2: Buscar alunos de todas as turmas selecionadas
        const atribPromises = turmaIds.map(async (turmaId) => {
            // Busca todos os alunos da turma
            const response = await fetch(
                `https://gats-repository-api.onrender.com/api/alunos/turma/${turmaId}`
            );
            const alunos = await response.json(); // Aguarde a conversão da resposta para JSON

            if (alunos && alunos.length > 0) {
                // Verifique se alunos é um array e não está vazio
                const alunoPromises = alunos.map(async (alunoData) => {
                    const alunoId = alunoData.id; // Supondo que cada aluno possui um campo 'id'

                    const docId = `${pratica.id}_${alunoId}`; // Formato do ID: iddoquiz_iddoaluno
                    await db
                        .collection("controle_pratica")
                        .doc(docId)
                        .set({
                            id_aluno: Number.parseInt(alunoId),
                            id_pratica: Number.parseInt(pratica.id),
                            status: "Coloque em anexo",
                        });
                });

                // Espera que todas as operações de criação de documentos para alunos sejam concluídas
                await Promise.all(alunoPromises);
            }
        });

        // Espera que todas as operações de atribuição sejam concluídas
        await Promise.all(atribPromises);

        alert(
            "Prática atribuída com sucesso a todos os alunos das turmas selecionadas!"
        );
    } catch (error) {
        console.error("Erro ao atribuir a prática:", error);
    }
}
// Adicionando a opção "Visualizar Atribuições" no menu de opções
const abrirModalAtribuirTurma = (quiz) => {
    let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    const dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);
    const dataEntrega = new Date(dataAtual);
    dataEntrega.setMinutes(dataEntrega.getMinutes() + 10);

    const conteudo = `
        <form id="form-atribuir-turma">
            <label for="turma">Selecione as turmas:</label><div><br>
                ${turmas
                    .map(
                        (
                            turma
                        ) => `<label><input type="checkbox" name="turma" value="${
                            turma.id
                        }">
                                ${
                                    turma.serie + "° ano " + turma.nomenclatura
                                }</label>`
                    )
                    .join("<br><br>")}
            </div><br>
            <label for="horas">Data de atribuição:</label>
            <input type="datetime-local" id="dataAtribuicao" value="${dataAtual
                .toISOString()
                .slice(0, 16)}"><br><br>
            <label for="horas">Data de Encerramento:</label>
            <input type="datetime-local" id="dataEncerramento" value="${dataEntrega
                .toISOString()
                .slice(0, 16)}"><br>
            <button type="submit">Atribuir</button>
        </form>
    `;

    criarModal(conteudo);

    const form = document.getElementById("form-atribuir-turma");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const turmaIds = Array.from(
            form.querySelectorAll('input[name="turma"]:checked')
        ).map((input) => input.value);

        const atribuicaoData = new Date(
            form.querySelector("#dataAtribuicao").value
        );
        const encerramentoData = new Date(
            form.querySelector("#dataEncerramento").value
        );
        const agora = new Date();

        if (atribuicaoData < agora) {
            alert(
                "A data de atribuição não pode ser menor que a data e hora atual."
            );
            return;
        }

        if (encerramentoData <= atribuicaoData) {
            alert(
                "A data de encerramento deve ser maior que a data de atribuição."
            );
            return;
        }

        const atribuicao =
            firebase.firestore.Timestamp.fromDate(atribuicaoData);
        const prazo = firebase.firestore.Timestamp.fromDate(encerramentoData);

        if (turmaIds.length === 0) {
            alert("Selecione ao menos uma turma.");
            return;
        }

        await atribuirQuiz(quiz, turmaIds, atribuicao, prazo);
    });
};
const abrirModalAtribuirTurmaPratica = (pratica) => {
    let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
    const dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);
    const dataEntrega = new Date(dataAtual);
    dataEntrega.setMinutes(dataEntrega.getMinutes() + 10);

    const conteudo = `
        <form id="form-atribuir-turma">
            <label for="turma">Selecione as turmas:</label><div><br>
                ${turmas
                    .map(
                        (
                            turma
                        ) => `<label><input type="checkbox" name="turma" value="${
                            turma.id
                        }">
                                ${
                                    turma.serie + "° ano " + turma.nomenclatura
                                }</label>`
                    )
                    .join("<br><br>")}
            </div><br>
            <label for="horas">Data de atribuição:</label>
            <input type="datetime-local" id="dataAtribuicao" value="${dataAtual
                .toISOString()
                .slice(0, 16)}"><br><br>
            <label for="horas">Data de Encerramento:</label>
            <input type="datetime-local" id="dataEncerramento" value="${dataEntrega
                .toISOString()
                .slice(0, 16)}"><br>
            <button type="submit">Atribuir</button>
        </form>
    `;

    criarModal(conteudo);

    const form = document.getElementById("form-atribuir-turma");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const turmaIds = Array.from(
            form.querySelectorAll('input[name="turma"]:checked')
        ).map((input) => input.value);

        const atribuicaoData = new Date(
            form.querySelector("#dataAtribuicao").value
        );
        const encerramentoData = new Date(
            form.querySelector("#dataEncerramento").value
        );
        const agora = new Date();

        if (atribuicaoData < agora) {
            alert(
                "A data de atribuição não pode ser menor que a data e hora atual."
            );
            return;
        }

        if (encerramentoData <= atribuicaoData) {
            alert(
                "A data de encerramento deve ser maior que a data de atribuição."
            );
            return;
        }

        const atribuicao =
            firebase.firestore.Timestamp.fromDate(atribuicaoData);
        const prazo = firebase.firestore.Timestamp.fromDate(encerramentoData);

        if (turmaIds.length === 0) {
            alert("Selecione ao menos uma turma.");
            return;
        }

        await atribuirPratica(pratica, turmaIds, atribuicao, prazo);
    });
};

const visualizarAtribuicoes = async () => {
    const db = firebase.firestore();
    try {
        // Busca todos os documentos da coleção "atribuir_quiz"
        const atribuicoesSnapshot = await db.collection("atribuir_quiz").get();

        if (atribuicoesSnapshot.empty) {
            alert("Nenhuma atribuição encontrada.");
            return;
        }

        const atribuicoes = await Promise.all(
            atribuicoesSnapshot.docs.map(async (doc) => {
                const data = doc.data();
                const atribId = doc.id;

                // Busca o nome do quiz usando o id_quiz
                const quizDoc = await db
                    .collection("quiz")
                    .doc(data.id_quiz)
                    .get();

                let nomeQuiz;
                if (quizDoc.exists) {
                    nomeQuiz =
                        quizDoc.data().tema || "Nome do Quiz não especificado";
                } else {
                    nomeQuiz = "Quiz não encontrado";
                }

                const dataInicio = data.dataInicio.toDate().toLocaleString();
                const dataEntrega = data.dataEntrega.toDate().toLocaleString();
                const turmas = data.id_turmas.join(", ");

                return `
                    <div class="atrib-card" data-id="${atribId}">
                        <p><strong>Quiz:</strong> ${nomeQuiz}</p>
                        <p><strong>Data de Início:</strong> ${dataInicio}</p>
                        <p><strong>Data de Entrega:</strong> ${dataEntrega}</p>
                        <p><strong>Turmas:</strong> ${turmas}</p>
                        <div class="delete-overlay">
                            <img src="./assets/excluir.png" height="50" onclick="excluirAtribuicao('${atribId}')" />
                        </div>
                    </div>
                `;
            })
        );

        criarModal(`<div>${atribuicoes.join("")}</div>`);

        // Adiciona o CSS para estilizar os cards e o overlay de exclusão
        const style = document.createElement("style");
        style.innerHTML = `
            .atrib-card {
                position: relative;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                user-select: none;
            }
            .delete-overlay {
                display: none;
                position: absolute;
                top: 0;
                right: 0;
                color: white;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.2s;
                height: 87%;
                width: 20%;
            }
            .delete-overlay img {
                cursor: pointer;
            }
            .atrib-card:hover .delete-overlay {
                display: flex;
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    } catch (error) {
        console.error("Erro ao visualizar atribuições:", error);
    }
};
const visualizarAtribuicoesPratica = async () => {
    const db = firebase.firestore();
    try {
        // Busca todos os documentos da coleção "atribuir_pratica"
        const atribuicoesSnapshot = await db
            .collection("atribuir_pratica")
            .get();

        if (atribuicoesSnapshot.empty) {
            alert("Nenhuma atribuição encontrada.");
            return;
        }

        const atribuicoes = await Promise.all(
            atribuicoesSnapshot.docs.map(async (doc) => {
                const data = doc.data();
                const atribId = doc.id;

                // Busca o nome do quiz usando o id_quiz
                const praticaDoc = await db
                    .collection("praticas")
                    .doc(data.id_pratica.toString())
                    .get();

                let nomePratica;
                if (praticaDoc.exists) {
                    nomePratica =
                        praticaDoc.data().pratica ||
                        "Nome da Prática não especificado";
                } else {
                    nomePratica = "Prática não encontrado";
                }

                const dataInicio = data.dataInicio.toDate().toLocaleString();
                const dataEntrega = data.dataEntrega.toDate().toLocaleString();
                const turmas = data.id_turmas.join(", ");

                return `
                    <div class="atrib-card" data-id="${atribId}">
                        <p><strong>Prática:</strong> ${nomePratica}</p>
                        <p><strong>Data de Início:</strong> ${dataInicio}</p>
                        <p><strong>Data de Entrega:</strong> ${dataEntrega}</p>
                        <p><strong>Turmas:</strong> ${turmas}</p>
                        <div class="delete-overlay">
                            <img src="./assets/excluir.png" height="50" onclick="excluirAtribuicaoPratica('${atribId}')" />
                        </div>
                    </div>
                `;
            })
        );

        criarModal(`<div>${atribuicoes.join("")}</div>`);

        // Adiciona o CSS para estilizar os cards e o overlay de exclusão
        const style = document.createElement("style");
        style.innerHTML = `
            .atrib-card {
                position: relative;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                user-select: none;
            }
            .delete-overlay {
                display: none;
                position: absolute;
                top: 0;
                right: 0;
                color: white;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.2s;
                height: 87%;
                width: 20%;
            }
            .delete-overlay img {
                cursor: pointer;
            }
            .atrib-card:hover .delete-overlay {
                display: flex;
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    } catch (error) {
        console.error("Erro ao visualizar atribuições:", error);
    }
};

async function listarAlunosPorTurmaId(turmaId) {
    const db = firebase.firestore();
    try {
        fetch(
            "https://gats-repository-api.onrender.com/api/alunos/turma/" +
                turmaId
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {}
}

// Função para excluir uma atribuição
const excluirAtribuicao = async (atribId) => {
    const db = firebase.firestore();
    try {
        await db.collection("atribuir_quiz").doc(atribId).delete();
        alert("Atribuição excluída com sucesso.");
        visualizarAtribuicoes(); // Atualiza o modal após a exclusão
    } catch (error) {
        console.error("Erro ao excluir atribuição:", error);
    }
};
const excluirAtribuicaoPratica = async (atribId) => {
    const db = firebase.firestore();
    try {
        await db.collection("atribuir_pratica").doc(atribId).delete();
        alert("Atribuição excluída com sucesso.");
        visualizarAtribuicoesPratica(); // Atualiza o modal após a exclusão
    } catch (error) {
        console.error("Erro ao excluir atribuição:", error);
    }
};

const abrirModalOpcoesQuiz = (quiz) => {
    const conteudo = `
        <form id="form-escolher" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <button id="escolher-atribuir" style="background-color: #B5FB7D; color: rgb(72, 100, 50); width: 200px;">Atribuir Turma</button>
            <button id="escolher-excluir" style="background-color: #FF2030; color: #B40000; width: 200px;">Excluir Quiz</button>
        </form>
    `;

    criarModal(conteudo);
    document
        .getElementById("escolher-atribuir")
        .addEventListener("click", (event) => {
            event.preventDefault();
            abrirModalAtribuirTurma(quiz);
        });
    document
        .getElementById("escolher-excluir")
        .addEventListener("click", (event) => {
            event.preventDefault();
            excluirQuiz(quiz);
        });
};
const abrirModalOpcoesAtividades = (pratica) => {
    const conteudo = `
        <form id="form-escolher" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <button id="escolher-atribuir" style="background-color: #B5FB7D; color: rgb(72, 100, 50); width: 200px;">Atribuir Turma</button>
            <button id="escolher-excluir" style="background-color: #FF2030; color: #B40000; width: 200px;">Excluir Prática</button>
        </form>
    `;

    criarModal(conteudo);
    document
        .getElementById("escolher-atribuir")
        .addEventListener("click", (event) => {
            event.preventDefault();
            abrirModalAtribuirTurmaPratica(pratica);
        });
    document
        .getElementById("escolher-excluir")
        .addEventListener("click", (event) => {
            event.preventDefault();
            excluirPratica(pratica);
        });
};

const Quizzes = ({ quizzes }) => {
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
                            backgroundColor: "#7BC5E5",
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

const Atividades = ({ praticas }) => {
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
            {praticas.map((pratica, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            backgroundColor: "#FFBEBE",
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
                                        abrirModalOpcoesAtividades(pratica);
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
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxWidth: "80%",
                            }}
                        >
                            {pratica.pratica}{" "}
                            {/* Use o campo correto do objeto pratica */}
                        </h1>
                    </div>
                );
            })}
        </div>
    );
};

// Exemplo de uso
getQuizzesWithQuestions().then((quizzes) => {
    console.log(quizzes);
    ReactDOM.render(
        <Quizzes quizzes={quizzes} />,
        document.getElementById("quizzes")
    );
});

// A função getAtividadesWithQuestions deve ser definida como a getQuizzesWithQuestions
getAtividadesWithQuestions().then((praticas) => {
    ReactDOM.render(
        <Atividades praticas={praticas} />,
        document.getElementById("atividades")
    );
});
