import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LeadDataProvider } from './context/LeadDataContext';
import { AuthProvider, useAuth } from './lib/authContext';
import { supabase } from './lib/supabaseClient';
import SchemaMarkup from './components/SchemaMarkup';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ExitIntentPopup from './components/ExitIntentPopup';
import CouponBadge from './components/CouponBadge';

// Client Pages
import Home from './pages/client/Home';
import ServiceDetail from './pages/client/ServiceDetail';
import CityDetail from './pages/client/CityDetail';
import Blog from './pages/client/Blog';
import BlogPost from './pages/client/BlogPost';
import { 
  About, Financing, BrandsWeRepair, Reviews, 
  FAQ, Contact, Privacy, Terms 
} from './pages/client/OtherPages';

// Admin CRM Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import LeadsKanban from './pages/admin/LeadsKanban';
import CalendarView from './pages/admin/CalendarView';
import Technicians from './pages/admin/Technicians';
import Invoices from './pages/admin/Invoices';
import Settings from './pages/admin/Settings';

// ─── Protected Route Guard ───────────────────────────────────────
// When Supabase is configured: require auth session
// When no Supabase: pass through (local development mode)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (!supabase) {
    // Local mode — no auth required
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

// ─── App Content (inside Router) ─────────────────────────────────
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Schema SEO injection */}
      <SchemaMarkup />

      {/* Exit Intent Overlay */}
      {!isAdminRoute && (
        <ExitIntentPopup onBookClick={() => setBookingOpen(true)} />
      )}

      {/* Floating Coupon Badge */}
      {!isAdminRoute && (
        <CouponBadge onClick={() => setBookingOpen(true)} />
      )}

      {/* Client Header */}
      {!isAdminRoute && (
        <Header onBookClick={() => setBookingOpen(true)} />
      )}

      {/* Main Pages Workspace */}
      <div className="flex-1">
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Home onBookClick={() => setBookingOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/cities/:cityId" element={<CityDetail />} />
          <Route path="/brands" element={<BrandsWeRepair onBookClick={() => setBookingOpen(true)} />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Admin Login (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin CRM Routes (protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<LeadsKanban />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="technicians" element={<Technicians />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>

      {/* Booking Form Modal Overlay */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Client Footer */}
      {!isAdminRoute && (
        <Footer onBookClick={() => setBookingOpen(true)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LeadDataProvider>
        <Router>
          <AppContent />
        </Router>
      </LeadDataProvider>
    </AuthProvider>
  );
}
