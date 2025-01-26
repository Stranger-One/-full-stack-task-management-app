const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
	thumbnail:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		required:true
	},
	availability:{
		type:Boolean,
		default:true
	}
})
module.exports = mongoose.model("Menu",menuSchema);