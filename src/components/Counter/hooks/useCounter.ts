import {useAppSelector} from '../../../hooks/hooks';
import {useState} from 'react';

export const useCounter = (settingsChanged: boolean) => {

    const count = useAppSelector(state => state.counter.counter.count)
    const minValue = useAppSelector(state => state.counter.counter.minValue)
    const maxValue = useAppSelector(state => state.counter.counter.maxValue)

    const [settingsView, setSettingsView] = useState(false)

    const disabledAddButton = count >= maxValue || settingsChanged
    const disabledResetButton = count <= minValue || settingsChanged

    const ViewModeSettingsHandler = () => {
        setSettingsView(true)
    }


    return {disabledAddButton, disabledResetButton, ViewModeSettingsHandler,settingsView, setSettingsView}
}