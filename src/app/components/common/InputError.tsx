import React from "react";
import styles from "./InputError.module.scss";

interface IErrorProps {
    children?: JSX.Element | string;
}

const InputError = (props: IErrorProps) => {
    return <div className={styles.error}>{props.children}</div>;
};

export default InputError;
