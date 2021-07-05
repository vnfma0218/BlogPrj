import React from 'react';

import './Modal.css';

const Modal = (props) => {
  if (props.show) {
    return (
      <div className='modal modal-active'>
        <div className='modal_content'>
          <h3 className='modal_title'>{props.message}</h3>
          <div className='modalBtns'>{props.btns}</div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default Modal;
