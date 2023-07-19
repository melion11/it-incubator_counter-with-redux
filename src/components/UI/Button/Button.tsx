import React, {FC} from 'react';
import s from './Button.module.css'

export type ButtonType = {
    name: string
    callBack: ()=>void
    disabled?: boolean
    className?: string


}

export const Button: FC<ButtonType> = (props) => {
    const {name, callBack, disabled, className, ...restProps} = props

    const onClickHandler = () => {
        callBack()
    }

    const finalClassName = `
    ${s.button} ${disabled ? s.disabled : ''}`



    return (
        <button  disabled={disabled} className={finalClassName}  onClick={onClickHandler}>{name}</button>
    );
};

