// require mongoose
var mongoose = require('mongoose');
// for 1 to many
var Schema = mongoose.Schema;

var FriendSchema = new mongoose.Schema({
 first_name: {type: String, required: true, minlength: 1}, 
 last_name: {type: String, required: true, minlength: 1},
 dob: {type: Date, required: true}}, 
 {timestamps: true });

mongoose.model('Friend', FriendSchema); 