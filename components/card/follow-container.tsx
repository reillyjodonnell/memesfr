import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function FollowContainer({
  follows = false,
}: {
  follows: boolean;
}) {
  return follows ? <FollowButton /> : <FollowingButton />;
}

type ComponentProps = {
  followAction?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};

function FollowButton({
  followAction = () => {},
  className = 'user-follow-button-card',
}: ComponentProps) {
  const { t } = useTranslation('common');

  return (
    <div onClick={followAction} className={className}>
      <span>{t('follow')}</span>
    </div>
  );
}

function FollowingButton({
  followAction = () => {},
  className = 'user-follow-button-card-active',
}: ComponentProps) {
  const { t } = useTranslation('common');
  const [message, setMessage] = useState(t('following'));

  return (
    <div
      onMouseEnter={() => setMessage(t('unfollow'))}
      onMouseLeave={() => setMessage(t('following'))}
      onClick={followAction}
      className={className}
    >
      <span>{message}</span>
    </div>
  );
}
