const storage = {
    data: [],
  
    sync() {
      const storedData = localStorage.getItem('medicamentos');
      if (storedData) {
        this.data = JSON.parse(storedData);
      }
  
      return this.data;
    },
  
    save(data) {
      console.log(data)
      this.data = data;
      localStorage.setItem('medicamentos', JSON.stringify(this.data));
    }
  };

  document.getElementById('CadastroMedicamento').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Coletando dados do formulário
    const name = document.getElementById('nomeMedicamento').value;
    const ingredient = document.getElementById('principioAtivo').value;
    const laboratory = document.getElementById('laboratorioMedicamento').value;
    const price = document.getElementById('valorMedicamento').value;
    const image = document.getElementById('fotoMedicamento').value;

    if (!name || !ingredient || !laboratory|| !price|| !image) {
      alert('Por favor, preencha todos os campos.');
      return; // Impede o envio se algum campo estiver vazio
  }
    // Criando o objeto medicamento
    const newMedication = {
      name: name,
      ingredient: ingredient,
      laboratory: laboratory,
      price: price,
      image: image
    };

    // Recuperando a lista de medicamentos do localStorage
    let medications = storage.sync();

    // Adicionando o novo medicamento à lista
    medications.push(newMedication);

    // Salvando a lista atualizada no localStorage
    storage.save(medications)
    
    // Opcional: limpar o formulário após o cadastro
    document.getElementById('CadastroMedicamento').reset();

    // Exibir uma mensagem de sucesso ou realizar outra ação desejada
    alert('Medicamento cadastrado com sucesso!');
});
  

// recebe varias strings como input ("div", "img", "ul", "li" )
function createMultiDom( ...elmNames ){
  const domList = elmNames.map( elm => {
      return document.createElement( elm )
  })

  return domList // retorna uma lista html baseada nos nomes do input (<div></div>, "<img></img>", "<ul></ul>", "<li></li>" )
}


// quebra o objeto e apenas pega o nome de suas chaves
function createDom({ image, name, ingredient, laboratory, price }) {
  // listas de classes do html
  const classes = ["item p-10 br-10", "img-container mb-10", "img br-5", '', 
      "titles br-5 p-10 mb-10 bold", "text br-5 p-10 mb-10", "text br-5 p-10 mb-10", "text br-5 p-10 text-center bold"]
  
      // cria uma lista desmontada de elementos htlm
      const [
          liItem,
          imgContainer,
          img,
          ul,
          liTitle,
          liText1,
          liText2,
          liText3
  ] = createMultiDom('li', 'div', 'img', 'ul', 'li', 'li', 'li', 'li' ).map( (dom, index) => {
      // atribui a classe baseado no indice de cada elemento
      dom.setAttribute('class', classes[ index ])
      return dom
  })

  // definindo conteudo
  img.src = image
  
  liTitle.innerText = name
  liText1.innerText = ingredient
  liText2.innerText = laboratory
  liText3.innerText = price


  // adicionando itens como filhos um dos outros

  // dentro do liItem agora tem o <div></div> e <ul></ul>
  liItem.append( imgContainer, ul )

  // dentro do img container agora tem <img></img>
  imgContainer.appendChild( img )

  // dentro do ul agora tem <li>nome</li>, <li>principio ativo</li>, <li>laboratório</li> e <li>preço</li>
  ul.append(liTitle, liText1, liText2, liText3)
  
  /* estrutura final
  <li class="item p-10 br-10">
      <div class="img-container mb-10">
          <img class="img br-5" src="tylenol-750mg-com-20-comprimidos-e10.jpg">
      </div>
      <ul>
          <li class="titles br-5 p-10 mb-10 bold">Tylenol</li>
          <li class="text br-5 p-10 mb-10">Paracetamol</li>
          <li class="text br-5 p-10 mb-10">Kenvue</li>
          <li class="text br-5 p-10 text-center bold">R$10,00</li>
      </ul>
  </li>
  */

  // retorna o elemento pai de todos os outros (li)
  return liItem
}

function loaded(){
  // pega o storage ( provisório )
  const items = storage.sync()

  // pega a lista onde os produtos vão ficar
  const itensPlace = document.getElementById('lista-medicamento')

  // faz um loop nos itens
  items.forEach( item => {
      
      // cria o item apartir e adiciona o html na lista
      const dom = createDom( item )
  
      itensPlace.appendChild( dom )

  })

}

// adiciona o evento de load no nocumento 
document.addEventListener('DOMContentLoaded', loaded)
