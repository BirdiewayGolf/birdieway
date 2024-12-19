import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Components
import Navbar from './client/components/Navbar/Navbar';
import Footer from './client/components/Footer/Footer';
import HeroSlider from './client/components/HeroSlider/HeroSlider';
import TournamentCard from './client/components/TournamentCard/TournamentCard';

// Public Pages
import Home from './client/pages/public/Home';
import About from './client/pages/public/About';
import Contact from './client/pages/public/Contact';
import TournamentList from './client/pages/public/TournamentList';
import TournamentDetails from './client/pages/public/TournamentDetails';

// Admin Pages
import AdminLogin from './client/pages/admin/Login';
import AdminDashboard from './client/pages/admin/Dashboard';
import CreateTournament from './client/pages/admin/tournaments/CreateTournament';
import EditTournament from './client/pages/admin/tournaments/EditTournament';
import AdminTournamentList from './client/pages/admin/tournaments/TournamentList';
import TournamentLeaderboard from './client/pages/admin/tournaments/TournamentLeaderboard';

// Auth Guard Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Navbar appears on all pages */}
        <Navbar />
        
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Tournament Routes */}
            <Route path="/tournaments">
              <Route index element={<TournamentList />} />
              <Route path="business" element={<TournamentList league="business" />} />
              <Route path="junior" element={<TournamentList league="junior" />} />
              <Route path="longday" element={<TournamentList league="longday" />} />
              <Route path="fundraisers" element={<TournamentList league="fundraiser" />} />
              <Route path=":id" element={<TournamentDetails />} />
            </Route>

            {/* Standings Routes */}
            <Route path="/standings">
              <Route path="business" element={<TournamentList type="standings" league="business" />} />
              <Route path="junior" element={<TournamentList type="standings" league="junior" />} />
              <Route path="private" element={<TournamentList type="standings" league="private" />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin">
              <Route path="login" element={<AdminLogin />} />
              
              {/* Protected Admin Routes */}
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="tournaments" element={
                <ProtectedRoute>
                  <AdminTournamentList />
                </ProtectedRoute>
              } />
              
              <Route path="tournaments/create" element={
                <ProtectedRoute>
                  <CreateTournament />
                </ProtectedRoute>
              } />
              
              <Route path="tournaments/:id/edit" element={
                <ProtectedRoute>
                  <EditTournament />
                </ProtectedRoute>
              } />
              
              <Route path="tournaments/:id/leaderboard" element={
                <ProtectedRoute>
                  <TournamentLeaderboard />
                </ProtectedRoute>
              } />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer appears on all pages */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;