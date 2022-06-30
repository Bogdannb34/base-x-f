import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
    REGISTER_URL,
    CHECK_USER,
    CHECK_EMAIL,
    CHECK_PWD
} from '../helpers/constant';
import '../styles/form.css';

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validUname, setValidUname] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [matchPass, setMatchPass] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = CHECK_USER.test(user);
        setValidUname(result);
    }, [user]);

    useEffect(() => {
        const result = CHECK_EMAIL.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = CHECK_PWD.test(pass);
        console.log(result);
        console.log(pass);
        setValidPass(result);
        const match = pass === matchPass;
        setValidMatch(match);
    }, [pass, matchPass]);

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pass, matchPass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid1 = CHECK_USER.test(user);
        const valid2 = CHECK_EMAIL.test(email);
        const valid3 = CHECK_PWD.test(pass);
        if (!valid1 || !valid2 || !valid3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    username: user, email: email, password: pass
                }),
                {
                    headers: { 'Content-Type': "application/json" },
                    withCredentials: true
                }
            );
            console.log(response.data);
            setUser('');
            setEmail('')
            setPass('');
            setMatchPass('');
            navigate("/login", { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed!");
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Username:
                    <span className={validUname ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validUname || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validUname ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    3 to 23 characters. <br />
                    Must begin with a letter. <br />
                    Can contain letters, numbers, underscores, hyphens.
                </p>

                <label htmlFor='mail'>
                    Email:
                    <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="email"
                    id='mail'
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-describedby="mailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="mailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must include at symbol: <span aria-label="at symbol">@</span> <br />
                    Can contain letters, numbers, underscores, hyphens.
                </p>

                <label htmlFor='password'>
                    Password:
                    <span className={validPass ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPass || !pass ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id='password'
                    onChange={(e) => setPass(e.target.value)}
                    required
                    aria-describedby="passnote"
                    onFocus={() => setPassFocus(true)}
                    onBlur={() => setPassFocus(false)}
                />
                <p id='passnote' className={passFocus && !validPass ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    6 to 120 characters. <br />
                    Must include uppercase and lowercase letters, a number and special character. <br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                </p>

                <label htmlFor='confirm_pass'>
                    Confirm Password:
                    <span className={validMatch && matchPass ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPass ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id='confirm_pass'
                    onChange={(e) => setMatchPass(e.target.value)}
                    required
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                <button className='mt-2' disabled={!validUname || !validPass || !validMatch ? true : false}>Sign Up</button>
                <p className='mt-2'>
                    Already registered? <br />
                    <span className='last'>
                        <Link to={"/login"}>Sign In</Link>
                    </span>
                </p>
            </form>
        </section>
    )
}

export default Register