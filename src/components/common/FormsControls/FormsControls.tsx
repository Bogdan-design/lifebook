import {ComponentPropsWithoutRef, ElementType,} from "react";
import s from './FormsControls.module.css'


type Props<T extends ElementType = 'input'> = {
    as:T
    input: HTMLInputElement,
    meta: {error:string,touched:boolean}
    text?:string
} & ComponentPropsWithoutRef<T>

export const Element = <T extends ElementType = 'input'>({input, meta,as:Component = 'input', ...rest}: Props<T>) => {
    const showError = meta.error && meta.touched
    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                <Component {...input} {...rest}/>
                <span>{rest.text}</span>
            </div>
            {showError
                && <span>{meta.error}</span> }
        </div>
    )
}