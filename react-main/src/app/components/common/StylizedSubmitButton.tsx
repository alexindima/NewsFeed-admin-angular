import React from "react";
import styles from "./StylizedSubmitButton.module.scss";
import Spinner from "./Spinner";

interface ISubmitButtonProps {
    name: string;
    loading: boolean;
    disabled: boolean;
}

const StylizedSubmitButton = (props: ISubmitButtonProps) => {
    return (
        <button
            type="submit"
            className={styles.submitButton}
            disabled={props.disabled}
        >
            {props.name}
            {props.loading && <Spinner color={"#ffffff"} size={10}/>}
        </button>
    );
};

export default StylizedSubmitButton;
