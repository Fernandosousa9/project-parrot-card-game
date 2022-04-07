let contaJogada = 0;
let contaAcerto = 0;
let cartasViradas = [];
let acertosParaFinalizar = 0;
let tempoSegundos = 0;
let statusJogo = 0;
let interval;

//Array com os parrots
let imgParrots = [
    "images/bobrossparrot.gif",
    "images/explodyparrot.gif",
    "images/fiestaparrot.gif",
    "images/metalparrot.gif",
    "images/revertitparrot.gif",
    "images/tripletsparrot.gif",
    "images/unicornparrot.gif"
];

//Array com os parrots sorteado pelo total de cartas
let selecionados = [];

//Inserir as cartas do jogo
function renderizaCartas(qtdCartas){
    sortearParrots(qtdCartas);

    while(selecionados.length !== 0){
        //Criar uma carta
        let carta = document.createElement("li");

        //Insererir função onclick na carta
        carta.setAttribute('onclick','clickCarta(this)');

        //Inserir uma imagem aleatoriamente nela
        let imgCarta = document.createElement('img');

        let indiceSorteio = Math.floor(selecionados.length * Math.random());
        
        let urlAleatorio = selecionados[indiceSorteio];
        imgCarta.setAttribute('src', urlAleatorio);
        
        //Remover essa imagem da lista de selecionados para não repetir
        selecionados.splice(indiceSorteio,1);

        //Inserir display none na imagem do parrot
        imgCarta.style.display = "none";

        //Vincular essa imagem ao li da carta criada
        carta.appendChild(imgCarta);

        //Selecionar ul onde estão as cartas e vincular a carta
        let lista = document.querySelector(".cartas");
        lista.appendChild(carta);
    };
}

//Sorteia os papagaios
function sortearParrots(qtdCartas){
    for(let i = 0; i < qtdCartas/2; i++){
        let indiceSorteio = Math.floor(imgParrots.length * Math.random());
        selecionados.push(imgParrots[indiceSorteio]);
        selecionados.push(imgParrots[indiceSorteio]);
        imgParrots.splice(indiceSorteio,1);
    }
}

//Mostra o tempo durante o jogo
function renderizaTempo(tempoSegundos){
    let aside = document.querySelector(".cronometro");

    //Limpa o numero que está lá e inserir o novo numero
    aside.innerText = "";
    aside.innerText = tempoSegundos;

    let body = document.querySelector('body');
    body.appendChild(aside);
}

//Escolher o nº cartas
function iniciarJogo(){
    let qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar? \nEscolha um nº entre 4 e 14"));

    //Verifica se o nº é par, maior que quatro e menor que 14
    while((qtdCartas % 2 !== 0) || (qtdCartas < 4) || (qtdCartas > 14)){
        qtdCartas = parseInt(prompt("Você precisa escolher um nº par entre 4 e 14. Com quantas cartas você quer jogar?"));
    }

    let larguraJogo = ((qtdCartas / 2) * 150);
    let ul = document.querySelector(".cartas");
    ul.style.width = larguraJogo + "px";

    renderizaCartas(qtdCartas);
    statusJogo = "jogando";
    acertosParaFinalizar = qtdCartas;

    //conta o tempo durante o jogo
    if(statusJogo === "jogando"){
        clearInterval(interval);
        interval = setInterval(cronometro, 1000);
    }
}

iniciarJogo();

//Verifica se o jogo acabou
function finalizaJogo(){
    statusJogo = "ganhou";
    setTimeout(function(){
        alert("Você ganhou em " + tempoSegundos + " segundos!");
        reiniciarJogo();
    }, 500);
}

//Reiniciar o jogo
function reiniciarJogo(){
    let reiniciar = prompt("Você gostaria de reiniciar o jogo?");

    while(reiniciar !== "sim"){
        reiniciar = prompt("Para reiniciar o jogo, digite a palavra sim");
    };
    
    resetarVariaveis();
    iniciarJogo();
}


//ViraR a carta ao clicar
function clickCarta(element){
    cartasViradas.push(element);

    //Evita que mais do que 2 cartas sejam viradas
    if(cartasViradas.length < 3){
        virar(element,"rotateY(180deg)","none","initial");
        contaJogada++;

        if(cartasViradas.length === 2){
            segundoClique();
        };

        if(contaAcerto === acertosParaFinalizar){
            finalizaJogo();
            statusJogo = "ganhou";
        };
    };
}


//clicar na segunda carta
function segundoClique(){
    let primeiraCarta = pegaSrc(0);
    let segundaCarta = pegaSrc(1);
    
    //Verificar se as cartas são iguais
    let iguais = verificaIgual(primeiraCarta,segundaCarta);

    if(iguais === true){
        cartasViradas = [];
        contaAcerto +=2;
    }else if (iguais === false){
        setTimeout(function () {
            virar(cartasViradas[0],"rotateY(0deg)","url(images/front.png)","none");
            virar(cartasViradas[1],"rotateY(0deg)","url(images/front.png)","none");
            cartasViradas = [];
        }, 1000);
    }
}



//Reset do array com os parrot
function resetarVariaveis(){
    let ul = document.querySelector(".cartas");
    ul.innerHTML = "";
    
    imgParrots = [
        "images/bobrossparrot.gif",
        "images/explodyparrot.gif",
        "images/fiestaparrot.gif",
        "images/metalparrot.gif",
        "images/revertitparrot.gif",
        "images/tripletsparrot.gif",
        "images/unicornparrot.gif"
    ];

    contaJogada = 0;
    contaAcerto = 0;
    cartasViradas = [];
    acertosParaFinalizar = 0;
    selecionados = [];
    tempoSegundos = 0;
    statusJogo = "";
}




//Pegar a imagem do elemento clicado
function pegaSrc(i){
    let carta = cartasViradas[i].querySelector("img");
    let parrot = carta.getAttribute('src');
    return parrot;
}

//Verifica se as cartas tem o mesmo parrot
function verificaIgual(valor1,valor2){
    if(valor1 === valor2)
        return true;
    else
        return false;
}


//Faz a troca das imagens ao virar
function virar(element,rotacao,backgroundImg,display){
    element.style.transform = rotacao;
    element.style.backgroundImage = backgroundImg;
    let img = element.querySelector('img');
    img.style.display = display;
}



//Cronometro do jogo
function cronometro(){
    tempoSegundos++;
    renderizaTempo(tempoSegundos);
}