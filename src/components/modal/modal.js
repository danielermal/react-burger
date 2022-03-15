import React from 'react'
import ReactDOM from 'react-dom';
import modal from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import {Typography} from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.querySelector('#root')

export const Modal = (props) => {

    const closeModal = props.onClose

    React.useEffect(() => {

        const closeByEsc = (evt) => {
            if (evt.key === 'Escape') {
                closeModal()
            }
        }

        document.addEventListener('keydown', closeByEsc)

        return () => {
            document.removeEventListener('keydown', closeByEsc)
        }
    }, [props.onClose])

    return ReactDOM.createPortal (
        <ModalOverlay close={closeModal} >
            <div className={modal.container}>
                {props.title}
                <button className={modal.button} onClick={props.onClose}>
                    <CloseIcon type="primary" />
                </button>
                {props.children}
            </div>
        </ModalOverlay>,
      modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.element.isRequired
}