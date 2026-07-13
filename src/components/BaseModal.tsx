'use client';

import { useEffect, FC, ReactNode } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  zIndex?: number;
  maxWidth?: string; // e.g., 'max-w-lg md:max-w-3xl'
  backdropClassName?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

const BaseModal: FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  zIndex = 100,
  maxWidth = 'max-w-lg',
  backdropClassName = 'bg-on-surface/60 ',
  containerClassName = 'p-2 md:p-4',
  wrapperClassName = 'rounded-2xl md:rounded-3xl border-white/20 duration-500',
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  const containerRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        // Only unlock if no other base modals are present in the DOM
        // We check if we are the last modal being removed
        const otherModals = document.querySelectorAll('[data-base-modal="true"]');
        if (otherModals.length <= 1) {
          document.body.style.overflow = originalOverflow || '';
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex }}
      data-base-modal="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 transition-opacity ${backdropClassName}`}
        onClick={onClose}
      ></div>

      {/* Modal Content Wrapper */}
      <div
        ref={containerRef}
        className={`flex min-h-full items-center justify-center pointer-events-none ${containerClassName}`}
      >
        <div
          className={`relative w-full ${maxWidth} bg-white shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300 border border-outline/10 pointer-events-auto ${wrapperClassName} max-h-[80vh] md:max-h-[90vh] overflow-y-auto`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
