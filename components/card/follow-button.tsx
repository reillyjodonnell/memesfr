import { useTranslation } from 'react-i18next';

type ComponentProps = {
  toggleFollowUser: React.MouseEventHandler<HTMLDivElement>;
  className: string;
};

export default function FollowButton({
  toggleFollowUser,
  className = 'user-follow-button-card',
}: ComponentProps) {
  const { t } = useTranslation('common');

  return (
    <div onClick={toggleFollowUser} className={className}>
      <span>{t('follow')}</span>
    </div>
  );
}
