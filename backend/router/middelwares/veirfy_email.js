const nodemailer = require("nodemailer");
const ls=require('local-storage')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config()
const User=require('../../model/user')
const bcrypt=require('bcryptjs');
const { findOne } = require("../../model/user");


function main() {
 
    const email_token=jwt.sign({email:ls('email')},process.env.SECRET)
    const url='http://localhost:8080/api/auth/confirmation/'+email_token;
 
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, 
      pass:process.env.NODEMAILER_PASSWORD, 
    },
  });
  let info = {
    from: '"mohammed" <'+process.env.NODEMAILER_EMAIL+'>', 
    to:ls('email'),
    subject: "email verification ✔",  
    html: '<b>Hello we just got a request to create an account with this email, please verify in this link <a href="'+url+'">confirm it</a></b>',
  };
  transporter.sendMail(info)
}

function forget() {
    const forget_data=jwt.sign({data:ls('forget')},process.env.SECRET)
    const url='http://localhost:3000/forget_password_confirmation/'+forget_data;
    
    // console.log(ls('forget'))
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, 
      pass: process.env.NODEMAILER_PASSWORD, 
    },
  });


  let info = {
    from: '"mohammed" <'+process.env.NODEMAILER_EMAIL+'>',
    to:ls('forget'),
    subject: " password confirmation ✔",  
    html: '<b>Hello we just got a request to change your password , if it was you please  <a href="'+url+'">confirm it</a></b>',
  };
  transporter.sendMail(info)
}



async function confirm(req,res){
  const tkn= await jwt.verify(req.params.email_token,process.env.SECRET)
  req.email=tkn
  const user= await User.findOneAndUpdate({email:req.email.email},{confirmation:true})
   if(user)  res.redirect('http://localhost:3000/login');
}


async function forgetconfirmdata(req,res){
const {body}=req
const tkn= await jwt.verify(body.token,process.env.SECRET)
req.data=tkn
res.json(tkn.data)
}

async function forgetpasschange(req,res){
  const {body}=req
  const pass= await bcrypt.hash(body.password,10)
  const user= await User.findOneAndUpdate({email:body.email},{password:pass})
   if(!user) throw Error('something is wrong user not found')
    res.json({
     data:user,
     msg:"done"
    });
}

module.exports= {main,confirm,forget,forgetconfirmdata,forgetpasschange}
