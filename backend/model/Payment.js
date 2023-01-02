const mongoose=require("mongoose")

const paySchema= new mongoose.Schema({
   type:{
        type:String,
   },
   prix:{
        type:Number,
   },
})
const Payment=mongoose.model('Payment',paySchema)
module.exports=Payment