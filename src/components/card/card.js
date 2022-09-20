import { useState, useEffect } from 'react';
import '../../css-components/card.css';
import { useAuth } from '../../contexts/auth-context';
import { Link } from 'react-router-dom';
import trash from '../../assets/svg/trash.svg';
import report from '../../assets/svg/report.svg';
import buffDoge from '../../assets/buff-doge.jpg';
import { ReactComponent as CheckMark } from '../../assets/icons/checkmark.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faComment, faCrown } from '@fortawesome/free-solid-svg-icons';
import { useMobile } from '../../contexts/mobile-context';
import { followUser, unfollowUser } from '../../services/firebase-api';
import FollowButton from './follow-button';
import FollowingButton from './following-button';
import { fileType } from '../../constants/common';
import { ReactComponent as Pencil } from '../../assets/svg/pencil.svg';

export default function Card({ likes = 0, enableFullScreen, ...props }) {
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(likes);
  const [options, expandOptions] = useState(false);
  const [followsUser, setFollowsUser] = useState(false);
  const { isMobile } = useMobile();

  const { login, following, item } = props;

  /* FOR DEV ONLY */
  const isVerified = true;
  const shares = Math.round(Math.random() * 10000);
  const comments = Math.round(Math.random() * 40000);

  const { author } = props?.item ?? '';

  const { currentUser } = useAuth();

  const isAuthor = currentUser ? currentUser.uid === props.item.author : false;

  useEffect(() => {
    if (following) {
      setFollowsUser(true);
    }
  }, [following]);

  const toggleFollowUser = () => {
    if (currentUser) {
      setFollowsUser(true);
      followUser(currentUser.uid, props.item.author);
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

  const toggleThumbUp = () => {
    // setNeedSubmit(true);
    if (thumbUp === true) {
      setThumbUp(!thumbUp);
      setNumberOfLikes((likes) => likes - 1);
    } else if (thumbDown === true) {
      setThumbDown(!thumbDown);
      setThumbUp(!thumbUp);
      setNumberOfLikes((prevLikes) => prevLikes + 2);
    } else {
      setThumbUp(!thumbUp);
      setNumberOfLikes((likes) => likes + 1);
    }
  };

  const closeOptions = () => {
    expandOptions(!options);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (props.liked === true) {
        setThumbUp(true);
        // setHasAlreadyLikedPost(true);
      }
      // if (props.hearted === true) {
      //   setHeart(true);
      //   // setHasAlreadyHeartedPost(true);
      // }
      return null;
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  /* THIS IS IF MODS/CREATORS WANT TO EDIT POST*/

  function memeAuthor() {
    const memeAuthorUsername = item?.userName;
    if (item?.userName) {
      return memeAuthorUsername;
    } else return 'anonymous';
  }

  const username = item?.userName ?? '';

  return props ? (
    <div
      className="card-area"
      style={isMobile ? { width: '100%' } : null}
      // onMouseLeave={captureUserInput}
      // onScrollCapture={isMobile ? captureUserInput : null}
    >
      <div className="card-container">
        <div className="card-container-padding">
          <DisplayAvatar
            authorId={author}
            avatar={item?.authorPic ?? ''}
            username={username}
          />

          <div className="card">
            <div className="upper">
              <div className="upper-top-info">
                <div className="meme-identification">
                  <Link
                    onClick={() => window.alert('CLICKED')}
                    to={`/${username}`}
                    state={{ profileUserId: author }}
                  >
                    <div className="user-name-information">
                      <span className="clickable">{memeAuthor()}</span>
                      {isVerified && (
                        <div className="verified-container">
                          <CheckMark />
                        </div>
                      )}
                      {/* {hasBanner && <UserBanner />} */}
                    </div>
                  </Link>

                  <span className="meme-title">{props.item.title}</span>

                  <span className="hashtag-identifier"></span>
                </div>
                {followsUser ? (
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
                {item?.fileType === fileType.VIDEO ? (
                  <video
                    autoPlay
                    muted
                    src={item?.image}
                    poster={item?.poster}
                    controls
                  />
                ) : (
                  <img
                    alt=""
                    loading="lazy"
                    // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                    className="meme-image"
                    width={500}
                    height={500}
                    src={props.item.image}
                  ></img>
                )}
              </div>

              <div className="upper-top"></div>
            </div>

            <div className="lower">
              <div
                onClick={currentUser ? toggleThumbUp : login}
                className={
                  thumbUp ? 'crown-container-active' : 'crown-container'
                }
              >
                <FontAwesomeIcon icon={faCrown} className="w-6 h-6 card-icon" />
                <span className="number-of-crowns">{numberOfLikes}</span>
              </div>

              <div
                className="like-container"
                onClick={!currentUser ? login : null}
              >
                <FontAwesomeIcon
                  className="w-6 h-6 card-icon"
                  icon={faComment}
                />
                <span className="number-of-likes">{comments}</span>
              </div>
              <div
                className="like-container"
                onClick={!currentUser ? login : null}
              >
                <FontAwesomeIcon className="w-6 h-6 card-icon" icon={faShare} />
                <span className="number-of-likes">{shares}</span>
              </div>
            </div>
            {options ? <OptionsExpanded closeOptions={closeOptions} /> : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

const DisplayAvatar = ({ avatar, username, authorId }) => {
  return (
    <Link to={`/${username}`} state={{ profileUserId: authorId }}>
      <div className="avatar-picture">
        {avatar ? (
          <img
            alt="user's avatar"
            src={avatar}
            style={{ height: '100%', width: '100%' }}
          />
        ) : (
          <img
            alt="buff doge meme"
            src={buffDoge}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        )}
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
