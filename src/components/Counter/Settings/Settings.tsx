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

    const counterState = useAppSelector(state => state.counter.counter)

        const settingsChangeStatusHandler = () =>{
           // localStorage.setItem('minCounterValue', JSON.stringify(minValue))
           // localStorage.setItem('maxCounterValue', JSON.stringify(maxValue))
           setSettingsChanged(false)
           setSettingsView(false)
        }

        const minError = counterState.minValue < 0 || counterState.maxValue <= 0
        || counterState.maxValue <= counterState.minValue ? 'Incorrect Value!' : ''

        const maxError = counterState.minValue < 0 || counterState.maxValue <=
        counterState.minValue ? 'Incorrect Value!' : ''

        const disabledButton = counterState.minValue < 0 || counterState.maxValue <= counterState.minValue

        return (
            <div >
                    <div className={s.counterItem}>
                        <InputValue error={minError}
                                    getCurrentValue={getMaxValue}
                                    title={'maxValue'} value={counterState.maxValue} />
                        <InputValue error={maxError}
                                    getCurrentValue={getMinValue}
                                    title={'startValue'} value={counterState.minValue} />
                    </div>


                <div className={s.buttonWrap}>
                    <Button disabled={disabledButton}  className={s.button} name={'set'}
                            callBack={settingsChangeStatusHandler}/>
                </div>

            </div>
        );
    }
;



