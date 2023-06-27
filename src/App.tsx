import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from './components/Counter/Counter';
import {useAppSelector} from './hooks/hooks';
import {useDispatch} from 'react-redux';
import {addCountAC, getMaxValueAC, getMinValueAC, resetCountAC} from './reducers/counterReducer';
;


function App() {

    // const startMinValue = Number(localStorage.getItem('minCounterValue')) || 0
    // const startMaxValue = Number(localStorage.getItem('maxCounterValue')) || 5

    const minValue = useAppSelector(state => state.counter.counter.minValue)
    const maxValue = useAppSelector(state => state.counter.counter.maxValue)
    const dispatch = useDispatch()

    // const [counter, setCounter] = useState<number>(() => {
    //     return Number(localStorage.getItem('counterValue')) || 0
    // })

    const [settingsChanged, setSettingsChanged] = useState(false)
    const [error, setError] = useState(`Enter values and press "set"`)

    // useEffect(() => {
    //     localStorage.setItem('counterValue', JSON.stringify(counter))
    // }, [counter])

    const addCount = () => dispatch(addCountAC())

    const resetCount = () => {
        dispatch(resetCountAC())
        if (minValue < 0) dispatch(resetCountAC())
    }

    const getMaxValue = (max: number) => {
        if (minValue < 0 || max <= 0 || max <= minValue) {
            setError('Incorrect Value!')
        } else {
            setError(`Enter values and press "set"`)
        }
        if (max >= -1) {
            dispatch(getMaxValueAC(max))
            setSettingsChanged(true)
        }
    }
    const getMinValue = (min: number) => {
        if (min < 0 || maxValue <= min) {
            setError('Incorrect Value!')
        } else {
            setError(`Enter values and press "set"`)
        }
        if (min >= -1) {
        dispatch(getMinValueAC(min))
        setSettingsChanged(true)
        }
    }


    return (
        <div className="App">
                <Counter addCount={addCount} resetCount={resetCount}
                         settingsChanged={settingsChanged} error={error} getMinValue={getMinValue}
                         getMaxValue={getMaxValue} setSettingsChanged={setSettingsChanged}
                />

        </div>
    );
}

export default App;
