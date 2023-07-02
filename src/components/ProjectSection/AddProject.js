import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const AddProject = ({ projects, setProjects }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: "",
    name: "",
  });

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPerson = { ...form };

    navigate("/projects");
    await fetch("http://localhost:5000/projects/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });
    setProjects([...projects, newPerson]);
  };

  return (
    <div className="project-modal">
      <header>
        <h2>Create Project</h2>
      </header>
      <form onSubmit={(e) => submitHandler(e)}>
        <h2>Name</h2>
        <input
          type="text"
          onChange={(e) => updateForm({ name: e.target.value })}
        />

        <h2>Description</h2>
        <textarea
          onChange={(e) => updateForm({ description: e.target.value })}
        ></textarea>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};
