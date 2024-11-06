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

async function getQuizzes() {
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
        return [];
    }
}

// Função para buscar alunos que completaram um quiz específico em uma turma
async function getAlunosPorQuizETurma(quizId, turmaId) {
    const db = firebase.firestore();
    const idProfessor = localStorage.getItem("id_professor"); // Obtém o id do professor do localStorage
    try {
        const alunosSnapshot = await db
            .collection("alunos")
            .where("quizId", "==", quizId)
            .where("turmaId", "==", turmaId)
            .where("id_professor", "==", idProfessor)
            .get();

        return alunosSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        return [];
    }
}

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [perguntas, setPerguntas] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState("");
    const [selectedTurmaId, setSelectedTurmaId] = useState("");

    // Obtendo as salas do localStorage
    const salas = localStorage.getItem("turmas")
        ? JSON.parse(localStorage.getItem("turmas"))
        : [];

    const handleQuizChange = (event) => {
        const quizId = event.target.value;
        setSelectedQuizId(quizId);
        if (quizId) {
            const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);
            setPerguntas(selectedQuiz ? selectedQuiz.questions : []);
        } else {
            setPerguntas([]);
        }
    };

    const handleTurmaChange = (event) => {
        const turmaId = event.target.value;
        setSelectedTurmaId(turmaId);
    };

    const fetchAlunos = async () => {
        if (selectedQuizId && selectedTurmaId) {
            const fetchedAlunos = await getAlunosPorQuizETurma(selectedQuizId, selectedTurmaId);
            setAlunos(fetchedAlunos);
        }
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            const fetchedQuizzes = await getQuizzes();
            setQuizzes(fetchedQuizzes);
        };
        fetchQuizzes();
    }, []);

    useEffect(() => {
        fetchAlunos();
    }, [selectedQuizId, selectedTurmaId]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <select
                className="dropdown listaQuizzes"
                id="quiz-select"
                onChange={handleQuizChange}
                style={{
                    width: "963px",
                    height: "64px",
                    background: "#F9C197",
                    border: "1px solid #FFFFFF",
                    borderRadius: "5px",
                    fontSize: "20px",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    paddingLeft: "33px",
                    appearance: "none",
                    marginBottom: "20px",
                }}
            >
                <option value="">Selecione um quiz</option>
                {quizzes.map((quiz) => (
                    <option value={quiz.id} key={quiz.id}>
                        {quiz.tema}
                    </option>
                ))}
            </select>

            <select
                id="sala-select"
                onChange={handleTurmaChange}
                style={{
                    width: "663px",
                    height: "64px",
                    background: "#29C197",
                    border: "1px solid #FFFFFF",
                    borderRadius: "5px",
                    fontSize: "20px",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    paddingLeft: "33px",
                    appearance: "none",
                    marginBottom: "20px",
                }}
            >
                <option value="">Selecione uma sala</option>
                {salas.map((sala) => (
                    <option value={sala.id} key={sala.id}>
                        {sala.serie}° ano - {sala.nomenclatura}
                    </option>
                ))}
            </select>

            <ul style={{ listStyleType: "none", padding: 0 }}>
                {alunos.length > 0 ? (
                    alunos.map((aluno, index) => (
                        <li key={index} style={{ margin: "10px 0", fontSize: "18px" }}>
                            {aluno.nome} {aluno.sobrenome} - XP: {aluno.xp}
                        </li>
                    ))
                ) : (
                    <li>Nenhum aluno encontrado para este quiz e turma</li>
                )}
            </ul>
        </div>
    );
};

ReactDOM.render(<Quiz />, document.getElementById("container-quizzes"));
