
let botaoBranco = document.querySelector('.teclado--botao.branco')
let botaoCorrige = document.querySelector('.teclado--botao.laranja')
let botaoVerde = document.querySelector('.teclado--botao.verde')


const seuVotoPara = document.querySelector('.esquerda span')
const rCargo = document.querySelector('.esquerda .rotulo-r2 span')

const numeros = document.querySelector('.esquerda .rotulo-r3')
const rDescricao = document.querySelector('.esquerda .rotulo-r4')

const rAviso = document.querySelector('.tela #rodape')
const rlateral = document.querySelector('.direita')

//------------------------------



// ---------------------------
let etapaAtual = 0;
let numero ='';
let votoBranco = false;
let votos = []
 

//----------------------------
function comecarEtapa(){
  let etapa = etapas[etapaAtual]

  let numeroHtml = '';
  numero ='';
  votoBranco = false;

  for(let i=0;i<etapa['numeros'];i++){ //Square of n
    if(i === 0){
      numeroHtml += '<div class="numero pisca"></div>'
    } else{ 
      numeroHtml += '<div class="numero"></div>'
    }
  }

  seuVotoPara.style.display='none';
  rCargo.innerHTML = etapa.titulo;
  rDescricao.innerHTML = '';
  rAviso.style.display = 'none';
  rlateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}
//---------------------------

function atualizaInterface(){
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item)=>{
    if(item.numero === numero){
      return true;
    } else{
      return false;
    }

});
  if(candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display='block';
    rAviso.style.display = 'block';
    rDescricao.innerHTML = `Nome: ${candidato.nome} <br> Partido: ${candidato.partido}`;

    let fotosHtml = '';
    for(let i in candidato.fotos){
      
      if(candidato.fotos[i].small){
        fotosHtml += `<div class="candidato menor"><img src="imagens/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;

      } else {
      fotosHtml += `<div class="imagem"><img src="imagens/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
      }
    }

    rlateral.innerHTML = fotosHtml;
    
  }else{
    seuVotoPara.style.display='block';
    rAviso.style.display = 'block';
    rDescricao.innerHTML = '<div class= "aviso--grande pisca">VOTO NULO</div>'
  }
}


//---------------------
function clicou(n){ // NUMBER IN SQUARE
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

      elNumero.classList.remove('pisca');
      if(elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca')
       } else{
        atualizaInterface();
        }
      }
    }
//-----------------
function Branco(){

      numero = '';
      votoBranco = true;

      seuVotoPara.style.display='block';
      rAviso.style.display = 'block';
      numeros.innerHTML = '';
      rDescricao.innerHTML = '<div class= "aviso--grande-B pisca">VOTO EM BRANCO</div>';
      rlateral.innerHTML = '';
}

/*----------------------*/
function Corrige(){
  comecarEtapa();
}

/*----------------------*/

function Confirma(){
  let etapa = etapas[etapaAtual];
  
  let votoConfirmado = false; 

  if(votoBranco === true){
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    })

  } else if(numero.length === etapa.numeros){
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    })

  }

  if(votoConfirmado){
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined){
      comecarEtapa();
    } else{
      document.querySelector('.tela').innerHTML = '<div class= "aviso--gigante pisca">FIM</div>'
      console.log(votos)
    }
  }
}

/*----------------------*/
comecarEtapa();

