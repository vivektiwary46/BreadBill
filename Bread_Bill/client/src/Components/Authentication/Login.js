import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { login } from '../../API/authentication';

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        role: "User"
    });
    const modalOpener = document.getElementById('modalOpener');

    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        console.log(user)
        e.preventDefault();
        const { data } = await login(user.email, user.password, user.role);
        if (data.success) {
            localStorage.setItem('breadBilling', JSON.stringify({
                "token": data.token,
                "role": user.role
            }));
            localStorage.setItem('breadBillingTheme', JSON.stringify({
                "text": "dark",
                "color": "light"
            }));
            modalOpener.click();
        }
    }

    return (
        <>
            <div className='position-absolute top-50 start-50 translate-middle col-md-3'>
                <div className='border border-2'>
                    <div className='m-4'>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={handleChange} placeholder={`${user.role}'s Email`} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={handleChange} placeholder={`${user.role}'s Password`} required />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="form-check mx-2">
                                    <input className="form-check-input" type="radio" name="role" id="radio-cashier" value="Cashier" onClick={handleChange} required />
                                    <label className="form-check-label" htmlFor="radio-cashier">
                                        I am a Cashier
                                    </label>
                                </div>
                                <div className="form-check mx-2">
                                    <input className="form-check-input" type="radio" name="role" id="radio-admin" value="Admin" onClick={handleChange} required />
                                    <label className="form-check-label" htmlFor="radio-admin">
                                        I am an Admin
                                    </label>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center m-2'>
                                <button type='submit' className='btn btn-primary px-4'>Login</button>
                            </div>
                            <div className='d-flex justify-content-center m-2'>
                                <Link to="/forgotpwd">Forgot password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <button id="modalOpener" type="button" className="btn bg-transaprent" data-bs-toggle="modal" data-bs-target="#welcomeModal"></button>

            <div className="modal fade" id="welcomeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="welcomeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="welcomeModalLabel">🍞BreadBilling</h3>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <a href="/" className='btn btn-primary btn-lg'>Welcome</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
