//Função para mudar a imagem
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

    alterarPaginaProfessor()
}

//Função para alterar o estilo dos botões Para alunos e Para professores quando clicar em alunos
function alterarAlunos(){
    alunos.style.backgroundColor = "#B5FB7D"
    professores.style.backgroundColor = "white"

    container.style.display = 'flex'

    container_escondido.style.display = 'none'

    alterarConteudo()
}

/* ----------------- FUNÇÃO ALUNOS --------------------- */

//Função para alterar as demonstrações quando clicar em conteudo
function alterarConteudo(){

    alunos.style.backgroundColor = "#B5FB7D" //Mudando a cor do botão para alunos
    container.style.backgroundColor = "#DEFBC7" //Mudando a cor do container
    conteudo.style.backgroundColor = "#B5FB7D" //Colocando a cor para destacar o botão do conteúdo
    pratica.style.backgroundColor = "#DEFBC7" //Tirando a marca vermelha da prátia
    quiz.style.backgroundColor = "#DEFBC7" //Tirando a marca azul do quiz
    ranking.style.backgroundColor = "#DEFBC7" //Tirando a marca laranja do ranking
    

    //Adicionando os conteúdos do Conteúdo
    conteudo.innerHTML = "<h2>Conteúdo</h2>" 
    conteudo.innerHTML += "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cum, temporibus. Lorem, ipsum dolor. Lorem, ipsum dolor. Lorem Lorem</p>"

    pratica.innerHTML = "<h2>Prática</h2>" //Tirando os textos da prática

    quiz.innerHTML = "<h2>Quiz</h2>" //Tirando os textos do quiz

    ranking.innerHTML = "<h2>Ranking</h2>" //Tirando os textos do Ranking

    //Mudando a im'agem para representar o conteudo
    alterarImagem("Imagens Início/4.png", "Image que representa o conteúdo do app")
}

//Função para alterar as demonstrações quando clicar em prática
function alterarPratica(){

    alunos.style.backgroundColor = "#FFA3A3" //Mudando a cor do botão para alunos
    container.style.backgroundColor = "#FFC4C4" //Mudando a cor do container
    conteudo.style.backgroundColor = "#FFC4C4" //Tirando a marca verde do conteudo
    pratica.style.backgroundColor = "#FFA3A3" //Colocando a cor para destacar o botão da prática
    quiz.style.backgroundColor = "#FFC4C4" //Tirando a marca azul do quiz
    ranking.style.backgroundColor = "#FFC4C4" //Tirando a marca laranja do ranking
    

    conteudo.innerHTML = "<h2>Conteúdo</h2>" //Tirando os textos do conteúdo

    //Adicionando os conteúdos de Prática
    pratica.innerHTML = "<h2>Prática</h2>"
    pratica.innerHTML += "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cum, temporibus. Lorem, ipsum dolor. Lorem, ipsum dolor. Lorem Lorem<</p>"

    quiz.innerHTML = "<h2>Quiz</h2>" //Tirando os textos do quiz

    ranking.innerHTML = "<h2>Ranking</h2>" //Tirando os textos do Ranking[
    
    //Mostrando a imagem que representa a prática
    alterarImagem("Imagens Início/6.png", "Imagem que mostra a prática do aplicativo")
}

//Função para alterar as demonstrações quando clicar em quiz
function alterarQuiz(){

    alunos.style.backgroundColor = "#7AD8EE" //Mudando a cor do botão para alunos
    container.style.backgroundColor = "#C3F4FF" //Mudando a cor do container
    conteudo.style.backgroundColor = "#C3F4FF" //Tirando a marca verde do conteudo
    pratica.style.backgroundColor = "#C3F4FF" //Tirando a marca vermelha de prática
    quiz.style.backgroundColor = "#7AD8EE" //Colocando a cor para destacar o botão do quiz
    ranking.style.backgroundColor = "#C3F4FF" //Tirando a marca laranja do ranking
    

    conteudo.innerHTML = "<h2>Conteúdo</h2>" //Tirando os textos do conteúdo

    pratica.innerHTML = "<h2>Prática</h2>" //Tirando os textos da prática

    //Adicionando os conteúdos do Quiz
    quiz.innerHTML = "<h2>Quiz</h2>"
    quiz.innerHTML += "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cum, temporibus. Lorem, ipsum dolor. Lorem, ipsum dolor. Lorem Lorem<</p>"

    ranking.innerHTML = "<h2>Ranking</h2>" //Tirando os textos do Ranking

    //Mudando a imagem para a que representa o quiz
    alterarImagem("Imagens Início/8.png", "Imagem que representa o quiz no app")
}

