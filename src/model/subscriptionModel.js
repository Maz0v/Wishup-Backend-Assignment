const mongoose = require('mongoose')
const subscriptionSchema = new mongoose.Schema(
    {
        "user_name": {type:String},
        "plan_id": {type:String,enum:["FREE","TRIAL","LITE_1M","PRO_1M","LITE_6M","PRO_6M"]},
        "amount":{type:Number},
        "validity":{type:Number},
        "start_date": {type:Date},
        "valid_till":{type:Date}
    },{timestamps:true}
)


module.exports = mongoose.model('subscription', subscriptionSchema)