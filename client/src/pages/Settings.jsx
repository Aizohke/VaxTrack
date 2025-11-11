import React, { useState } from 'react';
import {
  Shield,
  Bell,
  // LogOut is no longer needed
  Save, HelpCircle,
  User,
} from 'lucide-react';
// We don't need signOut prop

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];
  
  //... (rest of the component) ...
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ... (header) ... */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => {
                // ... (tab button rendering) ...
              })}

              {/* THE SIGN OUT BUTTON IS GONE.
                It is now handled by the <UserButton /> in PrivateHeader.jsx
              */}
            </nav>
          </div>
          <div className="flex-1 p-8">
            {/* ... (rest of your tab content is fine) ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;