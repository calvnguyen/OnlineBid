var mongoose = require('mongoose');
var Users = mongoose.model('User');
var Bids = mongoose.model('Bids');

exports.get_list = function(req, res){
    var query = req.query || {};
    Bids.find(query, function(err, result){
        if (err)
            res.status(400).send({message: 'fail db'});
        else
            res.send(result);
    })
};

exports.get_detail_item = function(req, res){
    var id = req.params.id;
    if (!id)
        return res.status(400).send({message: 'id is required'});
    Bids.findOne({_id: id}, function(err, result){
        if (err)
            res.status(400).send({message: 'fail db'});
        else
            res.send(result);
    })
};

exports.create_new  = function(req, res){
    var new_bid = new Bids(req.body);
    new_bid.save(function(err){
        if (err)
            res.status(400).send({message: 'fail db'});
        else
            res.send(new_bid);
    })
};

exports.end_bid = function(req, res){

};

exports.update_item = function(req, res){
    var id = req.params.id;
    Bids.findOne({_id: id}, function(err, result){
        if (err || !result)
            return res.status(400).send({message: 'can not find bid item.'});
        result.amount = req.body.amount;
        result.save(function(err){
            res.send(result);
        })
    })
};

exports.clear_bid = function(req, res){
    var user_id = req.query.user_id;
    if (!user_id)
        return res.status(400).send({message: 'user id is required'});
    Bids.remove({}, function(err){
        if (err)
            res.status(400).send({message: 'fail db'});
        else
            res.send({message: 'success'});
    })
};