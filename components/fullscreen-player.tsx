import usePopularPosts from '@/custom-hooks/usePopularPosts';
import { fileType } from '@/src/constants/common';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from './assets/x';
import Card from './card/card';
import Styles from './fullscreen-player.module.css';

export default function FullscreenPlayer({
  source = '',
  type = fileType.IMAGE,
  open = false,
  openChange,
}) {
  const data = usePopularPosts();

  return (
    <Dialog.Root open={open} onOpenChange={openChange}>
      <Dialog.Trigger></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={Styles.DialogOverlay} />
        <Dialog.Content className={Styles.DialogContent}>
          <Dialog.Title className={Styles.DialogTitle}>
            This is the title
          </Dialog.Title>
          <Dialog.Description className={Styles.DialogDescription}>
            {`Make changes to your profile here. Click save when you're done.`}
          </Dialog.Description>

          <div className="flex justify-start items-center">
            {type === fileType.IMAGE ? (
              <img
                alt=""
                loading="lazy"
                // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
                className="h-80 w-80"
                src={source}
              />
            ) : type === fileType.VIDEO ? (
              <video
                autoPlay
                muted
                loop
                controls
                className="h-80 w-80"
                src={source}
              />
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className={Styles.Button}>Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className={Styles.IconButton} aria-label="Close">
              <X className="stroke-text-color" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
