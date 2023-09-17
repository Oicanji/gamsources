export class Request {
  constructor(url) {
      const apiUrl = url;
  }

  async get(){
    token = localStorage.getItem('token');

    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    };
  }

  async exec(){
    fetch(apiUrl, options)
      .then(response => {
        // Verifica se a resposta tem o status de sucesso (código 200)
        if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        // Se a resposta for bem-sucedida, converte-a para JSON
        return response.json();
      })
      .then(data => {
        // Manipula os dados recebidos
        console.log('Dados recebidos:', data);
      })
      .catch(error => {
        // Captura erros de rede ou erros de processamento da requisição
        console.error('Erro:', error);
      });
  }
}

function login(email, password){
  
  const apiUrl = 'http://localhost:3000/api/auth/login';

  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  };

  fetch(apiUrl, options)
    .then(response => {
      // Verifica se a resposta tem o status de sucesso (código 200)
      if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      // Se a resposta for bem-sucedida, converte-a para JSON
      return response.json();
    })
    .then(data => {
      // Manipula os dados recebidos
      console.log('Dados recebidos:', data);
      localStorage.setItem('token', data.token);
    })
    .catch(error => {
      // Captura erros de rede ou erros de processamento da requisição
      console.error('Erro:', error);
    });
}

function register(name, email, password){
  const apiUrl = 'http://localhost:3000/api/auth/register';

  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
  };

  fetch(apiUrl, options)
    .then(response => {
      // Verifica se a resposta tem o status de sucesso (código 200)
      if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      // Se a resposta for bem-sucedida, converte-a para JSON
      return response.json();
    })
    .then(data => {
      // Manipula os dados recebidos
      console.log('Dados recebidos:', data);
    })
    .catch(error => {
      // Captura erros de rede ou erros de processamento da requisição
      console.error('Erro:', error);
    });
}

export const auth = {
  login,
  register
}