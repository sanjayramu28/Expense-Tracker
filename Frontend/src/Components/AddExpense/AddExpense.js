import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import './Add.css'
import AddLoader from "../../Assests/Addanimation.json"
import Lottie from 'lottie-react';
const apiUrl ='http://localhost:5000'; // Default to localhost if not set
const Backend_url_Production=process.env.REACT_APP_BACKEND_URL|| "http://localhost:5000";


const AddExpense = () => {
    console.log("A",apiUrl)
    const [Category, SetCategory] = useState("Food🍱");
    const [amountSpent, SetamountSpent] = useState("");
    const [Spenton, SetSpenton] = useState("");
    const [loader, setloader] = useState(false);
    const notify = () => { toast("Added!") };
    const token = localStorage.getItem("token");
    const Userid = localStorage.getItem("userId")

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (amountSpent <= 0) {
                toast.error("Amount Spent should be greater than 0");
                setloader(false)
            }
            console.log(Spenton)
            const date = new Date(Spenton);
            const values = { Userid, Category, amountSpent, date };
            const res = await axios.post(`${Backend_url_Production}/Add`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
            setTimeout(() => {
                if (amountSpent > 0) {
                    notify();
                    setTimeout(()=>{
                        window.location.reload()
                    },2000)
                }
                setloader(false);
            }, 1200)
        }
    }

    return (

        <>
            <ToastContainer />
            {
                loader == true &&
                (
                    <div className=" row" >
                        <div className=" add col-md-12" style={{zIndex:"999"}}>
                            <Lottie animationData={AddLoader} loop={false} />
                        </div>
                    </div>
                )
            }
            <div className="container-fluid mt-5 p-5 w-75 addbg">
                <div >
                    <h1>Add Expenses Here</h1>
                    <form className="d-block row">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <p >Category:</p>
                                <p>Amount Spent:</p>
                                <p>Date Spent:
                                    (Today's date will set by default)</p>
                            </div>
                            <div className="col-md-6 forminput">
                                <select onChange={(e) => {
                                    SetCategory(e.target.value)
                                    // console.log(Category)
                                }} className=" w-100 pt-1 pb-1"  >
                                    <option value="Food" className="fs-3">Food🍱
                                    </option>
                                    <option className="fs-3">Transport🚥
                                    </option>
                                    <option className="fs-3">Rent 🏡</option>
                                    <option className="fs-3">Grocery 🧾</option>
                                    <option className="fs-3">Health 💪</option>
                                    <option className="fs-3">Insurance 📑</option>
                                    <option className="fs-3">Clothing 👕</option>
                                    <option className="fs-3">Cable ➿</option>
                                    <option className="fs-3">Others 🤔</option>
                                </select>
                                {/* <input type="text" onChange={(e) => { SetCategory(e.target.value) }} /> */}
                                <br />
                                <input type="number" onChange={(e) => { SetamountSpent(e.target.value) }} className=" w-100 pt-2 pb-2" placeholder="Enter Amount Spent" required />
                                <br />
                                <input type="Date" onChange={(e) => { SetSpenton(e.target.value) }} className="  w-100 pt-2 pb-2" placeholder="Enter Date Spent" />
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