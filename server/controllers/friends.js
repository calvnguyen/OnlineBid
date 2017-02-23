
var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');


function FriendsController(){

	this.index = function(req, res){

		Friend.find({}, function(err, friends){
			if (err){
				console.log('error getting friends from db')
			}
			else{
				console.log('successfully retrieved friends from db')
				console.log(friends);
				for (var i in friends){
					console.log(friends[i].name);
				}
			   
	    		res.json(friends);	
			}
		})
	};

	this.create = function(req, res) {
   		console.log("server - inside create controller")
   		console.log(req.body);
  	 	Friend.create(req.body, function(err, result){
      		if(err){
        	console.log(err);
      		}
      		else{
        		res.json(result);
      		}
    	})
	};

	this.show = function(req, res){

		Friend.findOne({_id: req.params.id}, function(err, friend){
			if (err){
				console.log('error getting an Friend object from db')
			}
			else{
				console.log('successfully retrieved an Friend object from db')
				console.log(typeof(friend));
			   
	    		res.json(friend);	
			}
		})
	};

	this.update = function(req, res){
		console.log("server - update friend id: "+ req.params.id);
		Friend.findOne({_id: req.params.id}, function(err, friend){
      		if(err){
        		console.log(err);
      		}
      		else{
      			console.log("update in server...");
      			console.log(req.body.first_name);
        		friend.first_name = req.body.first_name;
        		friend.last_name = req.body.last_name;
        		friend.dob = req.body.dob;
        		friend.save(function(err, updatedFriend){
          			if (err){
            			console.log("error updating the friend..");
          			}else{
            			res.json(updatedFriend);
          			}
        		})
      		}
    	})

	};

	this.delete = function(req, res){
		console.log("server - delete friend id: "+ req.params.id);
		Friend.remove({_id: req.params.id}, function(err, friend){
			if (err){
				console.log('error deleting an Friend object from db')
			}
			else{
				console.log('successfully deleted an Friend object from db')
				console.log(typeof(friend));
			   
	    		res.json({message: 'Friend ID ' + req.params.id + ' Deleted OK'});
			}
		})

	}
}


module.exports = new FriendsController();