// require mongoose
var mongoose = require('mongoose');
// for 1 to many
var Schema = mongoose.Schema;

var BidsSchema = new Schema({
         user_id: String,
         prod_id: String,
         amount: String
    },
    {timestamps: true });

mongoose.model('Bids', BidsSchema);