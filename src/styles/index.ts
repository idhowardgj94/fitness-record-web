import styled from 'styled-components';

export const Container = styled.div`
justify-self: center;
align-self: center;
margin: 0 auto;
width: 100%;
height: 100vh;
background-color: whitesmoke;
max-width: 1024px;
`;

export const Header = styled.header`
background-color: #00a08f;
padding: 1em 1em;
color: whitesmoke;
`;
export const Display = styled.section`
width: 100%;
justify-content: center;
background-color: #124653;
min-height: 200px;
padding: 1em 1em 1em 1em;
`;

export const Button = styled.button`
apperarance: none;
background-color: #ff9469;
color: blue;
padding: 0.5em 1em;
border-radius: 1rem;
box-shadow: 0px 0px 0px 1px rgba(255,148,105, 0.5);
border-width: 0px;
`;

export const InputGroup = styled.div`
display: flex;
margin: 0 auto;
justify-content: center;
width: 100%;
margin: 2em 0;
`;

export const Input = styled.input`
background-color: #fee074;
border-radius: 0.5em;
height: 40px;
width: 400px;
`;

export const Alert = styled.div`
color: #fe8d8f;
font-size: 1.2em;
margin-bottom: 1em;
text-align: center;
`;

export const Table = styled.table`
width: 100%;
text-align: center;
`;
export const Row = styled.tr`
height: 50px;
&:nth-child(even) {
    background-color: #dddddd;
}
`;