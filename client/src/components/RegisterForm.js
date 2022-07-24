import React from "react";

const RegisterForm = (props) => {
    return (
    <form onSubmit={props.onSubmit} className="mt-3">
        <div className="form-group mb-3">
            <label className="form-label">Your name</label>
            <input 
                type="text" 
                required={true}
                className="form-control" 
                placeholder="Enter name" 
                value={props.name} onChange={e => props.setName(e.target.value)}
            ></input>
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Your email</label>
            <input 
                type="email" 
                required={true}
                className="form-control" 
                placeholder="Enter email" 
                value={props.email} onChange={e => props.setEmail(e.target.value)}
            ></input>
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Your Password</label>
            <input 
                type="password" 
                required={true}
                className="form-control" 
                placeholder="Enter password" 
                value={props.password} onChange={e => props.setPassword(e.target.value)}
            ></input>
        </div>
        <button className="btn btn-primary" disabled={!props.name | !props.email || !props.password ? true : false}>
            Submit
        </button>
    </form>
    )
}

export default RegisterForm;