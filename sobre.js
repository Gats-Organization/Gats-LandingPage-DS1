// Adiciona uma lista de cores para o background
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

//Função Próximo e anterior
function proximo_anterior(proximo_anterior){
    //Contador para saber quantos próximos já passei

    if(proximo_anterior == 1){
        contador-- 
    } else{
        contador++
    }
    

    let texto = ""
    let img = ""
    let altimg = ""

    //Mostrando o Rodrigo
    if(contador == 0){
        texto = "<p>\“Olá, sou o <strong>Rodrigo</strong>! <br>Tenho 15 anos e adoro gatos! <br>Sou integrante do Gats. Sou responsável pelo <strong>desenvolvimento</strong> do site do EducaEco!\”</p><span>- Rodrigo Alex.</span>"
        
        img = "Imagens Sobre Nós/Rodrigo.png"
        altimg = "Foto do Integrante Rodrigo"

        //Tirando o botão de anterior
        ant.style.display = 'none'
        prox_ant.style.justifyContent = 'end'
    }

    else if(contador == 1){ //Mostrando Petherson

        texto = "<p>\"Oi! Sou o <strong>Petherson</strong>! <br>Tenho 16 anos e sou um integrante do grupo GATS. <br>Nele, sou responsável pelo <strong>design geral</strong> do nosso app EducaEco.\"</p><span>- Petherson Martins.</span>"

        img = "Imagens Sobre Nós/Petherson.png"
        altimg = "Foto da integrante Petherson"

        //Botando o botão de anterior e arrumando o estilo
        ant.style.display = 'flex'
        prox_ant.style.justifyContent = 'end'

    } else if(contador == 2){ //Mostrando Giovanne

        texto = "<p>\"Olá, sou o <strong>Giovanne</strong>! <br>Tenho 15 anos e faço parte do GATS. <br>Sou o responsável pelo <strong>gerenciamento de tarefas</strong> do EducaEco.\"</p><span>- Giovanne Torquato.</span>"
        
        img = "Imagens Sobre Nós/Giovanne.png"
        altimg = "Foto do Integrante Giovanne"

    } else if(contador == 3){ //Mostrando Giovanna

        texto = "<p>\"Oiie, me chamo <strong>Giovanna</strong> e tenho 16 anos :) <br> Faço parte da equipe de Dev e do <strong>monitoramento do projeto</strong>. <br>Amo livros e vivenciar novas experiências\"</p><span>- Giovanna Rosa.</span>"

        img = "Imagens Sobre Nós/Giovanna.png"
        altimg = "Foto da integrante Giovanna"

    } else if(contador == 4){ //Maria Eduarda

        texto = "<p>\"Oie! Eu sou a <strong>Maria Eduarda</strong> e gosto de chocolate! <br>Tenho 16 anos.<br>Sou responsável pelo <strong>desenvolvimento do front-end e back-end</strong> do site do EducaEco.\"</p><span>- Maria Eduarda.</span>"
        
        img = "Imagens Sobre Nós/Maria Eduarda.png"
        altimg = "Foto da Integrante Maria Eduarda"

    } else if(contador == 5){ //Clara
        texto = "<p>\"Oie, eu sou a <strong>Clara</strong>, tenho 15 anos e faço parte da equipe de <strong>desenvolvimento</strong> do projeto. <br>Adoro ver séries e filmes de suspense.\"</p><span>- Clara Bartollini.</span>"

        img = "Imagens Sobre Nós/Clara.png"
        altimg = "Foto da integrante Clara"


    } else if(contador == 6){ //Mostrando a Raissa

        texto = "<p>\"Oii! Sou a <strong>Raissa</strong>, tenho 15 anos e cuido da parte de <strong>Banco de Dados do GATS</strong>. <br>Gosto muito de passear, ver filmes e ouvir música.\"</p><span>- Raissa Casale.</span>"
        
        img = "Imagens Sobre Nós/Raissa.png"
        altimg = "Foto da Integrante Raissa Casale"

    } else if(contador == 7){ //Mostrando Samuel

        texto = "<p>\"Opa! Sou o <strong>Samuel</strong> e tenho 17 anos, sou da equipe de <strong>desenvolvimento</strong> do Gats, estagiário Front-end PicPay.\"</p><span>- Samuel Xavier.</span>"

        img = "Imagens Sobre Nós/Samuel.png"
        altimg = "Foto do Integrante Samuel"

    } else if(contador == 8){ //Mostrando Carlos

        texto = "<p>\"Oi sou o <strong>Carlos</strong>!!<br> Tenho 17 anos e sou da equipe de <strong>Análise de dados</strong> do Gats!!\"</p><span>- Carlos Henrique.</span>"
        
        img = "Imagens Sobre Nós/Carlos.png"
        altimg = "Foto do Integrante Carlos"

    } else if(contador == 9){ // Mostrando Murilo

        texto = "<p>\"Oi sou o <strong>Murilo</strong>!! <br> Tenho 16 anos e sou da equipe de<strong> Análise de dados</strong> do Gats!!\"</p><span>- Murilo Moreira.</span>"

        img = "Imagens Sobre Nós/Murilo.png"
        altimg = "Foto do Integrante Murilo"

        //Colocando o botão do próximo
        prox.style.display = 'flex'
        ant.style.marginRight = '5%'

    } else{ //Mostrando Ryan

        texto = "<p>\"Olá, sou o Giovanne! <br>Tenho 15 anos e faço parte do GATS. <br>Sou o responsável pelo gerenciamento de tarefas do EducaEco.\"</p><span>- Ryan Evangelista.</span>"
        
        img = "Imagens Sobre Nós/Ryan.png"
        altimg = "Foto do Integrante Ryan"

        //Removendo o botão do próximo
        prox.style.display = 'none'
        ant.style.marginRight = '27%'

    }

    alterarTextoImagem(texto, img, altimg)
}


//Função para ir para o próximo
function proximo(){
    proximo_anterior(2)
}

function anterior(){
    proximo_anterior(1)
}

// Função para alterar o texto, a imagem e o fundo do html
function alterarTextoImagem(texto, img, alt_img) {
    txt1.innerHTML = texto;
    foto_sobre1.src = img;
    foto_sobre1.alt = alt_img;

    // Altera a cor de fundo de acordo com o contador
    document.getElementById('fotos-int').style.backgroundColor = coresDeFundo[contador];
    txt1.style.backgroundColor = coresDeFundo[contador]
    ant.style.backgroundColor = coresDeFundo[contador];
    prox.style.backgroundColor = coresDeFundo[contador];
}

//Criando chamada id
let   txt1        = document.getElementById("texto-int1")
const foto_sobre1 = document.getElementById("foto-sobre1")
let   ant         = document.getElementById("anterior")
let   prox_ant    = document.getElementById('proximo-anterior')
let   prox        = document.getElementById('proximo')


let contador = 0


//Chamando a função de próximo
prox.addEventListener('click', proximo)

//Chamando a função de anterior
ant.addEventListener('click', anterior)