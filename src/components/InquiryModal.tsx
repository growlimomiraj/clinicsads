import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Phone, Mail, Calendar, Clock, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteContent';
import { addInquiry } from '../data/inquiriesStore';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Google Ads',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [website, setWebsite] = useState('');
  const [service, setService] = useState(defaultService);
  const [preferredTime, setPreferredTime] = useState('Morning (9am - 12pm)');
  const [notes, setNotes] = useState('');
  const [submittedDemo, setSubmittedDemo] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setService(defaultService);
    }
  }, [defaultService]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name,
      email,
      phone: phone || undefined,
      clinicName: clinicName || 'Clinic Practice',
      website: website || undefined,
      service,
      preferredTime,
      message: notes || `Requested Strategy Call for ${service}`,
      source: 'call-booking',
    });
    setSubmittedDemo(true);
  };

  const handleResetAndClose = () => {
    setSubmittedDemo(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183B2B]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="relative w-full max-w-[530px] rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl border border-[#DFECC8] max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close inquiry modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F3F8E9] text-[#183B2B] hover:bg-[#DFECC8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!submittedDemo ? (
          <>
            <div className="mb-4 pr-8">
              <span className="text-[12px] font-bold text-[#7A9A2E] tracking-wide inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#99BC44]" />
                ClinicsAds · Direct Strategy Intake
              </span>
              <h2
                id="inquiry-modal-title"
                className="text-[23px] font-extrabold text-[#183B2B] mt-0.5 tracking-tight"
              >
                Book a Growth Strategy Call
              </h2>
              <p className="text-[13px] text-[#59665D] mt-1">
                Your booking request is routed directly to our Admin Dashboard for instant review. No email client needed.
              </p>
            </div>

            {/* Direct Contact Strip */}
            <div className="mb-4 px-3.5 py-2 rounded-xl bg-[#F9FCF4] border border-[#E7F0D8] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#183B2B]">
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="inline-flex items-center gap-1.5 font-semibold hover:text-[#7A9A2E] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#99BC44]" />
                <span>{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
              <span className="text-gray-400">·</span>
              <span className="text-gray-600 font-medium">Direct routing to Admin Dashboard</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-[12.5px] font-semibold text-[#183B2B] mb-1"
                  >
                    Your Name <span className="text-[#7A9A2E]">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C7DCA5] text-[13.5px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-[12.5px] font-semibold text-[#183B2B] mb-1"
                  >
                    Work Email <span className="text-[#7A9A2E]">*</span>
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@yourclinic.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C7DCA5] text-[13.5px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="inquiry-clinic"
                    className="block text-[12.5px] font-semibold text-[#183B2B] mb-1"
                  >
                    Clinic Name <span className="text-[#7A9A2E]">*</span>
                  </label>
                  <input
                    id="inquiry-clinic"
                    type="text"
                    required
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    placeholder="Oakridge Dental & Aesthetics"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C7DCA5] text-[13.5px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-[12.5px] font-semibold text-[#183B2B] mb-1"
                  >
                    Phone / WhatsApp <span className="text-[#59665D] font-normal">(optional)</span>
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7123 456789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C7DCA5] text-[13.5px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="inquiry-service"
                    className="block text-[12.5px] font-semibold text-[#183B2B] mb-1"
                  >
                    Primary Service Needed
                  </label>
                  <select
                    id="inquiry-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C7DCA5] text-[13.5px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Landing Pages">Landing Pages</option>
                    <option value="ChatGPT & AI Search">ChatGPT &amp; AI Search</option>
                    <option value="Clinic SEO & Local Search">Clinic SEO &amp; Maps 3-Pack</option>
                    <option value="Tracking & Follow-Up">Tracking &amp; Follow-Up (GA4 / GTM)</option>
                    <option value="Clinic Landing Pages">Clinic Landing Pages</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-time"
                    className="block text-[12.5px] font-semibold text-[#183B2B] mb-1"
                  >
                    Preferred Call Time
                  </label>
                  <select
                    id="inquiry-time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C7DCA5] text-[13.5px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                  >
                    <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                    <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                    <option value="Evening (4pm - 7pm)">Evening (4pm - 7pm)</option>
                    <option value="ASAP / Next Available">ASAP / Next Available</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-website"
                  className="block text-[12.5px] font-semibold text-[#183B2B] mb-1"
                >
                  Clinic Website <span className="text-[#59665D] font-normal">(optional)</span>
                </label>
                <input
                  id="inquiry-website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourclinic.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#C7DCA5] text-[13.5px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-notes"
                  className="block text-[12.5px] font-semibold text-[#183B2B] mb-1"
                >
                  Key Objectives / Current Monthly Spend <span className="text-[#59665D] font-normal">(optional)</span>
                </label>
                <textarea
                  id="inquiry-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Opening new branch in November, aiming for 25+ private patient consultations/mo..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#C7DCA5] text-[13px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-full text-[13px] font-semibold text-[#59665D] hover:text-[#183B2B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#F97316] text-white text-[13.5px] font-bold hover:bg-[#EA580C] transition-colors shadow-[0_4px_14px_rgba(249,115,22,0.3)] cursor-pointer"
                >
                  Confirm Strategy Call Booking →
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-3">
            <div className="w-12 h-12 rounded-full bg-[#F3F8E9] border border-[#99BC44] flex items-center justify-center text-[#183B2B] mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#99BC44]" />
            </div>

            <h3 className="text-[21px] font-extrabold text-[#183B2B] mb-1">
              Strategy Call Booked!
            </h3>
            <p className="text-[13.5px] text-[#59665D] leading-relaxed mb-4">
              Your call inquiry has been routed directly to the{' '}
              <strong className="text-[#183B2B]">ClinicsAds Admin Panel</strong>. Usman and the healthcare marketing team will review your clinic's objectives and reach out for the strategy consultation.
            </p>

            <div className="rounded-xl bg-[#F3F8E9] p-4 space-y-2 text-[13px] text-[#183B2B] mb-6 border border-[#DFECC8]">
              <div>
                <span className="font-semibold text-gray-700">Client / Doctor:</span> {name}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Work Email:</span> {email}
              </div>
              {phone && (
                <div>
                  <span className="font-semibold text-gray-700">Phone / WhatsApp:</span> {phone}
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-700">Clinic Name:</span> {clinicName}
              </div>
              {website && (
                <div>
                  <span className="font-semibold text-gray-700">Website:</span> {website}
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-700">Selected Service:</span> {service}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Preferred Time:</span> {preferredTime}
              </div>
              {notes && (
                <div>
                  <span className="font-semibold text-gray-700">Notes:</span> {notes}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  handleResetAndClose();
                  window.location.hash = 'admin';
                }}
                className="px-5 py-2.5 rounded-full bg-[#183B2B] text-white text-[12.5px] font-bold hover:bg-[#23503b] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>View in Admin Portal</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2.5 rounded-full bg-[#F97316] text-white text-[12.5px] font-bold hover:bg-[#EA580C] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
