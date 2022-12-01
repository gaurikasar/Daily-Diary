//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const TodoItemSchema = new mongoose.Schema({
  item:{
    type:String
  },
  date:{
    type : String,
  },
  email:{
    type: String
  },complete: {
		type: Boolean,
		default: false
	}
})

//export this Schema
module.exports = mongoose.model('todotask', TodoItemSchema);