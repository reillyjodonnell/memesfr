import './input-with-label.css';
import { ReactComponent as Checkmark } from '../../assets/icons/checkmark-with-circle.svg';
type InputWithLabelProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id: string;
  value?: string;
  onChange?: any;
  onPaste?: any;
  spinner?: boolean;
  error?: boolean;
  errorMessage?: string;
  autoComplete?: string;
  showCheckmark?: boolean;
};
export default function InputWithLabel({
  label,
  name,
  type = 'text',
  placeholder,
  id,
  value = '',
  onChange = null,
  onPaste = null,
  spinner,
  error = false,
  errorMessage,
  autoComplete = '',
  showCheckmark = false,
}: InputWithLabelProps) {
  return (
    <>
      <div className="flex justify-start items-center cursor-default ">
        <label
          htmlFor={name}
          className="flex flex-col justify-center items-start font-normal text-var(--text-color)"
        >
          {label}
        </label>

        {spinner ? <div className="ml-auto lds-dual-ring"></div> : null}
        {showCheckmark ? <Checkmark className="w-5 h-5 ml-auto" /> : null}
      </div>
      <div
        className={`flex flex-col justify-center items-start border-transparent cursor-default`}
      >
        <input
          autoComplete={autoComplete}
          value={value}
          className={`rounded-round box-border p-1 px-2 flex w-full border-2 text-text-color text-base mb-2 min-h-[50px] bg-bg  ${
            error
              ? 'border-red-500 focus:border-red-500 focus:outline-none active:border-red-500'
              : 'border-line'
          } `}
          onChange={onChange}
          onPaste={onPaste}
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
        />
        {error ? (
          <div className="flex border-red-500 bg-[#ef44443f] p-2 text-red-500">
            <span className="text-red-500 font-medium ">{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </>
  );
}
