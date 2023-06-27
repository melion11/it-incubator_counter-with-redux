import React, {ChangeEvent, FC, useState} from 'react';

import s from './Settings.module.css'
import {InputValue} from '../../Input/InputValue';
import {Button} from '../../Button/Button';
import {useAppSelector} from '../../../hooks/hooks';

export type SettingsPropsType = {
    getMaxValue: (value: number) => void
    getMinValue: (value: number) => void
    settingsChanged: boolean
    setSettingsChanged: (status: boolean)=>void
    error: string
    setSettingsView: (status: boolean)=>void


}

export const Settings: FC<SettingsPropsType> = (props) => {
        const {getMaxValue, getMinValue,settingsChanged,
            setSettingsChanged, error,setSettingsView, ...restProps} = props

    const minValue = useAppSelector(state => state.counter.counter.minValue)
    const maxValue = useAppSelector(state => state.counter.counter.maxValue)

        const settingsChangeStatusHandler = () =>{
           // localStorage.setItem('minCounterValue', JSON.stringify(minValue))
           // localStorage.setItem('maxCounterValue', JSON.stringify(maxValue))
           setSettingsChanged(false)
           setSettingsView(false)
        }






        const minError = (minValue < 0 || maxValue <= 0 || maxValue <= minValue) ? 'Incorrect Value!' : ''
        const maxError = (minValue < 0 || maxValue <= minValue) ? 'Incorrect Value!' : ''
        const disabledButton = minValue < 0 || maxValue <= minValue

        return (
            <div >
                    <div className={s.counterItem}>
                        <InputValue error={minError}
                                    getCurrentValue={getMaxValue}
                                    title={'maxValue'} value={maxValue} />
                        <InputValue error={maxError}
                                    getCurrentValue={getMinValue}
                                    title={'startValue'} value={minValue} />
                    </div>


                <div className={s.buttonWrap}>
                    <Button disabled={disabledButton}  className={s.button} name={'set'}
                            callBack={settingsChangeStatusHandler}/>
                </div>

            </div>
        );
    }
;



