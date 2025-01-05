

import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import User from 'backend'




const toggleclass = (e) => {
    const input = e.target;
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) {
        if (input.value.trim() === "") {
            label.classList.add('animate');
        } else {
            label.classList.remove('animate');
        }
    }
};

const resetClass = (e) => {
    // console.log(User)
    const input = e.target;
    const label = document.querySelector(`label[for="${input.id}"]`);

    if (label && input.value.trim() === "") {
        label.classList.remove('animate');
    }
};


const Register = () => {
    const navigate = useNavigate();

    const [UserEmail, SetUserEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const register = async (e) => {
        try {
            e.preventDefault();
            const post = await axios.post("http://localhost:5000/Register", {
                UserEmail,
                Password
            })
            if (post) {
                navigate('/login');
                console.log("logg")
            }

        }
        catch (err) {
            console.log(err)
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
                        <div className="d-flex justify-content-center forms">
                            <form onSubmit={register}>
                                <label htmlFor='username' className='d-flex label ani' >UserEmail</label>
                                <input type="email" id="username" onFocus={toggleclass} onBlur={resetClass} onChange={(e) => { SetUserEmail(e.target.value) }} required/>
                                <br />
                                <label htmlFor='password' className='d-flex label ani'>Password</label>
                                <input type="password" id="password" onFocus={toggleclass} onBlur={resetClass} onChange={(e) => {
                                    SetPassword(e.target.value);
                                    console.log(Password)
                                }} required/>
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