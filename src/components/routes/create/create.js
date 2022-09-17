import React, { useState, useEffect, useLayoutEffect } from 'react';
import '../../../css-components/routes/create/create.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/auth-context';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useTheme } from '../../../contexts/theme-context';
import ImageThumb from '../../image-thumb';
import { navigation } from '../../../constants/navigation';
import { ReactComponent as Image } from '../../../assets/icons/add-image.svg';
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

  useLayoutEffect(() => {
    setNav(navigation.CREATE);
  }, [setNav]);

  const avatar = currentUser?.photoURL ?? '';

  const username = currentUser?.displayName ?? '';

  document.title = `✏️ ${t('create')} - Memesfr`;

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCaptionInput = (e) => {
    setCaption(e.currentTarget.textContent);

    const letterLength = e.currentTarget.textContent.length;
    setLetterCount(letterLength);
    if (letterLength > 69) {
      setAcceptInput(false);
    } else {
      setAcceptInput(true);
    }
  };

  const openEmojiPicker = () => {
    setEmojiContainerOpen((prev) => !prev);
  };

  const clearMeme = () => {
    setFile('');
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
  const includeEmojis = [
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

  function shouldEnableSubmitButton() {
    return file && letterCount > 0 && letterCount <= 69;
  }

  return currentUser ? (
    <div className="create-post-container">
      {emojiContainerOpen && (
        <Picker
          include={includeEmojis}
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
                accept="video/*, image/*"
                onChange={handleUpload}
                className="hidden-file"
                type="file"
              />
              <div className="upload-file-prompt">
                <Image className="flex  w-24 h-24 stroke-secondary mb-6" />
                <span className="mb-6 text-xl">
                  Click or Drag and Drop dank meme here
                </span>
                <button className="flex justify-center items-center text-white  font-semibold border-2 border-primary-accent bg-primary-accent text-2xl rounded-round px-6 py-2 mb-6">
                  Select Image
                </button>
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

        {file ? (
          <div className="create-post-user-area">
            <div className="create-post-user">
              <div className="create-post-avatar-picture">
                <img
                  className=""
                  alt="your user avatar"
                  referrerpolicy="no-referrer"
                  src={avatar}
                />
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

                <div className="create-post-actions">
                  <button
                    onClick={clearMeme}
                    className="create-post-action-button create-post-trash-button hover:border-red-500"
                  >
                    {`${t('trash')} 🗑`}
                  </button>
                  <button
                    className={`create-post-action-button ${
                      shouldEnableSubmitButton()
                        ? 'create-post-submit-button-valid'
                        : 'create-post-submit-button-invalid'
                    }`}
                  >
                    {t('submit')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}
