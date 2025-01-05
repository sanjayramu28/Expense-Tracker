import { useEffect, useState } from "react";
import './RemoveExpense.css'
import Detete_Animation from "../../Assests/Delete_Animation.mp4"
import Models from 'backend/Models';

const RemoveExpense = () => {


    // const playvideo = ( index) => {
    //     const video = document.getElementById(`delete-${index}`);
    //     video.play();
    // }
    const token = localStorage.getItem("token")

    const [expenses, Setexpense] = useState([]);

    const fetchExpenses = async () => {
        try {
            const res = await fetch("http://localhost:5000/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await res.json();
            Setexpense(data);
        }
        catch (err) {
            console.log("error While Fetching");
        }

    }


    useEffect(() => {
        fetchExpenses();
    }, []);


    const dele = async (_id) => {
        try {
            const response = await fetch(`http://localhost:5000/Remove-Expense/${_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response) {
                fetchExpenses();
            }
        }
        catch (error) {
            console.log("error")
        }
    }


    return (
        <>
            <div className="row m-3 d-flex"
                style={{ justifyContent: 'center' }}
            >
                {
                    expenses.map((expense, index) => {
                        return (
                            <div className="col-md-3  p-2 card tiles text-white m-1 " key={index}>
                                <div className="row">
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
                                            dele(expense._id);
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
        </>
    )
}

export default RemoveExpense