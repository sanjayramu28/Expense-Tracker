const { Expense, User } = require("../Models");
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

// var userid;

const GetExpenses = async (req, res) => {
    // console.log("id:", userid)
    try {
        const response = await Expense.find({ Userid: req.userid });
        // console.log("r", response);
        // console.log(req.userid)
        res.status(200).json(response);
    }
    catch (e) {
        console.log("Error")
    }
    // console.log("expense");
}


const putdata = async (req, res) => {
    const { Userid,Category, amountSpent, date } = req.body;
    try {

        const data = new Expense({
            Userid,
            Category,
            amountSpent,
            SpentOn: date|| Date.now(),
        });
        const saved=await data.save();
        res.status(200).json({
            message: "Data saved successfully",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Error while adding",
        });
    }
};


const DeleteData = async (req, res) => {
    console.log(req.params.id)
    try {
        const result = await Expense.findByIdAndDelete(req.params.id)
        if (result) {
            res.status(200).json({
                message: "Deletion Success"
            })
        }
    }
    catch (e) {
        console.error("error While Deleting")
    }
}

const register = async (req, res) => {
    try {
        const { UserEmail, Password } = req.body;
        const hashedpassword = bcrypt.hashSync(Password, 10);

        if (!UserEmail || !Password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }

        const existingUser = await User.findOne({ UserEmail });
        if (existingUser) {
            return res.status(400).json({
                message: "UserEmail already exists"
            });
        }
        const result = new User({
            UserEmail,
            Password: hashedpassword
        }
        );
        await result.save(); // Save the user to the database

        return res.status(200).json({
            message: "Registration Success"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error while creating user",
            error: err.message
        });
    }
};


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decode = jwt.verify(token, process.env.JWT)
        req.userid = decode.id
        next()
    }
    catch (e) {
        return res.status(401).json({ message: "Invalid token" })
    }
}


const login = async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        const user = await User.findOne({ UserEmail: userEmail });
        const hashedpassword = bcrypt.compareSync(password, user.Password)
        // console.log(user.Password + "  " + hashedpassword)
        if (!user) {
            res.status(404).json({
                message: "User not Found"
            })
        }
        if (!hashedpassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id, email: user.UserEmail }, process.env.JWT, { expiresIn: '1h' })
        req.user = user;
        req.token = token;
        // console.log(token)

        // userid = user._id;
        res.status(200).json({

            user: {
                id: user._id,
                email: user.UserEmail
            },
            token: token,
            message: "loggged in"
        })

    }
    catch (e) {
        res.status(404).json({
            message: "User not Found"
        })
    }
}


module.exports = { GetExpenses, putdata, DeleteData, register, login, authMiddleware };