import { useState, useLayoutEffect, ChangeEvent } from 'react';
import '../../../css-components/routes/create/create.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/auth-context';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ImageThumb from '../../image-thumb';
import { navigation } from '../../../constants/navigation';
import { ReactComponent as Image } from '../../../assets/icons/add-image.svg';

export default function Create({ setNav }: { setNav: Function }) {
  const { t } = useTranslation('common');
  const [fileType, setFileType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);
  const [letterCount, setLetterCount] = useState(0);
  const [caption, setCaption] = useState('');
  const [acceptInput, setAcceptInput] = useState(true);
  const [emojiContainerOpen, setEmojiContainerOpen] = useState(false);
  const { currentUser } = useAuth();

  useLayoutEffect(() => {
    setNav(navigation.CREATE);
  }, [setNav]);

  const avatar = currentUser?.photoURL ?? '';

  const username = currentUser?.displayName ?? '';

  document.title = `✏️ ${t('create')} - Memesfr`;

  const submitMeme = () => {};

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event?.target as HTMLInputElement)?.files;
    setFile(file?.[0] ?? null);
  };

  const handleCaptionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCaption(e?.currentTarget?.value ?? '');
    const letterLength = e?.currentTarget?.value?.length ?? 0;
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
    setFile(null);
  };

  const handleEmojiPicker = (emoji: any) => {
    setCaption((prev) => `${prev}${emoji?.native ?? ''}`);
    setEmojiContainerOpen(false);
    setLetterCount((prevCount) => prevCount + 1);
  };

  const handleHashTag = () => {
    setCaption((prev) => `${prev}#`);
    setLetterCount((prevCount) => prevCount + 1);
  };

  function removeFile() {
    setFile(null);
  }

  function shouldEnableSubmitButton() {
    return file && letterCount > 0 && letterCount <= 69;
  }

  return currentUser ? (
    <div className="create-post-container">
      {emojiContainerOpen && (
        <Picker
          include={[
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
          ]}
          set={'apple'}
          onSelect={(emoji) => handleEmojiPicker(emoji)}
          title=""
          emojiSize={20}
          perLine={6}
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
                onChange={(e) => handleUpload(e)}
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
              setFile={setFile}
              removeFile={removeFile}
              setFileError={setFileError}
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
                  referrerPolicy="no-referrer"
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
                    style={{ color: !acceptInput ? 'red' : '' }}
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
                  <input
                    className="create-post-caption-input"
                    contentEditable
                    id="caption"
                    onChange={(e) => handleCaptionInput(e)}
                    value={caption}
                    placeholder={t('writeCaption') as string}
                  />
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
                    onClick={submitMeme}
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
