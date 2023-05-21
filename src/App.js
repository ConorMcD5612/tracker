import './App.css';
import { ProjectSection } from './components/ProjectSection';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AddProject } from "./components/AddProject";
import { ProjectModal } from "./components/ProjectModal/ProjectModal"
import { Timer } from "./components/ProjectModal/Timer"





function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="projects" element={<ProjectSection />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="projects/:id" element={<ProjectModal />} />
          <Route
                    path={`/timer:index`}
                    render={() => {
                      return (
                        <Timer onClick={() => {
                          this.props.history.push(this.props.match.url);
                        }} />
                      )
                    }}
                    />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
