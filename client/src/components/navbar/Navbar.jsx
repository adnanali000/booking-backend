import './navbar.css'
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

  const {user,dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = ()=>{
      dispatch({type:"LOGOUT"})
      navigate("/login")      
  }

  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{color:'inherit',textDecoration:'none'}}>
            <span className="logo">Hotels</span>
          </Link>
           {user ? (
            
              <div className="navItems">
                 <button className="navtitle">{user.username}</button>
                 <button onClick={handleLogout} className="navButton">Logout</button>
             </div>
             
           ) :
           (
             <div className="navItems">
                <button className="navButton">Register</button>
                <button onClick={()=>navigate("/login")}  className="navButton">Login</button>
            </div>
            )}
        </div>
    </div>
  )
}

export default Navbar