import React from 'react';
import { Toast } from 'react-bootstrap';

export default function ToastAlertaComponent(props) {
    return (<div
        aria-live="polite"
        aria-atomic="true"
        style={{
            position: 'relative',
            minHeight: '100px',
        }}>
        <Toast
            animation={true}
            show={props.exibir}
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
            }}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">{props.titulo}</strong>
            </Toast.Header>
            <Toast.Body>{props.descricao}</Toast.Body>
        </Toast>
    </div>
    );
}