let contaJogada = 0;
let contaAcerto = 0;
let cartasViradas = [];
let acertosParaFinalizar = 0;
let tempoSegundos = 0;
let statusJogo = 0;
let interval;

//Array que contem os parrots
let imgParrots = [
  "images/revertitparrot.gif",
  "images/tripletsparrot.gif",
  "images/unicornparrot.gif",
  "images/bobrossparrot.gif",
  "images/explodyparrot.gif",
  "images/fiestaparrot.gif",
  "images/metalparrot.gif"
];

//Array com os papagaios sorteado depois que o número de cartas é escolhido
let selecionados = [];

//Insere as cartas do jogo
function mostraCartas(qtdCartas) {
  sortearParrots(qtdCartas);

  while (selecionados.length !== 0) {
    //Cria uma carta usando createElement para criar uma lista de itens(li)
    let carta = document.createElement("li");

    //Insere com setAttribute a função onclick na carta com a function cliqueCarta
    carta.setAttribute("onclick", "cliqueCarta(this)");

    //Insere uma imagem de papagaio aleatoria na carta com creteElement
    let imgCarta = document.createElement("img");

    //Randomiza
    let indiceSorteio = Math.floor(selecionados.length * Math.random());

    let urlAleatorio = selecionados[indiceSorteio];
    imgCarta.setAttribute("src", urlAleatorio);

    //Remover essa imagem da lista de selecionados para ela não repetir
    selecionados.splice(indiceSorteio, 1);

    //Inserir display none na imagem do parrot
    imgCarta.style.display = "none";

    //Vincular essa imagem ao li da carta criada
    carta.appendChild(imgCarta);

    //Seleciona a lista onde estão as cartas e insere a carta
    let lista = document.querySelector(".cartas");
    lista.appendChild(carta);
  }
}

//Sorteia os papagaios
function sortearParrots(qtdCartas) {
  for (let i = 0; i < qtdCartas / 2; i++) {
    let indiceSorteio = Math.floor(imgParrots.length * Math.random());
    selecionados.push(imgParrots[indiceSorteio]);
    selecionados.push(imgParrots[indiceSorteio]);
    imgParrots.splice(indiceSorteio, 1);
  }
}

//Mostra o tempo durante o jogo
function mostrarTempo(tempoSegundos) {
  let p = document.querySelector(".cronometro");

  //Limpa o número que está lá e insere o novo numero
  p.innerText = "";
  p.innerText = tempoSegundos;

  let body = document.querySelector("body");
  body.appendChild(p);
}

//Função para escolher o número de cartas do jogo
function iniciarJogo() {
  let qtdCartas = parseInt(
    prompt("Com quantas cartas você quer jogar? \nEscolha um nº entre 4 e 14")
  );

  //Verifica se o número escolhido é par, maior que quatro e menor que 14
  while (qtdCartas % 2 !== 0 || qtdCartas < 4 || qtdCartas > 14) {
    qtdCartas = parseInt(
      prompt(
        "Você precisa escolher um nº par entre 4 e 14. Com quantas cartas você quer jogar?"
      )
    );
  }

  let larguraJogo = (qtdCartas / 3) * 150;
  let ul = document.querySelector(".cartas");
  ul.style.width = larguraJogo + "px";

  mostraCartas(qtdCartas);
  statusJogo = "jogando";
  acertosParaFinalizar = qtdCartas;

  //Conta o tempo durante o jogo
  if (statusJogo === "jogando") {
    clearInterval(interval);
    interval = setInterval(cronometro, 1000);
  }
}

iniciarJogo();

//Verifica se o jogo acabou
function finalizaJogo() {
  statusJogo = "ganhou";
  setTimeout(function () {
    alert(
      "Você ganhou em: \n- " +
        contaJogada +
        " jogadas\n- " +
        tempoSegundos +
        " segundos"
    );
    reiniciarJogo();
  }, 500);
}

//Reiniciar o jogo
function reiniciarJogo() {
  let reiniciar = prompt("Você gostaria de reiniciar o jogo?");

  while (reiniciar !== "sim") {
    if(reiniciar === "não"){
      alert("Obrigado por jogar!! :)");
    }
    reiniciar = prompt("Para reiniciar o jogo, digite a palavra sim");
  }

  resetVariaveis();
  iniciarJogo();

}

//Vira a carta ao clicar
function cliqueCarta(element) {
  cartasViradas.push(element);

  //Não deixa que mais do que 2 cartas sejam viradas
  if (cartasViradas.length < 3) {
    virar(element, "rotateY(180deg)", "none", "initial");
    contaJogada++;

    if (cartasViradas.length === 2) {
      segundoClique();
    }

    if (contaAcerto === acertosParaFinalizar) {
      finalizaJogo();
      statusJogo = "ganhou";
    }
  }
}

//clique na segunda carta
function segundoClique() {
  let primeiraCarta = pegaSrc(0);
  let segundaCarta = pegaSrc(1);

  //Verifica se as cartas são iguais
  let iguais = verificaIgual(primeiraCarta, segundaCarta);

  if (iguais === true) {
    cartasViradas = [];
    contaAcerto += 2;
  } else if (iguais === false) {
    setTimeout(function () {
      virar(cartasViradas[0], "rotateY(0deg)", "url(images/front.png)", "none");
      virar(cartasViradas[1], "rotateY(0deg)", "url(images/front.png)", "none");
      cartasViradas = [];
    }, 1000);
  }
}

//Reset do array com as imagens dos papagaios
function resetVariaveis() {
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

//Pega a imagem do elemento clicado
function pegaSrc(i) {
  let carta = cartasViradas[i].querySelector("img");
  let parrot = carta.getAttribute("src");
  return parrot;
}

//Verifica se as cartas tem a mesma imagem do parrot
function verificaIgual(valor1, valor2) {
  if (valor1 === valor2) return true;
  else return false;
}

//Troca as imagens ao virar as cartas
function virar(element, rotacao, backgroundImg, display) {
  element.style.transform = rotacao;
  element.style.backgroundImage = backgroundImg;
  let img = element.querySelector("img");
  img.style.display = display;
}

//Cronometro do jogo
function cronometro() {
  tempoSegundos++;
  mostrarTempo(tempoSegundos);
}
