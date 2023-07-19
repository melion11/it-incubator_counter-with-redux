import React, {FC, useState} from 'react';
import '../../App.css';
import s from './Counter.module.css'
import {Display} from './Display/Display';
import {Button} from '../UI/Button/Button';
import {Settings} from './Settings/Settings';
import {useAppSelector} from '../../hooks/hooks';
import {useCounter} from './hooks/useCounter';

export type CounterPropsType = {
    addCount: () => void
    resetCount: () => void
    settingsChanged: boolean
    error: string
    getMaxValue: (value: number) => void
    getMinValue: (value: number) => void
    setSettingsChanged: (status: boolean) => void
}

export const Counter: FC<CounterPropsType> = (props) => {
    const {addCount, resetCount, settingsChanged, error, getMaxValue, getMinValue, setSettingsChanged} = props

    const {disabledAddButton,
        disabledResetButton, ViewModeSettingsHandler, settingsView, setSettingsView} = useCounter(settingsChanged)


    const settingsJSX = (
        <Settings
        getMinValue={getMinValue}
        getMaxValue={getMaxValue}
        settingsChanged={settingsChanged}
        setSettingsChanged={setSettingsChanged}
        error={error}
        setSettingsView={setSettingsView}
    />)

    const displayJSX = (
        <>
        <Display/>
        <div className={s.buttonsWrap}>
            <Button className={s.button} disabled={disabledAddButton} name={'inc'} callBack={addCount}/>
            <Button className={s.button} disabled={disabledResetButton} name={'reset'} callBack={resetCount}/>
            <Button className={s.button} name={'set'} callBack={ViewModeSettingsHandler}/>
        </div>
    </>)

    return (
        <div className="wrapper">
            {settingsView ? settingsJSX: displayJSX}
        </div>
    );
};
