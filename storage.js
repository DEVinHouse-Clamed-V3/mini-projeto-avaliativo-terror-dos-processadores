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
  