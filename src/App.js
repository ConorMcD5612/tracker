import "./App.scss";
import { ProjectSection } from "./components/ProjectSection/ProjectSection";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AddProject } from "./components/ProjectSection/AddProject";
import { ProjectModal } from "./components/ProjectModal/ProjectModal";
import { Timer } from "./components/ProjectModal/Timer";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogin } from "@react-oauth/google";


function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  

  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential)
    console.log(decoded)
    //Make user 
    const {sub} = decoded;
    console.log(sub)

    //if user exists 
    await fetch(`http://localhost:5000/add-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sub: sub}),
    });
  }

 

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
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
      <GoogleLogin
        onSuccess={(response) => createOrGetUser(response)}
        onError={() => console.log("error")}
      />
    </GoogleOAuthProvider>
  );
}

export default App;
