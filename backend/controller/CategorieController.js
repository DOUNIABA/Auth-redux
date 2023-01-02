const Categorie= require('../model/Categorie')

const GetAllcategories= async(req,res)=>{
    const categories= await Categorie.find()
     res.json(categories)
   }

   const CreateCat=  async (req,res,next)=>{
    const {body}=req
    const creat= await Categorie.create({...body})
    if(!creat) throw Error('Categorie not created')
    res.json({msg:"created",
        data:creat
    })
}
   const RemoveCat=  async (req,res,next)=>{
    const {id}=req.body
    const rem= await Categorie.findOneAndRemove({_id:id})
    if(!rem) throw Error('Categorie not removed')
    res.json({msg:"removed"})
}


   module.exports= {GetAllcategories, CreateCat,RemoveCat}