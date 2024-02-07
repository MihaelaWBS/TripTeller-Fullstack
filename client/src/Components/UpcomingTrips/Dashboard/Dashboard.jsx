import React from "react";
import SidebarComponent from "../Sidebar/SidebarComponent";
import Trips from "../Trips/Trips";

const Dashboard = () => {
  return (
    <div className="flex max-w-5xl mt-20 mx-auto w-full gap-8">
      <SidebarComponent />
      <Trips />
    </div>
  );
};

export default Dashboard;
