import "./App.scss";
import { ProjectSection } from "./components/ProjectSection/ProjectSection";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AddProject } from "./components/ProjectSection/AddProject";
import { ProjectModal } from "./components/ProjectModal/ProjectModal";
import { Timer } from "./components/ProjectModal/Timer";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogin } from "@react-oauth/google";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import { Auth } from "./components/Auth";


function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const background = location.state && location.state.background;

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <AuthProvider>
        <>
          {isLoading ? null : (
            <div>
              <Routes>
                <Route path="projects" element={<ProjectSection />} />
                <Route path="add-project" element={<AddProject />} />
              </Routes>

              <Routes location={background || location}>
                <Route path="/projects/:id" element={<ProjectModal />}>
                  <Route path="timer/:taskID" element={<Timer />} />
                </Route>
              </Routes>

              {background && (
                <Routes>
                  <Route
                    path="/projects/:projectName/timer/task/:taskIndex"
                    element={<Timer />}
                  />
                </Routes>
              )}
            </div>
          )}

          <Auth setIsLoading={setIsLoading}/>
        </>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
