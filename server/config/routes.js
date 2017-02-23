console.log("future routes loading...");

var friends = require('../controllers/friends.js');

var userCtrl = require('../controllers/users');
var bidsCtrl = require('../controllers/bids');

module.exports = function(app) {
	app.get('/friends', friends.index);
  	app.get('/friends/:id', friends.show);
  	app.post('/friends', friends.create);
  	app.put('/friends/:id', friends.update);
  	app.delete('/friends/:id', friends.delete);

	app.post('/api/login', userCtrl.login);
	app.get('/api/get-users', userCtrl.get_users);

	app.route('/api/bids')
		.get(bidsCtrl.get_list)
		.post(bidsCtrl.create_new)
		.delete(bidsCtrl.clear_bid);
	app.route('/api/bids/:id')
		.get(bidsCtrl.get_detail_item)
		.put(bidsCtrl.update_item);

};