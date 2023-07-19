import React, {ChangeEvent, FC, useState} from 'react';

import s from './Settings.module.css'
import {InputValue} from '../../UI/Input/InputValue';
import {Button} from '../../UI/Button/Button';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {getNumberFromLocalStorage, setMinMaxValuesToLocalStorage} from '../../../reducers/counterReducer';
import {useDispatch} from 'react-redux';
import {useSettings} from './hooks/useSettings';

export type SettingsPropsType = {
    getMaxValue: (value: number) => void
    getMinValue: (value: number) => void
    settingsChanged: boolean
    setSettingsChanged: (status: boolean) => void
    error: string
    setSettingsView: (status: boolean) => void


}

export const Settings: FC<SettingsPropsType> = (props) => {
        const {getMaxValue, getMinValue, setSettingsChanged, setSettingsView} = props

        const {minValue, maxValue, maxError,
            minError, disabledButton, settingsChangeStatusHandler} = useSettings(setSettingsChanged, setSettingsView)

        return (
            <div>
                <div className={s.counterItem}>
                    <InputValue error={minError}
                                getCurrentValue={getMaxValue}
                                title={'maxValue'} value={maxValue}/>
                    <InputValue error={maxError}
                                getCurrentValue={getMinValue}
                                title={'startValue'} value={minValue}/>
                </div>


                <div className={s.buttonWrap}>
                    <Button disabled={disabledButton} className={s.button} name={'set'}
                            callBack={settingsChangeStatusHandler}/>
                </div>

            </div>
        );
    }
;



