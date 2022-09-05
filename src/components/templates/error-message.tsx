import { t } from 'i18next';

type ErrorMessageProps = {
  message: string;
};
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex my-2 p-4 border-red-500 bg-[#f52d2d61]">
      <div className="flex flex-col justify-center items-center">
        <span className="text-red-500 text-lg font-semibold">
          {t('uhOh')} 😔
        </span>
        <span className="text-red-500 text-base">{message}</span>
      </div>
    </div>
  );
}
