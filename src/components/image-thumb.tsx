import React, { MouseEventHandler } from 'react';
import { ReactComponent as X } from '../assets/svg/x.svg';
import '../css-components/modal.css';

type ImageThumbProps = {
  file: File;
  setFileError: Function;
  removeFile: Function;
  setFile: Function;
};

const ImageThumb = ({
  file,
  setFileError,
  removeFile,
  setFile,
}: ImageThumbProps) => {
  setFileError('');
  const filesFormats = [
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/png',
    'video/mp4',
  ];
  const validFormat = filesFormats.includes(file.type);
  if (file.type === 'video/mp4') {
    return (
      <div className="meme-image-preview">
        <video
          loop
          className=" meme-image-preview"
          src={URL.createObjectURL(file)}
          autoPlay
          controls
          style={{ objectFit: 'contain' }}
        ></video>
        <X className="cancel-meme" onClick={removeFile as MouseEventHandler} />
      </div>
    );
  }

  if (validFormat) {
    return (
      <div className="meme-image-preview">
        <img
          src={URL.createObjectURL(file)}
          className="meme-image-preview"
          alt={file.name}
        ></img>
        <X className="cancel-meme" onClick={removeFile as MouseEventHandler} />
      </div>
    );
  } else {
    setFile('');
    const fileType = JSON.stringify(file.type);
    const fileEnding = fileType.slice(7, fileType.length - 1);
    setFileError(`😢 unsupported file type .${fileEnding}`);
    return null;
  }
};

export default ImageThumb;
