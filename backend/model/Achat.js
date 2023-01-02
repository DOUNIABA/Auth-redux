
const mongoose=require("mongoose")

const achatSchema= new mongoose.Schema({
  payment_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Payment'
   },

   command_id:{   
        type:mongoose.Schema.Types.ObjectId,
        ref:'Command'
   },

   statu:{
     type:String,
},

})
const Achat=mongoose.model('Achat',achatSchema)
module.exports=Achat
