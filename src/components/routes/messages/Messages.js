import React, { useEffect, useState } from 'react';
import '../../../css-components/routes/messages/Messages.css';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Doge } from '../../../assets/doge.svg';
import { ReactComponent as Edit } from '../../../assets/icons/Edit.svg';
import Og from '../../../assets/test/og.jpg';
import { ReactComponent as Info } from '../../../assets/icons/Info.svg';
import { ReactComponent as Send } from '../../../assets/icons/Send.svg';
import { ReactComponent as Smile } from '../../../assets/icons/Smile.svg';

export default function Messages({ nav, setNav }) {
  const [showMessage, setShowMessage] = useState(false);
  const [focused, setFocused] = useState(false);
  const [message, setMessage] = useState([]);
  const [userInput, setUserInput] = useState('');

  const { t, i18n } = useTranslation('common');

  document.title = `✉️ ${t('messages')} - Memesfr`;

  useEffect(() => {
    if (nav.count === null) {
      setNav({ count: 6 });
    }
  }, []);

  useEffect(() => {}, [message]);

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

  const handleReaction = (passedIndex, icon) => {
    const copiedArray = [...message];

    const selectedItem = copiedArray[passedIndex];

    const reactionObject = copiedArray[passedIndex].reaction;

    const length = selectedItem.reaction && selectedItem.reaction.length;

    //Logic check to see if we are overwriting user's reaction

    //Is it just one object in array?

    const isSoleObject =
      selectedItem.reaction && selectedItem.reaction.length === 1
        ? true
        : false;

    const isAuthor =
      selectedItem.reaction && selectedItem.reaction[0].reactionAuthorIsUser;

    //If the nested array of objects for the reaction is not there make a new array with 1 object ez

    const createdReaction = {
      reactionIcon: icon,
      reactionIconCount: 1,
      reactionAuthorIsUser: true,
      userHasReacted: true,
    };

    const overwriteReaction = () => {
      copiedArray[passedIndex] = {
        ...selectedItem,
        isReactionOpen: false,
        reaction: [createdReaction],
      };
    };

    const incrementAndCloseReaction = () => {
      reactionObject[0].reactionIconCount =
        reactionObject[0].reactionIconCount + 1;
      reactionObject[0].userHasReacted = true;
      copiedArray[passedIndex] = {
        ...selectedItem,
        isReactionOpen: false,
      };
    };

    const hasUserReacted = selectedItem.reaction;

    if (!length) {
      overwriteReaction();
    } else {
      if (isSoleObject) {
        if (isAuthor) {
          overwriteReaction();
        } else {
          const combinedArray = [...reactionObject, createdReaction];

          //Check if we are just incrementing (same icon) or if we are creating new icon container to go alongside it
          const isSameIcon =
            selectedItem.reaction &&
            selectedItem.reaction[0].reactionIcon === icon
              ? true
              : false;

          if (isSameIcon) {
            incrementAndCloseReaction();
          } else if (selectedItem.reaction[0].userHasReacted) {
            reactionObject[0].reactionIconCount =
              reactionObject[0].reactionIconCount - 1;
            copiedArray[passedIndex] = {
              ...selectedItem,
              reaction: combinedArray,
              isReactionOpen: false,
            };
          } else {
            copiedArray[passedIndex] = {
              ...selectedItem,
              isReactionOpen: false,
              reaction: combinedArray,
            };
          }
        }
      } else {
        //Find the index where reactionAuthorIsUser is true to overwrite
        const userIndex = reactionObject
          .map((e) => e.reactionAuthorIsUser)
          .indexOf(true);

        const notUserIndex = reactionObject
          .map((e) => e.reactionAuthorIsUser)
          .indexOf(false);

        //We have two posts (1 where user has created, 1 where they have not)

        //If the icon passed is the same one in the not user index let's delete our entry, and increment the count
        if (icon === reactionObject[notUserIndex].reactionIcon) {
          //Delete our entry
          reactionObject.splice(userIndex, 1);
          //Increment the count for the remaining entry
          incrementAndCloseReaction();
        } else {
          reactionObject[userIndex] = createdReaction;

          copiedArray[passedIndex] = {
            ...selectedItem,
            isReactionOpen: false,
            reaction: reactionObject,
          };
        }

        //
      }
    }
    setMessage(copiedArray);
  };

  const handleToolTip = (key) => {
    toggleToolTip(key);
  };

  const toggleToolTip = (passedIndex) => {
    const copiedArray = [...message];

    const selectedItem = copiedArray[passedIndex];

    copiedArray[passedIndex] = {
      ...selectedItem,
      isReactionOpen: selectedItem.isReactionOpen ? false : true,
    };

    setMessage(copiedArray);
  };

  const chatData = [
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reaction: [
        {
          reactionIcon: '👍',
          reactionIconCount: 1,
          reactionAuthorIsUser: false,
        },
      ],
    },
    {
      type: 'received',
      text: 'Wow thats sick!',
    },
    {
      type: 'received',
      text: 'Heres another meme',
      reaction: [
        {
          reactionIcon: '👍',
          reactionIconCount: 1,
          reactionAuthorIsUser: false,
        },
      ],
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',

      reaction: [
        {
          reactionIcon: '🔥',
          reactionIconCount: 1,
          reactionAuthorIsUser: false,
        },
      ],
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reaction: [
        {
          reactionIcon: '🔥',
          reactionIconCount: 1,
          reactionAuthorIsUser: true,
          userHasReacted: true,
        },
      ],
    },
    {
      type: 'sent',
      text: 'Hey dude check this meme out',
      reaction: [
        {
          reactionIcon: '🔥',
          reactionIconCount: 1,
          reactionAuthorIsUser: true,
          userHasReacted: true,
        },
      ],
    },
    {
      type: 'received',
      text: 'I wish there was GIF support ',
    },
    {
      type: 'sent',
      text: 'Hey dude! Heres another meme',
    },
    {
      type: 'sent',
      text: 'I need to upload newer memes. Im tired of looking at the same ones all day',
    },
    {
      type: 'received',
      text: 'I totally feel the same way',
      reaction: [
        {
          reactionIcon: '😎',
          reactionIconCount: 1,
          reactionAuthorIsUser: true,
          userHasReacted: true,
        },
      ],
    },
    {
      type: 'sent',
      text: 'Alright im gonna head up like spongebob',
    },
  ];

  const ChatBubble = ({
    type,
    text,
    image = 'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2F3VFjwmekKaT55anTfWMe8WavF532?alt=media&token=1767eb84-f319-47f2-9d44-9f32c96b83fb',
    time,
    reaction,
    passedIndex,
  }) => {
    const { reactionAuthorIsUser, reactionIcon, reactionIconCount } =
      reaction || {};
    const messageContainerClassname =
      type === 'sent'
        ? 'message-sent message-content-message-bubble'
        : 'message-content-message-bubble';
    const messageTextClassname =
      type === 'sent' ? ' message-sent-text' : 'm message-received-text';

    const messageReactionContainerClassname =
      reactionAuthorIsUser === 'sent'
        ? 'reaction-icon-sent'
        : 'reaction-icon-received';

    const messageReactionPaddingClassname =
      type === 'sent'
        ? 'message-reaction-container-sent'
        : 'message-reaction-container-received';

    const reactionClassname =
      type === 'sent' ? 'reaction-sent-flex' : 'reaction-received-flex';
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
            <div
              className={`reaction-icon-container-flex ${reactionClassname}`}
            >
              {reaction &&
                reaction.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={`reaction-icon-container ${messageReactionContainerClassname}`}
                    >
                      <span>
                        {item.reactionIcon} {item.reactionIconCount}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={`message-reaction-container`}>
          <div
            data-tooltip={'🔥 ❤️ 😎 🙂'}
            className={`message-reaction-container-padding ${messageReactionPaddingClassname}`}
          >
            {message[passedIndex].isReactionOpen && (
              <div className="message-reaction-container-tooltip">
                <span
                  onClick={() => handleReaction(passedIndex, '🔥')}
                  value="🔥"
                  className="message-reaction-tooltip-icon"
                >
                  🔥
                </span>
                <span
                  onClick={() => handleReaction(passedIndex, '😂')}
                  value="😂"
                  className="message-reaction-tooltip-icon"
                >
                  😂
                </span>
                <span
                  onClick={() => handleReaction(passedIndex, '❤️')}
                  value="❤️"
                  className="message-reaction-tooltip-icon"
                >
                  ❤️
                </span>
                <span
                  onClick={() => handleReaction(passedIndex, '👍')}
                  value="👍"
                  className="message-reaction-tooltip-icon"
                >
                  👍
                </span>
                <span
                  onClick={() => handleReaction(passedIndex, '👎')}
                  value="👎"
                  className="message-reaction-tooltip-icon"
                >
                  👎
                </span>
              </div>
            )}
            <Smile
              onClick={() => handleToolTip(passedIndex)}
              className="message-reaction-icon"
            />
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

  const handleInput = (input) => {
    setUserInput(input.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const chatObject = {
        type: 'sent',
        text: userInput,
      };
      console.log(chatObject);

      setMessage((prev) => [...prev, chatObject]);
      setUserInput('');
    }
  };

  useEffect(() => {
    console.log(chatData);
  }, [chatData]);

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
                        reaction={item.reaction}
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
                  <input
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    spellCheck="true"
                    className="message-content-input"
                    onInput={(e) => handleInput(e)}
                    value={userInput}
                    onKeyDown={(e) => handleKeyPress(e)}
                  />
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
