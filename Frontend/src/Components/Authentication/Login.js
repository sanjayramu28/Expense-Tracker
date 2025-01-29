import axios from 'axios';
import './Authentication.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = 'http://localhost:5000'; 


const Auth = () => {
    const navigate = useNavigate();

    const [userEmail, SetuserEmail] = useState("");
    const [password, Setpassword] = useState("");
    const [loggedin, setloggedin] = useState(null);
    const login = async (e) => {

        try {
            setloggedin(false)
            e.preventDefault();
            const post = await axios.post(`${apiUrl}/login`, {
                userEmail,
                password
            })
            if (post) {
                navigate('/');
                setloggedin(true);
            }
            localStorage.setItem("userEmail", userEmail)
            const { user, token } = post.data;
            localStorage.setItem("token", token)
            localStorage.setItem("userName", user.name)
            localStorage.setItem("userId", user.id)
        }
        catch (err) {
            if (err.message == "Network Error") {
                alert("Network Error")
            }
            else if (err.message == "Request failed with status code 401") {
                window.alert("Invalid UserEmail or Password")
            }
            else {
                alert(err.message)
            }
        }
        finally {
            setloggedin(true);
        }
    }
    return (
        < div className='w-100 ' style={{ display: "flex", justifyContent: "center", alignContent: "center", position: "fixed",fontFamily:"Titillium Web,serif" }}>
            {loggedin == false && (
                <div className="w-100  loader-parent d-flex" style={{ position: "absolute", justifyContent: "center" }}>
                    <div className='loader'>
                    </div>
                </div>
            )}
            <div className="card d-flex mt-5" style={{ justifySelf: 'center' }}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex mt-5 ms-4" style={{ justifyContent: "flex-start", alignContent: "center" }}>
                            <img src="https://img.freepik.com/free-vector/futuristic-digital-money-concept-with-indian-rupee-sign_1017-45127.jpg?ga=GA1.1.1161449929.1704814302&semt=ais_hybrid" className="" style={{ width: "60px" }} />
                        </div>
                        <p className="m-5 fs-3">Welcome Back to Expense Tracker</p>
                        <div className="d-flex justify-content-center forms ">
                            <form onSubmit={login} style={{ position: "relative" }}>
                                <div style={{ position: "relative" }}>
                                    <input type="email" id="UserEmail" className='form-input' placeholder=' ' onChange={(e) => { SetuserEmail(e.target.value) }} required />
                                    <label htmlFor='username' className='ani' >UserEmail</label>
                                </div>
                                <br />
                                <div style={{ position: "relative" }}>
                                    <input type="password" id="Password" className='form-input' onChange={(e) => {
                                        Setpassword(e.target.value);
                                    }} required />
                                    <label htmlFor='password' className='ani'>Password</label>
                                </div>
                                <br />
                                <button type='submit' className='m-5 btn  btn-outline-primary w-75'>
                                    Login
                                </button>
                            </form>
                        </div>
                        <label className='mb-5 d-flex fs-4' style={{ justifyContent: "center" }} >New User ?  &nbsp;
                            <Link to='/register'>Sign up</Link>
                        </label>
                    </div>
                    <div className="col-md-6 " >
                        <img src="https://img.freepik.com/free-vector/cute-penguin-holding-hi-banner-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-10152.jpg?ga=GA1.1.1161449929.1704814302&semt=ais_hybrid" className='w-100 h-100' />
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Auth;