import usePopularPosts from '@/custom-hooks/usePopularPosts';
import { ReactElement } from 'react';
import Card from './card/card';
import Sidebar from './sidebar';
import styles from './sidebar-and-content.module.css';
import { toast } from 'react-hot-toast';
import MessageToast from './toasts/message-toast';
import FullscreenPlayer from '@/components/fullscreen-player';

type SideAndTopbarProps = {
  children?: ReactElement;
};

export default function Topbar({ children }: SideAndTopbarProps) {
  const data = usePopularPosts();

  function makeToast() {
    toast.custom(
      (t) => (
        <MessageToast
          sender="Reilly"
          message="This is a fairly long message where I will test the maximum length that the toast can support. This is a fairly long message where I will test the maximum length that the toast can support "
          t={t}
          toast={toast}
        />
      ),
      { duration: 3000 }
    );
  }
  return (
    <div className={styles.main}>
      <Sidebar />
      <div className={`${styles.memeContent} main-content`}>
        <button onClick={makeToast}>Toast!</button>
        <FullscreenPlayer />
        {data?.map((item) => (
          <Card
            key={item.index}
            author={item.author}
            authorPic={item.authorPic}
            enableFullScreen={false}
            fileType={item.fileType}
            followsUser={true}
            image={item.image}
            login={() => {}}
            title={item.title}
            userName={item.username}
            comments={200}
            likes={item.likes}
            shares={item.shares}
            likedPost={true}
            url={item.url}
            userHandle={item.userHandle}
            userBio={item.userBio}
            followingCount={item.followingCount}
            followerCount={item.followerCount}
          />
        ))}
      </div>
    </div>
  );
}
