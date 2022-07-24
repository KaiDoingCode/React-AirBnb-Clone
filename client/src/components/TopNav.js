import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const TopNav = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const logout = () => {
        window.localStorage.removeItem('auth');
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        history.push('/login');
    }
    return (
    <div className='nav bg-light d-flex justify-content-between'>
        <Link className='nav-link' to="/">Home</Link>
        {state.user &&
        <>
            <Link className='nav-link' to="/dashboard">Dashboard</Link>
        </>
        }
        {!state.user ? 
        <>
            <Link className='nav-link' to="/login">Login</Link>
            <Link className='nav-link' to="/register">Register</Link>
        </>
        : 
        <button className="btn btn-link" onClick={() => {
            logout();
        }}>Logout</button>
        }
    </div>
    )
}

export default TopNav;