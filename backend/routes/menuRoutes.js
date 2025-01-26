const express = require("express");
const Menu = require("../models/Menu");
const protect = require("../middleware/authMiddleware");


const router = express.Router()

router.get("/",async(req,res) => {
    const menuItems =  await Menu.find({});
    res.json(menuItems);
});

//Add a new menu Item
router.post("/",protect,async(req,res) => {
    const {name,category,price,availability} = req.body;
    try{
        const newItem = new Menu({name,category,price,availability});
        await newItem.save();
        res.status(201).json(newItem);
    }catch(err){
        res.status(400).json({message:"Invalid Data",error:err.message});
    }
   
});

//update a menu Item

router.put("/:id",protect,async(req,res) => {
    const {id} = req.params;
    const {name,category,price,availability} = req.body;

    try{
        const menuItem = await Menu.findById(id);
        if(!menuItem){
            return res.status(404).json({message:"Menu item not found"});

        }

        menuItem.name = name || menuItem.name;
        menuItem.category = category || menuItem.category;
        menuItem.price = price || menuItem.price;
        menuItem.availability = availability!== undefined? availability:menuItem.availability;


        const updatedItem = await menuItem.save();
        res.json(updatedItem);

    }catch(err) {
        res.status(400).json({message : "Error updating menu item",error:err.message})
    }
})

//Delete a menu item
router.delete("/:id",protect,async(req,res) => {
    const {id} = req.params;

    try{
        const menuItem = await Menu.findById(id);
        if(!menuItem) {
            return res.status(404).json({message:"Menu item not found"});
        }
        await menuItem.deleteOne();
        res.json({message:"menu item deleted Successfully"});
    }catch(err) {
        res.status(500).json({message:"Error deleting menu item",error:err.message})
    }
})

module.exports = router;