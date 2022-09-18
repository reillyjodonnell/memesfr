import { useLayoutEffect } from 'react';
import ReactDom from 'react-dom';
import '../../css-components/templates/popup-modal.css';
import { ReactComponent as Cancel } from '../../assets/svg/x.svg';
import { ReactComponent as Castle } from '../../assets/svg/castle.svg';

type PopupModalProps = {
  children: JSX.Element;
  toggleState?: Function;
  title?: String;
  branding?: Boolean;
  hideClose?: Boolean;
};

export default function PopupModal({
  children,
  toggleState,
  title = 'Log in to Memesfr',
  branding = true,
  hideClose = false,
}: PopupModalProps) {
  useLayoutEffect(() => {
    (document.getElementById('dashboard') as HTMLDivElement).style.filter =
      'blur(5px)';
    (document.getElementById('root') as HTMLDivElement).style.overflowY =
      'hidden';

    return () => {
      (document.getElementById('dashboard') as HTMLDivElement).style.filter =
        'blur(0px)';
      (document.getElementById('root') as HTMLDivElement).style.overflowY = '';
    };
  }, []);

  const handleClose = () => {
    toggleState && toggleState();
  };
  return ReactDom.createPortal(
    <div id="dashboard" className="popup-modal-background-filter">
      <div className="popup-modal-container">
        <div className="popup-modal-content-container">
          {!hideClose ? (
            <div
              onClick={handleClose}
              className="popup-modal-container-close-button"
            >
              <Cancel />
            </div>
          ) : null}
          <div className="popup-modal-content">
            {branding && (
              <div className="popup-modal-branding">
                <Castle />
              </div>
            )}
            <div className="popup-modal-title">
              <span>{title}</span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')!
  );
}
