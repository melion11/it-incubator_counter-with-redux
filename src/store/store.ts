import {combineReducers, legacy_createStore as createStore} from 'redux';
import {counterReducer} from '../reducers/counterReducer';

const RootReducer = combineReducers({
    counter: counterReducer
})

export const store = createStore(RootReducer)

export type RootState = ReturnType<typeof RootReducer>

// @ts-ignore
window.store = store