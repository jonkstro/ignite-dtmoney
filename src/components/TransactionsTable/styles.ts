import styled from "styled-components";

export const Container = styled.div`
    margin-top: 4rem;
    
    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;
            /* text-align: center; */

            /* Somente no primeiro td, nos demais continua normal */
            &:first-child {
                color: var(--text-title);
            }

            &.deposit {
                color: var(--green);
            }

            &.withdraw {
                color: var(--red);
            }

            button {
                margin-left: 0px;
                padding: 0px;
                height: 2rem;
                background: var(--red);
                color: #FFF;
                border: none;
                width: 100%;
                border-radius: 0.5rem;
            }
            
        }
        @media (max-width: 600px) {
            width: 50%;
            font-size: 0.75rem;
        }
    }
`;