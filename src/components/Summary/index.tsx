import { Container } from "./styles";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTransactions";


export function Summary() {

    const { transactions } = useTransactions();

    // variável que irá fazer as somas dos valores da api
    const totalDeposits = transactions.reduce((acc, transaction)=> {
        // somar todas transações do tipo deposito e acumular
        if (transaction.type_transaction === 'deposit') {
            return acc + transaction.amount;
        }

        return acc;

    }, 0);

    // variável que irá fazer as somas dos valores da api
    const totalWithdraw = transactions.reduce((acc, transaction)=> {
        // somar todas transações do tipo withdraw e acumular
        if (transaction.type_transaction === 'withdraw') {
            return acc + transaction.amount;
        }

        return acc;

    }, 0);

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="entradas logo" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(totalDeposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="saidas logo" />
                </header>
                <strong>-
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(totalWithdraw)}
                </strong>
            </div>
            <div className={
                totalDeposits - totalWithdraw >= 0 ? 'highlight-background-green': 'highlight-background-red'
            }>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="total logo" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(totalDeposits - totalWithdraw)}
                </strong>
            </div>
        </Container>
    );
}