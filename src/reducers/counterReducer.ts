export type CounterType = {
    count: number
    minValue: number
    maxValue: number
}

export type InitialStateType = {
    counter: CounterType

}

const initialState: any = {
    counter: {
        count: 0,
        minValue: 0,
        maxValue: 5
    }

}


export const counterReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD-COUNT': {
            return {...state, counter: {...state.counter, count: state.counter.count + 1} }
        }
        case 'RESET-COUNT': {
            return {...state, counter: {...state.counter, count: state.counter.minValue}}
        }
        case 'GET-MIN-VALUE': {
            return  {...state, counter: {...state.counter, minValue: action.payload.min, count: action.payload.min}}
        }
        case 'GET-MAX-VALUE': {
            return  {...state, counter: {...state.counter, maxValue: action.payload.max}}
        }
        default:
            return state
    }
}

export type ActionsType = AddCountACType | ResetCountACType | GetMinValueACType | GetMaxValueACType

export type AddCountACType = ReturnType<typeof addCountAC>
export const addCountAC = () => {
    return {type: 'ADD-COUNT'} as const
}

export type ResetCountACType = ReturnType<typeof resetCountAC>
export const resetCountAC = () => {
    return {type: 'RESET-COUNT'} as const
}

export type GetMinValueACType = ReturnType<typeof getMinValueAC>
export const getMinValueAC = (min: number) => {
    return {
        type: 'GET-MIN-VALUE',
        payload: {
            min
        }
    } as const
}

export type GetMaxValueACType = ReturnType<typeof getMaxValueAC>
export const getMaxValueAC = (max: number) => {
    return {
        type: 'GET-MAX-VALUE',
        payload: {
            max
        }
    } as const
}