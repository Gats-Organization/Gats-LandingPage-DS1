//Função pgenérica para mudar a imagem
function alterarImagem(vsrc, valt){
    const imagem = document.getElementById("imagem_demonstracao")
    imagem.src = vsrc
    imagem.alt = valt
}

function alterarImagemProfessor(vsrc, valt){
    const imagem = document.getElementById("imagem_demonstracao-escondida")
    imagem.src = vsrc
    imagem.alt = valt
}


//Função para alterar o estilo dos botões Para alunos e Para professores quando clicar em professores
function alterarProfessor(){
    alunos.style.backgroundColor = "white";
    professores.style.backgroundColor = "#B5FB7D"

    //Escondendo o container dos alunos e mostrando o do professor
    container.style.display = 'none'

    container_escondido.style.display = 'flex'

    alterarConteudoProfessor()
}

//Função para alterar o estilo dos botões Para alunos e Para professores quando clicar em alunos
function alterarAlunos(){
    alunos.style.backgroundColor = "#B5FB7D"
    professores.style.backgroundColor = "white"

    container.style.display = 'flex'

    container_escondido.style.display = 'none'

    alterarConteudo()
}

//Função genérica para alterar o estilo do container
function alterarPagina(bloco1, bloco2, bloco3, bloco4, corContainer, conteudoTexto, praticaTexto, quizTexto, rankingTexto, imgSrc, imgAlt) {
    // Definir a cor de fundo do container principal
    container.style.backgroundColor = corContainer;
    // Atualizar o conteúdo
    conteudo.innerHTML = `<h2>${bloco1}</h2><p>${conteudoTexto}</p>`;
    pratica.innerHTML = `<h2>${bloco2}</h2><p>${praticaTexto}</p>`;
    quiz.innerHTML = `<h2>${bloco3}</h2><p>${quizTexto}</p>`;
    ranking.innerHTML = `<h2>${bloco4}</h2><p>${rankingTexto}</p>`;
        // Alterar a imagem
    alterarImagem(imgSrc, imgAlt);

    // Alterar a imagem
    alterarImagem(imgSrc, imgAlt);

    // Alterar cor de todos os botões para a cor do container
    document.querySelectorAll('.bloco_dem').forEach(btn => {
        btn.style.backgroundColor = corContainer;
    });
}

function alterarPaginaProfessor(bloco1, bloco2, bloco3, bloco4, corContainer, conteudoTexto, praticaTexto, quizTexto, rankingTexto, imgSrc, imgAlt) {
    // Definir a cor de fundo do container principal
    container_escondido.style.backgroundColor = corContainer; 

    // Atualizar o conteúdo das seções
    pagina.innerHTML = `<h2>${bloco1}</h2><p>${conteudoTexto}</p>`;
    pratica_prof.innerHTML = `<h2>${bloco2}</h2><p>${praticaTexto}</p>`;
    quiz_prof.innerHTML = `<h2>${bloco3}</h2><p>${quizTexto}</p>`;
    ranking_prof.innerHTML = `<h2>${bloco4}</h2><p>${rankingTexto}</p>`;

    // Alterar a imagem do professor
    alterarImagemProfessor(imgSrc, imgAlt);
}


/* ----------------- FUNÇÃO ALUNOS --------------------- */

//Função para alterar as demonstrações quando clicar em conteudo
function alterarConteudo() {
    alterarPagina(
        'Conteúdo',
        'Prática',
        'Quiz',
        'Ranking',
        '#DEFBC7', // cor do container
        'São disponibilizados diversos conteúdos para os alunos sobre os temas que estão sendo abordados. Os conteúdos são disponibilizados de forma escrita e vídeos podem ser acessados acerca do tema.', // texto do conteúdo
        '', // texto da prática
        '', // texto do quiz
        '', // texto do ranking
        'imagens inicio/11.png', // caminho da imagem
        'Imagem que representa o conteúdo do app' // alt da imagem
    );

    //Mudando cor do botão conteúdo e dos alunos
    conteudo.style.backgroundColor = "#B5FB7D"
    alunos.style.backgroundColor = "#B5FB7D"
}

