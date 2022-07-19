import React from 'react';
import { ReactComponent as Castle } from '../assets/svg/castle.svg';
import '../css-components/loading.css';

export default function Loading() {
  return (
    <div className="loading-window">
      <div className="loading-sidebar-logo">
        <Castle />
        <span>Memesfr</span>
      </div>
    </div>
  );
}
