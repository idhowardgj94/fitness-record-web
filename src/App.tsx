/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/root';
import { Container, Header, Display, InputGroup, Input, Alert, Table, Row } from './styles';
import { ERROR, INPUT_CHANGE, VALIDATE } from './redux/form';
import { CALCULATE } from './redux/rm';


function App(): React.ReactElement {
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.form.validateStatus);
    const message = useSelector((state: RootState) => state.form.message);   
    const values = useSelector((state: RootState) => state.form.values);
    const rmTables = useSelector((state: RootState) => state.rm);
    
    useEffect(() => {
        dispatch({ type: VALIDATE });
        dispatch({ type: CALCULATE, payload: {...values}});
    }, [values]);

    return (
        <Container>
            <Header>
                <h1> A RM Caculator</h1>
            </Header>
            <Display>
                <h2 style={{ color: 'whitesmoke', fontWeight: 'bold', fontSize: '1.2em',lineHeight: '1em' }}>
                    your 1RM should be:  {status === ERROR ? (<>NaN</>) : (<>{Math.round(rmTables[0].weight as number)}</>)} (KG)
                </h2>
                <InputGroup>
                    <Input type="text" placeholder="Weihgt" onChange={(e) => dispatch({ type: INPUT_CHANGE, payload: e })} name="weight"></Input>
                </InputGroup>

                <InputGroup>
                    <Input type="text" placeholder="Repeat" name="repeat" onChange={(e) => dispatch({ type: INPUT_CHANGE, payload: e })}></Input>
                </InputGroup>

                {message && (<Alert>{message}</Alert>)}
            </Display>
            <Table>
                <thead>
                    <Row>
                        <th>Percentage of 1RM</th>
                        <th>Lift weight (KG)</th>
                        <th>Repeatitions of 1RM</th>
                    </Row>
                </thead>
                <tbody>
                    {rmTables.map(it => (
                        <Row key={it.p}>
                            <td>{it.val}</td>
                            <td> { Math.round(it.weight as number) ?? 'NaN'} </td>
                            <td> { it.r }</td>
                        </Row>
                    ))}
                   
                </tbody>
               
            </Table>
        </Container>
    );
}

export default App;
