import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NoticeTicker } from './components/NoticeTicker';
import { FloatingCTA } from './components/FloatingCTA';
import { InquiryModal } from './components/InquiryModal';

import { Home } from './pages/Home';
import { UniversityCourses } from './pages/UniversityCourses';
import { NIOSAdmission } from './pages/NIOSAdmission';
import { ComputerCourses } from './pages/ComputerCourses';
import { VerifyCertificate } from './pages/VerifyCertificate';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState<string | undefined>(undefined);
  const [modalCategory, setModalCategory] = useState<string | undefined>('general');

  const handleOpenEnquiry = (courseName?: string, category?: string) => {
    setModalCourse(courseName);
    setModalCategory(category || 'general');
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Show Notice ticker and public navbar only on public pages */}
      {!isAdminRoute && (
        <>
          <NoticeTicker />
          <Navbar onOpenEnquiry={handleOpenEnquiry} />
        </>
      )}

      {/* Main Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/university-courses" element={<UniversityCourses onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/nios-admission" element={<NIOSAdmission onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/computer-courses" element={<ComputerCourses onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Home onOpenEnquiry={handleOpenEnquiry} />} />
        </Routes>
      </main>

      {/* Show Footer and floating CTAs only on public pages */}
      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingCTA onOpenEnquiry={() => handleOpenEnquiry()} />
          <InquiryModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            defaultCourse={modalCourse}
            defaultCategory={modalCategory}
          />
        </>
      )}
    </div>
  );
};
