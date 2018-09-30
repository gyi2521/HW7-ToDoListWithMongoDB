
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    itemId: {
        type: Number,
        unique: true,
        required: true
    },
    task: {
        type: String,
        required: true
    }
})

var toDoArray = mongoose.model('toDoArray', toDoSchema);
 
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = toDoArray;