//Função para alterar as demonstrações quando clicar em ranking
function alterarRanking(){

    alunos.style.backgroundColor = "#FFCDA7" //Mudando a cor do botão para alunos
    container.style.backgroundColor = "#FFEADA" //Mudando a cor do container
    conteudo.style.backgroundColor = "#FFEADA" //Tirando a marca verde do conteudo
    pratica.style.backgroundColor = "#FFEADA" //Tirando a marca vermelha de prática
    quiz.style.backgroundColor = "#FFEADA" //Tirando a marca azul do quiz
    ranking.style.backgroundColor = "#FFCDA7" //Colocando a cor para destacar o botão do ranking
    

    conteudo.innerHTML = "<h2>Conteúdo</h2>" //Tirando os textos do conteúdo

    pratica.innerHTML = "<h2>Prática</h2>" //Tirando os textos da prática

    quiz.innerHTML = "<h2>Quiz</h2>" //Tirando os textos do quiz

    //Adicionando os conteúdos do Ranking
    ranking.innerHTML = "<h2>Ranking</h2>"
    ranking.innerHTML += "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cum, temporibus. Lorem, ipsum dolor. Lorem, ipsum dolor. Lorem Lorem<</p>"

    //Mudando a imagem para ser a que representa
    alterarImagem("Imagens Início/10.png", "Imagem que representa o Raning")
}

/* ----------------- FUNÇÃO PROFESSORES --------------------- */
function alterarPaginaProfessor(){

    professores.style.backgroundColor = "#B5FB7D" //Mudando a cor do botão para alunos
    container_escondido.style.backgroundColor = "#DEFBC7" //Mudando a cor do container
    pagina.style.backgroundColor = "#B5FB7D" //Colocando a cor para destacar o botão do conteúdo
    pratica_prof.style.backgroundColor = "#DEFBC7" //Tirando a marca vermelha da prátia
    quiz_prof.style.backgroundColor = "#DEFBC7" //Tirando a marca azul do quiz
    ranking_prof.style.backgroundColor = "#DEFBC7" //Tirando a marca laranja do ranking
    

    //Adicionando os conteúdos do Conteúdo
    pagina.innerHTML = "<h2>Página Inicial</h2>" 
    pagina.innerHTML += "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cum, temporibus. Lorem, ipsum dolor. Lorem, ipsum dolor. Lorem Lorem</p>"

    pratica_prof.innerHTML = "<h2>Atividades Práticas</h2>" //Tirando os textos da prática

    quiz_prof.innerHTML = "<h2>Quiz</h2>" //Tirando os textos do quiz

    ranking_prof.innerHTML = "<h2>Ranking</h2>" //Tirando os textos do Ranking

    //Mudando a im'agem para representar o conteudo
    alterarImagemProfessor("Imagens/Conteudo.png", "Image que representa o conteúdo do app")
}

