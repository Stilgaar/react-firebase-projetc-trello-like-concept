// styles
import './Dashboard.css'

// hooks persos 
import { useCollection } from '../../Hooks/useCollection'
import { useAuthContext } from '../../Hooks/useAuthContext'

// composants 
import Projectlist from '../../Comp/Projectlist'
import ProjectFilter from './ProjectFilter'

// hook react
import { useState } from "react";


function Dashboard() {

    const { documents, error } = useCollection('project')
    const { user } = useAuthContext()


    const [currentFilter, setCurrentFilter] = useState('all')

    const changeFilter = (f) => setCurrentFilter(f)

    const projects = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case 'tous':
                return true
            case 'mes projets':
                let assignedToMe = false
                document.assignedUsersList.forEach((u) => {
                    if (user.uid === u.id) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'developpement':
            case 'design':
            case 'marketing':
            case 'ventes':
                console.log(document.category, currentFilter)
                return document.category === currentFilter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className='page-title'>DashBoard \o/</h2>
            {error && <p className='error'>{error}</p>}
            {documents &&
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter}
                />}
            {projects && <Projectlist projects={projects} />}
        </div>
    );
}

export default Dashboard;