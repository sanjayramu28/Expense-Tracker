

import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Authentication.css'
const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; 


const Register = () => {
    const navigate = useNavigate();

    const [UserEmail, SetUserEmail] = useState("");
    const [UserName, SetUserName] = useState("");
    const [Password, SetPassword] = useState("");
    const register = async (e) => {
        try {
            e.preventDefault();
            const post = await axios.post(`${apiUrl}/Register`, {
                UserName,
                UserEmail,
                Password
            })
            if (post) {
                alert("Registered Succesfully")
                navigate('/login');
            }

        }
        catch (err) {
            if (err.response.data.message == 'UserEmail already exists') {
                alert("UserEmail already exists Try Again");
            }
        }
    }
    return (
        < div className='container-fluid'>
            <div className="card d-flex mt-5" style={{ justifySelf: 'center' }}>
                <div className="row">
                    <div className="col-md-6 " >
                        <img src="https://img.freepik.com/free-vector/vacation-business-traveler-character_98292-4260.jpg?ga=GA1.1.1161449929.1704814302&semt=ais_hybrid" className='w-100 h-100' />
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex mt-5 ms-4" style={{ justifyContent: "flex-start", alignContent: "center" }}>
                            <img src="https://img.freepik.com/free-vector/futuristic-digital-money-concept-with-indian-rupee-sign_1017-45127.jpg?ga=GA1.1.1161449929.1704814302&semt=ais_hybrid" className="" style={{ width: "60px" }} />
                        </div>
                        <p className="m-5">Welcome to Expense Tracker</p>
                        <div className="d-flex justify-content-center forms" >
                            <form onSubmit={register} style={{ position: "relative" }}>
                                <div style={{ position: "relative" }} >
                                    <input type='text' className='form-input' onChange={(e) => {
                                        SetUserName(e.target.value)
                                    }} />
                                    {/* <input type="email" id="username" className='form-input' onChange={(e) => { SetUserEmail(e.target.value) }} required /> */}
                                    <label htmlFor='username' className='ani' >UserName</label>
                                </div>
                                <div style={{ position: "relative" }} >
                                    <input type="email" id="username" className='form-input' onChange={(e) => { SetUserEmail(e.target.value) }} required />
                                    <label htmlFor='username' className='ani' >UserEmail</label>
                                </div>
                                <br />
                                <div style={{ position: "relative" }}>
                                    <input type="password" id="password" className='form-input' onChange={(e) => {
                                        SetPassword(e.target.value);
                                    }} required />
                                    <label htmlFor='password' className='ani'>Password</label>
                                </div>
                                <br />
                                <button type='submit' className='m-5 btn  btn-outline-primary w-75'>
                                    SignUp
                                </button>
                            </form>
                        </div>
                        <label className='mb-5 d-flex' style={{ justifyContent: "center" }} >Already Registered?  &nbsp;
                            <Link to='/login'>Login</Link>
                        </label>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register