import './App.css';
import { ProjectSection } from './components/ProjectSection';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AddProject } from "./components/AddProject";
import { ProjectModal } from "./components/ProjectModal/ProjectModal"




function App() {
  return (

    <div style={{ width: "100vw", height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="projects" element={<ProjectSection />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="projects/:id" element={<ProjectModal />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
