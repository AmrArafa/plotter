import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    margin-bottom: 10px;

    p {
        width: 10%;
    }
`;

export const FieldWrapper = styled.div`
    width: 90%;
    display: flex;
    border: 1px solid;
    align-items: center;
    padding: 0 5px;

    div {
        padding: 6px;
        border: 1px solid;
    }
`;
