import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fullWidth?: boolean;
  disableBackdropClick?: boolean;
  showCloseIcon?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

const CustomModal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'md',
  fullWidth = false,
  disableBackdropClick = false,
  showCloseIcon = false,
}: ModalProps) => {
  return (
    <Dialog
      as='div'
      className='relative z-50'
      open={open}
      onClose={() => !disableBackdropClick && onClose()}
    >
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/50' />

      {/* Modal Container */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Transition
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
          show={open}
          appear={true}
        >
          <div
            className={clsx(
              'w-full transform rounded-xl bg-white p-4 shadow-xl transition-all relative',
              fullWidth ? 'w-full max-w-full' : maxWidthClasses[maxWidth],
            )}
          >
            {title && (
              <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
            )}
            {showCloseIcon && (
              <XMarkIcon
                className='w-6 h-6 -ml-8  cursor-pointer absolute top-4 right-4 text-primary'
                onClick={() => {
                  onClose();
                }}
              />
            )}
            <div className='mt-4'>{children}</div>

            {actions && (
              <div className='mt-6 flex justify-end gap-2'>{actions}</div>
            )}
          </div>
        </Transition>
      </div>
    </Dialog>
  );
};

export default CustomModal;
