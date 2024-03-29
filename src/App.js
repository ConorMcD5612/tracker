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
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginPage } from "./components/LoginPage/LoginPage";

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
              <Routes location={background || location}>
                <Route element={<PrivateRoute />}>
                <Route path="projects" element={<ProjectSection />} />
                  <Route path="add-project" element={<AddProject />} />
                  <Route path="/projects/:id" element={<ProjectModal />}>
                    <Route path="timer/:taskID" element={<Timer />} />
                  </Route>
                </Route>
                <Route path="*" element={<h1>404 not found</h1>} />
              </Routes>

              {background && (
                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route
                      path="/projects/:projectName/timer/task/:taskIndex"
                      element={<Timer />}
                    />
                  </Route>
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

// <Route path="*" element={<h1>404 not found</h1>} />

export default App;
