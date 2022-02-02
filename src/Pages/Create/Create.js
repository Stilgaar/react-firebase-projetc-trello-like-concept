// styles
import './Create.css'

// modules
import Select from 'react-select'

// hook react
import { useState, useEffect } from 'react'

// hook perso 
import { useCollection } from '../../Hooks/useCollection'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useFirestore } from '../../Hooks/useFirestore'

// config firebase
import { time } from '../../Firebase/config'

// react dom
import { useHistory } from 'react-router-dom'

// catégories utlisisés dans le composant <Select /> notez que c'est un npm i react-select
const categories = [
    { value: 'developpement', label: 'Développement' },
    { value: 'design', label: 'Design' },
    { value: 'ventes', label: 'Ventes' },
    { value: 'marketing', label: 'Marketing' },
]

function Create() {

    //redirection
    const history = useHistory()

    // user 
    const { user } = useAuthContext()

    // add document 
    const { addDocument, response } = useFirestore('project')

    // users
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])

    // inputs
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)


    // transformation des users en value et label pour pouvoir les utiliser dans le select
    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    const handleSumbit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError("Il faut présciser une catégorie pour votre projet")
            return
        }

        if (assignedUsers.length < 1) {
            setFormError('Assignez le projet à au moins un utilisateur')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((assigned) => {
            return {
                displayName: assigned.value.displayName,
                photoURL: assigned.value.photoURL,
                id: assigned.value.id
            }
        })

        const projet = {
            name,
            detail,
            category: category.value,
            dueDate: time.fromDate(new Date(dueDate)),
            comment: [],
            createdBy,
            assignedUsersList,
        }

        await addDocument(projet)

        if (!response.error) {
            history.push('/')
        }
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
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>

                <label>
                    <span>Qui participe au projet</span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>

                <button className='btn'>Nouveau Projet</button>

                {formError && <p className='error'>{formError}</p>}

            </form>


        </div>
    );
}

export default Create;