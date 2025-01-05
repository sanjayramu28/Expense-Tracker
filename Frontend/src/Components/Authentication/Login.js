import axios from 'axios';
import './Authentication.css'
import { useState } from 'react';
import { User } from 'backend/Models';
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

const Auth = () => {
    const navigate=useNavigate();
    
    const [userEmail,SetuserEmail]=useState("");
    const [password,Setpassword]=useState("");


    const login=async(e)=>{
        try{
            e.preventDefault();
            const post=await axios.post("http://localhost:5000/login",{
                userEmail,
                password
            })
            if(post){
                navigate('/');
                console.log("logg")
                localStorage.setItem("userEmail",userEmail)
            }
            const {user,token}=post.data;
            localStorage.setItem("token",token)
            localStorage.setItem("userId",user.id)
            console.log(user)
        }
        catch(err){
            window.alert("Invalid UserEmail or Password")

            console.log(err)
        }
    }

    // console.log(password)
    return (
        < div className='container-fluid'>
            <div className="card d-flex mt-5"  style={{justifySelf:'center'}}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex mt-5 ms-4" style={{ justifyContent: "flex-start", alignContent: "center" }}>
                            <img src="https://img.freepik.com/free-vector/futuristic-digital-money-concept-with-indian-rupee-sign_1017-45127.jpg?ga=GA1.1.1161449929.1704814302&semt=ais_hybrid" className="" style={{ width: "60px" }} />
                        </div>
                        <p className="m-5">Welcome Back to Expense Tracker</p>
                        <div className="d-flex justify-content-center forms">
                            <form onSubmit={login}>
                                <label htmlFor='username' className='d-flex label ani' >UserEmail</label>
                                <input type="email"  id="UserEmail" onFocus={toggleclass} onBlur={resetClass}  onChange={(e)=>{SetuserEmail(e.target.value)}} required/>
                                <br />
                                <label htmlFor='password' className='d-flex label ani'>Password</label>
                                <input type="password" id="Password" onFocus={toggleclass} onBlur={resetClass} onChange={(e)=>{
                                    Setpassword(e.target.value);
                                }} required/>
                                <br/>
                                <button type='submit' className='m-5 btn  btn-outline-primary w-75'>
                                    Login
                                </button>
                            </form>
                        </div>
                <label className='mb-5 d-flex' style={{justifyContent:"center"}} >New User ?  &nbsp;
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