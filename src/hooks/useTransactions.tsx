import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


// criar interface para o objeto Transaction no metodo GET
interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// criar interface para o objeto Transaction no metodo POST 
interface TransactionInput {
    title: string;
    amount: number;
    type: string;
    category: string;
}


interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    // Bug do typescript, pra corrigir
    {} as TransactionsContextData
);


export function TransactionsProvider({children}: TransactionsProviderProps) {
    // criar variavel array que irá armazenar os dados do get da api
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // realizar a busca da api ao carregar a página, por isso o array vazio
    // as transactions carregadas da api será salvo no usestate
    useEffect(()=> {
        api.get('transactions')
            .then(response=> setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        
        // salvar os objetos enviados na api
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        const { transaction } = response.data;

        // Adicionar a transaction ao vetor de transactions existentes
        setTransactions([
            ...transactions,
            transaction
        ]);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

// criar função do hook
export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}