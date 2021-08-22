/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { Reducer } from 'redux';
import { ofType } from 'redux-observable';
import { iif, of, from } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';

// rm stand for one repeat max

export const NAN = 'calculate/nan';
export const VALID = 'calculate/valid';
export const CALCULATE = 'calculate';
const formula = (weight, repeat) => weight * (1 + repeat / 30);

const PER_REP_MAP = [
    {p: 1, r: 1, val: '100%', weight: 'NaN'},
    {p: 0.95, r: 2, val: '95%', weight: 'NaN'},
    {p: 0.9, r: 4, val: '90%', weight: 'NaN'},
    {p: 0.85, r: 6, val: '85%', weight: 'NaN'},
    {p: 0.8, r: 8, val: '80%', weight: 'NaN'},
    {p: 0.75, r: 10, val: '75%', weight: 'NaN'},
    {p: 0.7, r: 12, val: '70%', weight: 'NaN'},
    {p: 0.65, r: 16, val: '65%', weight: 'NaN'},
    {p: 0.6, r: 20, val: '60%', weight: 'NaN'},
    {p: 0.55, r: 24, val: '55%', weight: 'NaN'},
    {p: 0.5, r: 30, val: '50%', weight: 'NaN'},
];
interface Rm {
    p: number;
    r: number;
    val: string;
    weight: number | string;
}


export const calculateEpic = (action$) => action$.pipe(
    ofType(CALCULATE),
    mergeMap(({payload}) => iif(
        () => isNaN(parseInt(payload.weight)) || isNaN(parseInt(payload.repeat)), 
        of({ type: NAN }),  
        of(payload).pipe(
            map(({weight, repeat}) => formula(parseInt(weight), parseInt(repeat))),
            mergeMap((max) => from(PER_REP_MAP).pipe(
                map(rm => ({...rm, weight: max * rm.p}) ),
            )),
            toArray(),
            map((s) => ({type: VALID, payload: s }))
        )
    )),
);

type CalculateState = Rm[];

const initState: CalculateState = PER_REP_MAP;

const calculateReducer: Reducer<CalculateState> = (state = initState, { type, payload } ) => {
    switch (type) {
    case NAN:
        return initState;
    case VALID:
        return payload;
    default:
        return state;
    }
};

export default calculateReducer;