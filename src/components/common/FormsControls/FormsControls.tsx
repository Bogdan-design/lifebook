import React, {ComponentPropsWithoutRef, ElementType,} from "react";
import s from './FormsControls.module.css'


type Props<T extends ElementType = 'input'> = {
    as:T
    input: HTMLInputElement,
    meta: {error:string,touched:boolean}
    text?:string
} & ComponentPropsWithoutRef<T>

export const Element = <T extends ElementType = 'input'>({input, meta:{error,touched},as:Component = 'input',text, ...rest}: Props<T>) => {
    const showError = error && touched
    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                <Component {...input} {...rest}/>
                <span>{text}</span>
            </div>
            {showError
                && <span>{error}</span> }
        </div>
    )
}

