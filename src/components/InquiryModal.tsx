import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Info, Phone, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteContent';

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
  const [clinicName, setClinicName] = useState('');
  const [website, setWebsite] = useState('');
  const [service, setService] = useState(defaultService);
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
    setSubmittedDemo(true);
  };

  const handleResetAndClose = () => {
    setSubmittedDemo(false);
    onClose();
  };

  const mailtoSubject = encodeURIComponent(
    `ClinicsAds Strategy Call Request — ${clinicName || 'Clinic Inquiry'}`
  );
  const mailtoBody = encodeURIComponent(
    `Name: ${name}\nWork Email: ${email}\nClinic Name: ${clinicName}\nWebsite: ${
      website || 'Not provided'
    }\nService of Interest: ${service}`
  );
  const composedMailtoUrl = `mailto:${SITE_CONFIG.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183B2B]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="relative w-full max-w-[510px] rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl border border-[#DFECC8] max-h-[92vh] overflow-y-auto">
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
            <div className="mb-5 pr-8">
              <span className="text-[12px] font-bold text-[#7A9A2E] tracking-wide">
                ClinicsAds · {SITE_CONFIG.parentNetwork.agencyName} &amp;{' '}
                {SITE_CONFIG.parentNetwork.founderSiteName}
              </span>
              <h2
                id="inquiry-modal-title"
                className="text-[24px] font-extrabold text-[#183B2B] mt-0.5"
              >
                Book a Strategy Consultation
              </h2>
              <p className="text-[13.5px] text-[#59665D] mt-1">
                Tell us about your clinic and the services you want to grow. Flexible month-to-month agreements.
              </p>
            </div>

            {/* Direct Contact Strip from growlimo.com */}
            <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-[#F9FCF4] border border-[#E7F0D8] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#183B2B]">
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="inline-flex items-center gap-1.5 font-semibold hover:text-[#7A9A2E] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#99BC44]" />
                <span>{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
              <a
                href={SITE_CONFIG.contact.emailHref}
                className="inline-flex items-center gap-1.5 font-semibold hover:text-[#7A9A2E] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#99BC44]" />
                <span>{SITE_CONFIG.contact.email}</span>
              </a>
            </div>

            {!SITE_CONFIG.submissionEndpoint && (
              <div className="mb-5 p-3.5 rounded-xl bg-[#F3F8E9] border border-[#C7DCA5] flex items-start gap-2.5 text-[12px] text-[#183B2B]">
                <Info className="w-4 h-4 text-[#7A9A2E] shrink-0 mt-0.5" />
                <span>
                  <strong>Interactive Demo Mode:</strong> No backend API endpoint is
                  configured yet. Submitting prepares your inquiry summary so you
                  can review it or send it directly to{' '}
                  <span className="font-semibold">{SITE_CONFIG.contact.email}</span>.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="inquiry-name"
                  className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                >
                  Name <span className="text-[#7A9A2E]">*</span>
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Sarah Jenkins / Practice Manager"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-email"
                  className="block text-[13px] font-semibold text-[#183B2B] mb-1"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-clinic"
                  className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                >
                  Clinic Name <span className="text-[#7A9A2E]">*</span>
                </label>
                <input
                  id="inquiry-clinic"
                  type="text"
                  required
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="Oakridge Dental & Family Clinic"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-website"
                  className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                >
                  Website <span className="text-[#59665D] font-normal">(optional)</span>
                </label>
                <input
                  id="inquiry-website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourclinic.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-service"
                  className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                >
                  Service of Interest
                </label>
                <select
                  id="inquiry-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                >
                  <option value="Google Ads">Google Ads</option>
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="ChatGPT & AI Search">ChatGPT &amp; AI Search</option>
                  <option value="Clinic SEO & Local Search">Clinic SEO &amp; Local Search</option>
                  <option value="Landing Pages">Landing Pages</option>
                  <option value="Tracking & Follow-Up">Tracking &amp; Follow-Up (GA4 / GTM)</option>
                  <option value="Clinic Landing Pages">Clinic Landing Pages</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-full text-[13px] font-semibold text-[#59665D] hover:text-[#183B2B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-[#99BC44] text-white text-[13.5px] font-bold hover:bg-[#88a93a] transition-colors shadow-sm cursor-pointer"
                >
                  Preview Inquiry Summary
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-3">
            <div className="w-12 h-12 rounded-full bg-[#F3F8E9] border border-[#99BC44] flex items-center justify-center text-[#183B2B] mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#99BC44]" />
            </div>

            <h3 className="text-[20px] font-extrabold text-[#183B2B] mb-2">
              Demo Preview Ready (Not Automatically Sent)
            </h3>
            <p className="text-[13px] text-[#59665D] leading-relaxed mb-4">
              Because no automated form webhook is configured yet, your inquiry
              has been formatted below. You can send it directly via your email
              client to{' '}
              <strong className="text-[#183B2B]">{SITE_CONFIG.contact.email}</strong>{' '}
              or call <strong className="text-[#183B2B]">{SITE_CONFIG.contact.phoneDisplay}</strong>.
            </p>

            <div className="rounded-xl bg-[#F3F8E9] p-4 space-y-2 text-[13px] text-[#183B2B] mb-6 border border-[#DFECC8]">
              <div>
                <span className="font-semibold">Name:</span> {name}
              </div>
              <div>
                <span className="font-semibold">Work Email:</span> {email}
              </div>
              <div>
                <span className="font-semibold">Clinic Name:</span> {clinicName}
              </div>
              {website && (
                <div>
                  <span className="font-semibold">Website:</span> {website}
                </div>
              )}
              <div>
                <span className="font-semibold">Selected Service:</span> {service}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSubmittedDemo(false)}
                className="px-4 py-2.5 rounded-full border border-[#C7DCA5] text-[#183B2B] text-[12.5px] font-semibold hover:bg-[#F3F8E9] cursor-pointer"
              >
                Edit Details
              </button>
              <a
                href={composedMailtoUrl}
                className="px-5 py-2.5 rounded-full bg-[#99BC44] text-[#183B2B] text-[12.5px] font-bold hover:bg-[#a9cb53] transition-colors"
              >
                Open in Email ({SITE_CONFIG.contact.email})
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2.5 rounded-full bg-[#99BC44] text-white text-[12.5px] font-bold hover:bg-[#88a93a] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
