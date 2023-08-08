import './App.scss';
import { ProjectSection } from './components/ProjectSection/ProjectSection';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AddProject } from "./components/ProjectSection/AddProject";
import { ProjectModal } from "./components/ProjectModal/ProjectModal"
import { Timer } from "./components/ProjectModal/Timer"
import { useEffect } from 'react';
import jwt_decode from "jwt-decode0"






function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  function handleCallbackResponse(response) {
    console.log("Encoded JWT iD token: " + response.credential )
    let userObject = jwt_decode(response.credential)
  }

  useEffect(() => {
    
    window.google.accounts.id.initialize({
      client_id: "435547155571-g6e0c4uae4kp7d8m0r55g544fokecfof.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )

  }, [])

  return (

    <div>
      <div id="signInDiv">

      </div>
     
        <Routes>
          <Route path="projects" element={<ProjectSection />} />
          <Route path="add-project" element={<AddProject />} />
        </Routes>

        <Routes location={background || location}>
          <Route path="/projects/:id" element={<ProjectModal />} >
            <Route path="timer/:taskID" element={<Timer />} />
          </Route>
        </Routes>

        {background && (
          <Routes>
            <Route path="/projects/:projectName/timer/task/:taskIndex" element={<Timer />} />
          </ Routes >
        )}
     
    </div>
  );
}

export default App;
