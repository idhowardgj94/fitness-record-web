/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/root';
import { Container, Header, Display, InputGroup, Input, Button, Alert } from './styles';
import { ERROR, INPUT_CHANGE, VALIDATE } from './redux/Form/message';



function App(): React.ReactElement {
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.message.validateStatus);
    const message = useSelector((state: RootState) => state.message.message);   
    const form = useSelector((state: RootState) => state.message.form);
    useEffect(() => {
        dispatch({ type: VALIDATE });
    }, [form]);
    return (
        <Container>
            <Header>
                <h1> A RM Caculator</h1>
            </Header>
            <Display>
                <h2 style={{ color: 'whitesmoke', fontWeight: 'bold', fontSize: '1.2em',lineHeight: '1em' }}>your 1RM should be:  {status === ERROR && (<>NaN</>)}</h2>
                <InputGroup>
                    <Input type="text" placeholder="Weihgt" onChange={(e) => dispatch({ type: INPUT_CHANGE, payload: e })} name="weight"></Input>
                </InputGroup>

                <InputGroup>
                    <Input type="text" placeholder="Repeat" name="repeat" onChange={(e) => dispatch({ type: INPUT_CHANGE, payload: e })}></Input>
                </InputGroup>

                {message && (<Alert>{message}</Alert>)}
                <Button>記錄</Button>
            </Display>
            
        </Container>
    );
}

export default App;
