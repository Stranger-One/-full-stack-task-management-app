const express = require("express");
const Menu = require("../models/Menu");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.get("/", async (req, res) => {
    const menuItems = await Menu.find({});
    res.json(menuItems);
});

// Add a new menu item
router.post("/create", protect, upload.single("file"), async (req, res) => {
    const { name, category, price, availability } = req.body;
    const file = req.file;
    if(!name || !category || !price || !availability || !file){
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const newItem = new Menu({
            thumbnail: file.path,
            name,
            category,
            price: parseFloat(price), 
            availability: availability === "true",
        });
        await newItem.save();
        // console.log("newItem", newItem);
        
        res.status(201).json(newItem);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Invalid Data", error: err.message });
    }
});

// Update a menu item
router.put("/update/:id", protect, upload.single("file"), async (req, res) => {
    const { id } = req.params;
    const { name, category, price, availability } = req.body;
    const file = req.file;
    // console.log("req.body", req.body, req.file);

    try {
        const menuItem = await Menu.findById(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        menuItem.name = name || menuItem.name;
        menuItem.category = category || menuItem.category;
        menuItem.price = price ? parseFloat(price) : menuItem.price;
        menuItem.availability = availability ? availability === "true" : menuItem.availability;
        if (file) {
            menuItem.thumbnail = file.path;
        }

        await menuItem.save();
        res.json(menuItem);
    } catch (err) {
        res.status(400).json({ message: "Invalid Data", error: err.message });
    }
});

// Delete a menu item
router.delete("/delete/:id", protect, async (req, res) => {
    const { id } = req.params;

    try {
        const menuItem = await Menu.findById(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        await menuItem.deleteOne();
        res.json({ message: "Menu item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting menu item", error: err.message });
    }
});

module.exports = router;
