// styles
import "./Project.css"

// hook perso 
import { useDocument } from '../../Hooks/useDocuments'

// routeur dom
import { useParams } from "react-router-dom";

// composant 
import Projectsummary from "./Projectsummary";
import ProjectComments from "./Projectcomments";

function Project() {

    const { id } = useParams()

    const { document, error } = useDocument('project', id)

    if (error) { return <div className="error">{error}</div> }
    if (!document) { return <div className="loading">Loading .... </div> }

    return (

        <div className="project-details">
            <Projectsummary doc={document} />
            <ProjectComments doc={document} />
        </div>

    );
}

export default Project;