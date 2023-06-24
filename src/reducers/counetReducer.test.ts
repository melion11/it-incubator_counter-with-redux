import {addCountAC, counterReducer, getMaxValueAC, getMinValueAC, resetCountAC} from './counterReducer';


test('count should be increase +1', ()=> {

    const startState = {
        counter: {
            count: 0,
            minValue: 0,
            maxValue: 5
        }
    }

    const endState = counterReducer(startState, addCountAC())

    expect(endState.counter.count).toBe(1)
    expect(endState.counter.minValue).toBe(0)
    expect(endState.counter.maxValue).toBe(5)

})

test('counter should be reset', ()=> {

    const startState = {
        counter: {
            count: 5,
            minValue: 0,
            maxValue: 5
        }
    }

    const endState = counterReducer(startState, resetCountAC())

    expect(endState.counter.count).toBe(0)
    expect(endState.counter.minValue).toBe(0)
    expect(endState.counter.maxValue).toBe(5)

})

test('counter min value should be changed', ()=> {

    const startState = {
        counter: {
            count: 0,
            minValue: 0,
            maxValue: 5
        }
    }

    const endState = counterReducer(startState, getMinValueAC(5))

    expect(endState.counter.count).toBe(0)
    expect(startState.counter.count).toBe(0)
    expect(endState.counter.minValue).toBe(5)


})

test('counter max value should be changed', ()=> {

    const startState = {
        counter: {
            count: 0,
            minValue: 0,
            maxValue: 5
        }
    }

    const endState = counterReducer(startState, getMaxValueAC(10))

    expect(endState.counter.count).toBe(0)
    expect(startState.counter.maxValue).toBe(5)
    expect(endState.counter.maxValue).toBe(10)


})