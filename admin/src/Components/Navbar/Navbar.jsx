import './Navbar.css'
import nav_logo from '../../assets/nav-logo.svg'
import nav_profile_icon from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} alt="" className="nav-logo" />
        <img src={nav_profile_icon} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar
