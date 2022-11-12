import { FormEvent, useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';

import Modal from 'react-modal'; 
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, RadioBox, TransactionTypeContainer } from './styles';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: ()=> void;
}


export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    
    // Criar useEffect pra sempre que fechar o modal apagar os dados inseridos
    useEffect(()=>{
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');    
    },[onRequestClose])

    const { createTransaction } = useTransactions();

    // variaveis que irão armazenar os valores que vão ser inseridos no form
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    // variavel pra armazenar o tipo de transação: deposit ou withdraw
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type,
        });

        // Apagar todos os campos quando fechar o modal
        alert('Cadastrado com sucesso');
        onRequestClose();
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');

    }

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >
            <button 
                type='button' 
                onClick={onRequestClose} 
                className='react-modal-close'
            >
                <img src={closeImg} alt="botão de fechar o modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input 
                    type="text"
                    placeholder='Titulo' 
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input 
                    type="number"
                    placeholder='Valor' 
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={()=> {setType('deposit');}}
                        isActive={type === 'deposit'}
                        activeColor='green'
                    >
                        <img src={incomeImg} alt="imagem de entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        onClick={()=> {setType('withdraw');}}
                        isActive={type === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={outcomeImg} alt="imagem de saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    type="text"
                    placeholder='Categoria' 
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}