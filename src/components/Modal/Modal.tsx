import React from "react";
import Modal__User from "./Modal__User";
import "./Modal.scss"
import classNames from "classnames";

// нужен рефакторинг классов
export default class Modal extends React.Component<any,any>{
    constructor(props) {
        super(props);
        this.state={
            modalIsClosed: true,
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal () {
        this.setState({modalIsClosed: false})
    };

    hideModal () {
        this.setState({modalIsClosed: true})
    };

    render() {
        const modalClass = classNames({
            "modal-area": true,
            "hidden": this.state.modalIsClosed,
        })
        return (
            <div id="modalAuth" className={modalClass}>
                <div className="modal-window">
                    <div className="modal-window__close close-wrapper" onClick={this.hideModal}>
                        <i id="modal-close" className="fa-regular fa-circle-xmark close-wrapper__img" title="Close"></i>
                    </div>
                    <Modal__User />
                </div>
            </div>
        )
    }
}