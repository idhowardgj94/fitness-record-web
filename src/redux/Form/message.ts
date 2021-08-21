/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { Reducer } from 'redux';
import { ofType } from 'redux-observable';
import { iif, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
export const VALIDATE = 'validate';
export const ERROR = 'error';
export const VALID = 'valid';
export const INPUT_CHANGE = 'input_change';
export const _INPUT = 'input';
const _INPUT_MESSAGE = 'input_message';

// TODO: seperate message and from
const _formEmpty = (form) => form.repeat === '' && form.weight === '';

const _validateForm = (form) => form.repeat !== '' && form.repeat !== '';

const _validateInteger = (input) => !!parseInt(input);

const _validate = (form) => iif(() => 
    _formEmpty(form) || (
        _validateForm(form) && 
        _validateInteger(form.weight) &&
        _validateInteger(form.repeat)
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
    mergeMap(() => _validate(store$.value.message.form)),
);

export const inputEpic = (action$) => action$.pipe(
    ofType(INPUT_CHANGE),
    map((action: any) => ({ type: _INPUT,  ..._transformInput(action.payload) })),
);

export interface MessageState {
    validateStatus: typeof ERROR | typeof VALID;
    form: { weight: string, repeat: string };
    message: string | false;
}

const messageReducer: Reducer<MessageState> = (state: MessageState = { validateStatus: VALID,  form: { weight: '', repeat: '' }, message: false }, action) => {
    switch (action.type) {
    case ERROR:
        return { ...state, validateStatus: ERROR, message: _validateMessages(state.form) };
    case VALID:
        return {...state, validateStatus: VALID, message: '' };
    case _INPUT:
        return {...state, form: { ...state.form, ...action.payload } };
    case _INPUT_MESSAGE:
        return {...state, message: action.payload };
    default:
        return state;
    }
};

export default messageReducer;
