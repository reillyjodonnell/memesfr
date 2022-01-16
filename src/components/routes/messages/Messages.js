import React, { useEffect, useState } from 'react';
import '../../../CSS Components/routes/messages/Messages.css';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Doge } from '../../../Assets/doge.svg';
import { ReactComponent as Edit } from '../../../Assets/Icons/Edit.svg';
import Og from '../../../Assets/Test/og.jpg';
import { ReactComponent as Info } from '../../../Assets/Icons/Info.svg';
import { ReactComponent as Send } from '../../../Assets/Icons/Send.svg';
import { ReactComponent as Smile } from '../../../Assets/Icons/Smile.svg';

export default function Messages({ nav, setNav }) {
  const [showMessage, setShowMessage] = useState(false);
  const [focused, setFocused] = useState(false);
  const [message, setMessage] = useState([]);

  const { t, i18n } = useTranslation('common');

  document.title = `✉️ ${t('messages')} - Memesfr`;

  useEffect(() => {
    if (nav.count === null) {
      console.log('setting nav to 6');
      setNav({ count: 6 });
    }
  }, []);

  useEffect(() => {
    console.log(message);
  }, [message]);

  useEffect(() => {
    //Set data to state
    chatData.map((val, index) => {
      const updatedObject = {
        ...val,
        isReactionOpen: false,
      };
      setMessage((prev) => [...prev, updatedObject]);
    });
  }, []);

  const toggleToolTip = (passedIndex) => {
    const copiedArray = [...message];

    const selectedItem = copiedArray[passedIndex];

    copiedArray[passedIndex] = {
      ...selectedItem,
      isReactionOpen: selectedItem.isReactionOpen ? false : true,
    };

    console.log('below is the copied');
    console.log(copiedArray);

    console.log('original');
    console.log(message);

    setMessage(copiedArray);
  };

  const chatData = [
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
    {
      type: 'received',
      text: 'Wow thats sick!',
      reactionType: 'sent',
    },
    {
      type: 'received',
      text: 'Heres another meme',
      reactionType: 'received',
      reactionIcon: '👍',
      reactionIconCount: 1,
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reactionType: 'received',
      reactionIcon: '🔥',
      reactionIconCount: 1,
    },
  ];

  const ChatBubble = ({
    type,
    text,
    image = 'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2F3VFjwmekKaT55anTfWMe8WavF532?alt=media&token=1767eb84-f319-47f2-9d44-9f32c96b83fb',
    time,
    reactionType,
    reactionIcon,
    reactionIconCount,
    passedIndex,
  }) => {
    const messageContainerClassname =
      type === 'sent'
        ? 'message-sent message-content-message-bubble'
        : 'message-content-message-bubble';
    const messageTextClassname =
      type === 'sent' ? ' message-sent-text' : 'm message-received-text';

    const messageReactionContainerClassname =
      reactionType === 'sent' ? 'reaction-icon-sent' : 'reaction-icon-received';

    const messageReactionPaddingClassname =
      type === 'sent'
        ? 'message-reaction-container-sent'
        : 'message-reaction-container-received';

    console.log(passedIndex);

    return (
      <div className={messageContainerClassname}>
        <img
          alt="User's profile avatar"
          className="message-image"
          src={image}
        />
        <div className="message-text-container-max-width">
          <div className={`message-text ${messageTextClassname}`}>
            <span>{text}</span>
            {reactionIcon && (
              <div
                className={`reaction-icon-container ${messageReactionContainerClassname}`}
              >
                <span>
                  {reactionIcon} {reactionIconCount}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={`message-reaction-container`}>
          <div
            data-tooltip={'🔥 ❤️ 😎 🙂'}
            className={`message-reaction-container-padding ${messageReactionPaddingClassname}`}
            onClick={() => toggleToolTip(passedIndex)}
          >
            {message[passedIndex].isReactionOpen && (
              <div className="message-reaction-container-tooltip">
                <span className="message-reaction-tooltip-icon">🔥</span>
                <span className="message-reaction-tooltip-icon">😂</span>
                <span className="message-reaction-tooltip-icon">❤️</span>
                <span className="message-reaction-tooltip-icon">👍</span>
                <span className="message-reaction-tooltip-icon">👎</span>
              </div>
            )}
            <Smile className="message-reaction-icon" />
          </div>
        </div>
      </div>
    );
  };

  const MessagePreview = ({
    avatar,
    name = "Reilly O'Donnell",
    username = 'Reilly',
    messagePreview = "Wow this is a really long message. I can't wait to see the rest of it",
    timeStamp = '4 min ago',
  }) => {
    return (
      <div
        onClick={() => setShowMessage((prev) => !prev)}
        className="messages-user-width-container"
      >
        <div className="messages-user-container">
          {/* <img className="og" src={Og} /> */}

          <div className="messages-user-image-container">
            <img src="https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2F3VFjwmekKaT55anTfWMe8WavF532?alt=media&token=1767eb84-f319-47f2-9d44-9f32c96b83fb" />
          </div>
          <div className="messages-user-preview">
            <div className="messages-username-and-time">
              <span className="messages-user-username">{username}</span>
              <span className="messages-user-time">{timeStamp}</span>
            </div>
            <span className="messages-user-message-preview">
              {messagePreview}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="messages-main-content">
      <div className="messages-container">
        <div className="messages-sidebar">
          <div className="messages-header">
            <span>Messages</span>
            <div className="messages-header-create-message-icon-container">
              <Edit className="messages-header-messages-icon" />
            </div>
          </div>
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
        </div>
        {!showMessage ? (
          <div className="messages-message-content">
            <div className="select-message-prompt-container">
              <div className="select-message-prompt-padding">
                <span className="select-message-prompt-title">
                  👈 Select a message
                </span>
                <span className="select-message-prompt-subtitle">
                  Share some dank memes 😎
                </span>
                <div className="create-message-button">
                  <span>Create Message</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="message-content-main-content">
            <div className="message-content-profile-section">
              <div className="message-content-profile-section-padding">
                <div className="message-content-profile-section-content">
                  <div className="message-content-profile-section-image-container">
                    <img src="https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2F3VFjwmekKaT55anTfWMe8WavF532?alt=media&token=1767eb84-f319-47f2-9d44-9f32c96b83fb" />
                  </div>
                  <span>Username</span>
                </div>
                <Info className="message-content-help-icon" />
              </div>
            </div>
            <div className="message-content-main-message-content">
              <div className="message-content-main-message-content-padding">
                {message &&
                  message.map((item, index) => {
                    return (
                      <ChatBubble
                        key={index}
                        passedIndex={index}
                        type={item.type}
                        reactionIcon={item.reactionIcon}
                        reactionType={item.reactionType}
                        reactionIconCount={item.reactionIconCount}
                        text={item.text}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="message-content-input-full-container">
              <div className="message-content-input-container">
                <div
                  className={`${
                    focused
                      ? 'message-content-input-container-padding-focused'
                      : 'message-content-input-container-padding'
                  }`}
                >
                  <div
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    spellCheck="true"
                    className="message-content-input"
                    contentEditable="true"
                    value="type something funny"
                    role="textbox"
                  ></div>
                </div>
                <div className="message-content-submit-button">
                  <Send />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
