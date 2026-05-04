'use client';

import { FC } from 'react';
import { Portion } from '@/lib/consultations';

interface PortionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  portion: Portion | null;
}

const PortionDetailModal: FC<PortionDetailModalProps> = ({ isOpen, onClose, portion }) => {
  if (!isOpen || !portion) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300 border border-outline/20 p-8 md:p-12">
        <div className="flex justify-between items-start mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
            <span className="material-symbols-outlined text-2xl font-variation-fill">{portion.icon}</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-on-surface">close</span>
          </button>
        </div>

        <h3 className="text-3xl font-normal text-on-surface font-headline mb-6 tracking-tight">
          {portion.title}
        </h3>

        <p className="text-secondary text-lg leading-relaxed font-body">
          {portion.expandedDetail}
        </p>

        <div className="mt-10 pt-8 border-t border-outline/10">
          <button
            onClick={onClose}
            className="w-full py-4 bg-primary text-white rounded-full font-label text-xs font-medium tracking-[0.1em] uppercase shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortionDetailModal;
