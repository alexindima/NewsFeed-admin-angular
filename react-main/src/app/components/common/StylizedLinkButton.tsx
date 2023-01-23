import React from "react";
import styles from "./StylizedLinkButton.module.scss";

interface ILinkButtonProps {
    name: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StylizedLinkButton = (props: ILinkButtonProps) => {
    return (
        <div className={styles.buttonContainer}>
            <button
                onClick={props.onClick}
                className={styles.buttonContainer__button}
            >
                {props.name}
            </button>
        </div>
    );
};

export default StylizedLinkButton;
