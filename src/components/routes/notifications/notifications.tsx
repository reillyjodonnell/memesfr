import { t } from 'i18next';
import React, { useEffect } from 'react';
import { useAuth } from '../../../contexts/auth-context';
import '../../../css-components/routes/notifications/notifications.css';
import { notificationConstants } from './notification-constants';
import NotificationContainer from './notification-container';

const data = [
  {
    id: 0,
    name: 'rach',
    action: notificationConstants.FOLLOWED,
    // image:
    //   'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/memes%2FAye%20this%20is%20the%20first%20check?alt=media&token=c33390b8-2dfc-4e33-9495-daaebc6c645e',
  },
  {
    id: 1,
    name: 'roo',
    action: notificationConstants.CROWNED,
    image:
      'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/memes%2FAye%20this%20is%20the%20first%20check?alt=media&token=c33390b8-2dfc-4e33-9495-daaebc6c645e',
  },
  {
    id: 2,
    name: 'test',
    action: notificationConstants.CROWNED,
    image:
      'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/memes%2FAye%20this%20is%20the%20first%20check?alt=media&token=c33390b8-2dfc-4e33-9495-daaebc6c645e',
  },
];

export default function Notifications({ notificationCount }: any) {
  if (notificationCount > 0) {
    document.title = `(${notificationCount}) Memesfr`;
  }

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
    }
  }, []);

  return (
    <div className="flex flex-col w-full justify-start items-center  p-6 m-6 ">
      <div className="flex justify-center items-center w-full pb-12">
        <span className="flex text-black dark:text-white text-3xl font-bold">
          {t('notifications')}
        </span>
      </div>

      <div className="flex flex-col justify-start items-center border border-line rounded-round w-5/6">
        <div className="flex flex-col justify-center items-center w-full ">
          {data.map((item) => {
            return (
              <NotificationContainer
                key={`notification ${item?.id}`}
                senderName={item?.name ?? ''}
                senderAvatar={
                  'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707'
                }
                image={item?.image ?? ''}
                type={item?.action}
                sourceContentElement={
                  <>
                    <span>Test</span>
                  </>
                }
                rightElement={
                  <img
                    src={item?.image}
                    className="flex w-20 h-20 rounded-round"
                  />
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
