import './App.scss';
import { ProjectSection } from './components/ProjectSection/ProjectSection';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AddProject } from "./components/ProjectSection/AddProject";
import { ProjectModal } from "./components/ProjectModal/ProjectModal"
import { Timer } from "./components/ProjectModal/Timer"






function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (

    <div>
     
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
