const mongoose=require("mongoose")

const catSchema= new mongoose.Schema({
   label:{
        type:String,
   },
})
const Categorie=mongoose.model("Categorie",catSchema)
module.exports=Categorie