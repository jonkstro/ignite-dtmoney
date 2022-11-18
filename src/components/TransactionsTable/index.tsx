import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function TransactionsTable() {

    const { transactions, deleteTransaction } = useTransactions();

    const notify = ()=> toast.error('Deletado !', {
        position: toast.POSITION.TOP_CENTER
    });
    
    // função sleep pra esperar sumir o notify e só então excluir
    const sleep = (ms:number) => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    // função async pra esperar 1 segundo
    async function handleDeleteTransaction(transactionId: number) {
        notify(); //realizar o notify de exclusão
        await sleep(1000); //esperar o notify sumir
        deleteTransaction(transactionId); //deletar a transação no useTransactions
    }

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction=>(
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type_transaction}>
                                {/* adicionar um hífen, caso transação seja withdraw */}
                                {transaction.type_transaction ==='withdraw' ? '-' : ''}
                                {/* REALIZAR A FORMATAÇÃO DO TIPO DE MOEDA DO BRASIL */}
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {/* REALIZAR A FORMATAÇÃO DO TIPO DE DATA DO BRASIL */}
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createdAt)
                                )}
                            </td>
                            <td>
                                <button onClick={()=> {
                                    handleDeleteTransaction(transaction.id);
                                }} type="submit"
                                >
                                    DELETAR
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}