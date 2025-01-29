import { useEffect, useState } from "react";
import './RemoveExpense.css'
import Detete_Animation from "../../Assests/Delete_Animation.mp4"
import { Slide, toast, ToastContainer } from "react-toastify";
const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const RemoveExpense = () => {
    const token = localStorage.getItem("token")

    const [expenses, Setexpense] = useState([]);
    const [loader, setloader] = useState(false)

    const fetchExpenses = async () => {
        try {
            setloader(true);
            const res = await fetch(`${apiUrl}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                const sortedexpense = data.sort((a, b) => {
                    const dateA = new Date(a.SpentOn).getTime()
                    const dateB = new Date(b.SpentOn).getTime()
                    return dateB - dateA
                });

                Setexpense(sortedexpense);
            }
            else if (data.message == 'Invalid token') {
                window.location.href = "/login"
                localStorage.removeItem("token")
                localStorage.removeItem("userEmail")
                localStorage.removeItem("userId")
            }
            setloader(false)
        }
        catch (err) {
            alert("Error While Fetching");
            setloader(false)
        }

    }
    const showtoast = () => {
        toast('Deleted🗑️!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Slide,
        });
    }
    useEffect(() => {
        fetchExpenses();
    }, []);


    const dele = async (_id, index) => {
        try {
            setloader(true);
            const response = await fetch(`${apiUrl}/Remove-Expense/${_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const video = document.getElementById(`delete-${index}`);
                video.play();
                video.onended = () => {
                    video.currentTime = 0;
                    showtoast()
                    fetchExpenses()
                }
            }
        }
        catch (error) {
            console.log("error")
        }
    }


    return (
        <div className="container-fluid" >

            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
            {
                loader  && (
                    <div className="container-fluid" style={{ position: "relative", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div class="spinner"></div>
                    </div>
                )
            }
            <div className=" mt-5 "
                style={{ display: "grid", gridTemplateColumns: "auto  auto auto", gap: "20px 50px", position: "relative" }}>
                {
                    expenses.map((expense, index) => {
                        return (
                            <div className="p-2 card tiles text-dark m-1 " id={index} key={index}>

                                <div className="row " >
                                    <div className="col-md-8  text-dark">
                                        <p>
                                            <span>Expense Category : &nbsp;</span>
                                            <label>{expense.Category}</label>
                                        </p>
                                        <p>
                                            <span>Amount Spent : Rs : </span>
                                            <label>{expense.amountSpent}</label>
                                        </p>
                                        <p>
                                            <span>Spent On :  </span>
                                            <label>{new Date(expense.SpentOn).toLocaleDateString()}</label>
                                        </p>
                                    </div>
                                    <div className="col-md-3 d-flex" style={{ justifyContent: 'flex-end' }}>
                                        <button className="button" onClick={() => {
                                            // playvideo( index)
                                            dele(expense._id, index);
                                        }}>
                                            <video className="delete-anime" id={`delete-${index}`}>
                                                <source src={Detete_Animation} type="video/mp4"></source>
                                            </video>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            Remove Expense
        </div>
    )
}

export default RemoveExpense