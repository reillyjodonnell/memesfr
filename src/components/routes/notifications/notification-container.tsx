import { notificationConstants } from './notification-constants';
import { t } from 'i18next';
type NotificationContainerProps = {
  senderAvatar: string;
  senderName: string;
  sourceContentElement: JSX.Element;
  rightElement: JSX.Element;
  image?: string;
  // I want this type to be any of the options that exist in the notificationConstants variable defined in notification-constants.ts
  type: string;
};

export default function NotificationContainer({
  senderAvatar,
  senderName,
  image,
  rightElement,
  type,
}: NotificationContainerProps) {
  const description =
    type === notificationConstants.CROWNED
      ? 'crownedYourPost'
      : type === notificationConstants.FOLLOWED
      ? 'followedYou'
      : '';

  return (
    <div className="flex w-full justify-start items-center border-b border-line px-10 py-4 hover:bg-hover transition-all cursor-pointer">
      <div className="flex justify-center items-center w-16 h-16 border border-transparent rounded-full mr-4">
        <img
          className="h-full w-full full rounded-full max-h-full object-cover"
          alt={`${senderName}'s avatar`}
          src={senderAvatar}
        />
      </div>
      <div className="flex flex-col justify-center items-start">
        <span className="flex text-black dark:text-white justify-start w-full items-center font-semibold text-lg">
          {senderName}
        </span>
        <div className="flex">
          <span className="flex text-zinc-400">{t(description)}</span>
        </div>
      </div>

      {/* <div>{sourceContentElement}</div> */}
      <div className="flex justify-center items-center ml-auto">
        {type === notificationConstants.CROWNED ? (
          <img
            alt="A white crown with three points"
            src={image}
            className="flex w-20 h-20 rounded-round"
          />
        ) : type === notificationConstants.FOLLOWED ? (
          // <User className="flex w-16 h-16 rounded-round font-secondary stroke-secondary" />
          <button className="flex cursor-pointer justify-center items-center px-4 py-2 bg-primary-accent rounded-round text-white font-semibold border-2 border-primary-accent hover:brightness-90 transition-all">
            Follow back
          </button>
        ) : (
          <div className="flex ml-auto">{rightElement}</div>
        )}
      </div>
    </div>
  );
}
