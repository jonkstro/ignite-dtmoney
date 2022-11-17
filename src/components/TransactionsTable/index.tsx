import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";


export function TransactionsTable() {

    const { transactions, deleteTransaction } = useTransactions();

    // variaveis que irão armazenar os valores que vão ser inseridos no form

    function handleDeleteTransaction(transactionId: number) {
        alert('Excluída a transação de id:' + transactionId);
        deleteTransaction(transactionId);
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