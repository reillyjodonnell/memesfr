import { useState } from 'react';
import { useAuth } from '@/src/contexts/auth-context';
import {
  Verified,
  Pencil,
  Trash,
  Report,
  Share,
  Comment,
  Crown,
} from '../assets';
import { useMobile } from '@/src/contexts/mobile-context';
import FollowButton from './follow-button';
import FollowingButton from './following-button';
import { fileType } from '@/src/constants/common';
import Link from 'next/link';

export default function Card({
  likes = 0,
  enableFullScreen,
  login,
  following,
  author,
  authorPic,
  userName,
  title,
  fileType,
  image,
  shares = 0,
  comments = 0,
}) {
  const [thumbUp, setThumbUp] = useState(false);
  // const [thumbDown, setThumbDown] = useState(false);
  const [options, expandOptions] = useState(false);
  // const [followsUser, setFollowsUser] = useState(false);
  // const { isMobile } = useMobile();

  /* FOR DEV ONLY */
  const isVerified = true;

  const { currentUser } = useAuth();

  const isAuthor = currentUser ? currentUser.uid === author : false;

  const toggleFollowUser = () => {
    if (currentUser) {
      setFollowsUser(true);
      followUser(currentUser.uid, author);
    } else {
      login();
    }
  };

  const toggleUnfollowUser = () => {
    if (currentUser) {
      setFollowsUser(false);
      unfollowUser(currentUser.uid, props.item.author);
    } else {
      login();
    }
  };

  // const toggleThumbUp = () => {
  //   // setNeedSubmit(true);
  //   if (thumbUp === true) {
  //     setThumbUp(!thumbUp);
  //     setNumberOfLikes((likes) => likes - 1);
  //   } else if (thumbDown === true) {
  //     setThumbDown(!thumbDown);
  //     setThumbUp(!thumbUp);
  //     setNumberOfLikes((prevLikes) => prevLikes + 2);
  //   } else {
  //     setThumbUp(!thumbUp);
  //     setNumberOfLikes((likes) => likes + 1);
  //   }
  // };

  const closeOptions = () => {
    expandOptions(!options);
  };

  /* THIS IS IF MODS/CREATORS WANT TO EDIT POST*/

  function memeAuthor() {
    const memeAuthorUsername = userName;
    if (userName) {
      return memeAuthorUsername;
    } else return 'anonymous';
  }

  const username = userName ?? '';

  return (
    <div
      className="card-area"
      // style={{ width: isMobile ? '100%' : 'auto' }}
      // onMouseLeave={captureUserInput}
      // onScrollCapture={isMobile ? captureUserInput : null}
    >
      <div className="card-container">
        <div className="card-container-padding">
          <DisplayAvatar
            authorId={author}
            avatar={authorPic ?? ''}
            username={username}
          />

          <div className="card">
            <div className="upper">
              <div className="upper-top-info">
                <div className="meme-identification">
                  <Link
                    onClick={() => window.alert('CLICKED')}
                    href={`/${username}`}
                  >
                    <div className="user-name-information">
                      <span className="clickable">{memeAuthor()}</span>
                      {isVerified && (
                        <div className="verified-container">
                          <Verified />
                        </div>
                      )}
                      {/* {hasBanner && <UserBanner />} */}
                    </div>
                  </Link>

                  <span className="meme-title">{title}</span>

                  <span className="hashtag-identifier"></span>
                </div>
                {following ? (
                  <FollowingButton toggleUnfollowUser={toggleUnfollowUser} />
                ) : isAuthor ? (
                  <Pencil />
                ) : (
                  <FollowButton toggleFollowUser={toggleFollowUser} />
                )}
              </div>

              <div
                onClick={() => enableFullScreen({ meme: item })}
                className="image-container"
              >
                {fileType === fileType.VIDEO ? (
                  <video autoPlay muted src={image} poster={poster} controls />
                ) : (
                  <img
                    alt=""
                    loading="lazy"
                    // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                    className="meme-image"
                    width={500}
                    height={500}
                    src={image}
                  ></img>
                )}
              </div>

              <div className="upper-top"></div>
            </div>

            <div className="lower">
              <div
                // onClick={currentUser ? toggleThumbUp : login}
                className={
                  thumbUp ? 'crown-container-active' : 'crown-container'
                }
              >
                <Crown className="w-6 h-6 card-icon" />
                <span className="number-of-crowns">{likes}</span>
              </div>

              <div
                className="like-container"
                onClick={!currentUser ? login : null}
              >
                <Comment className="w-6 h-6 card-icon" />

                <span className="number-of-likes">{comments}</span>
              </div>
              <div
                className="like-container"
                onClick={!currentUser ? login : null}
              >
                <Share className="w-6 h-6 card-icon" />
                <span className="number-of-likes">{shares}</span>
              </div>
            </div>
            {options ? <OptionsExpanded closeOptions={closeOptions} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const DisplayAvatar = ({ avatar, username = '', authorId }) => {
  return (
    <Link href={`/${username}`}>
      <div className="avatar-picture">
        <img
          alt="user's avatar"
          src={avatar}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </Link>
  );
};

function ExpandedPencil() {
  return (
    <div className="expanded-pencil">
      <div className="edit">
        <span>Edit post</span>
      </div>
      <div className="delete">
        <img alt="a trash icon to remove posts" src={trash} />
        <span>Remove post</span>
      </div>
    </div>
  );
}

function OptionsExpanded({ permissionToEdit, closeOptions }) {
  if (permissionToEdit) {
    return <ExpandedPencil></ExpandedPencil>;
  }
  if (!permissionToEdit) {
    return (
      <>
        <div onClick={closeOptions} className="expanded-pencil">
          <div className="edit">
            <span>Close</span>
          </div>
          <div className="delete">
            <span>Report Post</span>
            <img alt="report button" src={report} />
          </div>
        </div>
      </>
    );
  }
}
