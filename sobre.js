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
        texto = "<p>\“Olá, sou o Rodrigo! <br>Tenho 15 anos e adoro gatos! <br>Sou integrante do Gats. Sou responsável pelo desenvolvimento do site do EducaEco!\”</p><span>- Rodrigo Alex</span>"
        
        img = "Imagens Sobre Nós/Rodrigo.png"
        altimg = "Foto do Integrante Rodrigo"

        //Tirando o botão de anterior
        ant.style.display = 'none'
        prox_ant.style.justifyContent = 'end'
    }

    else if(contador == 1){ //Mostrando Petherson

        texto = "<p>\"Oi! Sou o Petherson! <br>Tenho 16 anos e sou um integrante do grupo GATS. <br>Nele, sou responsável pelo design geral do nosso app EducaEco.\"</p><span>- Petherson Martins</span>"

        img = "Imagens Sobre Nós/Petherson.png"
        altimg = "Foto da integrante Petherson"

        //Botando o botão de anterior e arrumando o estilo
        ant.style.display = 'flex'
        prox_ant.style.justifyContent = 'end'

    } else if(contador == 2){ //Mostrando Giovanne

        texto = "<p>\"Olá, sou o Giovanne! <br>Tenho 15 anos e faço parte do GATS. <br>Sou o responsável pelo gerenciamento de tarefas do EducaEco.\"</p><span>- Giovanne Torquato</span>"
        
        img = "Imagens Sobre Nós/Giovanne.png"
        altimg = "Foto do Integrante Giovanne"

    } else if(contador == 3){ //Mostrando Giovanna

        texto = "<p>\"Oiie, me chamo Giovanna e tenho 16 anos :) <br> Faço parte da equipe de Dev e do monitoramento do projeto. <br>Amo livros e vivenciar novas experiências\"</p><span>- Giovanna Rosa</span>"

        img = "Imagens Sobre Nós/Giovanna.png"
        altimg = "Foto da integrante Giovanna"

    } else if(contador == 4){ //Maria Eduarda

        texto = "<p>\"Oie! Eu sou a Maria Eduarda e gosto de chocolate! <br>Tenho 16 anos.<br>Sou responsável pelo desenvolvimento do front-end e back-end do site do EducaEco.\"</p><span>- Maria Eduarda</span>"
        
        img = "Imagens Sobre Nós/Maria Eduarda.png"
        altimg = "Foto da Integrante Maria Eduarda"

    } else if(contador == 5){ //Clara
        texto = "<p>\"Oie, eu sou a Clara, tenho 15 anos e faço parte da equipe de desenvolvimento do projeto. <br>Adoro ver séries e filmes de suspense.\"</p><span>- Clara Bartollini</span>"

        img = "Imagens Sobre Nós/Clara.png"
        altimg = "Foto da integrante Clara"


    } else if(contador == 6){ //Mostrando a Raissa

        texto = "<p>\"Oii! Sou a Raissa, tenho 15 anos e cuido da parte de banco de dados do GATS. <br>Gosto muito de passear, ver filmes e ouvir música.\"</p><span>- Raissa Casale</span>"
        
        img = "Imagens Sobre Nós/Raissa.png"
        altimg = "Foto da Integrante Raissa Casale"

    } else if(contador == 7){ //Mostrando Samuel

        texto = "<p>\"Opa! Eu tenho 17 anos, sou da equipe de desenvolvimento do Gats, estagiário Frontend PicPay.\"</p><span>- Samuel Xavier</span>"

        img = "Imagens Sobre Nós/Samuel.png"
        altimg = "Foto do Integrante Samuel"

    } else if(contador == 8){ //Mostrando Carlos

        texto = "<p>\"Oi sou o Carlos!!<br> Tenho 17 anos e sou da equipe de Análise de dados do Gats!!😎\"</p><span>- Carlos Henrique</span>"
        
        img = "Imagens Sobre Nós/Carlos.png"
        altimg = "Foto do Integrante Carlos"

    } else if(contador == 9){ // Mostrando Murilo

        texto = "<p>\"Oi sou o Murilo !! <br> Tenho 16 anos e sou da equipe de Análise de dados do Gats!!😎\"</p><span>- Murilo Moreira</span>"

        img = "Imagens Sobre Nós/Murilo.png"
        altimg = "Foto do Integrante Murilo"

        //Colocando o botão do próximo
        prox.style.display = 'flex'
        ant.style.marginRight = '5%'

    } else{ //Mostrando Ryan

        texto = "<p>\"Olá, sou o Giovanne! <br>Tenho 15 anos e faço parte do GATS. <br>Sou o responsável pelo gerenciamento de tarefas do EducaEco.\"</p><span>- Ryan Evangelista</span>"
        
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

//Função para alterar o texto e a imagem do html
function alterarTextoImagem(texto, img, alt_img){
    txt1.innerHTML = texto

    foto_sobre1.src = img
    foto_sobre1.alt = alt_img
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