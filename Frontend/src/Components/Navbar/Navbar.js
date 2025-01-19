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
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userEmail")
    navigate('/login')
}




const Navbar = () => {


    const [menuvisiblity, setmenuvisiblity] = useState(false);
    const toggleclass = () => {
        setmenuvisiblity(!menuvisiblity)
    }
    navigate = useNavigate()

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
                        menuvisiblity && (
                            <div className="d-flex user-profile">
                                <div className="card ">
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }} >
                                        <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1161449929.1704814302&semt=ais_incoming" style={{ width: "80px", border: "5px solid grey", borderRadius: "100px" }} />
                                    </div>
                                    <div className="d-flex ps-3 pe-3" style={{ borderBottom: "2px solid #0d6efd", }}>
                                        <p className=" fw-bold  ">User Name:</p>
                                        <label className="ps-3">{localStorage.getItem("userName")}</label>
                                    </div>
                                    <div className="d-flex ps-3 pe-3" style={{ borderBottom: "2px solid #0d6efd", borderRadius: "" }}>
                                        <p className=" fw-bold ">User Email:</p>
                                        <label className="ps-3">{localStorage.getItem("userEmail")}</label>
                                    </div>
                                    <div className="d-flex p-2" style={{ justifyContent: "center" }}>
                                        <button className="btn  btn-outline-primary" onClick={() => logout()}> Logout  </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: "40px", cursor: 'pointer', height: '40px', color: 'white' }} onClick={toggleclass} className="p-3 " />
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