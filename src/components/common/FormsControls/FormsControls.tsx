import {ComponentPropsWithoutRef} from "react";
import s from './FormsControls.module.css'


type Props = {
    typeField:HTMLInputElement
    input?: HTMLInputElement['type'],
    meta: {error:string,touched:boolean}
} & ComponentPropsWithoutRef<'textarea'> & ComponentPropsWithoutRef<'input'>

export const Textarea = ({input, meta,typeField, ...rest}: Props) => {
    const showError = meta.error && meta.touched
    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                <textarea type={typeField} {...input} {...rest}/>
            </div>
            {showError
                && <span>{meta.error}</span> }

        </div>
    )
}

export const Input = ({input, meta, ...rest}: Props) => {
    const showError = meta.error && meta.touched
    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                <input {...input} {...rest}/>
            </div>
            {showError
                && <span>{meta.error}</span> }

        </div>
    )
}