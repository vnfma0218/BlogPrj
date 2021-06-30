import React from 'react';

import './Modal.css';

const Modal = (props) => {
  if (props.onModal) {
    return (
      <div className='modal modal-active'>
        <div className='modal_content'>
          <h3 className='modal_title'>Are you sure? Delete this?</h3>
          <div className='modalBtns'>
            <button className='subBtn' onClick={props.onDelete}>
              Delete
            </button>
            <button className='subBtn' onClick={props.onCancel}>
              Calcel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default Modal;
