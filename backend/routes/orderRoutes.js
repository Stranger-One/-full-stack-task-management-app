const express = require("express");
const Order = require("../models/Order");
const Menu = require("../models/Menu");
const protect = require("../middleware/authMiddleware")


const router = express.Router();

// place a new order
router.post("/",protect,async(req,res) => {
    const {items} = req.body;
    try{
        //validate items and calculate total amount
        let totalAmount = 0;
        const orderItems = await Promise.all(
            items.map(async(item) => {
                const menuItem = await Menu.findById(item.menuItemId);
                if(!menuItem){
                    throw new Error(`Menu item with Id ${item.menuItemId} not found`);

                }
                totalAmount += menuItem.price * item.quantity;
                return {menuItemId: item._id,quantity:item.quantity};

            })
        );

        //create the order
        const newOrder = new Order({
            userId:req.user.id,
            items:orderItems,
            totalAmount,
            status:"pending"
        });
        await newOrder.save();
        res.status(201).json(newOrder);

    }catch(err){
        res.status(400).json({message:"Error placing order",error:err.message})
    }
});


//fetch all orders for the logged-in user

router.get("/",protect,async(req,res) => {
    try{
        const orders = await Order.find({userId:req.user.id}).populate("items.menuItemId","name price");
        res.json(orders);
    }catch(err){
        res.status(500).json({message:"Error fetching orders",error:err.message});
    }
});

//update the status of an order(e.g "pending" to "completed")
router.put("/:id",protect,async(req,res) => {
    const {id} = req.params;
    const {status} = req.body;
    try{
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }

        order.status = status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);

    }catch(err) {
        res.status(400).json({message: "Error updating order status",error:err.message})
    }
});

//delete an order 
router.delete("/:id",protect,async(req,res) => {
    const {id} = req.params;
    try{
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }

        await order.deleteOne();
        res.json({message:"Order deleted Successfully"});

    }catch(err){
        res.status(500).json({message:"Error deleting order",error:err.message})
    }
})

module.exports = router;