const mongoose = require('mongoose');
const coonectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://bhemavallika:E7jALwJgGMblrTf9@cluster0.om0hz.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB Connected.....");
        
    }catch(err){
        console.log(err.message);
        process.exit(1);
        
    }
};

module.exports = coonectDB;
