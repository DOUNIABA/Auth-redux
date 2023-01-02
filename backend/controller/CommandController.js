const command=require('../model/CommandModel')
const client=require('../model/user')
const plats=require('../model/Plats')
const achats=require('../model/Achat')
const jwt=require('jsonwebtoken')
const env=require('dotenv')
let Storage = require('local-storage')
const { findOneAndUpdate, findOne } = require('../model/CommandModel')

const AjouterCommand=async(req,res)=>{
    // const {body} = req
    const Quantit=req.body.Quantité
    const Prix=req.body.Prix
    if(!Storage('token')) throw Error('fait login obligatoire')
    const ver_token = jwt.verify(Storage('token') ,process.env.SECRET)
    const chek_Client= await client.findOne({_id:ver_token.email._id,role:ver_token.email.role})
      if(chek_Client){
        const new_command=new command({
          // ...body
          plat_id:req.body.plat_id,
          Client_id:ver_token.email._id,
          Quantité:Quantit,
          Prix:Prix, 
          Montant_total:Prix*Quantit 

        })
        const saveCommand=await new_command.save();
        if(saveCommand){
          res.json(saveCommand)
        }else{
              throw Error('Command not created')
    
        }
      }else{
      res.send("khassak tkon client")
      }
        
}
const UpdateCommand=async(req,res)=>{
  const check_command=await command.find({_id:req.params.id})
  .populate([
    {
      path: 'plat_id',  
      model:plats,
      select: { name:1,Prix:1}

  },
  {
    path: 'Client_id', 
    model:client,
    select: { _id:1 }

  },
   
  ])
  if(check_command){
    const Prix_plat=check_command[0].plat_id.Prix
        const UpdateCommand=await command.findOneAndUpdate({_id:req.params.id},{$set:{Quantité:req.body.Quantité,Montant_total:req.body.Quantité*Prix_plat}})
          if(UpdateCommand){
           res.json(UpdateCommand)
          }
      }else{
        res.send("error to update command")
      }
}

const DeletCommand=async(req,res)=>{
  const deletcommand=await command.findOneAndDelete({
    _id:req.params.id
  })
  if(deletcommand){
    res.send("suppresion sucees")
  }else{
    throw Error('problem to  suppresion command')
  }
}
const AllCommand=async(req,res)=>{
 const commands = await command.find()
    .populate([
      {
        path: 'plat_id',  
        model:plats,
        select: { name:1,Prix:1}
    },
    {
      path: 'Client_id', 
      model:client,
      select: { _id:1 }

    },
      {
        path: 'Prix', 
        model:plats,
        select: { Prix:1}

      }, 
    ])
    res.json(commands)
     throw Error('problem to get all data')
  
}
const commandClient=async(req,res)=>{  
  if(!Storage('token')) throw Error('makynch token ')
  const verify_token = jwt.verify(Storage('token') ,process.env.SECRET)
    const CommandClient = await command.find({Client_id:verify_token.email._id})
    .populate([
      {
        path: 'plat_id',
        model:plats,
        select: { name:1 ,Prix:1}
      },
      {
        path: 'Client_id', 
        model:client,
        select: { _id:1 }

      },
      {
        path:"achats_id",
        model:achats,
        select: { statu:1 }
    
    
      }
   
    ])

      if(CommandClient===null){
        throw Error('Sorry vous avez pas de command') 
      }else{
        res.json(CommandClient)

      }
}

// get number des command pour chaque client

const CountCommandbyclient=async(req,res)=>{
  if(!Storage('token')) throw Error('makynch token ')
  const verif_token = jwt.verify(Storage('token') ,process.env.SECRET)
  const CommandClient = await command.find({Client_id:verif_token.email._id}).countDocuments({})
    if(CommandClient==0){
      res.json(0)
    }else{
      res.json(CommandClient)

    }
}

const Profil=async(req,res)=>{
  if(!Storage("token"))throw Error('makynch token ')
   const verfie_token=jwt.verify(Storage("token"),process.env.SECRET)
   const getclientdata=await client.findOne({_id:verfie_token.email._id})
   if(getclientdata){
    res.json(getclientdata)
  }else
  throw Error('data for the users note existe ')

}
const updateProfil=async(req,res)=>{
  if(!Storage("token")) throw Error('makynch token ')
  const ver_token=jwt.verify(Storage("token"),process.env.SECRET)
  const updateprofil=await client.findOneAndUpdate({_id:ver_token.email._id},{$set:{name:req.body.name,email:req.body.email}})
  if(updateprofil){
    res.json(updateprofil)
  }else{
    res.json("update profil not success")

  }


}

module.exports={
    AjouterCommand,
    UpdateCommand,
    DeletCommand,
    AllCommand,
    commandClient,
    CountCommandbyclient,
    Profil,
    updateProfil

}