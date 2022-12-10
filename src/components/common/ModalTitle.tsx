import React from "react";
import styles from "./ModalTitle.module.scss"

interface IModalTitleProps {
    children?: JSX.Element | string
}

const ModalTitle = (props: IModalTitleProps) => {
    return (
        <div className={styles.title}>
            {props.children}
        </div>
    )
}

export default ModalTitle