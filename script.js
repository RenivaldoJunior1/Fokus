const html = document.querySelector('html')
const focobt = document.querySelector('.app__card-button--foco')
const curtobt = document.querySelector('.app__card-button--curto')
const longbt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicafocoinput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3') 
const startpausebt = document.querySelector('#start-pause')
const iniciaroupausarbt = document.querySelector('#start-pause span')
const temponatela = document.querySelector('#timer')
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") 
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
musica.loop = true

let tempodecorrido = 1500
let intervaloid = null

musicafocoinput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focobt.addEventListener('click', () =>{
    tempodecorrido = 1500
   alterarContexto('foco')
   focobt.classList.add('active')
})

curtobt.addEventListener('click', () =>{
    tempodecorrido = 300
    alterarContexto('descanso-curto')
    curtobt.classList.add('active')
})

longbt.addEventListener('click', () =>{
    tempodecorrido = 900
    alterarContexto('descanso-longo')
    longbt.classList.add('active')
})


function alterarContexto(contexto) {
    mostrartempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempodecorrido <= 0){
        //audioTempoFinalizado.play()
        alert('tempo finalizado')
        zerar()
        return
    }
    tempodecorrido -= 1
    mostrartempo()
}

startpausebt.addEventListener('click', iniciarpausar)

function iniciarpausar(){
    if(intervaloid){
        //audioPausa.play()
        zerar()
        return
    }
    //audioPlay.play()
    intervaloid = setInterval(contagemRegressiva, 1000)
    iniciaroupausarbt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloid)
    iniciaroupausarbt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloid = null
}

function mostrartempo(){
    const tempo = new Date(tempodecorrido * 1000)
    const tempoformatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second:'2-digit'})
    temponatela.innerHTML = `${tempoformatado}`
}

mostrartempo()