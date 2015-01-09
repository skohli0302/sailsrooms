/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list: function (req, res) {
			Room.find().exec(function (err, rooms) {
				if (err) {
					console.log('Error occurred ' + e);
					res.send(400);
				} else {
					if(req.isSocket){
						Room.subscribe(req.socket,rooms);
						console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'rooms\'.');
					}
					res.send(rooms);
				}
			});
	},

	/**
	* `RoomController.update()`
	* home page rendering
	*/
	update: function (req, res) {
		if(req.param('id') && req.param('room_value')){
			Room.update({id:req.param('id')},{room_value:req.param('room_value')}).exec(function update(err,updated){
				Room.publishUpdate(updated[0].id, updated[0] );
				res.send(200);
			});
		}else{
			res.view('updaterooms');
		}
	}
};