//Função para alterar as demonstrações quando clicar em prática
function alterarPratica() {
    alterarPagina(
        'Conteúdo',
        'Prática',
        'Quiz',
        'Ranking',
        '#FFC4C4', // cor do container
        '', 
        'Na parte da prática, um desafio prático é solicitado ao estudante. O aluno deve enviar uma foto da atividade, registrada no momento em que está sendo realizada e anexá-la no App.', 
        '', 
        '', 
        'imagens inicio/6.png', 
        'Imagem que mostra a prática do aplicativo'
    );

    //Mudando cor do botão prática e dos alunos
    pratica.style.backgroundColor = "#FFA3A3"
    alunos.style.backgroundColor = "#FFA3A3"
}

//Função para alterar as demonstrações quando clicar em quiz
function alterarQuiz() {
    alterarPagina(
        'Conteúdo',
        'Prática',
        'Quiz',
        'Ranking',
        '#C3F4FF', // cor do container
        '', 
        '', 
        'São disponibilizados diversos quizzes para o aluno acerca do tema, perguntas e respostas para a fixação do conteúdo.', 
        '', 
        'imagens inicio/8.png', 
        'Imagem que representa o quiz no app'
    );

    //Mudando cor do botão quiz e dos alunos
    quiz.style.backgroundColor = "#7AD8EE"
    alunos.style.backgroundColor = "#7AD8EE"
}

//Função para alterar as demonstrações quando clicar em ranking
function alterarRanking() {
    alterarPagina(
        'Conteúdo',
        'Prática',
        'Quiz',
        'Ranking',
        '#FFEADA', // cor do container
        '', 
        '', 
        '', 
        'Os alunos vão poder visualizar os rankings dos alunos mais engajados da turma. Promovendo um estimulo as práticas das atividades.', 
        'imagens inicio/10.png', 
        'Imagem que representa o Ranking'
    );

    //Mudando cor do botão ranking e dos alunos
    ranking.style.backgroundColor = "#FFCDA7"
    alunos.style.backgroundColor = "#FFCDA7"
}

/* ----------------- FUNÇÃO PROFESSORES --------------------- */
function alterarConteudoProfessor(){
    pagina.style.backgroundColor = "#B5FB7D"
    pratica_prof.style.backgroundColor = "#DEFBC7"
    quiz_prof.style.backgroundColor = "#DEFBC7"
    ranking_prof.style.backgroundColor = "#DEFBC7"
    professores.style.backgroundColor = "#B5FB7D"

    alterarPaginaProfessor(
        'Página Inicial',  // Título do conteúdo
        'Atividade Prática',  // Título da prática
        'Quiz',  // Título do quiz
        'Ranking',  // Título do ranking
        '#DEFBC7',  // Cor do container
        'Na página inicial é possível visualizar as turmas que pertencem ao professor e os ícones que representam outras funcionalidades que podem ser acessadas no site.',  // Texto do conteúdo
        '',  // Texto da prática
        '',  // Texto do quiz
        '',  // Texto do ranking
        'imagens inicio/PaginaInicial.png',  // Caminho da imagem
        'Imagem que representa a página inicial do app'  // Alt da imagem
    );


}

function alterarPraticaProfessor(){
    pagina.style.backgroundColor = "#FFC4C4"
    pratica_prof.style.backgroundColor = "#FFA3A3"
    quiz_prof.style.backgroundColor = "#FFC4C4"
    ranking_prof.style.backgroundColor = "#FFC4C4"
    professores.style.backgroundColor = "#FFA3A3"

    alterarPaginaProfessor(
        'Página Inicial',  // Título do conteúdo
        'Atividade Prática',  // Título da prática
        'Quiz',  // Título do quiz
        'Ranking',  // Título do ranking
        '#FFC4C4',  // Cor do container
        '',  // Texto do conteúdo
        'O professor tem acesso às fotos enviadas pelos alunos correspondentes às atividades práticas. Podendo validar a entrega da atividade.',  // Texto da prática
        '',  // Texto do quiz
        '',  // Texto do ranking
        'imagens inicio/AtividadePratica.png',  // Caminho da imagem
        'Imagem que mostra a prática do site'  // Alt da imagem
    );

    //Mudando cor do botão prática e dos alunos
    pratica_prof.style.backgroundColor = "#FFA3A3"
    professores.style.backgroundColor = "#FFA3A3"
}

