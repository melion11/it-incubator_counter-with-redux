import React, {FC} from 'react';
import s from '../Counter.module.css';
import {useAppSelector} from '../../../hooks/hooks';


export type DisplayType = {

}

export const Display: FC<DisplayType> = ({}) => {
    const counterState = useAppSelector(state => state.counter.counter)

    return (

            <div className={`${s.counterItem} 
            ${counterState.count >= counterState.maxValue ? s.counterRed : ''}`}>
                {counterState.count}
            </div>

    );
};

