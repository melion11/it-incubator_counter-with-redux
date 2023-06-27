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
    setSettingsChanged: (status: boolean) => void
}

export const Counter: FC<CounterPropsType> = ({
                                                  addCount,
                                                  resetCount,
                                                  settingsChanged,
                                                  error,
                                                  getMaxValue,
                                                  getMinValue,
                                                  setSettingsChanged,
                                                  ...restProps
                                              }) => {

    const count = useAppSelector(state => state.counter.counter.count)
    const minValue = useAppSelector(state => state.counter.counter.minValue)
    const maxValue = useAppSelector(state => state.counter.counter.maxValue)

    const [settingsView, setSettingsView] = useState(false)

    const disabledAddButton = count >= maxValue || settingsChanged
    const disabledResetButton = count <= minValue || settingsChanged

    const ViewModeSettingsHandler = () => {
        setSettingsView(true)
    }

    return (
        <div className="wrapper">
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
                    <Display/>
                    <div className={s.buttonsWrap}>
                        <Button className={s.button} disabled={disabledAddButton} name={'inc'} callBack={addCount}/>
                        <Button className={s.button} disabled={disabledResetButton} name={'reset'}
                                callBack={resetCount}/>
                        <Button className={s.button} name={'set'} callBack={ViewModeSettingsHandler}/>
                    </div>
                </>
            )}
        </div>
    );
};
