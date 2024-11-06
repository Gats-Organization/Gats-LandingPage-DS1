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

firebase.initializeApp(firebaseConfig);

async function getTurmaNomeById(turmaId) {
    const turma = localStorage.getItem("turmas")
        ? JSON.parse(localStorage.getItem("turmas"))
        : [];
    console.log(turma.find((turma) => turma.id === turmaId));
    return turma.find((turma) => turma.id === turmaId);
}

async function getAlunosByTurmaId(turmaId) {
    try {
        const response = await fetch(
            "https://gats-repository-api.onrender.com/api/alunos/turma/" +
                turmaId
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getPraticasAtribuidas() {
    const db = firebase.firestore();
    try {
        const idProfessor = localStorage.getItem("id_professor");
        const praticasSnapshot = await db
            .collection("atribuir_pratica")
            .where("id_professor", "==", idProfessor) // Comparação direta como string
            .get();
        const praticas = praticasSnapshot.docs.map((doc) => doc.data());
        return praticas;
    } catch (error) {
        console.error("Erro ao buscar práticas:", error);
        return [];
    }
}

async function getNomePraticaById(praticaId) {
    const db = firebase.firestore();
    try {
        const praticaDoc = await db
            .collection("praticas")
            .doc(praticaId.toString())
            .get();
        if (praticaDoc.exists) {
            return praticaDoc.data().pratica;
        } else {
            console.error("Prática não encontrada para o ID:", praticaId);
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar prática:", error);
        return null;
    }
}

async function getTurmaIdsByPratica(praticaId) {
    const db = firebase.firestore();
    try {
        const atribuirPraticaSnapshot = await db
            .collection("atribuir_pratica")
            .where("id_pratica", "==", Number.parseInt(praticaId))
            .get();
        let allTurmaIds = [];
        atribuirPraticaSnapshot.forEach((doc) => {
            const turmaIds = doc.data().id_turmas;
            if (Array.isArray(turmaIds)) {
                allTurmaIds = [...allTurmaIds, ...turmaIds];
            }
        });
        allTurmaIds = [...new Set(allTurmaIds)];
        return allTurmaIds;
    } catch (error) {
        console.error("Erro ao buscar IDs das turmas para a prática:", error);
        return [];
    }
}

async function getPraticaStatusById(praticaId, alunoId) {
    const db = firebase.firestore();
    try {
        const praticaDoc = await db
            .collection("controle_pratica")
            .doc(praticaId.toString() + "_" + alunoId.toString())
            .get();
        if (praticaDoc.exists) {
            return praticaDoc.data().status;
        } else {
            console.error("Prática não encontrada para o ID:", praticaId);
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar prática:", error);
        return null;
    }
}

const Pratica = () => {
    const [praticas, setPraticas] = useState([]);
    const [praticasNome, setPraticasNome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [turmasComNome, setTurmasComNome] = useState([]);
    const [turmaId, setTurmaId] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        async function fetchStatusForAlunos() {
            if (selectedId && alunos.length > 0) {
                const statusList = await Promise.all(
                    alunos.map(
                        async (aluno) =>
                            await getPraticaStatusById(selectedId, aluno.id)
                    )
                );
                setStatus(statusList);
            }
        }

        fetchStatusForAlunos();
    }, [alunos, selectedId]);

    useEffect(() => {
        async function fetchPraticas() {
            const praticasAtribuidas = await getPraticasAtribuidas();
            const praticasUnicas = Array.from(
                new Set(praticasAtribuidas.map((pratica) => pratica.id_pratica))
            ).map((id_pratica) =>
                praticasAtribuidas.find(
                    (pratica) => pratica.id_pratica === id_pratica
                )
            );
            setPraticas(praticasUnicas);

            const nomesPraticas = await Promise.all(
                praticasUnicas.map(
                    async (pratica) =>
                        await getNomePraticaById(pratica.id_pratica)
                )
            );
            setPraticasNome(nomesPraticas);
            setLoading(false);
        }

        fetchPraticas();
    }, []);

    useEffect(() => {
        async function fetchTurmas() {
            if (selectedId) {
                const turmaIds = await getTurmaIdsByPratica(selectedId);
                setTurmasComNome(
                    await Promise.all(
                        turmaIds.map(async (turmaId) => {
                            const turma = await getTurmaNomeById(turmaId);
                            return turma
                                ? {
                                      id: turmaId,
                                      nome: `${turma.serie}° ano ${turma.nomenclatura}`,
                                  }
                                : null;
                        })
                    )
                );
            }
        }
        fetchTurmas();
    }, [selectedId]);

    useEffect(() => {
        if (turmaId) {
            getAlunosByTurmaId(turmaId).then((data) => setAlunos(data));
        }
    }, [turmaId]);

    const handleSelectChange = (event) => {
        setSelectedId(event.target.value);
    };

    const handleTurmaChange = (event) => {
        setTurmaId(event.target.value);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <select
                className="dropdown listaPraticas"
                id="pratica-select"
                onChange={handleSelectChange}
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
                <option value="">Selecione uma prática</option>
                {praticas.map((pratica, index) => (
                    <option value={pratica.id_pratica} key={index}>
                        {praticasNome[index] || "Nome não disponível"}
                    </option>
                ))}
            </select>

            {selectedId && (
                <select
                    className="dropdown listaTurmas"
                    id="turma-select"
                    onChange={handleTurmaChange}
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
                    <option value="">Selecione uma turma</option>
                    {turmasComNome.map((turma, index) => (
                        <option value={turma.id} key={index}>
                            {turma.nome}
                        </option>
                    ))}
                </select>
            )}

            {alunos.length > 0 && (
                <div>
                    <ul>
                        {alunos.map((aluno, index) => (
                            <li key={index}>
                                {aluno.nome + " " + aluno.sobrenome} -------{" "}
                                {status[index] === "Coloque em anexo"
                                    ? "Aguardando resposta"
                                    : status[index] === "Ver imagem em anexo"
                                    ? "Ver imagem em anexo"
                                    : status[index] || "Não entregue"}{" "}
                                -------{" "}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<Pratica />, document.getElementById("container-atividades"));
