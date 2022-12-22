import * as ReactDOM from "react-dom"
import './App.css';
import { ProjectSection } from './components/projects/ProjectSection';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AddProject } from "./components/projects/AddProject";
import { Project } from "./components/projects/Project";


 

function App() {
  return (

    <div style={{ width: "100vw", height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="projects" element={<ProjectSection />} />
          <Route path="add-project" element={<AddProject />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
