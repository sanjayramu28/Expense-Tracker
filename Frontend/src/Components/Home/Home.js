import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faBasketShopping, faBowlFood, faEthernet, faHeartPulse, faHouseChimney, faIndianRupeeSign, faMotorcycle, faShirt } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import './Home.css'
import Homeloader from "../../Assests/Loader.gif"


const Home = () => {
    const d = new Date()
    const currentmonth = d.getMonth() + 1
    let Previousmonth = d.getMonth()
    if (Previousmonth == 0) {
        Previousmonth = 12;
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [expenses, Setexpense] = useState([]);
    const [thisMonthExpense, sethisMonthsExpense] = useState(0);
    const [PreviousMonthExpense, setPreviousMonthExpense] = useState(0);
    const [viewloader, setviewloader] = useState(false);
    useEffect(() => {
        setviewloader(true);


        const fetchExpenses = async () => {
            try {
                const res = await axios.get("http://localhost:5000/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const data = res.data;
                const sortedexpense = data.sort((a, b) => {
                    const dateA = new Date(a.SpentOn).getTime(); // Convert to timestamp
                    const dateB = new Date(b.SpentOn).getTime();
                    return dateB - dateA;
                });

                Setexpense(sortedexpense);
            }
            catch (err) {
                if (err.status === 401) {
                    window.location.href = "/login"
                    localStorage.removeItem("token")
                    localStorage.removeItem("userEmail")
                    localStorage.removeItem("userId")
                }
            }
            finally {

                setviewloader(false);
            }

        }
        fetchExpenses();
    }, []);
    let prevmonth = -1;


    const calculateCurrentExpense = () => {
        let thismonthtotal = 0, previousmonthtotal = 0;
        expenses.forEach((expense) => {
            const amount = parseFloat(expense.amountSpent);
            const date = new Date(expense.SpentOn);
            const expensemonth = date.getMonth() + 1
            if (expensemonth == currentmonth) {
                thismonthtotal += amount;
            }
            else if (expensemonth == Previousmonth) {
                previousmonthtotal += amount;
            }
            sethisMonthsExpense(thismonthtotal)
            setPreviousMonthExpense(previousmonthtotal)
        })
    }

    useEffect(() => {
        if (expenses.length > 0) {
            calculateCurrentExpense(expenses);
        }
    }, [expenses]);

    const categoryImage = (category) => {
        if (category == "Food") {
            return (
                <div className="categoryicon">
                    <FontAwesomeIcon icon={faBowlFood} fade />
                </div>
            )
        }
        if (category == "Transport") {
            return (
                <div className="categoryicon ">
                    <FontAwesomeIcon icon={faMotorcycle} fade />
                </div>
            )
        }
        if (category == "Rent") {
            return (
                <div className="categoryicon">
                    <FontAwesomeIcon icon={faHouseChimney} fade />
                </div>
            )
        }
        if (category == "Grocery") {
            return (
                <div className="categoryicon">
                    <FontAwesomeIcon icon={faBasketShopping} fade />
                </div>
            )
        }
        if (category == "Health") {
            return (
                <div className="categoryicon">
                    <FontAwesomeIcon icon={faHeartPulse} fade />
                </div>
            )
        }
        if (category == "Clothing") {
            return (
                <div className="categoryicon">
                    <FontAwesomeIcon icon={faShirt} fade />
                </div>
            )
        }
        if (category == "Cable") {
            return (
                <div className="categoryicon">
                    <FontAwesomeIcon icon={faEthernet} fade />
                </div>
            )
        }
        if (category == "Insurance") {
            return (
                <div className="categoryicon">
                    <FontAwesomeIcon icon={faEthernet} fade />
                </div>
            )
        }
    }


    const Header = ({ month, year }) => {
        return (
            <>
                <p>{months[month] + " " + year}'s Spending:</p>
            </>
        )
    }


    return (

        <>
            <div className="container-fluid ">
                <div className="row d-flex" style={{ fontFamily: "Agu Display,seriff", fontSize: "25px" }}>
                    <div className="card col d-flex p-2 bg-dark text-white " style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <p>This Month Total Spending:{thisMonthExpense}</p>
                    </div>
                    <div className="card col d-flex p-2  text-dark" style={{ alignItems: 'center' }}>
                        <p>Previous Month Total Spending:{PreviousMonthExpense}</p>
                    </div>

                </div>
                <div className="row text-white" style={{ position: "relative" }} >
                    {
                        viewloader == true && (
                            <div className="Home-loader ">
                                <div className="container">
                                    <div className="dash uno"></div>
                                    <div className="dash dos"></div>
                                    <div className="dash tres"></div>
                                    <div className="dash cuatro"></div>
                                </div>
                            </div>
                        )
                    }
                    <div className=" row " style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px 30px", overflow: "hidden" }} >
                        {
                            expenses.map((expense, index) => (
                                <div key={index} className="card  p-3 m-3 blocks">
                                    <div className="row">
                                        {(() => {
                                            const date = new Date(expense.SpentOn);
                                            const month = date.getMonth();
                                            const year = new Date(expense.SpentOn).getFullYear();
                                            if (month != prevmonth) {
                                                prevmonth = month;
                                                return <Header month={month} year={year} />
                                            }
                                        }
                                        )()
                                        }
                                        {
                                            categoryImage(expense.Category)
                                        }
                                        <p><span className="fw-bold">Category:</span>
                                            <label>{expense.Category}</label>
                                        </p>
                                        <p>
                                            <span className="fw-bold">Amount Spent:</span>
                                            <label>
                                                <FontAwesomeIcon icon={faIndianRupeeSign} />  {expense.amountSpent}
                                            </label>
                                        </p>
                                        <p>
                                            <span className="fw-bold">Spent On:</span>
                                            <label>
                                                {new Date(expense.SpentOn).toLocaleDateString()
                                                }
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}



export default Home;