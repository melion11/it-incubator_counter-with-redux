import React, {FC, useState} from 'react';
import '../../App.css';
import s from './Counter.module.css'
import {Display} from './Display';
import {Button} from '../Button/Button';
import {Settings} from './Settings/Settings';
import {useAppSelector} from '../../hooks/hooks';

export type CounterPropsType = {
    addCount: () => void
    resetCount: () => void
    settingsChanged: boolean
    error: string
    getMaxValue: (value: number) => void
    getMinValue: (value: number) => void
    setSettingsChanged: (status: boolean)=>void
}

export const Counter: FC<CounterPropsType> = (props) => {
    const {addCount, resetCount, settingsChanged, error,getMaxValue,getMinValue,
       setSettingsChanged,...restProps} = props

    const counterState = useAppSelector(state => state.counter.counter)

    const [settingsView, setSettingsView] = useState(false)

    const disabledAddButton = counterState.count >= counterState.maxValue || settingsChanged
    const disabledResetButton = counterState.count <= counterState.minValue || settingsChanged

    const ViewModeSettingsHandler = () => {
        setSettingsView(true)
    }

    return (
        <div className='wrapper'>
                {settingsView ? (
                    <Settings
                        getMinValue={getMinValue}
                        getMaxValue={getMaxValue}
                        settingsChanged={settingsChanged}
                        setSettingsChanged={setSettingsChanged}
                        error={error}
                        setSettingsView={setSettingsView}
                    />
                ) : (
                    <>
                        <Display />
                        <div className={s.buttonsWrap}>
                            <Button className={s.button} disabled={disabledAddButton} name={'inc'} callBack={addCount} />
                            <Button className={s.button} disabled={disabledResetButton} name={'reset'} callBack={resetCount} />
                            <Button className={s.button} name={'set'} callBack={ViewModeSettingsHandler} />
                        </div>
                    </>
                )}
            </div>
    );
};
