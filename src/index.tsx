import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';


// função que irá criar o servidor do MirageJs 
createServer({

  models: {
    transaction: Model,
  },

  // CADASTRAR MANUALMENTE PARA MOSTRAR NO SERVER
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,   
          title: 'Pizza 1',
          type: 'withdraw',             
          category: 'Food',            
          amount: 400,            
          createdAt: new Date('2021-02-12 09:00:00'),

        },
        {
          id: 2,   
          title: 'FREELANCE 2',
          type: 'deposit',             
          category: 'Dev',            
          amount: 4000,            
          createdAt: new Date('2021-03-15 09:00:00'),

        },
        {
          id: 3,   
          title: 'FREELANCE 3',
          type: 'deposit',             
          category: 'Dev',            
          amount: 4000,            
          createdAt: new Date('2021-03-15 09:00:00'),

        },
        {
          id: 4,   
          title: 'FREELANCE 4',
          type: 'deposit',             
          category: 'Dev',            
          amount: 4000,            
          createdAt: new Date('2021-03-15 09:00:00'),

        },
        {
          id: 5,   
          title: 'FREELANCE 5',
          type: 'deposit',             
          category: 'Dev',            
          amount: 4000,            
          createdAt: new Date('2021-03-15 09:00:00'),

        }
    ],
    })
  },


  // criar as rotas, GET, POST, DELETE, etc...
  routes() {
    this.namespace = 'api';
    
    // criando a rota GET 
    this.get('/transactions', ()=> {
      return this.schema.all('transaction');
    })

    // criando a rota POST
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
