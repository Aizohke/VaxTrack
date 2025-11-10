
import React from "react";
import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;