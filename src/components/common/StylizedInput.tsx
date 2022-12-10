import React from "react";
import styles from "./StylizedInput.module.scss"

interface IStyliZedInputProps {
    name: string
    type: string
    value: string
    required: boolean
    error: boolean
    innerRef: React.LegacyRef<HTMLInputElement> | undefined
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const StyliZedInput = (props: IStyliZedInputProps) => {
    return (
        <label className={`${styles.formField} ${props.error ? styles.formField__error : ""}`}>
            <span className={styles.formField__title}>{props.name}</span>
            <input ref={props.innerRef} type={props.type} className={styles.formField__input} required={props.required}
                   value={props.value} onChange={props.onChange}/>
        </label>
    )
}

export default StyliZedInput