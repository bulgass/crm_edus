import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./providers/authProvider/authProvider";
import Login from "./components/pages/auth/login/login";
import Homepage from "./components/pages/home/homepage";
import Profile from "./components/pages/profile/profile";
import CheckUsers from "./components/pages/checkUsers/checkUsers";
import Inbox from "./components/pages/inbox/inbox";
import FoldersRoutes from "./components/pages/home/foldersRoutes";
import SystemWatcher from "./components/systemWatcher/systemWatcher";
import SettingsComponent from "./components/pages/settings/settings"; 
import BackgroundColorSettings from "./components/pages/settings/backgoundColorSettings";
import "./App.css";

function App() {
  const { currentUser, userRole } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          {currentUser ? (
            <>
              <Route path="/" element={<Homepage />}>
                <Route path="folders/*" element={<FoldersRoutes />} />
              </Route>

              <Route path="/settings" element={<SettingsComponent />}>
                <Route path="background-color" element={<BackgroundColorSettings />} />
                
              </Route>

              <Route path="/profile" element={<Profile />} />
              {userRole === "admin" && (
                <>
                  <Route path="/check-users" element={<CheckUsers />} />
                  <Route path="/dashboard" element={<SystemWatcher />} /> 
                </>
              )}
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
