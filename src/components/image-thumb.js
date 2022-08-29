import React from 'react';
import { ReactComponent as X } from '../assets/svg/x.svg';
import '../css-components/modal.css';
const ImageThumb = ({
  file,
  setFileError,
  setFileType,
  removeFile,
  setFile,
}) => {
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
    setFileType('video');
    return (
      <div className="meme-image-preview">
        <video
          loop="true"
          className=" meme-image-preview"
          src={URL.createObjectURL(file)}
          alt={file.name}
          autoPlay="true"
          controls="true"
          style={{ objectFit: 'contain' }}
        ></video>
        <X className="cancel-meme" onClick={removeFile} />
      </div>
    );
  }

  if (validFormat) {
    setFileType('image');

    return (
      <div className="meme-image-preview">
        <img
          src={URL.createObjectURL(file)}
          className="meme-image-preview"
          alt={file.name}
        ></img>
        <X className="cancel-meme" onClick={removeFile} />
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

export default React.memo(ImageThumb);
