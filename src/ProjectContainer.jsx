import React from "react";
import Project from "./Project.jsx";

const ProjectContainer = () => {
    const username = "waellison"; // FIXME this really shouldn't be a prop
    let projects = [
        "willpress",
        "willread",
        "react-resume",
        "react-resume-api",
        "nuventure",
        "pysfr",
        "willshorten",
    ]
    return (
        <div className="projectContainer">
            {
                projects.map ((project) => {
                    return <Project user={username} project={project}/>
                })
            }
        </div>
    );
}

export default ProjectContainer;
