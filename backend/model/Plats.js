const mongoose=require("mongoose")

const PlatsSchema= new mongoose.Schema({
   name:{
        type:String,
   },
   categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Categorie'
   },
   Composent:{
        type:String,
   },
   prix:{
        type:Number,
   },
   image:{
     type:String,
},

})
const plats=mongoose.model("Plat",PlatsSchema)
module.exports=plats