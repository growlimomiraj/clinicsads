import React, { useEffect } from 'react';
import { X, Check, ArrowRight, Layers } from 'lucide-react';
import { ServiceCardData, SolutionCardData } from '../data/siteContent';

interface DetailPanelModalProps {
  selectedService: ServiceCardData | null;
  selectedSolution: SolutionCardData | null;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
}

export const DetailPanelModal: React.FC<DetailPanelModalProps> = ({
  selectedService,
  selectedSolution,
  onClose,
  onBookService,
}) => {
  const isOpen = Boolean(selectedService || selectedSolution);

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

  const title = selectedService ? selectedService.title : selectedSolution?.title || '';
  const subtitle = selectedService
    ? 'Core Clinic Marketing Service'
    : selectedSolution?.modalDetails.subtitle || '';
  const summary = selectedService
    ? selectedService.details.overview
    : selectedSolution?.modalDetails.summary || '';
  const points = selectedService
    ? selectedService.details.deliverables
    : selectedSolution?.modalDetails.keyPoints || [];
  const methodology = selectedService?.details.methodology;
  const bottomNote = selectedService
    ? `Ideal for: ${selectedService.details.idealFor}`
    : selectedSolution?.modalDetails.note;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183B2B]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <div className="relative w-full max-w-[560px] rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl border border-[#DFECC8] max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details panel"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F3F8E9] text-[#183B2B] hover:bg-[#DFECC8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pr-8 mb-4">
          <span className="text-[12px] font-bold text-[#7A9A2E] tracking-wide">
            {subtitle}
          </span>
          <h2
            id="detail-modal-title"
            className="text-[24px] font-extrabold text-[#183B2B] mt-0.5"
          >
            {title}
          </h2>
        </div>

        <p className="text-[14px] text-[#59665D] leading-[1.7] mb-5">
          {summary}
        </p>

        <div className="rounded-2xl bg-[#F3F8E9] p-5 border border-[#DFECC8] mb-5">
          <h3 className="text-[13.5px] font-bold text-[#183B2B] mb-3">
            What Is Included
          </h3>
          <ul className="space-y-2.5">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[13px] text-[#183B2B]/90">
                <span className="w-5 h-5 rounded-full bg-[#99BC44] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {methodology && methodology.length > 0 && (
          <div className="rounded-2xl bg-white p-5 border border-[#DFECC8] mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#7A9A2E]" />
              <h3 className="text-[13.5px] font-bold text-[#183B2B]">
                4-Step Execution Framework (Ads by Usman &amp; GrowLimo)
              </h3>
            </div>
            <ul className="space-y-2">
              {methodology.map((step, idx) => (
                <li key={idx} className="text-[12.5px] text-[#59665D] leading-relaxed">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {bottomNote && (
          <p className="text-[12.5px] text-[#59665D] bg-[#F9FCF4] px-4 py-3 rounded-xl border border-[#E7F0D8] mb-6">
            {bottomNote}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-[13px] font-semibold text-[#59665D] hover:text-[#183B2B] cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookService(title);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F97316] text-white text-[13px] font-bold hover:bg-[#EA580C] transition-colors cursor-pointer"
          >
            <span>Discuss {title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
