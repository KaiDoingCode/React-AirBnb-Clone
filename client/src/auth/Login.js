import React, {useState} from "react";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password});
            if(res.data) {
                window.localStorage.setItem('auth', JSON.stringify(res.data));

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data
                });
                history.push('/dashboard');
            }
            toast.success('Login success');
        } catch(e){
            console.log(e);
            if(e.response.status === 400) toast.error(`Error: ${e.response.data.err}`);
        }
    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>
                    Login
                </h1>

            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <ToastContainer />
                        <LoginForm
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;