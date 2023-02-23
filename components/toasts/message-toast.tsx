import type { Toast } from 'react-hot-toast';

export default function MessageToast({
  t,
  toast,
  sender,
  message,
}: {
  t: Toast;
  toast: any;
  sender: string;
  message: string;
}) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-bg shadow-lg rounded-lg shadow-shadow pointer-events-auto flex ring-primary-accent ring-2 opacity-75`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-text-color">{sender}</p>
            <p className="mt-1 text-sm text-secondary">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-line">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-text-color hover:text-primary-accent focus:outline-none hover:ring-2 hover:ring-primary-accent focus:ring-2 focus:ring-primary-accent  "
        >
          Close
        </button>
      </div>
    </div>
  );
}
