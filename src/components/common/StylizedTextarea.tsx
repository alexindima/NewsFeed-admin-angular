import React from "react";
import styles from "./StylizedTextarea.module.scss"

interface IStylizedTextareaProps {
    name: string
    value: string
    rows: number
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const StylizedTextarea = (props: IStylizedTextareaProps) => {
    return (
        <label className={styles.formField}>
            <span className={styles.formField__title}>{props.name}</span>
            <textarea rows={props.rows} className={styles.formField__textarea} value={props.value}
                      onChange={props.onChange}/>
        </label>
    )
}

export default StylizedTextarea