// require mongoose
var mongoose = require('mongoose');
// for 1 to many
var Schema = mongoose.Schema;

var UserSchema = new Schema({
     user_name: String
},
 {timestamps: true });

mongoose.model('User', UserSchema);