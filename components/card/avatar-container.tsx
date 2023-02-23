import * as HoverCard from '@radix-ui/react-hover-card';
import Link from 'next/link';
import Styles from './avatar-container.module.css';
import * as Avatar from '@radix-ui/react-avatar';
import FollowContainer from './follow-container';

type AvatarProp = {
  avatar: string;
  username?: string;
  userHandle?: string;
  userBio?: string;
  followingCount?: number;
  followerCount?: number;
  authorId?: string;
};
export default function AvatarContainer({
  avatar,
  username = '',
  userHandle = '',
  userBio = '',
  followingCount = 0,
  followerCount = 0,
  authorId,
  follows = false,
}: AvatarProp) {
  return (
    <HoverCard.Root openDelay={50} closeDelay={200}>
      <HoverCard.Trigger asChild={true}>
        <div className={Styles.ImageTrigger}>
          <AvatarIcon avatarUrl={avatar} username={username} />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className={Styles.HoverCardContent} sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div className="flex justify-center w-full ">
              <AvatarIcon avatarUrl={avatar} username={username} />
              <div className="flex justify-center items-center ml-auto">
                <FollowContainer follows={follows} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <div>
                <div className={Styles.TextBold}>{username}</div>
                <div className={Styles.TextFaded}>{userHandle}</div>
              </div>
              <div className={Styles.Text}>{userBio}</div>
              <div style={{ display: 'flex', gap: 15 }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  <div className={Styles.TextBold}>{followingCount}</div>{' '}
                  <div className={Styles.TextFaded}>Following</div>
                </div>
                <div style={{ display: 'flex', gap: 5 }}>
                  <div className={Styles.TextBold}>{followerCount}</div>{' '}
                  <div className={Styles.TextFaded}>Followers</div>
                </div>
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

function AvatarIcon({
  avatarUrl,
  username,
}: {
  avatarUrl: string;
  username: string;
}) {
  return (
    <Link href="/username" className={Styles.ImageTrigger}>
      <Avatar.Root className={Styles.AvatarRoot}>
        <Avatar.Image
          className={Styles.AvatarImage}
          src={avatarUrl}
          alt={`${username}'s avatar`}
        />
        <Avatar.Fallback className={Styles.AvatarFallback} delayMs={600}>
          {username[0].toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
    </Link>
  );
}
