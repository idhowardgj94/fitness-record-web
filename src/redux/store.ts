import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { rootEpic, rootReducer } from './root';

const epicMiddleware = createEpicMiddleware();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export default function configureStore(): Store {
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(epicMiddleware)
        )
    );

    epicMiddleware.run(rootEpic);

    return store;
}