function alterarQuizProfessor(){
    pagina.style.backgroundColor = "#C3F4FF"
    pratica_prof.style.backgroundColor = "#C3F4FF"
    quiz_prof.style.backgroundColor = "#7AD8EE"
    ranking_prof.style.backgroundColor = "#C3F4FF"
    professores.style.backgroundColor = "#7AD8EE"

    alterarPaginaProfessor(
        'Página Inicial',  // Título do conteúdo
        'Atividade Prática',  // Título da prática
        'Quiz',  // Título do quiz
        'Ranking',  // Título do ranking
        '#C3F4FF',  // Cor do container
        '',  // Texto do conteúdo
        '',  // Texto da prática
        'Na área do quiz, o professor consegue visualizar os nomes dos alunos e as notas dos quizzes correspondentes a esse aluno. Inclusive a sua média geral.',  // Texto do quiz
        '',  // Texto do ranking
        'imagens inicio/Quiz.png',  // Caminho da imagem
        'Imagem que representa o quiz no app'  // Alt da imagem
    );
}

function alterarRankingProfessor(){
    pagina.style.backgroundColor = "#FFEADA"
    pratica_prof.style.backgroundColor = "#FFEADA"
    quiz_prof.style.backgroundColor = "#FFEADA"
    ranking_prof.style.backgroundColor = "#FFCDA7"
    professores.style.backgroundColor = "#FFCDA7"

    alterarPaginaProfessor(
        'Página Inicial',  // Título do conteúdo
        'Atividade Prática',  // Título da prática
        'Quiz',  // Título do quiz
        'Ranking',  // Título do ranking
        '#FFEADA',  // Cor do container
        '',  // Texto do conteúdo
        '',  // Texto da prática
        '',  // Texto do quiz
        'Nesta parte, há os rankings dos alunos de cada turma. Assim, sendo possível verificar os alunos mais engajados com as atividades e aqueles menos envolvidos.',  // Texto do ranking
        'imagens inicio/Ranking.png',  // Caminho da imagem
        'Imagem que representa o Ranking'  // Alt da imagem
    );
}



//Conectando ids
let container = document.getElementById('container')
let container_escondido = document.getElementById('container-escondido')
let professores = document.getElementById("p-professores")
let alunos = document.getElementById("p-alunos")
let conteudo = document.getElementById("demonstracao1")
let pratica = document.getElementById("demonstracao2")
let quiz = document.getElementById("demonstracao3")
let ranking = document.getElementById("demonstracao4")
let pagina = document.getElementById("demonstracao1-escondido")
let pratica_prof = document.getElementById('demonstracao2-escondido')
let quiz_prof = document.getElementById("demonstracao3-escondido")
let ranking_prof = document.getElementById("demonstracao4-escondido")

//Chamando a Função caso clique em professor
professores.addEventListener('click', alterarProfessor)

//Chamando a Função caso clique em aluno
alunos.addEventListener('click', alterarAlunos)

//Chamando a Função quando clicar em conteúdo
conteudo.addEventListener('click', alterarConteudo)

//Chamando a Função quando clicar em prática
pratica.addEventListener('click', alterarPratica)

//Chamando a Função quando clicar em quiz
quiz.addEventListener('click', alterarQuiz)

//Chamado a Função quando clicar em Ranking
ranking.addEventListener('click', alterarRanking)


/* -------------------------- Chamando Funções do Professor  ----------------------- */

//Chamando a Função quando clicar em prática no professor
pagina.addEventListener('click', alterarConteudoProfessor)

//Chamado a Função caso clique em prática do professor
pratica_prof.addEventListener('click', alterarPraticaProfessor)

//Chamado a Função caso clique em quiz do professor
quiz_prof.addEventListener('click', alterarQuizProfessor)

//Chamado a Função caso clique em ranking do professor
ranking_prof.addEventListener('click', alterarRankingProfessor)

