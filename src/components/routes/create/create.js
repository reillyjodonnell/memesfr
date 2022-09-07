import React, { useState, useEffect, useLayoutEffect } from 'react';
import '../../../css-components/routes/create/create.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/auth-context';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useTheme } from '../../../contexts/theme-context';
import { ReactComponent as UploadFile } from '../../../assets/icons/upload.svg';
import ImageThumb from '../../image-thumb';
import { navigation } from '../../../constants/navigation';
export default function Create({ setNav }) {
  const { t, i18n } = useTranslation('common');

  const [file, setFile] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileError, setFileError] = useState(false);
  const [letterCount, setLetterCount] = useState(0);
  const [caption, setCaption] = useState(t('writeCaption'));
  const [acceptInput, setAcceptInput] = useState(true);
  const [validPost, setValidPost] = useState(false);
  const [displayLightBackground, setDisplayLightBackground] = useState(false);
  const [emojiContainerOpen, setEmojiContainerOpen] = useState(false);
  const { currentUser } = useAuth();

  const { activeBackground } = useTheme();

  useLayoutEffect(() => {
    setNav(navigation.CREATE);
  }, [setNav]);

  useEffect(() => {
    switch (activeBackground) {
      case 0:
        setDisplayLightBackground(true);
        break;
      case 1:
        setDisplayLightBackground(true);
        break;
      case 2:
        setDisplayLightBackground(false);
        break;
      default:
        setDisplayLightBackground(true);
        break;
    }
  }, [activeBackground]);

  const avatar = currentUser && currentUser.photoURL;
  const username = currentUser && currentUser.displayName;

  document.title = `✏️ ${t('create')} - Memesfr`;

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCaptionInput = (e) => {
    setCaption(e.currentTarget.textContent);

    const letterLength = e.currentTarget.textContent.length;
    setLetterCount(letterLength);
    if (letterLength >= 69) {
      setAcceptInput(false);
    } else {
      setAcceptInput(true);
    }
  };

  const openEmojiPicker = () => {
    setEmojiContainerOpen((prev) => !prev);
  };

  const handleEmojiPicker = (emoji) => {
    const prevHTML = document.getElementById('caption').innerHTML;
    document.getElementById('caption').innerHTML = `${prevHTML}${emoji.native}`;
    setEmojiContainerOpen(false);
    setLetterCount((prevCount) => prevCount + 1);
  };

  const handleHashTag = () => {
    const prevHTML = document.getElementById('caption').innerHTML;
    document.getElementById('caption').innerHTML = `${prevHTML}#`;
    setLetterCount((prevCount) => prevCount + 1);
  };

  function removeFile() {
    setFileType('');
    setFile('');
  }
  const inlcudeEmojis = [
    'search',
    'custom',
    'people',
    'nature',
    'foods',
    'activity',
    'places',
    'objects',
    'symbols',
    'flags',
  ];

  return currentUser ? (
    <div className="create-post-container">
      {emojiContainerOpen && (
        <Picker
          include={inlcudeEmojis}
          set={'apple'}
          onSelect={(emoji) => handleEmojiPicker(emoji)}
          title=""
          emojiSize={20}
          perLine={6}
          theme={displayLightBackground ? 'light' : 'dark'}
          style={{
            width: '300px',
            position: 'absolute',
            zIndex: 7,
            bottom: '0px',
          }}
        />
      )}
      <div className="create-post-container-title-container">
        <div className="create-post-container-title">
          <span className="create-post-title">{t('createPost')}</span>
          <span className="create-post-subtitle">{t('uploadDankMeme')}</span>
        </div>
      </div>
      {fileError ? (
        <span style={{ padding: '1rem', color: 'red' }}>{fileError}</span>
      ) : null}
      <div className="create-post-main-content">
        <div
          className={`${
            file
              ? 'create-post-upload-area-no-hover'
              : 'create-post-upload-area'
          }`}
        >
          {!file ? (
            <>
              <input
                onChange={handleUpload}
                className="hidden-file"
                type="file"
              />
              <div className="upload-file-prompt">
                <UploadFile />
                <span>Click or Drag and Drop dank meme here</span>
              </div>
            </>
          ) : (
            <ImageThumb
              setFileType={setFileType}
              setFile={setFile}
              removeFile={removeFile}
              setFileError={setFileError}
              className="meme-image-preview"
              file={file}
            ></ImageThumb>
          )}
        </div>

        <div className="create-post-user-area">
          <div className="create-post-user">
            <div className="create-post-avatar-picture">
              <img className="" src={avatar} />
            </div>
            <span className="create-post-username">{username}</span>
          </div>
          <div className="create-post-description">
            <div className="create-post-caption-container">
              <div className="create-post-caption-container-titles">
                <span className="create-post-caption-container-title-caption">
                  {t('caption')}
                </span>
                <span
                  style={!acceptInput ? { color: 'red' } : null}
                  className="create-post-caption-container-title-characters"
                >
                  {`${letterCount} / 69`}
                </span>
              </div>
              <div
                className={`create-post-caption-input-container
                  ${
                    !acceptInput
                      ? 'create-post-caption-input-container-invalid'
                      : null
                  }`}
              >
                <div
                  className="create-post-caption-input"
                  contentEditable
                  id="caption"
                  onInput={handleCaptionInput}
                  value={caption}
                ></div>
                <div className="create-post-caption-secondary">
                  <div className="create-post-emoji-container">
                    <span
                      onClick={openEmojiPicker}
                      className="create-post-emoji-icon"
                    >
                      😀
                    </span>
                  </div>
                  <div
                    onClick={handleHashTag}
                    className="create-post-hashtag-container"
                  >
                    <span className="create-post-hashtag-icon">#</span>
                  </div>
                </div>
              </div>
              <div className="create-post-caption-container-titles">
                <span className="create-post-caption-container-title-caption">
                  {t('cover')}
                </span>
              </div>
              <div className="create-post-cover-container">
                <div className="create-post-caption-secondary">
                  <div className="create-post-emoji-container">
                    <span className="create-post-emoji-icon">🥇</span>
                  </div>
                </div>
              </div>
              <div className="create-post-actions">
                <div className="create-post-action-button create-post-trash-button">
                  {t('trash')}
                </div>
                <div
                  className={`create-post-action-button ${
                    validPost
                      ? 'create-post-submit-button-valid'
                      : 'create-post-submit-button-invalid'
                  }`}
                >
                  {t('submit')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
