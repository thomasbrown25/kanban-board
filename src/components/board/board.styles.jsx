import styled from 'styled-components';

export const BoardContainer = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

export const BoardTitle = styled.h2`
    padding: 8px;
    text-align: center;
`;

export const BoardTaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 500px;
`;
