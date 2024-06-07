const botaoSalvar = document.getElementById('Salvar');

const postPets = async function() {
    let url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/novo/pet'

    let nome   = document.getElementById('nome').value
    let cor    = document.getElementById('cor').value
    let foto   = document.getElementById('image').value
    let raca   = document.getElementById('raca').value

    let petsJSON = {
        nome: nome,
        cor: cor,
        image: foto,
        raca: raca
    };

    const request = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(petsJSON)
    });

    if (request.status == 201){
        alert('Registro inserido com sucesso.')
        limparFormulario();
    }else
        alert('Não foi possível realizar a requisição.')
}


const getAPIPets = async function() {
    let url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/listar/pets'
    let response   = await fetch(url);
    let resultPets = await response.json()

    if (response.status == 200)
        setListDados(resultPets)
    else
        alert('A API não retornou dados ou está fora do ar.')
}


const setListDados = async function(dadosPets) {
    let divListDados = document.getElementById('listDados')

    dadosPets.pets.forEach(function(pet) {
        let divDados      = document.createElement('div')
        let divNome       = document.createElement('div')
        let divCor        = document.createElement('div')
        let divRaca       = document.createElement('div')
        let divOptions    = document.createElement('div')
        let spanEditar    = document.createElement('span')
        let spanExcluir   = document.createElement('span')

        let textNome      = document.createTextNode(pet.nome)
        let textCor       = document.createTextNode(pet.cor)
        let textRaca      = document.createTextNode(pet.raca)
        let textEditar    = document.createTextNode('Editar | ')
        let textExcluir   = document.createTextNode('Excluir')

        divDados.setAttribute('id', 'dados')
        divDados.setAttribute('class', 'linha dados')
        spanExcluir.setAttribute('id', 'excluir')
        spanExcluir.setAttribute('idpet', pet.id)

        divListDados.appendChild(divDados)
        divDados.appendChild(divNome)
        divDados.appendChild(divCor)
        divDados.appendChild(divRaca)
        divDados.appendChild(divOptions)
        
        divOptions.appendChild(spanEditar)
        divOptions.appendChild(spanExcluir)

        divNome.appendChild(textNome)
        divCor.appendChild(textCor)
        divRaca.appendChild(textRaca)
        spanEditar.appendChild(textEditar)
        spanExcluir.appendChild(textExcluir)

        spanExcluir.addEventListener('click', function() {
            deletePet(spanExcluir.getAttribute('idpet'))
        });

        spanEditar.addEventListener('click', function() {
            preencherFormularioEdicao(pet)
        });
    });
}

const preencherFormularioEdicao = function(pet) {
    document.getElementById('nome').value    = pet.nome
    document.getElementById('cor').value     = pet.cor
    document.getElementById('image').value   = pet.image
    document.getElementById('raca').value    = pet.raca

    botaoSalvar.textContent = 'Confirmar'
    botaoSalvar.removeEventListener('click', postPets)
    botaoSalvar.removeEventListener('click', updatePet)
    botaoSalvar.addEventListener('click', function() {
        updatePet(pet.id)
    });
}

const updatePet = async function(id) {
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/atualizar/pet/${id}`

    let nome = document.getElementById('nome').value
    let cor = document.getElementById('cor').value
    let foto = document.getElementById('image').value
    let raca = document.getElementById('raca').value

    let petsJSON = {
        nome: nome,
        cor: cor,
        image: foto,
        raca: raca
    };

    const request = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(petsJSON)
    });

    if (request.status == 200) {
        alert('Pet atualizado com sucesso.')
        limparFormulario()
    } else {
        alert('Não foi possível atualizar o pet.')
    }
}

const limparFormulario = function() {
    document.getElementById('nome').value   = ''
    document.getElementById('cor').value    = ''
    document.getElementById('image').value  = ''
    document.getElementById('raca').value   = ''

    botaoSalvar.textContent = 'Salvar';
    botaoSalvar.removeEventListener('click', updatePet)
    botaoSalvar.removeEventListener('click', postPets) 
    botaoSalvar.addEventListener('click', postPets)
}

const deletePet = async function(id){
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/excluir/pet/${id}`
    console.log(url)
 
    let response = await fetch(url, {
     method: 'DELETE'
    })
 
    if(response.status == 200)
         alert('Pet excluído com sucesso.')
    else
         alert('Pet não encontrado ou problemas na API')
 }


window.addEventListener('load', function() {
    botaoSalvar.addEventListener('click', postPets)
    getAPIPets()
});
