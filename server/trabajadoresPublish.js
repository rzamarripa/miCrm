Meteor.publish("empleados",function(){
  	return Empleados.find({estatus:true});
});