import { Assets } from "../../assets/Assets"
import { useNavigate } from "react-router-dom"
import './ProfilePopup.css'

function ProfilePopup({setProfile}) {
  const handleClose = () => {
    setProfile(false)
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setProfile(false)
    navigate('/')
    
  }

  return (
    <div className='profile-popup'>
        <div className="profile-popup-content">
            <div className="profile-popup-close">
                <p onClick={handleClose} >X</p>
            </div>
            <div className="profile-popup-setting"  >
                <img src={Assets.setting} alt="settings" />
                <p>Paramètres profil</p>
            </div>
            <div className="profile-popup-logout">
                <img src={Assets.logout} alt="logout" onClick={handleLogout} />
                <p>Se déconnecter</p>
            </div>
        </div>
    </div>
  )
}

export default ProfilePopup
