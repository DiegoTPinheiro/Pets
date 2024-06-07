const criarCards = function (dados) {
    let divCardsAnimais = document.getElementById('cards_animais');
    divCardsAnimais.innerHTML = '';
    
    dados.pets.forEach(function (animalPet) {
        let divExibirPet = document.createElement('div');
        let figurePetImagem = document.createElement('figure');
        let img = document.createElement('img');
        let pNome = document.createElement('p');
        let pCor = document.createElement('p');
        let pRaca = document.createElement('p');
        
        divExibirPet.setAttribute('class', 'div_pets');
        figurePetImagem.setAttribute('class', 'pet_imagem');
        img.setAttribute('src', animalPet.image);
        
        pNome.textContent = 'Nome: ' + animalPet.nome;
        pCor.textContent = 'Cor: ' + animalPet.cor;
        pRaca.textContent = 'Raça: ' + animalPet.raca;

        divCardsAnimais.appendChild(divExibirPet);
        divExibirPet.appendChild(figurePetImagem);
        figurePetImagem.appendChild(img);
        divExibirPet.appendChild(pNome);
        divExibirPet.appendChild(pCor);
        divExibirPet.appendChild(pRaca);
    });
}

const getAPIPets = async function() {
    let url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/listar/pets';
    const response = await fetch(url);
    const dadosPets = await response.json();
    criarCards(dadosPets);
}

const filtrarCards = function() {
    let filtro = document.getElementById('input').value.toLowerCase(); 
    let divCardsAnimais = document.getElementById('cards_animais');
    let cards = divCardsAnimais.getElementsByClassName('div_pets'); 
    
    
    Array.from(cards).forEach(function(card) {
        let nomePet = card.getElementsByTagName('p')[0].textContent.toLowerCase(); 
        if (nomePet.includes(filtro)) {
            card.style.display = ''; 
        } else {
            card.style.display = 'none';
        }
    });
}

window.addEventListener('load', function() {
    getAPIPets();
    
    
    document.getElementById('input').addEventListener('input', filtrarCards);
});
