import { Link, useNavigate } from "react-router-dom"
// import res from "Backend/GetData"
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faX } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";



var navigate;

const logout = () => {
    console.log("Logout")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userEmail")
    navigate('/login')
}




const Navbar = () => {
    // useEffect(()=>{
    //     const token=localStorage.getItem("token");
    //     if(!token){
    //         window.location.href='/login';
    //     }
    
    // },[])

    const [menuvisiblity, setmenuvisiblity] = useState(false);
    const toggleclass = () => {
        console.log("cc")
        console.log(menuvisiblity)
        setmenuvisiblity(!menuvisiblity)
    }
    navigate = useNavigate()
    // console.log(res)
    return (
        <div className="container-fluid">
            <div className="row  bg-dark text-white p-2">
                <div className="col-md-9 " style={{ display: "flex", justifyContent: "center" }}>
                    <Link to='/' className="d-flex text-decoration-none">
                        <div className="text-white d-flex" style={{ alignSelf: 'center', fontSize: "30px" }}>
                            <p> Expense Tracker</p>
                        </div>
                    </Link>
                </div>
                <div className="col-md-3 d-flex " style={{ justifyContent: "flex-end" }}>
                    {
                        !menuvisiblity && (
                            <div className="bg-light rounded-circle">
                                <FontAwesomeIcon icon={faUser} style={{ fontSize: "40px", cursor: 'pointer', height: '40px', color: 'black' }} onClick={toggleclass} className="p-3 " />
                            </div>
                        )
                    }
                    {menuvisiblity && (
                        <div className="menu">
                            <p className="border rounded p-1">{localStorage.getItem("userEmail")}</p>
                            <button onClick={logout} className="btn btn-outline-primary">Logout</button>
                            <br />
                        </div>
                    )
                    }
                    {
                        menuvisiblity && (
                            <div className="bg-light rounded-circle text-dark me-2 ">
                                <FontAwesomeIcon icon={faX} style={{ fontSize: "40px", cursor: 'pointer' }} onClick={toggleclass} className="ps-3 pe-3 pt-2 " />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="row" style={{ display: "flex", justifyContent: "center", backgroundColor: "#b3b4bd" }} >
                <div className="mt-3 text-dark" style={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
                    <p className="navbutton">
                        <Link to="/Add" className="text-dark ">
                            <button className="bttn">
                                Add Expense
                            </button>
                        </Link>
                    </p>
                    <p className="navbutton">
                        <Link to="/Remove-Expense" className="text-dark">
                            <button className="bttn btn">
                                Remove Expense
                            </button>
                        </Link>
                    </p>
                </div>
            </div>
            {/* <p>Navbar</p> */}
        </div>

    )
}

export default Navbar