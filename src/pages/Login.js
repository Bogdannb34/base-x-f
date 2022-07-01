import { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../helpers/constant';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import '../styles/form.css';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pass }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data.accessToken;
            const refreshToken = response?.data.refreshToken;
            const userId = response?.data.id;
            const roles = response?.data?.roles;
            setAuth({ userId, user, pass, roles, accessToken, refreshToken });
            setUser('');
            setPass('');
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (error.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Username:
                </label>
                <input
                    type="text"
                    id='username'
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor='password'>
                    Password:
                </label>
                <input
                    type="password"
                    id='password'
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    required
                />
                <button>Sign In</button>
                <p>
                    Need an Account? <br />
                    <span className='last'>
                        <Link to={"/register"}>Sign Up</Link>
                    </span>
                </p>
            </form>
        </section>
    )
}

export default Login