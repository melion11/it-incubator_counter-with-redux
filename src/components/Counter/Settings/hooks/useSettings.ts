import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {getNumberFromLocalStorage, setMinMaxValuesToLocalStorage} from '../../../../reducers/counterReducer';

export const useSettings = (setSettingsChanged: (setting: boolean)=> void, setSettingsView: (view: boolean)=> void) => {



    const minValue = useAppSelector(state => state.counter.counter.minValue)
    const maxValue = useAppSelector(state => state.counter.counter.maxValue)

    const dispatch = useAppDispatch()

    const settingsChangeStatusHandler = () => {
        dispatch(setMinMaxValuesToLocalStorage(minValue, maxValue))
        dispatch(getNumberFromLocalStorage())
        setSettingsChanged(false)
        setSettingsView(false)
    }


    const minError = (minValue < 0 || maxValue <= 0 || maxValue <= minValue) ? 'Incorrect Value!' : ''
    const maxError = (minValue < 0 || maxValue <= minValue) ? 'Incorrect Value!' : ''
    const disabledButton = minValue < 0 || maxValue <= minValue

    return {
        minValue, maxValue, minError, maxError, disabledButton, settingsChangeStatusHandler
    }
}