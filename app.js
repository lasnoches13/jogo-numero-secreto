let listaNumeroSorteado =[];
let numeroMaximo = 10;
//1 armazena o numero aleatorio na variável
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

//2 cria a função para exibir texto na tela
function exibirTexto(tag,Texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = Texto ;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(Texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
//3 executa as funções de exibir textos na tela
function exibirMensagemInicial(){
exibirTexto('h1','Numero aleatório');
exibirTexto('p','Qual é o número aleatório?');
}
exibirMensagemInicial();

//4 gerar numero aleatorio
function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroMaximo + 1);
    let numerosNaLista = listaNumeroSorteado.length;
    if (numerosNaLista == numeroMaximo){ // caso a quantidade de numeros sorteados tenha atingido o length da lista, ela será zerada.
        listaNumeroSorteado = [];
    }
    if (listaNumeroSorteado.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    }else{
        listaNumeroSorteado.push(numeroSorteado);
        console.log(listaNumeroSorteado);
        return numeroSorteado;
    }   
}
//5 armazena o valor do input e o compara com o numero secreto através do botão 'chutar'.
function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        let mensagemTentativa = tentativa > 1? 'tentativas' : 'tentativa';
        exibirTexto('h1','Acertou!');
        exibirTexto('p',`Parabéns você venceu o jogo com ${tentativa} ${mensagemTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');//ativar o botão 'novo jogo'
    }
    else {
        if (chute>numeroSecreto){
            exibirTexto('p','O número secreto é menor.');
    } else if(chute<numeroSecreto){
        exibirTexto('p','O número secreto é maior.');
    }
    tentativa = tentativa+1;
    limparChute()
}
}
//limpa o campo do input toda vez que o botão 'chutar' é clicado
function limparChute(){
chute = document.querySelector('input');
chute.value = ''
}
//reinicia o jogo atraves do 'onclick' do botão 'novo jogo'
function reiniciar(){
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    limparChute();
    tentativa = 1
    document.getElementById('reiniciar').setAttribute('disabled',true)
}
