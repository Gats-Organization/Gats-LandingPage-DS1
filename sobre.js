const coresDeFundo = [
    '#FFA3A3', // Fundo Rodrigo
    '#B5FB7D', // Fundo Petherson
    '#7AD8EE', // Fundo Giovanne
    '#FFCDA7', // Fundo Giovanna
    '#FFA3A3', // Fundo Maria Eduarda
    '#B5FB7D', // Fundo Clara
    '#7AD8EE', // Fundo Raissa
    '#FFCDA7', // Fundo Samuel
    '#FFA3A3', // Fundo Carlos
    '#B5FB7D', // Fundo Murilo
    '#7AD8EE'  // Fundo Ryan
];

// Array de integrantes
const integrantes = [
    {
        nome: "Rodrigo",
        idade: 15,
        descricao: "Olá, sou o <strong>Rodrigo</strong>! <br>Tenho 15 anos e adoro gatos! <br>Sou integrante do Gats. Sou responsável pelo <strong>desenvolvimento</strong> do site do EducaEco!",
        img: "Imagens Sobre Nós/Rodrigo.png",
        alt: "Foto do Integrante Rodrigo"
    },
    {
        nome: "Petherson",
        idade: 16,
        descricao: "Oi! Sou o <strong>Petherson</strong>! <br>Tenho 16 anos e sou um integrante do grupo GATS. <br>Nele, sou responsável pelo <strong>design geral</strong> do nosso app EducaEco.",
        img: "Imagens Sobre Nós/Petherson.png",
        alt: "Foto da integrante Petherson"
    },
    {
        nome: "Giovanne",
        idade: 15,
        descricao: "Olá, sou o <strong>Giovanne</strong>! <br>Tenho 15 anos e faço parte do GATS. <br>Sou o responsável pelo <strong>gerenciamento de tarefas</strong> do EducaEco.",
        img: "Imagens Sobre Nós/Giovanne.png",
        alt: "Foto do Integrante Giovanne"
    },
    {
        nome: "Giovanna",
        idade: 16,
        descricao: "Oiie, me chamo <strong>Giovanna</strong> e tenho 16 anos :) <br> Faço parte da equipe de Dev e do <strong>monitoramento do projeto</strong>. <br>Amo livros e vivenciar novas experiências",
        img: "Imagens Sobre Nós/Giovanna.png",
        alt: "Foto da integrante Giovanna"
    },
    {
        nome: "Maria Eduarda",
        idade: 16,
        descricao: "Oie! Eu sou a <strong>Maria Eduarda</strong> e gosto de chocolate! <br>Tenho 16 anos.<br>Sou responsável pelo <strong>desenvolvimento do front-end e back-end</strong> do site do EducaEco.",
        img: "Imagens Sobre Nós/Maria Eduarda.png",
        alt: "Foto da Integrante Maria Eduarda"
    },
    {
        nome: "Clara",
        idade: 15,
        descricao: "Oie, eu sou a <strong>Clara</strong>, tenho 15 anos e faço parte da equipe de <strong>desenvolvimento</strong> do projeto. <br>Adoro ver séries e filmes de suspense.",
        img: "Imagens Sobre Nós/Clara.png",
        alt: "Foto da integrante Clara"
    },
    {
        nome: "Raissa",
        idade: 15,
        descricao: "Oii! Sou a <strong>Raissa</strong>, tenho 15 anos e cuido da parte de <strong>Banco de Dados do GATS</strong>. <br>Gosto muito de passear, ver filmes e ouvir música.",
        img: "Imagens Sobre Nós/Raissa.png",
        alt: "Foto da Integrante Raissa Casale"
    },
    {
        nome: "Samuel",
        idade: 17,
        descricao: "Opa! Sou o <strong>Samuel</strong> e tenho 17 anos, sou da equipe de <strong>desenvolvimento</strong> do Gats, estagiário Front-end PicPay.",
        img: "Imagens Sobre Nós/Samuel.png",
        alt: "Foto do Integrante Samuel"
    },
    {
        nome: "Carlos",
        idade: 17,
        descricao: "Oi sou o <strong>Carlos</strong>!!<br> Tenho 17 anos e sou da equipe de <strong>Análise de dados</strong> do Gats!!",
        img: "Imagens Sobre Nós/Carlos.png",
        alt: "Foto do Integrante Carlos"
    },
    {
        nome: "Murilo",
        idade: 16,
        descricao: "Oi sou o <strong>Murilo</strong>!! <br> Tenho 16 anos e sou da equipe de <strong>Análise de dados</strong> do Gats!!",
        img: "Imagens Sobre Nós/Murilo.png",
        alt: "Foto do Integrante Murilo"
    },
    {
        nome: "Ryan",
        idade: 15,
        descricao: "Olá, sou o <strong>Ryan</strong>! <br>Faço parte do GATS. <br>Sou responsável pelo <strong>desenvolvimento</strong> da parte do professor do EducaEco.",
        img: "Imagens Sobre Nós/Ryan.png",
        alt: "Foto do Integrante Ryan"
    },
];

let contador = 0;

const txt1 = document.getElementById("texto-int1");
const foto_sobre1 = document.getElementById("foto-sobre1");
const ant = document.getElementById("anterior");
const prox = document.getElementById("proximo");
const prox_ant = document.getElementById('proximo-anterior');

function atualizarConteudo() {
    const membro = integrantes[contador];
    txt1.innerHTML = `<p>${membro.descricao}</p><span>- ${membro.nome}.</span>`;
    foto_sobre1.src = membro.img;
    foto_sobre1.alt = membro.alt;

    // Altera a cor de fundo de acordo com o contador
    const corFundo = coresDeFundo[contador];
    document.getElementById('fotos-int').style.backgroundColor = corFundo;
    txt1.style.backgroundColor = corFundo;
    ant.style.backgroundColor = corFundo;
    prox.style.backgroundColor = corFundo;

    // Controla a visibilidade dos botões
    ant.style.display = contador === 0 ? 'none' : 'flex';
    prox.style.display = contador === integrantes.length - 1 ? 'none' : 'flex';
}

function proximo() {
    if (contador < integrantes.length - 1) {
        contador++;
        atualizarConteudo();
    }
}

function anterior() {
    if (contador > 0) {
        contador--;
        atualizarConteudo();
    }
}

// Chamando a função para inicializar o conteúdo
atualizarConteudo();

// Eventos de clique
prox.addEventListener('click', proximo);
ant.addEventListener('click', anterior);
