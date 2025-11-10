
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Layout from "./components/Layout/Layout";
import PublicLayout from "./components/Layout/PublicLayout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// Public Pages
import LandingPage from "./pages/Public/LandingPage";
import AboutPage from "./pages/Public/AboutPage";
import PublicInfoPage from "./pages/Public/PublicInfoPage";

// Private Pages
import Dashboard from "./Pages/private/Dashboard";
import ChildrenManagement from "./pages/Private/ChildrenManagement";
import VaccinationTracker from "./pages/Private/VaccinationTracker";
import ClinicFinder from "./pages/Private/ClinicFinder";
import Reminders from "./pages/Private/Reminders";
import AIAssistant from "./pages/Private/AIAssistant";
import RealTimeChat from "./pages/Private/RealTimeChat";
import Settings from "./pages/Private/Settings";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="info" element={<PublicInfoPage />} />
        </Route>

        {/* Private Routes */}
        {isSignedIn && (
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="children" element={<ChildrenManagement />} />
            <Route path="tracker" element={<VaccinationTracker />} />
            <Route path="clinics" element={<ClinicFinder />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="chat" element={<RealTimeChat />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;