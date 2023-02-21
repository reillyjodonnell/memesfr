import React from 'react';
import ReactDom from 'react-dom';
import x from '../assets/svg/x.svg';
import '../css-components/password-modal.css';

export default function Modal(props) {
  if (props.resetPassword) {
    document.getElementById('root').style.filter = 'blur(5px)';
  }

  return ReactDom.createPortal(
    <div className="expanded-password-file">
      <img style={{}} onClick={props.closePrompt} src={x} />
      <span className="instruction">Password instructions sent to email </span>
      <span className="email-emoji">📧</span>
      <div className="not-received">
        <span>Didn't get it? Resend Email.</span>
      </div>
    </div>,
    document.getElementById('portal')
  );
}
