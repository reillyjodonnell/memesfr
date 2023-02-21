import usePopularPosts from '@/custom-hooks/usePopularPosts';
import { ReactElement } from 'react';
import Card from './card/card';
import Sidebar from './sidebar';
import styles from './sidebar-and-content.module.css';

type SideAndTopbarProps = {
  children?: ReactElement;
};

export default function Topbar({ children }: SideAndTopbarProps) {
  const data = usePopularPosts();
  return (
    <div className={styles.main}>
      <Sidebar />
      <div className={styles.memeContent}>
        {data?.map((item) => (
          <Card
            key={item.index}
            author={item.author}
            authorPic={item.authorPic}
            enableFullScreen={false}
            fileType="image"
            following={false}
            image={item.image}
            login={() => {}}
            title={item.title}
            userName={item.username}
            comments={200}
            likes={item.likes}
            shares={item.shares}
          />
        ))}
      </div>
    </div>
  );
}
