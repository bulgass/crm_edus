import React from 'react';
import { Tabs, Tab } from '@mui/material'; 

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="profile-page">
      <div className="main-content">
        <div className="profile-header">
          <img src="profile-pic-url" alt="Profile" />
          <h1>John Doe</h1>
          <p>Software Engineer at XYZ</p>
        </div>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Details" />
          <Tab label="Activity" />
          <Tab label="Files" />
        </Tabs>
        <div className="tab-content">
          {activeTab === 0 && <div>Details Content</div>}
          {activeTab === 1 && <div>Activity Content</div>}
          {activeTab === 2 && <div>Files Content</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
