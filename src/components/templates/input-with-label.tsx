import './input-with-label.css';

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
}: InputWithLabelProps) {
  return (
    <>
      <div className="flex justify-start items-center cursor-default">
        <label
          htmlFor={name}
          className="flex flex-col my-2 justify-center items-start font-normal text-var(--text-color)"
        >
          {label}
        </label>

        {spinner ? <div className="ml-auto lds-dual-ring"></div> : null}
      </div>
      <div
        className={`flex flex-col justify-center items-start border-transparent cursor-default`}
      >
        <input
          value={value}
          className={`rounded box-border p-1 px-2 flex w-full border-2 text-text-color text-base mb-2 min-h-[50px] bg-bg min-w-[325px] ${
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
