import { Assets } from '../../assets/Assets'
import './Navbar.css'

function Navbar({ setProfile }) {
    
    const handleProfileClick = () => {
        setProfile(true)
    }

  return (
    <>
      <div className="navbar">
        <div className="navbar-header">
            <img src={Assets.logo} alt="Logo" className="navbar-logo" />
            <span className="navbar-title">EMABOT Admin</span>
        </div>
        <img src={Assets.profil} alt="Profil" className="navbar-profile" onClick={handleProfileClick} />
    </div>
    <hr/>
    </>
  )
}

export default Navbar