function alterarPraticaProfessor(){

    professores.style.backgroundColor = "#FFA3A3" //Mudando a cor do botão para alunos
    container_escondido.style.backgroundColor = "#FFC4C4" //Mudando a cor do container
    pagina.style.backgroundColor = "#FFC4C4" //Tirando a marca verde do conteudo
    pratica_prof.style.backgroundColor = "#FFA3A3" //Colocando a cor para destacar o botão da prática
    quiz_prof.style.backgroundColor = "#FFC4C4" //Tirando a marca azul do quiz
    ranking_prof.style.backgroundColor = "#FFC4C4" //Tirando a marca laranja do ranking
    

    pagina.innerHTML = "<h2>Página Inicial</h2>" //Tirando os textos do conteúdo

    //Adicionando os conteúdos de Prática
    pratica_prof.innerHTML = "<h2>Atividades Práticas</h2>"
    pratica_prof.innerHTML += "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cum, temporibus. Lorem, ipsum dolor. Lorem, ipsum dolor. Lorem Lorem<</p>"

    quiz_prof.innerHTML = "<h2>Quiz</h2>" //Tirando os textos do quiz

    ranking_prof.innerHTML = "<h2>Ranking</h2>" //Tirando os textos do Ranking[
    
    //Mostrando a imagem que representa a prática
    alterarImagemProfessor("Imagens/Pratica.png", "Imagem que mostra a prática do aplicativo")
}

function alterarQuizProfessor(){

    professores.style.backgroundColor = "#7AD8EE" //Mudando a cor do botão para alunos
    container_escondido.style.backgroundColor = "#C3F4FF" //Mudando a cor do container
    pagina.style.backgroundColor = "#C3F4FF" //Tirando a marca verde do conteudo
    pratica_prof.style.backgroundColor = "#C3F4FF" //Tirando a marca vermelha de prática
    quiz_prof.style.backgroundColor = "#7AD8EE" //Colocando a cor para destacar o botão do quiz
    ranking_prof.style.backgroundColor = "#C3F4FF" //Tirando a marca laranja do ranking
    

    pagina.innerHTML = "<h2>Página Inicial</h2>" //Tirando os textos do conteúdo

    pratica_prof.innerHTML = "<h2>Atividades Práticas</h2>" //Tirando os textos da prática

    //Adicionando os conteúdos do Quiz
    quiz_prof.innerHTML = "<h2>Quiz</h2>"
    quiz_prof.innerHTML += "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cum, temporibus. Lorem, ipsum dolor. Lorem, ipsum dolor. Lorem Lorem</p>"

    ranking_prof.innerHTML = "<h2>Ranking</h2>" //Tirando os textos do Ranking

    //Mudando a imagem para a que representa o quiz
    alterarImagemProfessor("Imagens/Quiz.png", "Imagem que representa o quiz no app")
}

function alterarRankingProfessor(){

    professores.style.backgroundColor = "#FFCDA7" //Mudando a cor do botão para alunos
    container_escondido.style.backgroundColor = "#FFEADA" //Mudando a cor do container
    pagina.style.backgroundColor = "#FFEADA" //Tirando a marca verde do conteudo
    pratica_prof.style.backgroundColor = "#FFEADA" //Tirando a marca vermelha de prática
    quiz_prof.style.backgroundColor = "#FFEADA" //Tirando a marca azul do quiz
    ranking_prof.style.backgroundColor = "#FFCDA7" //Colocando a cor para destacar o botão do ranking
    

    pagina.innerHTML = "<h2>Página Inicial</h2>" //Tirando os textos do conteúdo

    pratica_prof.innerHTML = "<h2>Atividades Práticas</h2>" //Tirando os textos da prática

    quiz_prof.innerHTML = "<h2>Quiz</h2>" //Tirando os textos do quiz

    //Adicionando os conteúdos do Ranking
    ranking_prof.innerHTML = "<h2>Ranking</h2>"
    ranking_prof.innerHTML += "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cum, temporibus. Lorem, ipsum dolor. Lorem, ipsum dolor. Lorem Lorem<</p>"

    //Mudando a imagem para ser a que representa
    alterarImagemProfessor("Imagens/Ranking.png", "Imagem que representa o Raning")
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
pagina.addEventListener('click', alterarPaginaProfessor)

//Chamado a Função caso clique em prática do professor
pratica_prof.addEventListener('click', alterarPraticaProfessor)

//Chamado a Função caso clique em quiz do professor
quiz_prof.addEventListener('click', alterarQuizProfessor)

//Chamado a Função caso clique em ranking do professor
ranking_prof.addEventListener('click', alterarRankingProfessor)

