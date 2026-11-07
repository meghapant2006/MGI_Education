import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';

interface FloatingCTAProps {
  onOpenEnquiry: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenEnquiry }) => {
  return (
    <>
      {/* Floating Desktop WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end space-y-3">
        <a
          href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20course%20and%20admission%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition transform hover:-translate-y-1"
          aria-label="WhatsApp Counselor"
        >
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
          <MessageCircle className="w-5 h-5" />
          <span className="font-bold text-sm tracking-wide">WhatsApp Us</span>
        </a>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 py-2 px-3 flex sm:hidden items-center justify-around shadow-2xl">
        <a
          href="tel:+918929909708"
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-700 active:text-brand-600"
        >
          <Phone className="w-5 h-5 text-brand-600 mb-0.5" />
          <span className="text-[11px] font-bold">Call Now</span>
        </a>

        <a
          href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20admission%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-emerald-600 font-bold"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">WhatsApp</span>
        </a>

        <button
          onClick={onOpenEnquiry}
          className="flex-1 flex flex-col items-center justify-center py-1 bg-brand-600 text-white rounded-lg font-bold shadow-md mx-1"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span className="text-[11px]">Enquire</span>
        </button>
      </div>
    </>
  );
};
