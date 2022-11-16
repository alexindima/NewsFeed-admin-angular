import React from "react";
import "./Modal__User.scss"

// Нужен рефакторинг классов
export function Modal__User () {
    return (
        <div>
            <div className="modal-window__main-title">
                Login to the site
            </div>
            <form className="modal-window__auth-form auth-form">
                <label className="auth-form__field form-field">
                    <span className="form-field__title">Email</span>
                    <input type="email" className="form-field__input" required />
                </label>
                <label className="auth-form__field form-field">
                    <span className="form-field__title">Password</span>
                    <input type="password" className="form-field__input" required />
                </label>
                <button type="submit" className="auth-form__submit-button">Log In</button>
            </form>
            <div className="modal-window__recover-password recover-password">
                <a href="#" className="recover-password__link">Recover Password</a>
            </div>
            <div className="modal-window__second-title">
                Or
            </div>
            <div className="modal-window__sign-up-button sign-up-button">
                <a href="#" className="sign-up-button__link">Sign Up</a>
            </div>
        </div>
    )
}