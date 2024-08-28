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
      this.data = data;
      localStorage.setItem('medicamentos', JSON.stringify(this.data));
    }
  };

  