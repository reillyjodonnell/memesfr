import React from 'react';
import ReactDom from 'react-dom';
import '../../css-components/templates/full-screen-modal.css';
import { ReactComponent as Cancel } from '../../assets/svg/x.svg';

type FullScreenModalProps = {
  children: JSX.Element;
  toggleState: any;
};

export default function FullScreenModal({
  children,
  toggleState,
}: FullScreenModalProps) {
  return ReactDom.createPortal(
    <div className="modal-container">
      <div onClick={toggleState} className="modal-container-close-button">
        <Cancel />
      </div>
      {children}
    </div>,
    document.getElementById('portal')!
  );
}
