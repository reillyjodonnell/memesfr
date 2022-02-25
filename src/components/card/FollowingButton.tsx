import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type ComponentProps = {
  toggleUnfollowUser: React.MouseEventHandler<HTMLDivElement>;
};
export default function FollowingButton({
  toggleUnfollowUser,
}: ComponentProps) {
  const { t } = useTranslation('common');
  const [message, setMessage] = useState<string>(t('following'));

  return (
    <div
      onMouseEnter={() => setMessage(t('unfollow'))}
      onMouseLeave={() => setMessage(t('following'))}
      onClick={toggleUnfollowUser}
      className="user-follow-button-card-active"
    >
      <span>{message}</span>
    </div>
  );
}
