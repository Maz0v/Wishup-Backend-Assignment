const express = require('express');
const router = express.Router();

const userController= require("../controller/userController")
const subscriptionController= require("../controller/subscriptionController")

router.put("/user/:username",  userController.createUser );
router.get("/user/:username",  userController.getUser );

router.post("/subscription",  subscriptionController.takeSubscription);
router.get("/subscription/:userName/:inputDate",  subscriptionController.getSubscriptionDetailsByDate);
router.get("/subscription/:userName",  subscriptionController.getSubscriptionDetailsByDate);
module.exports = router;