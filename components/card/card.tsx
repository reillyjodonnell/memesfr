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

import { fileType as FileType } from '@/src/constants/common';
import Link from 'next/link';
import Image from 'next/image';
import AvatarContainer from './avatar-container';
import FollowContainer from './follow-container';
import FullscreenPlayer from '../fullscreen-player';
export default function Card({
  likes = 0,
  enableFullScreen,
  login,
  followsUser,
  author,
  authorPic,
  userName,
  title,
  fileType,
  image,
  shares = 0,
  comments = 0,
  likedPost,
  url,
  userHandle,
  userBio,
  followingCount,
  followerCount,
  authorId,
}) {
  // const [thumbUp, setThumbUp] = useState(false);
  // const [thumbDown, setThumbDown] = useState(false);
  const [options, expandOptions] = useState(false);
  // const [followsUser, setFollowsUser] = useState(false);
  // const { isMobile } = useMobile();
  const [fullscreen, setFullscreen] = useState(false);

  /* FOR DEV ONLY */
  const isVerified = true;

  const { currentUser } = useAuth();

  const isAuthor = currentUser ? currentUser.uid === author : false;

  const toggleFollowUser = () => {};
  const toggleUnfollowUser = () => {};

  // const toggleFollowUser = () => {
  //   if (currentUser) {
  //     setFollowsUser(true);
  //     followUser(currentUser.uid, author);
  //   } else {
  //     login();
  //   }
  // };

  // const toggleUnfollowUser = () => {
  //   if (currentUser) {
  //     setFollowsUser(false);
  //     unfollowUser(currentUser.uid, props.item.author);
  //   } else {
  //     login();
  //   }
  // };

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
      <FullscreenPlayer
        source={image}
        type={fileType}
        open={fullscreen}
        openChange={setFullscreen}
      />

      <div className="card-container">
        <div className="card-container-padding">
          <AvatarContainer
            authorId={author}
            avatar={authorPic ?? ''}
            username={username}
            userHandle={userHandle}
            userBio={userBio}
            followingCount={followingCount}
            followerCount={followerCount}
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
                <FollowContainer follows={followsUser} />
              </div>

              <Link href={'/'} className="image-container cursor-pointer">
                {fileType === FileType.VIDEO ? (
                  <video
                    onClick={() => setFullscreen((prev) => !prev)}
                    autoPlay
                    muted
                    src={image}
                    loop
                    controls
                  />
                ) : (
                  <img
                    onClick={() => setFullscreen((prev) => !prev)}
                    alt=""
                    loading="lazy"
                    // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                    className="meme-image"
                    width={500}
                    height={500}
                    src={image}
                  />
                )}
              </Link>

              <div className="upper-top"></div>
            </div>

            <div className="lower">
              <div
                // onClick={currentUser ? toggleThumbUp : login}
                className={
                  likedPost ? 'crown-container-active' : 'crown-container'
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
