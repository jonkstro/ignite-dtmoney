import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import Modal from 'react-modal'; 

import { GlobalStyle } from "./styles/global"
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";


Modal.setAppElement('#root'); //div root não estará visível por acessibilidade

export function App() {
  
  // criar usestate que irá abrir ou fechar moal de nova transação
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    
  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      {/* ENVIAR AO HEADER AS PROPRIEDADES DO BOTÃO DO MODAL */}
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} /> 
      <Dashboard />
      <NewTransactionModal  
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}

