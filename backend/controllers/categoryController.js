const categoryModel = require("../models/CategoryModel")

// addCategory

const addCategory = async(req,res)=>{
    const savedCategory = await categoryModel.create(req.body)
    try{
        res.status(201).json({
            message:"Category Added Successfully",
            data:savedCategory
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
} 

//getallcategory

const getAllCategory = async(req,res)=>{
    const foundCategory = await categoryModel.find()
    try{
        res.status(200).json({
            message:"Category Found Successfully",
            data:foundCategory
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

module.exports = {addCategory, getAllCategory}