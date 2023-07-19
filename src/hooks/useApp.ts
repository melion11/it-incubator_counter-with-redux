import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './hooks';
import {
    getMinMaxValuesFromLocalStorage,
    getNumberFromLocalStorage, resetNumberFromLocalStorage, setMaxValueAC, setMinValueAC,
    setNumberFromLocalStorage
} from '../reducers/counterReducer';

export const useApp = () => {

    const [settingsChanged, setSettingsChanged] = useState(false)
    const [error, setError] = useState(`Enter values and press "set"`)

    const minValue = useAppSelector(state => state.counter.counter.minValue)
    const maxValue = useAppSelector(state => state.counter.counter.maxValue)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMinMaxValuesFromLocalStorage())
        dispatch(getNumberFromLocalStorage())
    }, [])

    const addCount = () => {
        dispatch(setNumberFromLocalStorage())
    }

    const resetCount = () => {
        dispatch(resetNumberFromLocalStorage())
        if (minValue < 0) {
            dispatch(resetNumberFromLocalStorage())
        }
    }

    const getMaxValue = (max: number) => {
        if (minValue < 0 || max <= 0 || max <= minValue) {
            setError('Incorrect Value!')
        } else {
            setError(`Enter values and press "set"`)
        }
        if (max >= -1) {
            dispatch(setMaxValueAC(max))
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
            dispatch(setMinValueAC(min))
            setSettingsChanged(true)
        }
    }

    return {
        settingsChanged,setSettingsChanged, error, addCount, resetCount, getMaxValue, getMinValue
    }
}