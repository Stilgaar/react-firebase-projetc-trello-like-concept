// styles
import './Create.css'

// hook react
import { useState } from 'react';


function Create() {
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])

    const handleSumbit = (e) => {
        e.preventDefault()
        console.log(name, detail, dueDate)
    }


    return (
        <div className='create-form'>
            <h2 className='page-title'> Créez un nouveau projet</h2>

            <form onSubmit={handleSumbit}>

                <label>
                    <span>Nom du projet</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                </label>

                <label>
                    <span>Détails du projet</span>
                    <textarea
                        required
                        type="text"
                        onChange={(e) => setDetail(e.target.value)}
                        value={detail} />
                </label>

                <label>
                    <span>Date de fin</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate} />
                </label>

                <label>
                    <span>Catégorie du projet</span>
                </label>

                <label>
                    <span>Qui participe au projet</span>
                </label>

                <button className='btn'>Nouveau Projet</button>

            </form>


        </div>
    );
}

export default Create;