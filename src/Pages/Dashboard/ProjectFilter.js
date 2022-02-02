const filterList = ['tous', 'mes projets', 'developpement', 'design', 'marketing', 'ventes']

function ProjectFilter({ currentFilter, changeFilter }) {

    return (

        <div className="project-filter">
            <nav>
                <p>Filtre par : </p>
                {filterList.map((f) => (
                    <button
                        className={currentFilter === f ? 'active' : ''}
                        onClick={() => changeFilter(f)}
                        key={f}>
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default ProjectFilter;