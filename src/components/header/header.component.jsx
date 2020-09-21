import React,{useState} from 'react'
import './header.styles.scss'
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const Header = ({ user,authenticated }) => {
    const logOut = () => {
      AuthService.logout();
      window.location.reload()
  }
    const [visible, setVisible] = useState(false);

    return (
      <div className="header">
          <Link className="link logo" to="/">
            BLOGY
          </Link>
        <ul className={visible?`show`:''}>
          <li>
            <p>Welcome {user.username ? user.username : 'Guest'},</p>
          </li>
          {!authenticated ? (
            <>
              <li>
                <Link className="link" to="/login">
                  login
                </Link>
              </li>
              <li>
                <Link className="link" to="/signup">
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="link" to="/" onClick={logOut}>
                  Log Out
                </Link>
              </li>
              <li>
                <Link className="link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
        <p className="menu" onClick={()=>setVisible(!visible)}>{visible?'X':'MENU'}</p>
      </div>
    );
}
 
export default Header;
