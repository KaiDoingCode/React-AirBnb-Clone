import React, {useState} from "react";
import RegisterForm from "../components/RegisterForm";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { register } from "../actions/auth";

const Register = ({history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await register({name, email, password});
            toast.success('Register Success');
            history.push('/login');
        }
        catch(e){
            console.log(e);
            if(e.response.status === 400) toast.error(`Error: ${e.response.data.err}`)
        }
        
    }


    return (
        <>
            <div className="container-fluid h1 bg-secondary p-5 text-center">
                <h1>Register</h1>
                
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <ToastContainer />
                        <RegisterForm 
                            name={name} 
                            email={email} 
                            password={password} 
                            onSubmit={handleSubmit} 
                            setName={setName} 
                            setEmail={setEmail} 
                            setPassword={setPassword} 
                        />
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Register;