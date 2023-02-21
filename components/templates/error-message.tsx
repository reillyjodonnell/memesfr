import { t } from 'i18next';
import { useState } from 'react';
import { ReactComponent as X } from '../../assets/svg/x.svg';
type ErrorMessageProps = {
  message: string;
};
export default function ErrorMessage({ message }: ErrorMessageProps) {
  const [show, setShow] = useState(true);
  return show ? (
    <div className="flex justify-center rounded-md items-center w-full my-2 p-4 border-red-500 bg-[#f52d2d61] relative">
      <div
        onClick={() => setShow((prev) => !prev)}
        className="flex absolute right-2 top-2"
      >
        <X className="stroke-white w-8 h-8 hover:bg-hover hover:scale-110 transition-all rounded-full" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-red-500 text-lg font-semibold">
          {t('uhOh')} 😔
        </span>
        <span className="text-red-500 text-base">{message}</span>
      </div>
    </div>
  ) : null;
}
