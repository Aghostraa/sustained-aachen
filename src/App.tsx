// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ImpactPage from './pages/ImpactPage';
import GovernancePage from './pages/GovernancePage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import EcoFundSimPage from './pages/EcoFundSimPage';
import ProjectAdminPage from './pages/ProjectAdminPage';
import StudentQFRoundPage from './pages/StudentQFRoundPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/learning" element={<HomePage />} />
          {/* Other routes will be added as we build more pages */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          {/* Add EcoFundSim route */}
          <Route path="/ecofundsim" element={<EcoFundSimPage />} />
          {/* Add Student QF Round route */}
          <Route path="/student-qf-round" element={<StudentQFRoundPage />} />
          {/* Add Project Admin Dashboard route */}
          <Route path="/project/:projectId/admin" element={<ProjectAdminPage />} />
          {/* Redirects for easier navigation to each project */}
          <Route path="/baumschutzbund" element={<Navigate to="/project/baumschutzbund" replace />} />
          <Route path="/aachenwasgeht" element={<Navigate to="/project/aachenwasgeht" replace />} />
          <Route path="/uniurbanmobil" element={<Navigate to="/project/uniurbanmobil" replace />} />
          <Route path="/nachhaltigangezogen" element={<Navigate to="/project/nachhaltigangezogen" replace />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;