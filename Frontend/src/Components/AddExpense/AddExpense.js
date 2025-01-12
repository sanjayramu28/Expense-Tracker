import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import './Add.css'
import AddLoader from "../../Assests/Addanimation.json"
import Lottie from 'lottie-react';



const AddExpense = () => {
    const [Category, SetCategory] = useState("Food");
    const [amountSpent, SetamountSpent] = useState("1");
    const [Spenton, SetSpenton] = useState("");
    const [loader, setloader] = useState(false);
    const notify = () => { toast("Added!") };
    const token = localStorage.getItem("token");
    const Userid = localStorage.getItem("userId")

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(Spenton)
            const date = new Date(Spenton);
            const values = { Userid, Category, amountSpent, date };
            const res = await axios.post("http://localhost:5000/Add", values, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token
                }
            })
            setloader(true);
        }
        catch (err) {
            console.log("error while add");
            if (err.status === 401)
                    window.location.href = "/login"
            setloader(false);
        }
        finally {
            setTimeout(()=>{
                notify();
                setloader(false);
                window.location.reload()
            },1200)
        }
    }

    return (

        <>
            <ToastContainer />
            {
                loader == true &&
                (
                <div className=" row" >
                    <div className=" add col-md-12">

                    {/* <p>HI</p> */}
                    <Lottie animationData={AddLoader} loop={false}/>
                    {/* <p>Added Succesfully</p> */}
                    </div>
                </div>
                )
            }
            <div className="container-fluid mt-5 p-5 bg-warning w-75 addbg">
                <div >
                    <h1>Add Expenses Here</h1>
                    <form className="d-block row">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <p >Category:</p>
                                <p>Amount Spent:</p>
                                <p>Date Spent:</p>
                            </div>
                            <div className="col-md-6 forminput">
                                <select onChange={(e) => {
                                    SetCategory(e.target.value)
                                    // console.log(Category)
                                }} className=" w-100"  >
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Health">Health</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Cable">Cable</option>
                                    <option value="others">Others</option>
                                </select>
                                {/* <input type="text" onChange={(e) => { SetCategory(e.target.value) }} /> */}
                                <br />
                                <input type="number" onChange={(e) => { SetamountSpent(e.target.value) }} className=" w-100" placeholder="Enter Amount Spent" />
                                <br />
                                <input type="Date" onChange={(e) => { SetSpenton(e.target.value) }} className="  w-100" placeholder="Enter Date Spent" />
                            </div>
                        </div>
                        <button value="submit" onClick={HandleSubmit} className="btn  btn-outline-light">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
        // <p>Adddd</p>
    )
}

export default AddExpense;