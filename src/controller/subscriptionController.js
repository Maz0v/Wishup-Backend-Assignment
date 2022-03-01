const subcriptionModel = require("../model/subscriptionModel");
const userModel = require("../model/userModel");
function convert(str) {
   var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
   return [date.getFullYear(), mnth, day].join("-");
}

const takeSubscription = async function (req, res) {
   try {
      const { user_name, plan_id, start_date } = req.body
      let subsData = {}
      let validUser
      if (user_name) {
         validUser = await userModel.findOne({ user_name: user_name })
         subsData["user_name"] = validUser.user_name
      }

      if (!validUser) {

         res.status(400).send({ msg: "User is not registered" })
      }

      const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
      if (dateRegex.test(start_date)) {
         subsData["start_date"] = start_date

      }

      


      if (plan_id == "FREE") {
         subsData["plan_id"] = "FREE"
         subsData["amount"] = 0
         subsData["validity"] = null
         subsData["valid_till"] = null

      } else if (plan_id == "TRIAL") {
         subsData["plan_id"] = "TRIAL"
         subsData["amount"] = 0
         subsData["validity"] = 7
         let endDate = convert(new Date(Date.parse(start_date) + (7 * 86400000)).toUTCString())
         subsData["valid_till"] = endDate

      } else if (plan_id == "LITE_1M") {
         subsData["plan_id"] = "LITE_1M"
         subsData["amount"] = 100.0
         subsData["validity"] = 30
         let endDate = convert(new Date(Date.parse(start_date) + (30 * 86400000)).toUTCString())
         subsData["valid_till"] = endDate

      } else if (plan_id == "PRO_1M") {
         subsData["plan_id"] = "PRO_1M"
         subsData["amount"] = 200.0
         subsData["validity"] = 30
         let endDate = convert(new Date(Date.parse(start_date) + (30 * 86400000)).toUTCString())
         subsData["valid_till"] = endDate

      } else if (plan_id == "LITE_6M") {
         subsData["plan_id"] = "LITE_6M"
         subsData["amount"] = 500.0
         subsData["validity"] = 180
         let endDate = convert(new Date(Date.parse(start_date) + (180 * 86400000)).toUTCString())
         subsData["valid_till"] = endDate

      } else if (plan_id === "PRO_6M") {
         subsData["plan_id"] = "PRO_6M"
         subsData["amount"] = 900.0
         subsData["validity"] = 180
         let endDate = convert(new Date(Date.parse(start_date) + (180 * 86400000)).toUTCString())
         subsData["valid_till"] = endDate
      }


      let savesubData = await subcriptionModel.create(subsData)
      if (savesubData) {
         res.status(200).send({ status: "SUCCESS", amount: -savesubData.amount })
      } else {
         res.status(200).send({ status: "FAILURE" })
      }

   } catch (error) {
      res.status(500).send({ message: "Failed", error: console.log(error.message) });
   }
}

const getSubscriptionDetailsByDate = async function (req, res) {
   try {
      let userName = req.params.userName
      let inputDate = req.params.inputDate
      let sendOutput ={}
      let subdetails = await subcriptionModel.findOne({user_name:userName})
      if(inputDate){
      if(subdetails){
         sendOutput["plan_id"]=subdetails.plan_id
         let enddate = new Date(subdetails.valid_till)
         let inputdate = new Date(inputDate)
         let Difference_In_Time = enddate.getTime() -  inputdate.getTime();
         let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
         let daysLeft =  Difference_In_Days
         sendOutput["days_left"]=daysLeft

         res.status(200).send(sendOutput)
      }
   }else{
       let  subDetails = await subcriptionModel.find({user_name:userName}).select({plan_id:1,start_date:1,valid_till:1,_id:0})
         res.status(200).send(subDetails)
   }

   } catch (error) {
      res.status(500).send({ message: "Failed", error: console.log(error.message) });
   }

}

module.exports.takeSubscription = takeSubscription
module.exports.getSubscriptionDetailsByDate = getSubscriptionDetailsByDate