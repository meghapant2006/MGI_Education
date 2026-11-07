import React, { useEffect, useState } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { Notice } from '../types';

export const NoticeTicker: React.FC<{ onNoticeClick?: (notice: Notice) => void }> = ({ onNoticeClick }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadNotices() {
      try {
        const res = await api.getNotices();
        if (res.notices && res.notices.length > 0) {
          setNotices(res.notices);
        }
      } catch (err) {
        console.error('Failed to load notices ticker:', err);
      }
    }
    loadNotices();
  }, []);

  useEffect(() => {
    if (notices.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [notices]);

  if (notices.length === 0) return null;

  const currentNotice = notices[currentIndex];

  return (
    <div className="bg-amber-500 text-navy-950 px-4 py-2 border-b border-amber-600/20 text-xs font-medium flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center space-x-3 overflow-hidden">
        <span className="bg-navy-900 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0 flex items-center space-x-1">
          <Bell className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>LATEST ALERT</span>
        </span>
        <div className="truncate flex-1">
          <span className="font-bold mr-2 text-navy-950">[{currentNotice.category.toUpperCase()}]</span>
          <span>{currentNotice.title} — {currentNotice.content}</span>
        </div>
        <div className="hidden sm:flex items-center space-x-1 shrink-0 text-navy-900 font-bold">
          <span>{currentIndex + 1}/{notices.length}</span>
        </div>
      </div>
    </div>
  );
};
