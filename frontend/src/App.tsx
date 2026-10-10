import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DiscoverCreatorsPage } from './pages/DiscoverCreatorsPage';
import { CreatorDetailPage } from './pages/CreatorDetailPage';
import { CreatorDashboardPage } from './pages/CreatorDashboardPage';
import { CreatorProfileBuilderPage } from './pages/CreatorProfileBuilderPage';
import { CreatorPortfolioPage } from './pages/CreatorPortfolioPage';
import { PortfolioAssistantPage } from './pages/PortfolioAssistantPage';
import { ExploreProjectsPage } from './pages/ExploreProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { CreateBriefPage } from './pages/CreateBriefPage';
import { AiBriefBuilderPage } from './pages/AiBriefBuilderPage';
import { AiCreatorMatchingPage } from './pages/AiCreatorMatchingPage';
import { BrandDashboardPage } from './pages/BrandDashboardPage';
import { ProjectManagementPage } from './pages/ProjectManagementPage';
import { ShortlistPage } from './pages/ShortlistPage';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#080a10] text-slate-100 selection:bg-brand-500 selection:text-white">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Creator Routes */}
          <Route path="/discover-creators" element={<DiscoverCreatorsPage />} />
          <Route path="/creators/:id" element={<CreatorDetailPage />} />
          <Route path="/creator-dashboard" element={<CreatorDashboardPage />} />
          <Route path="/creator-profile-builder" element={<CreatorProfileBuilderPage />} />
          <Route path="/creator-portfolio" element={<CreatorPortfolioPage />} />
          <Route path="/portfolio-assistant" element={<PortfolioAssistantPage />} />

          {/* Project & Brief Routes */}
          <Route path="/explore-projects" element={<ExploreProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/create-brief" element={<CreateBriefPage />} />
          <Route path="/ai-brief-builder" element={<AiBriefBuilderPage />} />
          <Route path="/ai-matching/:id" element={<AiCreatorMatchingPage />} />

          {/* Brand Management Routes */}
          <Route path="/brand-dashboard" element={<BrandDashboardPage />} />
          <Route path="/project-management" element={<ProjectManagementPage />} />
          <Route path="/shortlist" element={<ShortlistPage />} />

          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
