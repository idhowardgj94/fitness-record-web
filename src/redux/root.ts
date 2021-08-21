import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import message, { inputEpic, validateEpic } from './Form/message';
export const rootEpic = combineEpics(
    validateEpic,
    inputEpic,
);

export const rootReducer = combineReducers({
    message,
});

export type RootState = ReturnType<typeof rootReducer>;
