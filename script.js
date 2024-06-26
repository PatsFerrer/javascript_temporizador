const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const StartPauseBtn = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iconBtn = document.querySelector('.app__card-primary-butto-icon');

const audioTempoFinalizado = new Audio('/sons/beep.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');

let tempoDecorridoEmSegundos = 1500; // 25min
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
})

focoBtn.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto('foco');
  focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto('descanso-curto');
  curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto('descanso-longo');
  longoBtn.classList.add('active');
});

function alterarContexto(contexto) {
  mostrarTempo();

  botoes.forEach(function (contexto) {
    contexto.classList.remove('active');
  })

  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `/imagens/${contexto}.png`);

  switch (contexto) {
    case 'foco':
      titulo.innerHTML = `
      Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;

    case 'descanso-curto':
      titulo.innerHTML = `
      Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>
      `;
      break;

    case 'descanso-longo':
      titulo.innerHTML = `
      Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundos <= 0){
    audioTempoFinalizado.play();
    audioTempoFinalizado.volume = 0.2;
    alert('Tempo finalizado!')
    zerarTemporizador();
    return
  }
  tempoDecorridoEmSegundos--;
  mostrarTempo();
}

StartPauseBtn.addEventListener('click', iniciarOuPausarContagemRegressiva);

function iniciarOuPausarContagemRegressiva() {
  if(intervaloId){
    audioPause.play();
    zerarTemporizador();
    return
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  
  iniciarOuPausarBtn.textContent = `Pausar`;
  iconBtn.setAttribute('src', '/imagens/pause.png');
}

function zerarTemporizador(){
  clearInterval(intervaloId);
  iniciarOuPausarBtn.textContent = `Continuar`;
  iconBtn.setAttribute('src', '/imagens/play_arrow.png');

  intervaloId = null;
}

function mostrarTempo() {
  let tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})

  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo()