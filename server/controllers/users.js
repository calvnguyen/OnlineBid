var mongoose = require('mongoose');
var Users = mongoose.model('User');

exports.login = function(req, res){
    var user_name = req.body.user_name;
    if (!user_name)
        return res.status(400).send({message: 'user name is required'});
    Users.findOne({user_name: user_name}, function(err, result){
        if (!err && result){
            res.send(result);
        }
        else {
            Users.create({user_name: user_name}, function(err, new_user){
                if (err)
                    return res.status(400).send({message: 'fail create new user'});
                res.send(new_user);
            })
        }
    })
};

exports.get_users = function(req, res){
    Users.find({}, function(err, result){
        res.send(result);
    })
};