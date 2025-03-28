const userModel=require("../models/UserModel")
const bcrypt = require("bcrypt")

const loginuser = async(req,res) =>{
  const email=req.body.email
  const password=req.body.password

  const founduserbyEmail = await userModel.findOne({email:email}).populate("roleId")
  console.log(founduserbyEmail)

  if (founduserbyEmail!=null){

    const isMatch = bcrypt.compareSync(password,founduserbyEmail.password)

    if (isMatch==true){
      res.status(200).json({
        message:"login success",
        data:founduserbyEmail
      })
    }else{
      res.status(404).json({
        message:"invalid credentials..."
      })
    }
  }else{
    res.status(404).json({
      message:"email does not exist"
    })
  }
}

const signup = async (req,res) =>{
  try{
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password,salt)
    req.body.password=hashedPassword
    const createdUser = await userModel.create(req.body)
    
    res.status(201).json({
      message:"user created...",
      data:createdUser
    })

  }catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    })
  }
}

const getAllUsers = async (req,res) =>{
 
    const users = await userModel.find().populate('roleId')
    res.json({
        message: "role fetched successfully",
        data:users
      });
      
}        
 const getUserbyId = async (req,res) =>{
  const founduser= await userModel.findById(req.params.id)
  res.json({

    message:"role fetched successfully",
    data:founduser
  })
 }
 const addUser = async (req,res)=>{
  const savedRole=await userModel.create(req.body)
  
    res.json({
      message:"role created",
      data:savedRole
    })
}
const deleteUser = async(req,res)=>{ const deleteUser = await roleModel.findByIdAndDelete(req.params.id)

  res.json({
    message:"role deleted successfully..",
    data:deletedRole
  })
}


module.exports={getAllUsers,getUserbyId,addUser,deleteUser,loginuser,signup}
