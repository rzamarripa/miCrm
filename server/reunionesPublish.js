Meteor.publish("reuniones", function(options){
	return Reuniones.find({prospecto_id : options.id});
});