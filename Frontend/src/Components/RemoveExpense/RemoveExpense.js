import { useEffect, useState } from "react";
import './RemoveExpense.css'
import Detete_Animation from "../../Assests/Delete_Animation.mp4"
import Models from 'backend/Models';
import Lottie from 'lottie-react';
import RemoveAnimation from "../../Assests/RemoveAnimation.json"
import { Slide, toast, ToastContainer } from "react-toastify";
const RemoveExpense = () => {


    // const playvideo = (index) => {


    // }
    // const toggleclass = (index) => {
    //     const ele = document.getElementById(index)
    //     console.log(ele)
    //     ele.classList.toggle('animate')
    //     fetchExpenses()
    // }

    // const resetvideo = (index) => {
    //     const video = document.getElementById(`delete-${index}`);
    //     if (video)
    //         toggleclass(index)
    // }
    const token = localStorage.getItem("token")

    const [expenses, Setexpense] = useState([ ]);
    const [loader, setloader] = useState(false)

    const fetchExpenses = async () => {
        try {
            const res = await fetch("http://localhost:5000/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await res.json();
            if(Array.isArray(data)){
                Setexpense(data);
            }
            else if (data.message=='Invalid token'){
                window.location.href = "/login"
                localStorage.removeItem("token")
                localStorage.removeItem("userEmail")
                localStorage.removeItem("userId")
            }
            console.log(data)
        }
        catch (err) {
            if (err.status === 401){
                
            }
        }

    }
    const showtoast = () => {
        toast('Deleted🗑️!', {
            position: "top-center",
            autoClose: 2000,
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
            const response = await fetch(`http://localhost:5000/Remove-Expense/${_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const video = document.getElementById(`delete-${index}`);
                console.log(video)
                video.play();
                showtoast()
                video.onended = () => {
                    video.currentTime = 0;
                    fetchExpenses()
                }
            }
        }
        catch (error) {
            console.log("error")
        }
    }


    return (
        <div className="container-fluid">
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
            <div className=" mt-5"
                style={{ display: "grid", gridTemplateColumns: "auto  auto auto", gap: "20px 50px" }}>
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
                                            <span>Amount Spent : </span>
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