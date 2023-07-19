import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {counterReducer} from '../reducers/counterReducer';
import thunk, {ThunkAction} from 'redux-thunk';

const RootReducer = combineReducers({
    counter: counterReducer
})

export const store = createStore(RootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof RootReducer>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    AnyAction>

// @ts-ignore
window.store = store