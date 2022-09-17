import { useLayoutEffect } from 'react';
import ReactDom from 'react-dom';
import '../../css-components/templates/popup-modal.css';
import { ReactComponent as Cancel } from '../../assets/svg/x.svg';
import { ReactComponent as Castle } from '../../assets/svg/castle.svg';

export default function PopupModal({
  children,
  toggleState,
  title = 'Log in to Memesfr',
  branding = true,
}) {
  useLayoutEffect(() => {
    document.getElementById('dashboard').style.filter = 'blur(5px)';
    document.getElementById('root').style.overflowY = 'hidden';

    return () => {
      document.getElementById('dashboard').style.filter = 'blur(0px)';
      document.getElementById('root').style.overflowY = '';
    };
  }, []);

  const handleClose = () => {
    toggleState();
  };
  return ReactDom.createPortal(
    <div id="dashboard" className="popup-modal-background-filter">
      <div className="popup-modal-container">
        <div className="popup-modal-content-container">
          <div
            onClick={handleClose}
            className="popup-modal-container-close-button"
          >
            <Cancel />
          </div>
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
    document.getElementById('portal')
  );
}
