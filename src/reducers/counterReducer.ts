import {Dispatch} from 'redux';
import {AppDispatch, RootState} from '../store/store';

export type CounterType = {
    count: number
    minValue: number
    maxValue: number
}

export type InitialStateType = {
    counter: CounterType

}

const initialState: InitialStateType = {
    counter: {
        count: 0,
        minValue: 0,
        maxValue: 5
    }

}


export const counterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD-COUNT': {
            return {...state, counter: {...state.counter, count: state.counter.count + 1}}
        }
        case 'RESET-COUNT': {
            return {...state, counter: {...state.counter, count: action.payload.minValue}}
        }
        case 'SET-MIN-VALUE': {
            return {...state, counter: {...state.counter, minValue: action.payload.min}}
        }
        case 'SET-MAX-VALUE': {
            return {...state, counter: {...state.counter, maxValue: action.payload.max}}
        }
        case 'SET-NUMBER-FROM-LS': {
            return {...state, counter: {...state.counter, count: action.payload.count}}
        }
        default:
            return state
    }
}

export type ActionsType = AddCountACType | ResetCountACType |
    SetMinValueACType | SetMaxValueACType | SetCountFromLocalStorageACType

export type AddCountACType = ReturnType<typeof addCountAC>
export const addCountAC = () => {
    return {type: 'ADD-COUNT'} as const
}

export type ResetCountACType = ReturnType<typeof resetCountAC>
export const resetCountAC = (minValue: number) => {
    return {
        type: 'RESET-COUNT',
        payload: {
            minValue
        }

    } as const
}

export type SetMinValueACType = ReturnType<typeof setMinValueAC>
export const setMinValueAC = (min: number) => {
    return {
        type: 'SET-MIN-VALUE',
        payload: {
            min
        }
    } as const
}

export type SetMaxValueACType = ReturnType<typeof setMaxValueAC>
export const setMaxValueAC = (max: number) => {
    return {
        type: 'SET-MAX-VALUE',
        payload: {
            max
        }
    } as const
}

export type SetCountFromLocalStorageACType = ReturnType<typeof setCountFromLocalStorageAC>
export const setCountFromLocalStorageAC = (count: number) => {
    return {
        type: 'SET-NUMBER-FROM-LS',
        payload: {
            count
        }
    } as const
}


//Thunk

export const setNumberFromLocalStorage = ():any  => (dispatch: AppDispatch, getState: () => RootState) => {
    let count = getState().counter.counter.count
    localStorage.setItem('counterValue', JSON.stringify(count + 1))
    dispatch(addCountAC())
}

export const getNumberFromLocalStorage = ():any  => (dispatch: AppDispatch) => {
    dispatch(setCountFromLocalStorageAC(Number(localStorage.getItem('counterValue')) || 0))
}

export const setMinMaxValuesToLocalStorage = (minValue: number, maxValue: number):any  => (dispatch: AppDispatch) => {
    localStorage.setItem('minCounterValue', JSON.stringify(minValue))
    localStorage.setItem('maxCounterValue', JSON.stringify(maxValue))
    localStorage.setItem('counterValue', JSON.stringify(minValue))
    dispatch(setMinValueAC(minValue))
    dispatch(setMaxValueAC(maxValue))
}

export const getMinMaxValuesFromLocalStorage = ():any  => (dispatch: AppDispatch) => {
    dispatch(setMinValueAC(Number(localStorage.getItem('minCounterValue')) || 0))
    dispatch(setMaxValueAC(Number(localStorage.getItem('maxCounterValue')) || 5))
}


export const resetNumberFromLocalStorage = ():any => (dispatch: any, getState: () => RootState) => {
    let minValue = getState().counter.counter.minValue
    localStorage.setItem('counterValue', JSON.stringify(minValue))
    dispatch(resetCountAC(Number(localStorage.getItem('minCounterValue'))))

}