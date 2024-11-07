// Componente que exibe as turmas no dropdown
const ListaTurmas = () => {
  // Recuperando as turmas do localStorage
  const turmas = localStorage.getItem("turmas")
    ? JSON.parse(localStorage.getItem("turmas"))
    : [];
  return turmas.map((turma, index) => (
    <option key={index} value={turma.id}>
      {turma.nomenclatura + "° ano " + turma.serie}
    </option>
  ));
};

// Componente que exibe um aluno na lista
const Aluno = ({ index, nome, nivel }) => (
  <li
    style={{
      display: "flex",
      alignItems: "center",
      height: "50px",
      marginTop: "20px",
      position: "relative",
    }}
  >
    <span
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "#FFE5D1",
        textAlign: "center",
        marginRight: "28px",
        alignContent: "center",
        marginLeft: "0px",
      }}
    >
      {index}
    </span>
    <span
      style={{
        height: "50px",
        width: "900px",
        alignContent: "center",
        backgroundColor: "#FFE5D1",
        paddingLeft: "23px",
        borderRadius: "15px",
        justifyContent: "space-between",
      }}
    >
      {nome}
      <span style={{ position: "absolute", right: "20px", fontWeight: "bold" }}>
        {nivel + "xp"}
      </span>
    </span>
  </li>
);

// Função para buscar os alunos de uma turma pelo ID
async function buscarAlunosPorTurmaId(id) {
  try {
    const url =
      "https://gats-educaeco-api-dev2-pe6e.onrender.com/api/alunos/turma/" + id;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar os alunos:", error);
    return [];
  }
}

// Componente principal do Dropdown
const DropdownTurmas = () => {
  const [alunos, setAlunos] = React.useState([]);

  const handleTurmaChange = async (event) => {
    const turmaId = event.target.value;
    if (turmaId) {
      const alunosDaTurma = await buscarAlunosPorTurmaId(turmaId);
      setAlunos(alunosDaTurma);
    } else {
      setAlunos([]);
    }
  };

  return (
    <div>
      <select
        className="dropdown listaTurmas"
        id="ano-select"
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
        }}
      >
        <option value="">Selecione uma turma</option>
        <ListaTurmas />
      </select>

      <ul id="lista-alunos">
        {alunos.length > 0 ? (
          alunos.map((aluno, index) => (
            <Aluno
              key={index}
              index={index + 1}
              nome={aluno.nome + " " + aluno.sobrenome}
              nivel={aluno.xp}
            />
          ))
        ) : (
          <li>Nenhum aluno encontrado</li>
        )}
      </ul>
    </div>
  );
};

// Renderizando o DropdownTurmas no elemento com ID 'dropdown-container'
ReactDOM.render(
  <DropdownTurmas />,
  document.getElementById("dropdown-container")
);
