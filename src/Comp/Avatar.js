// on crée un composant avatar, parce qu'on va le réuliser plus tard (putain truc de fou, on s'y attendait pas)

// styles 
import './Avatar.css'

function Avatar({ src }) {
    return (
        <div className='avatar'>
            <img src={src} alt={src} />
        </div>
    );
}

export default Avatar;