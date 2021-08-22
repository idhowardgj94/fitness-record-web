import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import form, { inputEpic, validateEpic } from './form';
import rm, { calculateEpic } from './rm';
export const rootEpic = combineEpics(
    validateEpic,
    inputEpic,
    calculateEpic,
);

export const rootReducer = combineReducers({
    form,
    rm,
});

export type RootState = ReturnType<typeof rootReducer>;
