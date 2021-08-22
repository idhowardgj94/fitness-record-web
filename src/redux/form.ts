/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { Reducer } from 'redux';
import { ofType } from 'redux-observable';
import { iif, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
export const INPUT_CHANGE = 'input_change';
export const VALIDATE = 'validate';
export const ERROR = 'error';
export const VALID = 'valid';
export const _INPUT = 'input';

// TODO: seperate message and from
const _formEmpty = (values) => values.repeat === '' && values.weight === '';

const _validateForm = (values) => values.repeat !== '' && values.repeat !== '';

const _validateInteger = (input) => !!parseInt(input);

const _validate = (values) => iif(() => 
    _formEmpty(values) || (
        _validateForm(values) && 
        _validateInteger(values.weight) &&
        _validateInteger(values.repeat)
    ), of({ type: VALID }), of({ type: ERROR }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _transformInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    return {payload: { [name]: value } };
};


const _validateMessages = (input): string | false => {
    if(input.weight === '' && input.repeat === '') {
        return false;
    }

    if(input.weight !== '' && input.repeat !== '') {
        return false;
    }
    let ret = 'please input your ';
    if(input.weight === '') {
        ret += '"weight", ';
    }
    if(input.repeat === '') {
        ret += '"repeat", ';
    }
    return ret.substring(0, ret.length - 2).concat('!');
};

export const validateEpic = (action$, store$) => action$.pipe(
    ofType(VALIDATE),
    mergeMap(() => _validate(store$.value.form.values)),
);

export const inputEpic = (action$) => action$.pipe(
    ofType(INPUT_CHANGE),
    map((action: any) => ({ type: _INPUT,  ..._transformInput(action.payload) })),
);

export interface FormState {
    validateStatus: typeof ERROR | typeof VALID;
    values: { weight: string, repeat: string };
    message: string | false;
}

const formReducer: Reducer<FormState> = (state: FormState = { validateStatus: VALID,  values: { weight: '', repeat: '' }, message: false }, action) => {
    switch (action.type) {
    case ERROR:
        return { ...state, validateStatus: ERROR, message: _validateMessages(state.values) };
    case VALID:
        return {...state, validateStatus: VALID, message: '' };
    case _INPUT:
        return {...state, values: { ...state.values, ...action.payload } };
    default:
        return state;
    }
};

export default formReducer;
