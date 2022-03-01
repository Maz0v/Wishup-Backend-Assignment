const userModel = require("../model/userModel")

const createUser = async function (req, res) {
    try {
        let data = req.params.username
        let userData = {}
        userData["user_name"] = data

        let savedData = await userModel.create(userData)
        if (savedData) {
            res.status(201).send(savedData)
        } else {
            res.status(400).send({ msg: "Plz provide username" })
        }
    }
    catch (error) {
        res.status(500).send({ message: "Failed", error: error.message });
    }
}

const getUser = async function (req, res) {

    try {
        let userName = req.params.username
        let findData = await userModel.findOne({ user_name: userName }).select({ user_name: 1, createdAt: 1 , _id:0 })
        if (findData) {
            res.status(200).send(findData)
        } else {
            res.status(400).send({ msg: "No data found" })
        }
    }
    catch (error) {
        res.status(500).send({ message: "Failed", error: error.message });
    }
}

module.exports.getUser = getUser
module.exports.createUser = createUser