const User= require('../model/user')
const Plat= require('../model/Plats')
const payment= require('../model/Payment')
const command=require('../model/CommandModel')
const Categorie= require('../model/Categorie')
const Achat  = require('../model/Achat')

const DashboardStat=async(req,res)=>{
    const user= User.aggregate({ 
        $match: { name:"mohammed"} 
    })
     if(!user) throw Error('data not found')
     res.json({user})
}

module.exports= {DashboardStat}