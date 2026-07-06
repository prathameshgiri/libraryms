// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import OtpVerify from '../pages/auth/OtpVerify';
import ResetPassword from '../pages/auth/ResetPassword';

// Dashboard
import Dashboard from '../pages/dashboard/Dashboard';

// Books
import BookList from '../pages/books/BookList';
import BookForm from '../pages/books/BookForm';
import BookDetails from '../pages/books/BookDetails';

// People
import Authors from '../pages/authors/Authors';
import Publishers from '../pages/publishers/Publishers';
import Categories from '../pages/categories/Categories';
import MemberList from '../pages/members/MemberList';
import MemberDetails from '../pages/members/MemberDetails';

// Circulation
import IssueBook from '../pages/issue/IssueBook';
import ReturnBook from '../pages/return/ReturnBook';
import FineManagement from '../pages/fines/FineManagement';
import Reservations from '../pages/reservations/Reservations';

// Tools
import Barcodes from '../pages/barcodes/Barcodes';
import Reports from '../pages/reports/Reports';

// Admin
import Staff from '../pages/staff/Staff';
import Notifications from '../pages/notifications/Notifications';
import Settings from '../pages/settings/Settings';
import Profile from '../pages/profile/Profile';

// Error
import NotFound from '../pages/errors/NotFound';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Protected main routes */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Books */}
        <Route path="/books" element={<BookList />} />
        <Route path="/books/add" element={<BookForm />} />
        <Route path="/books/edit/:id" element={<BookForm />} />
        <Route path="/books/:id" element={<BookDetails />} />

        {/* Catalog */}
        <Route path="/authors" element={<Authors />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/categories" element={<Categories />} />

        {/* Members */}
        <Route path="/members" element={<MemberList />} />
        <Route path="/members/:id" element={<MemberDetails />} />

        {/* Circulation */}
        <Route path="/issue" element={<IssueBook />} />
        <Route path="/return" element={<ReturnBook />} />
        <Route path="/fines" element={<FineManagement />} />
        <Route path="/reservations" element={<Reservations />} />

        {/* Tools */}
        <Route path="/barcodes" element={<Barcodes />} />
        <Route path="/reports" element={<Reports />} />

        {/* Admin */}
        <Route path="/staff" element={<Staff />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
