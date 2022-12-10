import React from "react";
import styles from "./Spinner.module.scss"
import PulseLoader from "react-spinners/PulseLoader";

interface ISpinnerProps {
    color: string,
    size: number
}

const Spinner = (props: ISpinnerProps) => {
    return (
        <div className={styles.spinner}>
            <PulseLoader
                color={props.color}
                loading={true}
                size={props.size}
            />
        </div>
    )
}

export default Spinner