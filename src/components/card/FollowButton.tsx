import { useTranslation } from 'react-i18next';

type ComponentProps = {
  toggleFollowUser: React.MouseEventHandler<HTMLDivElement>;
};

export default function FollowButton({ toggleFollowUser }: ComponentProps) {
  const { t } = useTranslation('common');

  return (
    <div onClick={toggleFollowUser} className="user-follow-button-card">
      <span>{t('follow')}</span>
    </div>
  );
}
