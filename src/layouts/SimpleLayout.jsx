import React from "react";
import { Outlet } from "react-router-dom";

function SimpleLayout() {
  return (
    <div className='bg-blue-200 min-h-screen flex flex-col'>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default SimpleLayout;
