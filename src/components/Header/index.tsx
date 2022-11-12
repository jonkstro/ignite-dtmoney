import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'


// criar interface que irá receber as propriedades do modal e enviar ao header
interface HeaderProps {
    onOpenNewTransactionModal: ()=> void;
}

// RECEBER NO HEADER AS PROPRIEDADES ENVIADAS NO App.tsx
export function Header({onOpenNewTransactionModal}: HeaderProps) {

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>

                


            </Content>
        </Container>
    )
}