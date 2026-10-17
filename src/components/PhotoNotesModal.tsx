import React, { useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import { PHOTO_ASSETS } from '../data/siteContent';

interface PhotoNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoNotesModal: React.FC<PhotoNotesModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const photos = Object.values(PHOTO_ASSETS);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183B2B]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-notes-title"
    >
      <div className="relative w-full max-w-[620px] rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl border border-[#DFECC8] max-h-[88vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photography notes"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F3F8E9] text-[#183B2B] hover:bg-[#DFECC8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <Camera className="w-5 h-5 text-[#99BC44]" />
          <h2
            id="photo-notes-title"
            className="text-[20px] font-extrabold text-[#183B2B]"
          >
            Photography Substitute Registry
          </h2>
        </div>

        <p className="text-[13.5px] text-[#59665D] leading-relaxed mb-5">
          Because only the full-page reference screenshot was provided rather than
          separate high-resolution portrait files, the following appropriately
          licensed substitute portraits are used to preserve pose, framing, and
          lighting without stretching tiny screenshot crops. All paths are
          centralized in <code className="text-[12px] bg-[#F3F8E9] px-1.5 py-0.5 rounded text-[#183B2B]">src/data/siteContent.ts</code> (`PHOTO_ASSETS`) for one-line replacement.
        </p>

        <div className="space-y-3 mb-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="p-3.5 rounded-xl bg-[#F3F8E9]/70 border border-[#DFECC8] flex items-start gap-3.5"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-bold text-[#183B2B]">
                    {photo.label}
                  </p>
                  <span className="text-[11px] font-medium text-[#7A9A2E] shrink-0">
                    Substitute Photo
                  </span>
                </div>
                <p className="text-[12px] text-[#59665D] mt-0.5">
                  {photo.roleInLayout}
                </p>
                <p className="text-[11.5px] text-[#183B2B]/80 mt-1">
                  {photo.substituteNote}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#99BC44] text-white text-[13px] font-bold hover:bg-[#88a93a] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
